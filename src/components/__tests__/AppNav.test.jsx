import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppNav from "../AppNav";
import "@testing-library/jest-dom";
import { describe,  expect,test } from "vitest";

describe("AppNav component", () => {
  test("renders navigation links correctly", () => {
    render(
      <MemoryRouter>
        <AppNav />
      </MemoryRouter>
    );

    // Check for navigation links
    const citiesLink = screen.getByRole("link", { name: /cities/i });
    const countriesLink = screen.getByRole("link", { name: /countries/i });

    expect(citiesLink).toBeInTheDocument();
    expect(citiesLink).toHaveAttribute("href", "/cities");
    expect(countriesLink).toBeInTheDocument();
    expect(countriesLink).toHaveAttribute("href", "/countries");
  });
});
