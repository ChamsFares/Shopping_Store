import { renderHook } from "@testing-library/react-hooks";
import useProducts from "../src/Hooks/useProducts";
import { describe, it, expect } from "vitest";

global.fetch = jest.fn();

describe("useProducts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch products successfully", async () => {
    const mockProducts = [{ id: 1, name: "Test Product" }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result, waitForNextUpdate } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("API error"));

    const { result, waitForNextUpdate } = renderHook(() => useProducts());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("API error");
  });
});
