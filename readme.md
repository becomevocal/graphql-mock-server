# BigCommerce GraphQL Mock Server

A mock server that simulates the BigCommerce GraphQL API for local development and testing.

## Prerequisites

- Node.js 20 or higher (see .nvmrc)
- npm
- BigCommerce store credentials

## Setup

1. Clone the repository:

```bash
git clone https://github.com/becomevocal/bigcommerce-graphql-mock-server.git
cd bigcommerce-graphql-mock-server
```

2. Use the correct Node.js version:

```bash
nvm use
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file with your BigCommerce credentials:

```bash
cp .env.example .env.local
```

## Usage

1. First, introspect the BigCommerce GraphQL schema:

```bash
npm run introspect
```

This will create two files:
- `schema.json`: The raw introspection result
- `schema.graphql`: The schema in GraphQL SDL format

2. Start the development server:

```bash
npm run dev
```

The server will be available at http://localhost:3000/api/graphql with GraphiQL interface enabled.

## Deployment

To deploy to Vercel:

```bash
vercel deploy
```

The production server will be available at your Vercel deployment URL with the path `/api/graphql`.

## Development

To add new custom resolvers:

1. Create a new file in `src/resolvers/`
2. Define your resolver functions
3. Import and add them to the mock configuration in `src/mockServer.ts`

## Environment Variables

- `BIGCOMMERCE_STORE_HASH`: Your BigCommerce store hash
- `BIGCOMMERCE_STOREFRONT_TOKEN`: Your BigCommerce storefront token
- `BIGCOMMERCE_CHANNEL_ID`: Your BigCommerce channel ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.