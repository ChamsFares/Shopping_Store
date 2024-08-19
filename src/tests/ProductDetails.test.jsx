import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import ProductDetails from "../components/ProductDetails";

const mockAddToCart = vi.fn();

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 9.99,
  description: "This is a test product",
  image: "test-image.jpg",
  rating: { rate: 4.5 },
};

describe("ProductDetails", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </CartContext.Provider>
      </MemoryRouter>
    );
  });

  test("renders product details", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Price: $9.99")).toBeInTheDocument();
    expect(screen.getByText("Rating:4.5/5")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
  });

  test("handles quantity changes", () => {
    const decreaseButton = screen.getByText("-");
    const increaseButton = screen.getByText("+");
    const quantityDisplay = screen.getByText("Quantity:1");

    fireEvent.click(increaseButton);
    expect(quantityDisplay).toHaveTextContent("Quantity:2");

    fireEvent.click(decreaseButton);
    expect(quantityDisplay).toHaveTextContent("Quantity:1");

    fireEvent.click(decreaseButton);
    expect(quantityDisplay).toHaveTextContent("Quantity:1");
  });

  test("adds product to cart", () => {
    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});
