import React, { useState } from "react";


import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
const App = () => {
  const initialData = [
    { name: "John C.", salary: 800, increase: false, id: 1 },
    { name: "Alex M.", salary: 3000, increase: true, id: 2 },
    { name: "Carl W.", salary: 5000, increase: false, id: 3 },

  ]
  const [state, setState] = useState({
    data: initialData,
  });
  const [maxId, setMaxId] = useState(4);

  const addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
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
  return (
    <div className="app">
      <AppInfo />

      <div className="search-panel">
        <SearchPanel />
        <AppFilter />
      </div>

      <EmployeesList
        data={state.data}
        onDelete={onDeleteItem} />
      <EmployeesAddForm onAdd={addItem} />
    </div>
  );



}
export default App;
