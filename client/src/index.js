import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// Компоненты
import { Greet } from './pages/Greet'
import { Repair } from './pages/Repair'
import { Laboratory } from './pages/Laboratory'
import { Tech } from './pages/Tech'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// Стили
import './styles/index.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ErrorBoundary>
                <Switch>
                    <Route exact={true} path="/">
                        <Greet />
                    </Route>
                    <Route path="/repair">
                        <Repair />
                    </Route>
                    <Route path="/tech">
                        <Tech />
                    </Route>
                    <Route path="/laboratory">
                        <Laboratory />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </ErrorBoundary>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
