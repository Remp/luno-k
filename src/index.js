import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render((
    <MuiThemeProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </MuiThemeProvider>), 
document.getElementById('root'));
registerServiceWorker();
