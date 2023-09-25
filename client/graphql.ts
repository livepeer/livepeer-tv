import config from "@/lib/config";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${config.CONTENTFUL_SPACE_ID}`;

const httpLink = createHttpLink({
  uri: API_URL,
  headers: {
    Authorization: `Bearer ${config.CONTENTFUL_KEY}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
