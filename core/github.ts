const QUANTITY = 5;
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export interface Repo {
  id: string;
  name: string;
  url: string;
  description: string;
  owner: {
    login: string;
  };
}

// We could use GraphQL Codegen here, but not worth the effort right now
interface RepoResponseData {
  user: {
    repositoriesContributedTo: {
      nodes: Repo[];
    };
    starredRepositories: {
      nodes: Repo[];
    };
  };
}

export const fetchRepos = async (username: string, githubToken: string) => {
  const query = `
query {
  user (login: "${username}") {
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
}`;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${githubToken}`,
    },
    body: JSON.stringify({ query }),
  });
  const { data }: { data: RepoResponseData } = await res.json();

  return {
    starredRepos: data.user.starredRepositories.nodes.reverse(),
    contributedRepos: data.user.repositoriesContributedTo.nodes.reverse(),
  };
};
