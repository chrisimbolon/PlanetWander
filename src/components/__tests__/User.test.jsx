import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, beforeEach, vi, test, expect } from "vitest";
import { useAuth } from "../../contexts/FakeAuthContext";
import User from "../User";
import "@testing-library/jest-dom";

// Mock the useAuth module
vi.mock("../../contexts/FakeAuthContext", () => ({
  useAuth: vi.fn(), // Mock useAuth as a function
}));

const mockLogout = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("User component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock return value of useAuth properly
    useAuth.mockReturnValue({
      user: { name: "John Doe", avatar: "avatar.jpg" },
      logout: mockLogout,
    });
  });

  test("renders user info correctly", () => {
    render(
      <MemoryRouter>
        <User />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "John Doe" })).toHaveAttribute("src", "avatar.jpg");
  });

  test("calls logout and navigates home when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <User />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});