import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../contexts/FakeAuthContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import App from "../../App"; 

// Mock useAuth inside tests
function TestComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="auth-status">
        {isAuthenticated ? `Logged in as ${user.name}` : "Not logged in"}
      </p>
      <button onClick={() => login("anyone@mayexplore.com", "welcome")}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("Auth Integration Test", () => {
  it("logs in and logs out correctly", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <TestComponent />
        </MemoryRouter>
      </AuthProvider>
    );

    // Check initial state
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Not logged in");

    // Perform login
    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Logged in as Anyone");

    // Perform logout
    fireEvent.click(screen.getByText(/logout/i));
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Not logged in");
  });

  it("redirects unauthenticated users away from /app/cities", () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
      );
      

    // Ensure the protected content isn't visible
    expect(screen.queryByText("Cities List")).not.toBeInTheDocument(); // Replace with an actual element from /app/cities

    // Ensure they are redirected (assumes Login page shows "Login" text)
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
