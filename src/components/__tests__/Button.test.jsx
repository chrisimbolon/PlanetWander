import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";

describe("Button component", () => {
  test("renders correctly with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct class based on type prop", () => {
    render(<Button type="primary">Primary Button</Button>);
    const button = screen.getByRole("button", { name: /primary button/i });

    expect(button.className).toEqual(expect.stringContaining("btn")); // Checks if class contains "btn"
  expect(button.className).toEqual(expect.stringContaining("primary")); // Checks if class contains "primary"
  });
});
