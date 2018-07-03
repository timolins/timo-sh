import React from 'react'
import styled from 'styled-components'
import {Router, Link} from 'react-static'

import Logo from './logo'

const Tags = styled.div`
  margin: 1rem 0;
`

const Tag = styled.span`
  margin-right: 15px;
  color: rgb(60, 60, 60);
  position: relative;
  font-size: 0.8rem;
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    border: 1px solid #eee;
    border-radius: 3px;
  }
`

export default ({tags}) =>
  tags ? <Tags>{tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags> : null
