import React from 'react'
import styled from 'styled-components'

import GithubRepo from './github-repo.js'

const GithubRepos = styled.div`
  display: inline-block;
  min-width: 240px;
  width: 40%;
  @media (max-width: 600px) {
    width: 100%;
  }
`

const Link = styled.a`
  font-size: 0.8rem;
`

export default ({repos, totalCount, title, link}) => {
  const isLoading = repos.length === 0

  return (
    <GithubRepos>
      <h3>{title}</h3>
      <div>
        {isLoading
          ? 'Loading... '
          : repos.map(repo => (
              <GithubRepo
                key={repo.id}
                url={repo.url}
                desc={repo.description}
                owner={repo.owner.login}
                name={repo.name}
              />
            ))}
      </div>
      <Link href={link} target="_blank">
        View more on <b>GitHub</b> →
      </Link>
    </GithubRepos>
  )
}
