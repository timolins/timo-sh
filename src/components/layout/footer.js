import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  text-align: center;
  margin: 2rem 0;
  font-size: 0.8rem;
  opacity: 1;
`

export default () => (
  <Footer>
    © {new Date().getFullYear()} Timo Lins{' · '}
    <a target="_blank" href="https://github.com/timolins">
      GitHub
    </a>
    {' · '}
    <a target="_blank" href="https://twitter.com/timolins">
      Twitter
    </a>
    {' · '}
    <a target="_blank" href="https://github.com/timolins/timo-sh">
      Source
    </a>
  </Footer>
)
