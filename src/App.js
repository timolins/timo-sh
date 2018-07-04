import React from 'react'
import {Router, Link} from 'react-static'
import {hot} from 'react-hot-loader'

import Routes from 'react-static-routes'

import Nav from './components/nav.js'
import Wrapper from './components/wrapper.js'
import Footer from './components/footer.js'

import './app.css'

const App = () => (
  <Router autoScrollToTop={false}>
    <div>
      <Wrapper darken big>
        <Nav />
      </Wrapper>
      <Routes />
      <Wrapper>
        <Footer />
      </Wrapper>
    </div>
  </Router>
)

export default hot(module)(App)
