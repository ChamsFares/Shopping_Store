import { render, screen, waitFor } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import Shop from "../src/pages/Shop";
import { describe, it, expect } from "vitest";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ id: 1, title: "Test Product", price: 9.99 }]),
  })
);

const renderWithContext = (
  ui,
  { cartItems = [], addToCart = () => {} } = {}
) => {
  return render(
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {ui}
    </CartContext.Provider>
  );
};

test("renders products after fetching", async () => {
  renderWithContext(<Shop />);

  expect(screen.getByText("Our Products")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});

test("calls fetch with correct URL", () => {
  renderWithContext(<Shop />);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://fakestoreapi.com/products"
  );
});
