import React, { useState } from "react";


import './search-panel.css';

const SearchPanel = (props) => {
    const [state, setState] = useState({ term: '' });

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setState({ term });
        props.onUpdateSearch(term);
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