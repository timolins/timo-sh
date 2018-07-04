import React from 'react'
import styled from 'styled-components'

import code from './assets/code.svg'
import design from './assets/design.svg'
import video from './assets/video.svg'

const Icon = styled.img`
  margin: 0 2px;
`

export default ({type}) => {
  switch (type) {
    case 'design':
      return <Icon src={design} title="Design" alt="Design" />
    case 'video':
      return <Icon src={video} title="Video" alt="Video" />
    case 'code':
    default:
      return <Icon src={code} title="Code" alt="Code" />
  }
}
