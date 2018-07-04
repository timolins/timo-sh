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
  margin: 0 auto;
  margin-top: ${p => p.marginTop || 0};
  margin-bottom: ${p => p.marginBottom || 0};
  padding: 0 15px;
  box-sizing: border-box;
`

export default props => {
  const wrapper = (
    <Wrapper
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      big={props.big}
    >
      {props.children}
    </Wrapper>
  )

  if (props.darken) {
    return <Darken>{wrapper}</Darken>
  }

  return wrapper
}
