import React from 'react'
import styled from 'styled-components'

import certificate from './assets/certificate.svg'
import lock from './assets/lock.svg'
import trophy from './assets/trophy.svg'

export default ({type}) => {
  switch (type) {
    case 'certificate':
      return <img src={certificate} title="Certificate" alt="Certificate" />
    case 'lock':
      return (
        <img
          src={lock}
          title="Security Vulnerability"
          alt="Security Vulnerability"
        />
      )
    case 'trophy':
    default:
      return <img src={trophy} title="Award" alt="Award" />
  }
}
