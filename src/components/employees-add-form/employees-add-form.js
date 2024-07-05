import React from "react";
import { useState } from "react";

import './employees-add-form.css';

const EmployeesAddForm = () => {
    const [state, setState] = useState({
        name: '',
        salary: ''
    })

    const { name, salary } = state;
    const onValueChange = (e) => {
        e.preventDefault();
        setState({
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="app-add-form">
            <h3>Add new employer</h3>
            <form
                className="add-form d-flex">
                <input
                    name="name"
                    type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?"
                    onChange={onValueChange}
                    value={name} />
                <input
                    name="salary"
                    type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    onChange={onValueChange}
                    value={salary} />

                <button type="submit"
                    className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;