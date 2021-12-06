import {ApolloClient, InMemoryCache} from '@apollo/client';

export const baseURL = 'https://graphql.org/swapi-graphql/';
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: baseURL,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});


export default client;
