import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import {Provider} from 'react-redux';
import createStore from './redux/createStore';
import * as serviceWorker from './serviceWorker';

console.log('Hi John');

const store = createStore();

const element = (
    <Provider store={store}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
);


ReactDom.render(element, document.querySelector('#root'));
