import { RequestHandler } from 'express';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

export const forwardGraphQLRequest: RequestHandler = async (req, res) => {
  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify(req.body),
  });

  res.status(response.status).send(await response.text());
};
