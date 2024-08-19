import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import Navbar from "../components/Navbar";

const mockToggle = vi.fn();

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <Router>
        <CartContext.Provider value={{ totalItems: 0 }}>
          <Navbar toggle={mockToggle} />
        </CartContext.Provider>
      </Router>
    );

    expect(screen.getByText("Home")).toHaveAttribute("href", "/Home");
    expect(screen.getByText("Shop")).toHaveAttribute("href", "/");
  });
  test("displays correct number of items in cart", () => {
    render(
      <Router>
        <CartContext.Provider value={{ totalItems: 3 }}>
          <Navbar toggle={mockToggle} />
        </CartContext.Provider>
      </Router>
    );

    expect(screen.getByText("Cart (3)")).toBeInTheDocument();
  });

  test("calls toggle function when cart button is clicked", () => {
    render(
      <Router>
        <CartContext.Provider value={{ totalItems: 0 }}>
          <Navbar toggle={mockToggle} />
        </CartContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText("Cart (0)"));
    expect(mockToggle).toHaveBeenCalled();
  });
});
