import React from 'react'
import styled from 'styled-components'

const Achievement = styled.div`
  padding: 15px;
  max-width: 500px;
  border: 1px solid #eee;
  border-radius: 6px;

  box-sizing: border-box;
`

const Title = styled.span``

Title.defaultProps = {
  color: 'rgb(200,200,200)'
}

export default props => (
  <Achievement {...props}>
    <Title color={props.color}>{props.title}</Title>
  </Achievement>
)
