import { gql, useQuery } from '@apollo/client';
import React from 'react';

import './App.css';
import RepositorySelect from './components/RepositorySelect';

type PullRequest = {
  databaseId: number;
  title: string;
  headRepository: {
    nameWithOwner: string;
  };
  headRefName: string;
  createdAt: string;
  updatedAt: string;
  labels: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
  reviewDecision: string;
};

const createRepositoryQuery = (owner: string) => gql`
  {
      organization(login: "${owner}") {
          repositories(first: 100, orderBy: { field: CREATED_AT, direction: DESC}) {
              nodes {
                  name
                  databaseId
                  pullRequests(states: OPEN) {
                    totalCount
                }
              }
          }
      }
  }
`;

const createPullRequestQuery = (owner: string, repo: string) => gql`
  {
      organization(login: "${owner}") {
          repository(name: "${repo}") {
              pullRequests(first: 100, states: OPEN) {
                  nodes {
                      databaseId
                      title
                      headRepository {
                          nameWithOwner
                      }
                      headRefName
                      createdAt
                      updatedAt
                      labels(first: 10) {
                          nodes {
                              name
                              color
                          }
                      }
                      reviewDecision
                  }
              }
          }
      }
  }
`;

const PullRequestList: React.FC = () => {
  const query = createRepositoryQuery('HackYourAssignment');
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onChange = (repositoryName: string) => {
    console.log(repositoryName);
  };

  return (
    <RepositorySelect
      nodes={data.organization.repositories.nodes}
      onChange={onChange}
    />
  );
};

const App: React.FC = () => {
  return (
    <>
      <PullRequestList />
    </>
  );
};

export default App;
