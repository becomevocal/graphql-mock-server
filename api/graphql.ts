import { createYoga } from 'graphql-yoga';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { join } from 'path';
import { productResolvers } from '../src/resolvers/products';

// Custom scalar mocks
const mocks = {
  DateTime: () => new Date().toISOString(),
  Money: () => ({ currencyCode: 'USD', value: Math.random() * 1000 }),
  ...productResolvers,
};

// Load schema at build time
const typeDefs = readFileSync(join(process.cwd(), 'schema.graphql'), 'utf-8');
const schema = makeExecutableSchema({ typeDefs });
const mockedSchema = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});

const yoga = createYoga({
  schema: mockedSchema,
  graphiql: true,
  // Vercel specific settings
  graphqlEndpoint: '/api/graphql',
});

// Export for Vercel
export const config = {
  api: {
    // Disable body parsing (required for GraphQL)
    bodyParser: false,
  },
};

export default yoga; 