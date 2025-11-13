import { rest } from 'msw';
// import { http, HttpResponse } from 'msw'

export const handlers = [
  rest.get('https://fakestoreapi.com/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        title: 'Test Product',
        price: 499,
        category: 'Test Category',
        description: 'This is a mock product for testing',
        image: 'https://via.placeholder.com/150',
      })
    );
  }),
];
