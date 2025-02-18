/* global global */

import { render, screen, act } from "@testing-library/react";
import { CitiesProvider, useCities } from "../../contexts/CitiesContext";
import { describe, expect, vi, test } from "vitest";
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
  
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // Mock empty response
    })
  );
  

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
      
      // Wait for the loading state to be false
      await screen.findByText("Not Loading");
    
      expect(screen.getByTestId("error").textContent).toBe("");
    });
    
  });