import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../pages/ProtectedRoute"; // Adjust path as needed
// import { AuthProvider, useAuth } from "../../contexts/FakeAuthContext"; // ✅ Import this
import { expect, describe, it, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../../contexts/FakeAuthContext", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useAuth: vi.fn(),
    };
  });
  
  // ✅ Test components
  function ProtectedPage() {
    return <h1 data-testid="protected-text">Protected Page</h1>;
  }
  
  function PublicPage() {
    return <h1 data-testid="public-text">Public Page</h1>;
  }
  
  describe("ProtectedRoute", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("renders the protected component when authenticated", async () => {
      const { useAuth } = await import("../../contexts/FakeAuthContext");
      useAuth.mockReturnValue({ isAuthenticated: true });
  
      render(
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <ProtectedPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );
  
      // ✅ Ensure ProtectedPage is rendered
      await waitFor(() => {
        expect(screen.getByTestId("protected-text")).toBeInTheDocument();
      });
    });
  
    it("redirects to login when not authenticated", async () => {
      const { useAuth } = await import("../../contexts/FakeAuthContext");
      useAuth.mockReturnValue({ isAuthenticated: false });
  
      render(
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <ProtectedPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<PublicPage />} />
          </Routes>
        </MemoryRouter>
      );
  
      // ✅ Ensure redirection happens
      await waitFor(() => {
        expect(screen.getByTestId("public-text")).toBeInTheDocument();
      });
    });
  });