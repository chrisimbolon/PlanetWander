import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CountryList from "../CountryList";
import { CitiesContext } from "../../contexts/CitiesContext";
import "@testing-library/jest-dom";

describe("CountryList Component", () => {
  test("shows a loading spinner when loading", () => {
    render(
      <CitiesContext.Provider value={{ cities: [], isLoading: true }}>
        <CountryList />
      </CitiesContext.Provider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("displays message when no cities exist", () => {
    render(
      <CitiesContext.Provider value={{ cities: [], isLoading: false }}>
        <CountryList />
      </CitiesContext.Provider>
    );

    expect(screen.getByText((content) => content.includes("Add first city by clicking"))).toBeInTheDocument();

  });

  test("renders a list of unique countries", () => {
    const mockCities = [
      { id: 1, name: "London", country: "UK", emoji: "🇬🇧" },
      { id: 2, name: "Manchester", country: "UK", emoji: "🇬🇧" },
      { id: 3, name: "Tokyo", country: "Japan", emoji: "🇯🇵" },
    ];

    render(
      <CitiesContext.Provider value={{ cities: mockCities, isLoading: false }}>
        <CountryList />
      </CitiesContext.Provider>
    );

    expect(screen.getByText(/🇬🇧/i)).toBeInTheDocument();
    expect(screen.getByText(/🇯🇵/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
