import React from "react";
import { useState } from "react";

import './employees-add-form.css';

const EmployeesAddForm = ({ onAdd }) => {
    const [state, setState] = useState({
        name: '',
        salary: ''
    })

    const { name, salary } = state;
    const onValueChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault();
        onAdd(name, salary);
        setState({
            name: '',
            salary: ''
        });
    }


    return (
        <div className="app-add-form">
            <h3>Add new employer</h3>
            <form
                className="add-form d-flex"
                onSubmit={onSubmit}>
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