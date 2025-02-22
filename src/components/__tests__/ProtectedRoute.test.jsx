import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../pages/ProtectedRoute"; // Adjust path as needed
import { AuthProvider } from "../../contexts/FakeAuthContext"; // ✅ Import this
import User from "../User"; // Replace with the correct component shown after login

test("redirects to login if not authenticated", () => {
  render(
    <AuthProvider> {/* ✅ Use this instead of FakeAuthContext.Provider */}
      <MemoryRouter initialEntries={["/app"]}>
        <Routes>
          <Route path="/app" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/login" element={<p>Login Page</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});

test("allows access if authenticated", () => {
  render(
    <AuthProvider> {/* ✅ Wrap everything in AuthProvider */}
      <MemoryRouter initialEntries={["/app"]}>
        <Routes>
          <Route path="/app" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/login" element={<p>Login Page</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  // Simulate login
  const auth = screen.getByText(/login/i);
  auth.click(); // Simulate login button if you have one

  expect(screen.getByText(/User Page/i)).toBeInTheDocument(); // Adjust based on your UI
});
