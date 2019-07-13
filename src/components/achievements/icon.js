import React from 'react'

import certificate from './assets/certificate.svg'
import lock from './assets/lock.svg'
import trophy from './assets/trophy.svg'
import briefcase from './assets/briefcase.svg'

export default ({ type }) => {
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
    case 'briefcase':
      return (
        <img src={briefcase} title="Work Experience" alt="Work Experience" />
      )
    case 'trophy':
    default:
      return <img src={trophy} title="Award" alt="Award" />
  }
}
