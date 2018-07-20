import React from 'react'
import 'whatwg-fetch'

import GithubRepos from './github-repos.js'
import GithubReposWrapper from './github-repos-wrapper.js'
import Seperator from '../utils/seperator.js'

import {githubToken, githubUsername} from '../../../config.json'

const quantity = 5

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${githubToken}`
}

const query = `
query {
  user (login: "${githubUsername}") {
    repositoriesContributedTo(last: ${quantity}, privacy: PUBLIC, includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]) {
      nodes {
        id
        name
        url
        description
        owner {
          login
        }
      }
    }
    starredRepositories(last: ${quantity}) {
      nodes {
        id
        name
        description
        url
        owner {
          login
        }
      }
    }
  }
}`

export default class GithubStars extends React.Component {
  state = {
    isLoading: true,
    starredRepositories: {
      nodes: [],
      totalCount: 0
    },
    repositoriesContributedTo: {
      nodes: [],
      totalCount: 0
    }
  }
  componentDidMount() {
    this.fetchRepos()
  }
  async fetchRepos() {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({query})
    })
    const {data} = await res.json()
    const {starredRepositories, repositoriesContributedTo} = data.user

    this.setState({
      starredRepositories,
      repositoriesContributedTo,
      isLoading: false
    })
  }
  render() {
    const {
      starredRepositories,
      repositoriesContributedTo,
      isLoading
    } = this.state

    return (
      <GithubReposWrapper>
        <GithubRepos
          title="Repos I Contributed to"
          link={`https://github.com/${githubUsername}`}
          repos={repositoriesContributedTo.nodes.reverse()}
          quantity={quantity}
          isLoading={isLoading}
        />
        <Seperator />
        <GithubRepos
          title="Repos I Recently Starred"
          link={`https://github.com/${githubUsername}?tab=stars`}
          repos={starredRepositories.nodes.reverse()}
          quantity={quantity}
          isLoading={isLoading}
        />
      </GithubReposWrapper>
    )
  }
}
