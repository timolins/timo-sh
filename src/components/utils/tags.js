import React from 'react'
import styled from 'styled-components'

const Tags = styled.div`
  margin: 1rem 0;
`

const Tag = styled.span`
  margin-right: 5px;
  color: rgb(60, 60, 60);
  font-size: 0.8rem;
  border-radius: 3px;
  background: rgb(246, 246, 246);
  padding: 5px;
`

export default ({ tags }) =>
  tags ? (
    <Tags>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Tags>
  ) : null
