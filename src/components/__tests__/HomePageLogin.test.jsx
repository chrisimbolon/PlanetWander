import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/FakeAuthContext";
import { CitiesProvider } from "../../contexts/CitiesContext"; // Ensure this is correctly imported
import Homepage from "../../pages/Homepage";
import Login from "../../pages/Login";
import AppLayout from "../../pages/AppLayout";
import { expect, it } from "vitest";
import "@testing-library/jest-dom";

// Integration test for login flow
it("allows a user to navigate from homepage to login and log in successfully", async () => {
  render(
    <AuthProvider>
      <CitiesProvider> {/* Wrap in CitiesProvider */}
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />} />
          </Routes>
        </MemoryRouter>
      </CitiesProvider>
    </AuthProvider>
  );

  // Step 1: Verify homepage is rendered
  expect(
    screen.getByText((content) => content.includes("You explore the world"))
  ).toBeInTheDocument();

  // Step 2: Click the login button
  fireEvent.click(screen.getByText("Start Tracking Now"));

  // Step 3: Ensure navigation to login page
  await waitFor(() => {
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  });

  // Step 4: Fill in login form
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "anyone@mayexplore.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "welcome" },
  });
  fireEvent.click(screen.getByText("Login"));

  // Step 5: Verify redirect to protected page (AppLayout)
  
  await waitFor(() => {
    expect(screen.getByText("Cities")).toBeInTheDocument(); // Ensure this text exists in AppLayout
});

});
