import React from 'react'
import { withRouteData, Head } from 'react-static'
import styled from 'styled-components'
import convert from 'htmr'

import Wrapper from '../components/utils/wrapper'
import ScrollToTop from '../components/utils/scroll-to-top'
import DateText from '../components/utils/date-text'
import Tags from '../components/utils/tags'

import config from '../../config.json'

const Content = styled.div`
  padding-top: 4rem;
  img {
    margin: 2rem 0 0.5rem;
  }
  h3 {
    margin-top: 3rem;
  }
  p {
    line-height: 1.5rem;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

export default withRouteData(({ project, tags }) => (
  <ScrollToTop>
    <Wrapper>
      <Head>
        <title>
          {project.title} ~ {config.name}
        </title>
      </Head>
      <Content>
        <TitleWrapper>
          <h2>{project.title}</h2>
          <DateText alignRight date={project.date} />
        </TitleWrapper>
        <div />
        <Tags tags={tags} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: project.contents }} />
      </Content>
    </Wrapper>
  </ScrollToTop>
))
