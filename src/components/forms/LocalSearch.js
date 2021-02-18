import React from 'react';
import { TextField } from '@material-ui/core';

const LocalSearch = ({ keyword, setKeyword }) => {

    const handleSearchChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };

    return (
        <TextField
            type="search"
            label="Rechercher une Catégorie"
            variant="outlined"
            value={keyword}
            onChange={handleSearchChange}
        />
    );
};

export default LocalSearch;