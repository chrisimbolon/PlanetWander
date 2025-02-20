import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "../SideBar";
import { describe,  expect,test } from "vitest";
import "@testing-library/jest-dom";

describe("SideBar component", () => {
  test("renders SideBar correctly", () => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    );

    // Check if Logo and AppNav are rendered
    expect(screen.getByRole("img")).toBeInTheDocument(); // Assuming Logo contains an image
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    
    // Check for footer text
    const year = new Date().getFullYear();
    expect(screen.getByText(`© Copyright ${year} by Planet Wander`)).toBeInTheDocument();
  });
});
