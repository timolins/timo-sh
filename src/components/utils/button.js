import styled, { css } from 'styled-components'
import { getLuminance, darken } from 'polished'
import { Link } from 'react-static'

const style = css`
  position: relative;
  cursor: pointer;
  font-size: 1em;
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
  }
`
const Button = styled.button`
  ${style};
  padding: 0;
  font-size: 1rem;
  border: none;
  background: none;
`

export const LinkButton = styled(Link)`
  ${style}
`

export default Button
