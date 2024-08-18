import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../src/components/ProductsCard";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 9.99,
  image: "test-image.jpg",
};

test("renders product information", () => {
  render(<ProductCard product={mockProduct} addToCart={() => {}} />);
  expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("Price: $9.99")).toBeInTheDocument();
  expect(screen.getByAltText("Test Product")).toBeInTheDocument();
});

test("quantity input works correctly", () => {
  render(<ProductCard product={mockProduct} addToCart={() => {}} />);
  const input = screen.getByRole("spinbutton");
  fireEvent.change(input, { target: { value: "5" } });
  expect(input.value).toBe("5");
});

test("increment and decrement buttons work", () => {
  render(<ProductCard product={mockProduct} addToCart={() => {}} />);
  const input = screen.getByRole("spinbutton");
  const incrementButton = screen.getByText("+");
  const decrementButton = screen.getByText("-");

  fireEvent.click(incrementButton);
  expect(input.value).toBe("2");

  fireEvent.click(decrementButton);
  expect(input.value).toBe("1");

  fireEvent.click(decrementButton);
  expect(input.value).toBe("1");
});

test("calls addToCart with correct arguments", () => {
  const mockAddToCart = jest.fn();
  render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);
  const addToCartButton = screen.getByText("Add to Cart");

  fireEvent.click(addToCartButton);
  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
});
