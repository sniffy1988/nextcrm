import React from "react";
import {
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface RowSwitcherProps {
  isGrid: boolean;
  onToggle: (newIsGrid: boolean) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

const RowSwitcher: React.FC<RowSwitcherProps> = ({
  isGrid,
  onToggle,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const handleToggle = () => {
    onToggle(!isGrid);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<unknown>) => {
    const newItemsPerPage = event.target.value as number;
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <FormControlLabel
        control={<Switch checked={isGrid} onChange={handleToggle} />}
        label={isGrid ? "Grid View" : "List View"}
      />
      <Select
        label="Items per page"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        style={{ marginLeft: "20px" }}
      >
        <MenuItem value={6}>6 per page</MenuItem>
        <MenuItem value={12}>12 per page</MenuItem>
        <MenuItem value={18}>18 per page</MenuItem>
      </Select>
    </div>
  );
};

export default RowSwitcher;
