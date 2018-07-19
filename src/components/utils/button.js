import styled from 'styled-components'

const Button = styled.a`
  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    content: '';
    top: -5px;
    left: -8px;
    right: -8px;
    bottom: -5px;
    border-radius: 5px;
    background: #0366d6;
    opacity: 0.1;
    z-index: -1;
  }
`

export default Button
