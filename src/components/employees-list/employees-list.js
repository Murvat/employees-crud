import React from "react";


import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data }) => {
    let element = data.map(item => (<EmployeesListItem {...item} />))
    return (
        <ul className="app-list list-group">
            {element}
        </ul>
    )
}

export default EmployeesList;