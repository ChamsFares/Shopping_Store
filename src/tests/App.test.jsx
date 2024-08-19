import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

vi.mock("./components/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));
vi.mock("./pages/HomePage", () => ({ default: () => <div>HomePage</div> }));
vi.mock("./pages/ShopPage", () => ({ default: () => <div>ShopPage</div> }));
vi.mock("./pages/ProductDetails", () => ({
  default: () => <div>ProductDetails</div>,
}));

describe("App", () => {
  it("renders Navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("navbar")).toBeDefined();
  });

  it("renders HomePage on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomePage")).toBeDefined();
  });

  test("renders ShopPage on /shop route", () => {
    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ShopPage")).toBeInTheDocument();
  });

  test("renders ProductDetails on /product/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ProductDetails")).toBeInTheDocument();
  });
});
