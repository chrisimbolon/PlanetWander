import { render, screen } from "@testing-library/react";
import CityList from "../CityList";
import * as CitiesContext from "../../contexts/CitiesContext"; // Import the module
import { describe, it, expect, vi, test } from "vitest";
import "@testing-library/jest-dom";



vi.mock("../../contexts/CitiesContext");

describe("CityList Component", () => {
  it("renders loading spinner when loading", () => {
    vi.spyOn(CitiesContext, "useCities").mockReturnValue({ isLoading: true, cities: [] });
    render(<CityList />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders message when there are no cities", () => {
    vi.spyOn(CitiesContext, "useCities").mockReturnValue({ isLoading: false, cities: [] });
    render(<CityList />);
    expect(screen.getByText(/Add first city by clicking/i)).toBeInTheDocument();
  });

  test('formats location data correctly', () => {
    const rawLocationData = {
      city: "Castello de la Plana",
      continent: "Europe",
      continentCode: "EU",
      countryCode: "ES",
      countryName: "Spain",
      latitude: 40.00434434252358,
      locality: "Castello de la Plana",
      localityInfo: {
        administrative: [], // We won't test this deeply unless needed
        informative: []
      },
      localityLanguageRequested: "en",
      longitude: -0.013367315669265968,
      lookupSource: "coordinates",
      plusCode: "8CGX2X3P+PM",
      postcode: "",
      principalSubdivision: "Comunitat Valenciana",
      principalSubdivisionCode: "ES-VC",
    };
  
    const expectedFormattedLocation = {
      city: "Castello de la Plana",
      country: "Spain",
      region: "Comunitat Valenciana",
      coordinates: {
        latitude: 40.00434434252358,
        longitude: -0.013367315669265968
      }
    };
  
    // const formattedLocation = formatLocationData(rawLocationData);
  
    // expect(formattedLocation).toMatchObject(expectedFormattedLocation);
  });
  
});