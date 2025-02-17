import { render, screen, act } from "@testing-library/react";
import { CitiesProvider, useCities } from "../../contexts/CitiesContext";
import { describe, it, expect, vi, test } from "vitest";
// import { createContext, useContext } from "react";

// Helper component for testing context
const TestComponent = () => {
    const { cities, isLoading, error } = useCities();
  
    return (
      <div>
        <p data-testid="cities-count">{cities.length}</p>
        <p data-testid="loading">{isLoading ? "Loading..." : "Not Loading"}</p>
        <p data-testid="error">{error}</p>
      </div>
    );
  };
  
  describe("CitiesContext", () => {
    test("should have the correct initial state", async () => {
      await act(async () => {
        render(
          <CitiesProvider>
            <TestComponent />
          </CitiesProvider>
        );
      });
  
      expect(screen.getByTestId("cities-count").textContent).toBe("0");
      expect(screen.getByTestId("loading").textContent).toBe("Not Loading");
      expect(screen.getByTestId("error").textContent).toBe("");
    });
  });