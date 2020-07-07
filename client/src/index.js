import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LoadingOutlined } from '@ant-design/icons'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// Стили
import './styles/index.css'

const history = createBrowserHistory()

const Greet = lazy(() => import('./pages/Greet'))
const Repair = lazy(() => import('./pages/Repair'))
const Tech = lazy(() => import('./pages/Tech'))
const Laboratory = lazy(() => import('./pages/Laboratory'))

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <ErrorBoundary>
                <Suspense fallback={<LoadingOutlined className="loading" />}>
                    <Switch>
                        <Route exact path="/" component={Greet} />
                        <Route path="/repair" component={Repair} />
                        <Route path="/tech" component={Tech} />
                        <Route path="/laboratory" component={Laboratory} />
                        <Route path="*" component={Greet} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('root')
)
