import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailsWrapper from './ProductDetail';
import { server } from '../Mocks/server';
import { rest } from 'msw';


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('renders product details from mocked API', async () => {
  render(
    <MemoryRouter initialEntries={['/products/1']}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsWrapper />} />
      </Routes>
    </MemoryRouter>
  );

  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  
  const title = await screen.findByText(/test product/i);
  expect(title).toBeInTheDocument();

  const price = await screen.findByText(/499/i);
  expect(price).toBeInTheDocument();


  const category = await screen.findByText(/test category/i);
  expect(category).toBeInTheDocument();

  const desc = await screen.findByText(/mock product for testing/i);
  expect(desc).toBeInTheDocument();
});

test("error handling api call", async() => {
server.use(
  rest.get("https://fakestoreapi.com/products/:id",(req,res,ctx) => {
    return res(ctx.status(500))
  })
)
 render(
    <MemoryRouter initialEntries={['/products/1']}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetailsWrapper />} />
      </Routes>
    </MemoryRouter>
  )
const error=await screen.findByText(/Error fetching product details/i)
expect(error).toBeInTheDocument()
})