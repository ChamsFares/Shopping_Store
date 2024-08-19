import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ShopPage from "../pages/ShopPage";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, title: "Test Product" }]),
    status: 200,
  })
);

describe("ShopPage", () => {
  test("renders loading state initially", () => {
    render(
      <Router>
        <ShopPage />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders products after loading", async () => {
    render(
      <Router>
        <ShopPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Store")).toBeInTheDocument();
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });

  test("renders error message on network error", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    render(
      <Router>
        <ShopPage />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("A network error was encountered")
      ).toBeInTheDocument();
    });
  });
});
