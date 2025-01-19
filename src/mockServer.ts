import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { join } from 'path';

// Custom scalar mocks
const mocks = {
  DateTime: () => new Date().toISOString(),
  Money: () => ({ currencyCode: 'USD', value: Math.random() * 1000 }),
  // We'll add more custom mocks as we discover them in the schema
};

async function startServer() {
  // Load and parse the schema from SDL
  const typeDefs = readFileSync(join(__dirname, '../schema.graphql'), 'utf-8');
  
  const schema = makeExecutableSchema({
    typeDefs,
  });

  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers: true,
  });

  const yoga = createYoga({
    schema: mockedSchema,
    graphiql: true,
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.log('🚀 Mock server running at http://localhost:4000/graphql');
  });
}

startServer().catch(console.error); 