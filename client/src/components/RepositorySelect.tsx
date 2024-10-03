import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

import { Badge } from '@mui/material';
import gitPullRequestSvg from '../assets/git-pull-request-svgrepo-com.svg';

type RepositoryNode = {
  name: string;
  databaseId: number;
  pullRequests: {
    totalCount: number;
  };
};

type Props = Readonly<{
  nodes: RepositoryNode[];
  onChange(repositoryName: string): void;
}>;

const RepositorySelect: React.FC<Props> = ({ nodes, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  nodes = nodes.filter((node) => /-cohort\d+/i.test(node.name));
  return (
    <Select value="" onChange={handleChange}>
      {nodes.map((node) => (
        <MenuItem key={node.databaseId} value={node.name}>
          {node.name}
          <Badge badgeContent={node.pullRequests.totalCount} color="primary">
            <img src={gitPullRequestSvg} alt="pull request" />
          </Badge>
        </MenuItem>
      ))}
    </Select>
  );
};

export default RepositorySelect;
