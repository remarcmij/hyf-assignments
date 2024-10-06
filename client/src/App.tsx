import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import './App.css';
import RepositorySelect from './components/RepositorySelect';

import PullRequestList from './components/PullRequestList';
import { GITHUB_ORGANIZATION } from './constants';

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

const App: React.FC = () => {
  const [repoName, setRepoName] = useState('');

  const query = createRepositoryQuery(GITHUB_ORGANIZATION);
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <RepositorySelect
        value={repoName}
        nodes={data.organization.repositories.nodes}
        onRepoChange={setRepoName}
      />
      {repoName && <PullRequestList repoName={repoName} />}
    </>
  );
};

export default App;
