import React, { useState } from "react"

import './employees-list-item.css';

const EmployeesListItem = ({ name, salary, onDelete }) => {
    const [state, setState] = useState({
        increase: false,
        promoted: false
    });
    const { increase } = state;
    const { promoted } = state;

    let classNames = "list-group-item d-flex justify-content-between";

    if (increase) {
        classNames += ' increase';
    }

    if (promoted) {
        classNames += ' like';
    }
    const onIncrease = () => {
        setState(prevState => ({ increase: !prevState.increase }))
    }


    const handlePromo = (e) => {
        e.preventDefault()
        setState(prevState => ({ promoted: !prevState.promoted }))
    }

    return (
        <li className={classNames}>
            <span
                className="list-group-item-label"
                onClick={handlePromo}>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onIncrease}
                >
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;