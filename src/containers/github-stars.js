import React from 'react'
import 'whatwg-fetch'
import {githubToken, githubUsername} from '../../config.json'

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${githubToken}`
}

const query = `
query {
  user (login: "timolins") {
    starredRepositories (last: 5) {
      totalCount,
      edges {
        node {
          id,
          name,
          owner {
            login
          },
          url,
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}`

export default class GithubStars extends React.Component {
  state = {
    repos: [],
    starsGiven: 0
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
    const {starredRepositories} = data.user

    const starsGiven = starredRepositories.totalCount
    const repos = starredRepositories.edges.map(edge => edge.node).reverse()

    this.setState({
      repos,
      starsGiven
    })
  }
  render() {
    const {repos, starsGiven} = this.state
    const isLoading = repos.length === 0
    return (
      <div>
        <div>{starsGiven}</div>
        {isLoading
          ? 'Loading... '
          : repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
      </div>
    )
  }
}
