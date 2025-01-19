export const productResolvers = {
  Product: {
    id: () => `product_${Math.random().toString(36).substr(2, 9)}`,
    name: () => `Mock Product ${Math.floor(Math.random() * 1000)}`,
    description: () => 'A detailed product description would go here...',
    prices: () => ({
      price: {
        currencyCode: 'USD',
        value: Math.floor(Math.random() * 10000) / 100,
      },
      salePrice: null,
      retailPrice: null,
    }),
    defaultImage: () => ({
      url: `https://picsum.photos/seed/${Math.random()}/300/300`,
      altText: 'Product Image',
    }),
  },
}; 