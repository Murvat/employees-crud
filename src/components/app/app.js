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
  //add employees info
  const employees = data.length;
  const increased = data.filter(item => item.increase).length;
  //ADD EMPLOYEE
  const addItem = (name, salary) => {
    const newItem = {
      name,//name:name
      salary,//salary:salary
      increase: false,
      rise: false,
      id: maxId
    }
    setState(prevState => ({
      data: [...prevState.data, newItem],
      maxId: prevState.maxId + 1,

    }))
  }
  //DELETE EMPLOYEE
  const onDeleteItem = (id) => {
    setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)//retur  new state without this id
      }
    });

  }
  //SEARCH EMPLOYEE
  const searchEmployee = (items, term) => {//items is an array of items , term is string by what we search
    if (!term || term.length === 0) {
      return items;
    };

    return items.filter(item => {
      return item.name.indexOf(term) > -1;//return an array of elements which names have this string
    })
  }
  //How do i get term string?
  const onUpdateSearch = (term) => {
    setState(prevState => ({
      ...prevState,
      term  //teerm: term
    }))
  }
  //ADD RISE ,ADD INCREASE
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
  //FILTER EMPLOYEES
  const filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);// which has value rise equal to true
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000);//which has value moreThan1000 equal to true
      default:
        return items;
    }
  };

  const onFilterSelect = (filter) => {
    setState(prevState => ({
      ...prevState,
      filter//filter:filter
    }))
  }


  const visibleData = filterPost(searchEmployee(data, term), filter)
  return (
    <div className="app">
      <AppInfo
        employees={employees}
        increased={increased} />

      <div className="search-panel">
        <SearchPanel
          onUpdateSearch={onUpdateSearch}
        />
        <AppFilter
          filter={filter}
          onFilterSelect={onFilterSelect} />
      </div>

      <EmployeesList
        data={visibleData}
        onDelete={onDeleteItem}
        onToggleProp={onToggleProp}


      />
      <EmployeesAddForm onAdd={addItem} id={maxId} />
    </div>
  );



}
export default App;
