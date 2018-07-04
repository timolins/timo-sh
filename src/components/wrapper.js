import React from 'react'
import styled from 'styled-components'

const Darken = styled.div`
  background: rgb(246, 246, 246);
  p {
    color: #666666;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${p => (p.big ? '940px' : '740px')};
  width: 100%;
  ${p => (p.offset ? 'margin: 3rem auto 6rem' : 'margin: 0 auto;')};
  padding: 0 15px;
  box-sizing: border-box;
`

export default props => {
  const wrapper = (
    <Wrapper offset={props.offset} big={props.big}>
      {props.children}
    </Wrapper>
  )

  if (props.darken) {
    return <Darken>{wrapper}</Darken>
  }

  return wrapper
}
