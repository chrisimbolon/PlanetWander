import { renderHook, act } from "@testing-library/react";
import { useGeolocation } from "../../hooks/useGeolocation";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("useGeolocation Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return default position when initialized", () => {
    const defaultPosition = { lat: 10, lng: 20 };
    const { result } = renderHook(() => useGeolocation(defaultPosition));

    expect(result.current.position).toEqual(defaultPosition);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should update position on successful geolocation retrieval", async () => {
    const mockCoords = { latitude: 40.7128, longitude: -74.006 };
    global.navigator.geolocation = {
      getCurrentPosition: vi.fn((success) =>
        success({ coords: mockCoords })
      ),
    };

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getPosition();
    });

    expect(result.current.position).toEqual({
      lat: mockCoords.latitude,
      lng: mockCoords.longitude,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set an error if geolocation is denied", async () => {
    global.navigator.geolocation = {
      getCurrentPosition: vi.fn((_, error) =>
        error({ message: "User denied Geolocation" })
      ),
    };

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getPosition();
    });

    expect(result.current.error).toBe("User denied Geolocation");
    expect(result.current.isLoading).toBe(false);
  });

  it("should set an error if geolocation is not supported", () => {
    global.navigator.geolocation = undefined;

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getPosition();
    });

    expect(result.current.error).toBe("Your browser does not support geolocation");
  });
});
