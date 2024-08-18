import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navigation from "../src/components/Navigation";
import { describe, it, expect } from "vitest";

const renderWithRouter = (ui, { cartItems = [] } = {}) => {
  return render(
    <CartContext.Provider value={{ cartItems }}>
      <Router>{ui}</Router>
    </CartContext.Provider>
  );
};

test("renders navigation links", () => {
  renderWithRouter(<Navigation />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart/i)).toBeInTheDocument();
});

test("displays correct number of items in cart", () => {
  const cartItems = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
  ];
  renderWithRouter(<Navigation />, { cartItems });
  expect(screen.getByText(/Cart \(5\)/i)).toBeInTheDocument();
});
