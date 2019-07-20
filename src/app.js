import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import { createGlobalStyle } from 'styled-components'

import Routes from 'react-static-routes'

import Nav from './components/layout/nav.js'
import Footer from './components/layout/footer.js'
import Wrapper from './components/utils/wrapper.js'

import styles from './styles.js'

const GlobalStyle = createGlobalStyle`
 ${styles}
`

const App = () => (
  <Router autoScrollToTop={false}>
    <div>
      <GlobalStyle />
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
