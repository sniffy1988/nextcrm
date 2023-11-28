import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterRow from "../FilterRow";

describe("FilterRow", () => {
  it("should update filters on input change", () => {
    const mockOnFilterChange = jest.fn();
    const { getByLabelText } = render(
      <FilterRow onFilterChange={mockOnFilterChange} />
    );

    const genderInput = getByLabelText("Gender");
    const countryInput = getByLabelText("Country");
    const emailInput = getByLabelText("Email");

    fireEvent.change(genderInput, { target: { value: "Male" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(genderInput.value).toBe("Male");
    expect(countryInput.value).toBe("USA");
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should call onFilterChange with correct filters on button click", () => {
    const mockOnFilterChange = jest.fn();
    const { getByText, getByLabelText } = render(
      <FilterRow onFilterChange={mockOnFilterChange} />
    );

    const genderInput = getByLabelText("Gender");
    const countryInput = getByLabelText("Country");
    const emailInput = getByLabelText("Email");

    fireEvent.change(genderInput, { target: { value: "Male" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const filterButton = getByText("Filter");
    fireEvent.click(filterButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      gender: "Male",
      country: "USA",
      email: "test@example.com",
    });
  });
});
