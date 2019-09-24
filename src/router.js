import React from 'react'
import App from './App'
import Login from './pages/login/login'
import Admin from './admin'
import City from './pages/city/city'
import Home from './pages/home/home'
import NoMatch from './pages/noMatch/noMatch'
import {HashRouter, Switch, Route} from 'react-router-dom'

class Router extends React.Component {

  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' render={()=>(
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/city' component={City} />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default Router;
