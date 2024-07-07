import React, { useState } from "react";


import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
const App = () => {
  const initialData = [
    { name: "John C.", salary: 800, rise: true, increase: false, id: 1 },
    { name: "Alex M.", salary: 3000, rise: false, increase: true, id: 2 },
    { name: "Carl W.", salary: 5000, rise: false, increase: false, id: 3 },

  ];

  const [state, setState] = useState({
    data: initialData,
    term: 'J'
  });
  const { term, data } = state;


  const [maxId, setMaxId] = useState(4);

  const searchEmp = (items, term) => {
    if (!term || term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;

    })

  }
  const employees = state.data.length;
  const increased = state.data.filter(item => item.increase).length;
  const visibleData = searchEmp(data, term);
  // const onToggleIncrease = (id) => {
  //   // setState(({ data }) => {
  //   //   const index = data.findIndex((elem) => elem.id === id);
  //   //   const old = data[index];
  //   //   const newItem = { ...old, increase: !old.increase };
  //   //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

  //   //   return {
  //   //     data: newArr
  //   //   }
  //   // });

  //   setState(({ data }) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return { ...item, increase: !item.increase }
  //       }
  //       return item;
  //     })
  //   }))
  // };
  // const onToggleRise = (id) => {
  //   setState(({ data }) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return { ...item, rise: !item.rise }
  //       }
  //       return item;
  //     })
  //   }))
  // };
  const onToggleProp = (id, prop) => {
    setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  };

  const addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: maxId
    }
    setMaxId(prevMaxId => prevMaxId + 1);
    setState(prevState => ({
      data: [...prevState.data, newItem]
    }));
  }



  const onDeleteItem = (id) => {

    setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];
      return {
        data: data.filter(item => item.id !== id),
      }

    })

  }

  const onUpdateSearch = (term) => {
    setState({ term });

  }
  return (
    <div className="app">
      <AppInfo employees={employees} increased={increased} />

      <div className="search-panel">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <AppFilter />
      </div>

      <EmployeesList
        data={visibleData}
        onDelete={onDeleteItem}
        onToggleProp={onToggleProp} />
      <EmployeesAddForm onAdd={addItem} />
    </div>
  );



}
export default App;
