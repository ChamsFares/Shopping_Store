import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard", () => {
  const mockItem = {
    id: 1,
    title: "Test Product",
    price: 9.99,
    image: "test-image.jpg",
  };

  it("renders product information correctly", () => {
    render(<ProductCard item={mockItem} />);

    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("$9.99")).toBeDefined();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
  });

  test("truncates long titles", () => {
    const longTitleItem = {
      ...mockItem,
      title: "This is a very long product title that should be truncated",
    };
    render(<ProductCard item={longTitleItem} />);

    const displayedTitle = screen.getByText(
      /This is a very long product title/
    );
    expect(displayedTitle.textContent.split(" ").length).toBeLessThanOrEqual(
      12
    );
  });
});
