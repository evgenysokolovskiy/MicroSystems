import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Icon } from 'antd'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// API
import Api from './api/Api'
// Стили
import './styles/index.css'
import * as serviceWorker from './serviceWorker'

const Repair = lazy(() => import('./pages/Repair'))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ErrorBoundary>
                <Api />
                <Suspense
                    fallback={
                        <Icon
                            type="loading"
                            className="loading"
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                    }
                >
                    <Switch>
                        <Route exact path="/repair/" component={Repair} />
                        <Route exact path="/repair/plan" component={Repair} />
                        <Route path="/repair/plan/:id" component={Repair} />
                        <Route exact path="/repair/check" component={Repair} />
                        <Route path="/repair/check/:id" component={Repair} />
                        <Route exact path="/repair/scheme" component={Repair} />
                        <Route path="/repair/scheme/:id" component={Repair} />
                        <Route path="*" component={Repair} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('root')
)
