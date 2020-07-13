import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// Стили
import './styles/index.css'

import Greet from './pages/Greet'
import Repair from './pages/Repair'
import Tech from './pages/Tech'
import Laboratory from './pages/Laboratory'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ErrorBoundary>
                <Switch>
                    <Route exact={true} path="/" component={Greet} />
                    <Route path="/repair" component={Repair} />
                    <Route path="/tech" component={Tech} />
                    <Route path="/laboratory" component={Laboratory} />
                    <Redirect to="/" />
                </Switch>
            </ErrorBoundary>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
