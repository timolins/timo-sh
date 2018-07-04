import React from 'react'
import {Router, Link} from 'react-static'
import {hot} from 'react-hot-loader'

import Routes from 'react-static-routes'

import Nav from './components/layout/nav.js'
import Footer from './components/layout/footer.js'
import Wrapper from './components/utils/wrapper.js'

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
