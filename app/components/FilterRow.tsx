import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

interface FilterRowProps {
  onFilterChange: (filters: {
    gender: string;
    country: string;
    email: string;
  }) => void;
}

const FilterRow: React.FC<FilterRowProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    gender: "",
    country: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleFilter = () => {
    onFilterChange(filters);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
      <Grid item xs={4}>
        <TextField
          label="Gender"
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Country"
          name="country"
          value={filters.country}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Email"
          name="email"
          value={filters.email}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterRow;
