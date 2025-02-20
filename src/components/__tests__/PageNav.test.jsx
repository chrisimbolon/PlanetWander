import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNav from "../PageNav";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";

describe("PageNav component", () => {
  test("renders navigation links correctly", () => {
    render(
      <MemoryRouter>
        <PageNav />
      </MemoryRouter>
    );

    // Check for navigation links
    expect(screen.getByRole("link", { name: /pricing/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /product/i })).toHaveAttribute("href", "/product");
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute("href", "/login");
  });

  test("toggles menu when button is clicked", () => {
    render(
      <MemoryRouter>
        <PageNav />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    const menu = screen.getByRole("navigation").querySelector("ul");

    // Initially, menu should not have the 'show' class
    expect(menu).not.toHaveClass("show");

    // Click the button to open the menu
    fireEvent.click(menuButton);
    expect(menu.classList.toString()).toContain("show");


    // Click again to close the menu
    fireEvent.click(menuButton);
    expect(menu).not.toHaveClass("show");
  });
});
