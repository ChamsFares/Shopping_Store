import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";
import Cart from "../pages/Cart";

const mockCartContext = {
  cartItems: [{ id: 1, title: "Test Product", price: 10, qty: 1 }],
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  totalprice: vi.fn(() => 10),
};

describe("Cart", () => {
  test("renders cart with items", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <Cart close={vi.fn()} />
      </CartContext.Provider>
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Cost: $10")).toBeInTheDocument();
    expect(screen.getByText("Total: $10")).toBeInTheDocument();
  });

  test("calls removeFromCart when delete button is clicked", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <Cart close={vi.fn()} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith(1);
  });

  test("calls updateQuantity when quantity buttons are clicked", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <Cart close={vi.fn()} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith(1, 2);

    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith(1, 0);
  });

  test("calls clearCart when checkout button is clicked", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <Cart close={vi.fn()} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    expect(mockCartContext.clearCart).toHaveBeenCalled();
  });
});
