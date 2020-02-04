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

const Repaire = lazy(() => import('./pages/Repaire/App'))

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
                        <Route exact path="/" component={Repaire} />
                        <Route exact path="/plan" component={Repaire} />
                        <Route path="/plan/:id" component={Repaire} />
                        <Route path="*" component={Repaire} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('root')
)
