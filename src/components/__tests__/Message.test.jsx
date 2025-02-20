import { render, screen } from "@testing-library/react";
import Message from "../Message";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";

describe("Message component", () => {
  test("renders the message correctly", () => {
    render(<Message message="Hello, World!" />);
    
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
  });

  test("includes the waving hand emoji", () => {
    render(<Message message="Hey there!" />);
    
    expect(screen.getByText("👋")).toBeInTheDocument();
  });

  test("applies the correct CSS class", () => {
    const { container } = render(<Message message="Styled message!" />);
    
    expect(container.firstChild.className).toMatch(/message/);
  });
});
