import React from 'react'
import styled from 'styled-components'

import code from '../assets/icons/code.svg'
import design from '../assets/icons/design.svg'
import video from '../assets/icons/video.svg'

const Icon = styled.img`
  margin: 0 2px;
`

export default ({type}) => {
  switch (type) {
    case 'design':
      return <Icon src={design} />
    case 'video':
      return <Icon src={video} />
    case 'code':
    default:
      return <Icon src={code} />
  }
}
