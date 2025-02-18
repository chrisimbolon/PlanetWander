import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Map from "../Map";
import { CitiesProvider } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import useUrlPosition from "../../hooks/useUrlPosition";
import { describe, expect, vi, test, beforeEach } from "vitest";
import "@testing-library/jest-dom";




// Mock hooks
vi.mock("../../hooks/useGeolocation", () => ({
  useGeolocation: vi.fn(),
}));

vi.mock("../../hooks/useUrlPosition", () => ({
    default: vi.fn(),
  }));
  
// Mock Leaflet components
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer"></div>,
  Marker: ({ position, children }) => (
    <div data-testid="marker">
      {`Marker at ${position}`}
      {children}
    </div>
  ),
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMap: vi.fn().mockReturnValue({ setView: vi.fn() }),
  useMapEvents: vi.fn(),
}));

describe("Map Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the map correctly", () => {
    useGeolocation.mockReturnValue({
      isLoading: false,
      position: null,
      getPosition: vi.fn(),
    });

    useUrlPosition.mockReturnValue([null, null]);

    render(
      <BrowserRouter>
        <CitiesProvider>
          <Map />
        </CitiesProvider>
      </BrowserRouter>
    );

    // Check if map elements render
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
  });

  test("renders cities as markers", () => {
    useGeolocation.mockReturnValue({
      isLoading: false,
      position: null,
      getPosition: vi.fn(),
    });

    useUrlPosition.mockReturnValue([null, null]);

    const mockCities = [
      { id: 1, cityName: "Paris", emoji: "🇫🇷", position: { lat: 48.8566, lng: 2.3522 } },
      { id: 2, cityName: "New York", emoji: "🇺🇸", position: { lat: 40.7128, lng: -74.006 } },
    ];

    render(
      <BrowserRouter>
        <CitiesProvider value={{ cities: mockCities }}>
          <Map />
        </CitiesProvider>
      </BrowserRouter>
    );

    // Check if markers exist
    expect(screen.getAllByTestId("marker")).toHaveLength(2);
    expect(screen.getByText("Marker at 48.8566,2.3522")).toBeInTheDocument();
    expect(screen.getByText("Marker at 40.7128,-74.006")).toBeInTheDocument();
  });

  test("renders geolocation button if no position is set", () => {
    useGeolocation.mockReturnValue({
      isLoading: false,
      position: null,
      getPosition: vi.fn(),
    });

    useUrlPosition.mockReturnValue([null, null]);

    render(
      <BrowserRouter>
        <CitiesProvider>
          <Map />
        </CitiesProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: "use your position" })).toBeInTheDocument();
  });

  test("handles loading state for geolocation button", () => {
    useGeolocation.mockReturnValue({
      isLoading: true,
      position: null,
      getPosition: vi.fn(),
    });

    useUrlPosition.mockReturnValue([null, null]);

    render(
      <BrowserRouter>
        <CitiesProvider>
          <Map />
        </CitiesProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: "loading" })).toBeInTheDocument();
  });
});
