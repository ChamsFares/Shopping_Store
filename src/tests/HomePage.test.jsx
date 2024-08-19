import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../pages/HomePage";

vi.mock("../components/Carosel", () => () => (
  <div data-testid="image-carousel" />
));

describe("HomePage", () => {
  test("renders homepage with correct elements", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(
      screen.getByText("Best Prices and Latest Products! Shop now!")
    ).toBeInTheDocument();
    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
    const shopNowLink = screen.getByText("Shop Now");
    expect(shopNowLink).toBeInTheDocument();
    expect(shopNowLink.getAttribute("href")).toBe("/shop");
  });
});
