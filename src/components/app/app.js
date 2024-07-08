import React, { useState } from "react";


import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
const App = () => {
  ///data
  const initialData = [
    { name: "John C.", salary: 800, rise: true, increase: false, id: 1 },
    { name: "Alex M.", salary: 3000, rise: false, increase: true, id: 2 },
    { name: "Carl W.", salary: 5000, rise: false, increase: false, id: 3 },

  ];

  const [state, setState] = useState({
    data: initialData,
    term: ' ',
    maxId: 4,
    filter: ''
  });

  //state
  const { term, data, maxId, filter } = state;
  //func to search employee
  const searchEmp = (items, term) => {
    if (!term || term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;

    })

  }

  const onUpdateSearch = (term) => {
    setState(prevState => ({
      ...prevState,
      term
    }));

  }
  //number of emoloyees
  const employees = state.data.length;
  //number of promoted epmloyees
  const increased = state.data.filter(item => item.increase).length;

  //lifted state
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


  //how to add new employee
  const addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: maxId
    }
    setState(prevState => ({
      data: [...prevState.data, newItem],
      maxId: prevState.maxId + 1,
    }));
  }


  //how to delete employee
  const onDeleteItem = (id) => {
    setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id),
      }

    })

  }
  //filter logic
  const filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;


    }

  }

  //filter data
  const onFilterSelect = (filter) => {
    setState(prevState => ({
      ...prevState,
      filter
    }))

  }

  //data which will be rendered
  const visibleData = filterPost(searchEmp(data, term), filter);

  return (
    <div className="app">
      <AppInfo employees={employees} increased={increased} />

      <div className="search-panel">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>

      <EmployeesList
        data={visibleData}
        onDelete={onDeleteItem}
        onToggleProp={onToggleProp} />
      <EmployeesAddForm onAdd={addItem} id={state.maxId} />
    </div>
  );



}
export default App;
