import styled from 'styled-components'

export default styled.div`
  height: ${p => p.height || '350px'};
  width: 1px;
  background: #eee;
  @media (max-width: 600px) {
    display: none;
  }
`