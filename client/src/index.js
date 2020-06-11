import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
// Обработчик ошибок
import ErrorBoundary from './ErrorBoundary'
// Стили
import './styles/index.css'

const Greet = lazy(() => import('./pages/Greet'))
const Repair = lazy(() => import('./pages/Repair'))
const Tech = lazy(() => import('./pages/Tech'))
const Laboratory = lazy(() => import('./pages/Laboratory'))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ErrorBoundary>
                <Suspense fallback={<LoadingOutlined className="loading" />}>
                    <Switch>
                        <Route exact path="/" component={Greet} />
                        <Route path="/repair/*" component={Repair} />
                        <Route path="/tech/*" component={Tech} />
                        <Route path="/laboratory/*" component={Laboratory} />
                        <Route path="*" component={Greet} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('root')
)

/*

<Route exact path="/" component={Greet} />
<Route exact path="/repair/" component={Repair} />
<Route path="/repair/plan/:id" component={Repair} />
<Route path="/repair/check/:id" component={Repair} />
<Route path="/repair/scheme/:id" component={Repair} />

<Route exact path="/tech/" component={Tech} />
<Route path="/tech/table/:id" component={Tech} />
<Route path="/tech/axis/:id" component={Tech} />
<Route path="/tech/running/:id" component={Tech} />
<Route path="/tech/grinding/:id" component={Tech} />
<Route path="/tech/rough/:id" component={Tech} />
<Route path="/tech/clean/:id" component={Tech} />
<Route path="/tech/final/:id" component={Tech} />

<Route path="/laboratory/" component={Laboratory} />
<Route path="/laboratory/shp/:id" component={Laboratory} />
<Route path="/laboratory/shsp/:id" component={Laboratory} />
<Route path="/laboratory/sog/:id" component={Laboratory} />

*/
