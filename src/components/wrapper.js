import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${p => (p.big ? '940px' : '740px')};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
`
