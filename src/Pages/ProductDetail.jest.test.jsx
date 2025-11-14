import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetailsWrapper from './ProductDetail';
import axios from 'axios';

jest.mock('axios');  

describe("ProductDetails - Jest axios mock", () => {

  test("renders product details using mocked axios", async () => {

    axios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Jest Test Product",
        price: 200,
        category: "Jest Category",
        description: "Mocked using Jest axios",
        image: "mock.jpg",
      }
    });

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/jest test product/i)).toBeInTheDocument();
    expect(await screen.findByText(/200/i)).toBeInTheDocument();
    expect(await screen.findByText(/jest category/i)).toBeInTheDocument();
    expect(await screen.findByText(/mocked using jest axios/i)).toBeInTheDocument();
  });


  test("handles API error using axios mock", async () => {

    axios.get.mockRejectedValueOnce(new Error("API failed"));

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    const errorText = await screen.findByText(/error fetching product details/i);
    expect(errorText).toBeInTheDocument();
  });

});
