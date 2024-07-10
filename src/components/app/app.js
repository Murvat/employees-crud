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
  //initial state
  const [state, setState] = useState({
    data: initialData,
    term: ' ',
    maxId: 4,
    filter: ''
  });

  //state 
  const { term, data, maxId, filter } = state;

  //Search Start//
  //func to search employee by array of employyes and term string logged into input
  const searchEmp = (items, term) => {
    if (!term || term.length === 0) {//check whether we have this string or not
      return items;//if not leave array of employees
    }

    return items.filter(item => {//if we added string then with method filer get elements who have this string
      return item.name.indexOf(term) > -1;

    })

  }


  ///function that change term string in order to make search
  const onUpdateSearch = (term) => {
    setState(prevState => ({
      ...prevState,
      term
    }));

  }

  //Search finish//


  //number of emoloyees
  const employees = state.data.length;

  //number of promoted epmloyees
  const increased = state.data.filter(item => item.increase).length;



  //lifted state  to ADD STYLES start //
  const onToggleProp = (id, prop) => {//function to set or change props like rise,increase 
    setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {//find item with that id and just change the prop
          return { ...item, [prop]: !item[prop] }//change prop by opposite 
        }
        return item;
      })
    }))
  };
  //ADD STYLES finish//

  //how to ADD NEW EMPLOYEE, START//
  const addItem = (name, salary) => {//name and salary from attributes and then set it as state,
    //using maxID counter//we pass it to child component
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
  const onDeleteItem = (id) => {//func delete element with the exact id //we pass it to child component
    setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id),
      }

    })

  }

  // ADD ,DELETE EMPLOYEE FINISH//
  //filter logic
  const filterPost = (items, filter) => {// get our array of employees get 
    //value to filter and return new array depending on filter
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);// which has value rise equal to true
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000);//which has value moreThan1000 equal to true
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
