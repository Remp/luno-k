import React from 'react';
import '../styles/Loading.css';
import CircularProgress from 'material-ui/CircularProgress';

export default () => (
    <div className="own-loading-form">
        <CircularProgress size={60} thikness={7} />
    </div>
)