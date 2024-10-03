import React from 'react';

type Props = Readonly<{ name: string }>;

const RepositoryItem: React.FC<Props> = ({ name }) => {
  return <div>{name}</div>;
};

export default RepositoryItem;
