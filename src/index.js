import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './ui/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducer-list'

/**
 * The redux store which stores all states in reducers
 */
const store = createStore(reducers);

/**
 * This event displays a confirmation dialog when the user tries to leave the page.
 * @returns {string}
 */
window.onbeforeunload = function(){
    return "";
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
