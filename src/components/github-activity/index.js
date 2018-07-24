import React from 'react'
import {withRouteData} from 'react-static'
import 'whatwg-fetch'

import GithubRepos from './github-repos.js'
import GithubReposWrapper from './github-repos-wrapper.js'
import Seperator from '../utils/seperator.js'

import {githubUsername} from '../../../config.json'

const QUANTITY = 5
const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'

const query = `
query {
  user (login: "${githubUsername}") {
    repositoriesContributedTo(last: ${QUANTITY}, privacy: PUBLIC, includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]) {
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
    starredRepositories(last: ${QUANTITY}) {
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

class GithubStars extends React.Component {
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.githubToken}`
      },
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
          quantity={QUANTITY}
          isLoading={isLoading}
        />
        <Seperator />
        <GithubRepos
          title="Repos I Recently Starred"
          link={`https://github.com/${githubUsername}?tab=stars`}
          repos={starredRepositories.nodes.reverse()}
          quantity={QUANTITY}
          isLoading={isLoading}
        />
      </GithubReposWrapper>
    )
  }
}

export default withRouteData(GithubStars)
