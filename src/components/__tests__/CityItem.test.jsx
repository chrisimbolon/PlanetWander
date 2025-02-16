import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import CityItem from "../CityItem";
import { CitiesContext } from "../../contexts/CitiesContext";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


const mockCity = {
  id: 1,
  cityName: "London",
  emoji: "🇬🇧",
  date: "2024-02-16",
  position: { lat: 51.5074, lng: -0.1278 },
};

describe("CityItem Component", () => {
  test("renders CityItem with correct data", () => {
    render(
      <CitiesContext.Provider value={{ currentCity: null, deleteCity: vi.fn() }}>
        <BrowserRouter>
          <CityItem city={mockCity} />
        </BrowserRouter>
      </CitiesContext.Provider>
    );

    // Check if city name appears
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    // Check if emoji appears
    expect(screen.getByText(/🇬🇧/i)).toBeInTheDocument();
    // Check if formatted date appears
    expect(screen.getByText(/\(February 16, 2024\)/i)).toBeInTheDocument();
  });
});
