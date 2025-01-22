import { createClient } from '@bigcommerce/catalyst-client';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import { parseGraphQLSDL } from '@graphql-tools/utils';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

interface IntrospectionResponse {
  __schema: any; // We'll get the full schema type from the response
}

async function introspectSchema() {
  const client = createClient({
    storeHash: process.env.BIGCOMMERCE_STORE_HASH!,
    storefrontToken: process.env.BIGCOMMERCE_STOREFRONT_TOKEN!,
    channelId: process.env.BIGCOMMERCE_CHANNEL_ID!,
    xAuthToken: 'not-needed-for-graphql', // Placeholder since it's required by the client
  });

  try {
    const { document } = parseGraphQLSDL('introspection.graphql', getIntrospectionQuery());

    // Cast the document to a TypedDocumentNode
    const typedDocument = document as TypedDocumentNode<IntrospectionResponse>;

    const result = await client.fetch<IntrospectionResponse>({
      document: typedDocument,
    });

    await fs.writeFile(
      path.join(process.cwd(), 'schema.json'),
      JSON.stringify(result.data, null, 2)
    );

    // Also generate SDL version of the schema
    const schema = buildClientSchema(result.data);
    await fs.writeFile(
      path.join(process.cwd(), 'schema.graphql'),
      printSchema(schema)
    );

    console.log('✅ Schema introspection complete');
  } catch (error) {
    console.error('❌ Schema introspection failed:', error);
    process.exit(1);
  }
}

introspectSchema(); 