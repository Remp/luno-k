import React from 'react';
import '../styles/Error.css';

export default ({error}) => (
    <div className="own-error">
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
    </div>
)