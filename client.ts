import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL, // Zamenite sa vašim GraphQL endpointom
  cache: new InMemoryCache(),
});

export default client;
