import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Icon } from 'antd'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// Стили
import './styles/index.css'

const Greet = lazy(() => import('./pages/Greet'))
const Repair = lazy(() => import('./pages/Repair'))
const Tech = lazy(() => import('./pages/Tech'))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ErrorBoundary>
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
                        <Route exact path="/" component={Greet} />
                        <Route exact path="/repair/" component={Repair} />
                        <Route path="/repair/plan/:id" component={Repair} />
                        <Route path="/repair/check/:id" component={Repair} />
                        <Route path="/repair/scheme/:id" component={Repair} />

                        <Route exact path="/tech/" component={Tech} />
                        <Route path="/tech/:id" component={Tech} />

                        <Route path="*" component={Greet} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('root')
)
