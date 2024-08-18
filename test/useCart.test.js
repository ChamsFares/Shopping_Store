import { renderHook } from "@testing-library/react-hooks";
import { CartProvider } from "../context/CartContext";
import { describe, it, expect } from "vitest";
import useCart from "../src/Hooks/useCart";
useCart;

describe("useCart", () => {
  it("should provide cart context", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current).toHaveProperty("cartItems");
    expect(result.current).toHaveProperty("addToCart");
  });

  it("should throw error when used outside CartProvider", () => {
    const { result } = renderHook(() => useCart());

    expect(result.error).toEqual(
      Error("useCart must be used within a CartProvider")
    );
  });
});
