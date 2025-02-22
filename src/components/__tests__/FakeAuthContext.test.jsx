
import { describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../../contexts/FakeAuthContext";
import { renderHook, act } from "@testing-library/react";

import "@testing-library/jest-dom";


// Test default state
describe("FakeAuthContext", () => {
  it("should have a default state with user as null and isAuthenticated as false", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should update state on login", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login("anyone@mayexplore.com", "welcome");
    });

    expect(result.current.user).toEqual({
      name: "Anyone",
      email: "anyone@mayexplore.com",
      password: "welcome",
      avatar: "/Chris.webp",
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should reset state on logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login("anyone@mayexplore.com", "welcome");
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should throw an error when useAuth is used outside AuthProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useAuth();
      } catch (error) {
        return error;
      }
    });

    expect(result.current.message).toBe(
      "AuthContext was used outside AuthProvider"
    );
  });
});
