import { gql, useQuery } from '@apollo/client';
import React from 'react';

import { GITHUB_ORGANIZATION } from '../constants';

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

type PullRequestNode = {
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

type Props = Readonly<{
  repoName: string;
}>;

const PullRequestList: React.FC<Props> = ({ repoName }) => {
  const query = createPullRequestQuery(GITHUB_ORGANIZATION, repoName);
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ul>
      {data.organization.repository.pullRequests.nodes.map(
        (pr: PullRequestNode) => (
          <li key={pr.databaseId}>{pr.title}</li>
        )
      )}
    </ul>
  );
};

export default PullRequestList;
