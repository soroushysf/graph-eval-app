import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ReduxPromise from 'redux-promise'

import App from './components/app';
import IntroToEvaluation from './components/intro-to-evaluation';
import EvalComp from './containers/eval';
import EffortEval from './containers/effort-eval';
import LastPage from './components/last-page';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/intro-to-evaluation' component={IntroToEvaluation}/>
                    <Route path='/eval-page-form/:id' component={EffortEval}/>
                    <Route path='/eval-page/:id' component={EvalComp}/>
                    <Route path='/last-page' component={LastPage}/>
                    <Route path='/' component={App}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));
