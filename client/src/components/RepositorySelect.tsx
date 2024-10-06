import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

type RepositoryNode = {
  name: string;
  databaseId: number;
  pullRequests: {
    totalCount: number;
  };
};

type Props = Readonly<{
  value: string;
  nodes: RepositoryNode[];
  onRepoChange(repositoryName: string): void;
}>;

const RepositorySelect: React.FC<Props> = ({ value, nodes, onRepoChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onRepoChange(event.target.value);
  };

  nodes = nodes.filter((node) => /-cohort\d+/i.test(node.name));
  return (
    <Select value={value} onChange={handleChange}>
      {nodes.map((node) => (
        <MenuItem key={node.databaseId} value={node.name}>
          {`${node.name} (${node.pullRequests.totalCount})`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RepositorySelect;
