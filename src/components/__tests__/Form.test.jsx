import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CitiesContext } from "../../contexts/CitiesContext";
import Form from "../Form";

// Mocking the useUrlPosition hook
vi.mock("../../hooks/useUrlPosition", () => ({
    default: () => [12.34, 56.78],
  }));
  
  const mockCreateCity = vi.fn();
  
  // Mock the API request
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            latitude: 12.34,
            longitude: 56.78,
            city: "Test City",
            countryName: "Testland",
          }),
      })
    ));
  });
  
  function renderWithProviders(ui) {
    return render(
      <CitiesContext.Provider value={{ createCity: mockCreateCity, isLoading: false }}>
        <MemoryRouter>{ui}</MemoryRouter>
      </CitiesContext.Provider>
    );
  }
  
  describe("Form Component", () => {
    it("renders the form correctly", async () => {
      renderWithProviders(<Form />);
  
      await waitFor(() => expect(screen.getByLabelText(/City name/i)).toBeInTheDocument());
      expect(screen.getByLabelText(/When did you go to/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Notes about your trip to/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
    });
  
    it("submits the form when valid data is provided", async () => {
      renderWithProviders(<Form />);
      
      await waitFor(() => expect(screen.getByLabelText(/City name/i)).toBeInTheDocument());
  
      fireEvent.change(screen.getByLabelText(/City name/i), { target: { value: "Test City" } });    
      fireEvent.change(screen.getByLabelText(/Notes about your trip to/i), { target: { value: "Nice place!" } });
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  
      expect(mockCreateCity).toHaveBeenCalled();
    });
  });