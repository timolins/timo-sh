import styled from 'styled-components'
import { getLuminance, darken } from 'polished'

const Button = styled.a`
  position: relative;
  cursor: pointer;
  color: ${p =>
    p.color && getLuminance(p.color) > 0.25
      ? darken(0.1, p.color)
      : p.color || 'var(--link)'};
  &:after {
    position: absolute;
    content: '';
    top: -5px;
    left: -8px;
    right: -8px;
    bottom: -5px;
    border-radius: 5px;
    background: ${p => p.color || 'var(--link)'};
    opacity: 0.1;
    z-index: -1;
  }
`

export default Button
