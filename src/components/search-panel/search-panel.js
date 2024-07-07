import React, { useCallback, useState } from "react";


import './search-panel.css';

const SearchPanel = () => {
    let term = 'lk';
    const [state, setState] = useState(term);
    return (
        <input type="text"
            className="form-control search-input"
            placeholder="Найти сотрудника" />
    )
}

export default SearchPanel;