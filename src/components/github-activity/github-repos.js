import React from 'react'
import styled, {keyframes} from 'styled-components'

import GithubRepo from './github-repo.js'

const GithubRepos = styled.div`
  display: inline-block;
  min-width: 240px;
  margin-top: 2rem;
  width: 44%;
  @media (max-width: 600px) {
    width: 100%;
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`

const RepoPlaceholder = styled.div`
  height: 4rem;
  background: var(--outline);
  border-radius: 3px;
  margin: 3rem 0;
  animation: ${pulse} 1s linear infinite;
  animation-delay: ${p => p.delay || 0}ms;

  @media (max-width: 600px) {
    margin: 2rem 0;
  }
`

const Link = styled.a`
  font-size: 0.8rem;
`

export default ({repos, title, link, isLoading, quantity}) => {
  return (
    <GithubRepos>
      <h3>{title}</h3>
      <div>
        {isLoading
          ? [...Array(quantity)].map((e, i) => (
              <RepoPlaceholder key={i} delay={i * 50} />
            ))
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
