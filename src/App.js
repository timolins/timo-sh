import React from 'react'
import {Router, Link} from 'react-static'
import {hot} from 'react-hot-loader'

import Routes from 'react-static-routes'
import Nav from './components/nav'
import Wrapper from './components/wrapper'

import './app.css'

const App = () => (
  <Router>
    <Wrapper>
      <Nav>
        <Link exact to="/">
          Projects
        </Link>
        <Link to="/about">About</Link>
      </Nav>
      <div className="content">
        <Routes />
      </div>
    </Wrapper>
  </Router>
)

export default hot(module)(App)
