import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
// const token = '';

console.log(GITHUB_TOKEN);

const httpLink = createHttpLink({
  uri: 'https://flyby-router-demo.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = GITHUB_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
