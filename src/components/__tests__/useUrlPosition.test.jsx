import { describe, it, expect } from "vitest";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("useUrlPosition Hook", () => {
  it("should return lat and lng from the URL params", () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={["/?lat=40.7128&lng=-74.006"]}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useUrlPosition(), { wrapper });

    expect(result.current).toEqual(["40.7128", "-74.006"]);
  });

  it("should return null if lat and lng are not in the URL", () => {
    const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

    const { result } = renderHook(() => useUrlPosition(), { wrapper });

    expect(result.current).toEqual([null, null]);
  });
});
