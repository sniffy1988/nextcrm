import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NextRouter } from "next/router";

import DataGrid from "../Grid";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../../context/CustomerContext", () => ({
  useCustomerContext: jest.fn(() => ({
    selectedCustomer: null,
    setSelectedCustomer: jest.fn(),
  })),
  CustomerProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("DataGrid", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <DataGrid />
        </MemoryRouter>
      );
    });

    expect(screen.queryByText(/loading/i)).toBeNull();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
    });
  });

  it("renders error state", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("Fetch error"));

    render(
      <MemoryRouter>
        <DataGrid />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText(/Error loading data/i)).toBeInTheDocument();
    });
  });

  it("renders customer data in grid view", async () => {
    const mockData = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        gender: "Male",
        country: "USA",
        city: "New York",
      },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    // Mock the context value with default values
    jest
      .spyOn(require("../../context/CustomerContext"), "useCustomerContext")
      .mockReturnValue({
        selectedCustomer: null,
        setSelectedCustomer: jest.fn(),
      });

    render(
      <MemoryRouter>
        <DataGrid />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).toBeInTheDocument();
    });
  });
});
