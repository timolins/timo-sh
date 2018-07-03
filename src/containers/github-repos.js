import React from 'react'
import 'whatwg-fetch'

import GithubRepos from '../components/github-repos.js'
import GithubReposWrapper from '../components/github-repos-wrapper.js'

import {githubToken, githubUsername} from '../../config.json'

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${githubToken}`
}

const query = `
query {
  user (login: "${githubUsername}") {
    repositoriesContributedTo(last: 5, privacy: PUBLIC, includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]) {
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
    starredRepositories(last: 5) {
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
      repositoriesContributedTo
    })
  }
  render() {
    const {starredRepositories, repositoriesContributedTo} = this.state

    return (
      <GithubReposWrapper>
        <GithubRepos
          title="Repos I contributed to"
          link={`https://github.com/${githubUsername}`}
          repos={repositoriesContributedTo.nodes.reverse()}
        />
        <GithubRepos
          title="Repos I recently starred"
          link={`https://github.com/${githubUsername}?tab=stars`}
          repos={starredRepositories.nodes.reverse()}
        />
      </GithubReposWrapper>
    )
  }
}
