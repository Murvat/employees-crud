import React, { useState } from "react";


import './search-panel.css';

const SearchPanel = (props) => {
    const [state, setState] = useState({ term: '' });
    //local method to save string logged into input
    const onUpdateSearch = (e) => {
        const term = e.target.value;//to capture data from input
        setState({ term });
        props.onUpdateSearch(term);//method from root App element
    }
    return (
        <input
            type="text"
            className="form-control search-input"
            placeholder="Найти сотрудника"
            value={state.term}
            onChange={onUpdateSearch} />
    )
}

export default SearchPanel;