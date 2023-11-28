import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import RowSwitcher from "./RowSwitcher";
import FilterRow from "./FilterRow";
import { useCustomerContext } from "../context/CustomerContext";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  postCode: string;
  street: string;
  streetNumber: string;
}

const itemsPerPageOptions = [6, 12, 18];

const DataGrid: React.FC = () => {
  const router = useRouter();
  const [isGrid, setIsGrid] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState({
    gender: "",
    country: "",
    email: "",
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCustomer, setSelectedCustomer } = useCustomerContext();

  const handleToggle = (newIsGrid: boolean) => {
    setIsGrid(newIsGrid);
  };

  const handleFilterChange = (newFilters: {
    gender: string;
    country: string;
    email: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset current page to 1 when filters change
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset current page to 1 when items per page change
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/customers.json");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError("Error loading data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCustomer(null);
  }, [setSelectedCustomer]);

  useEffect(() => {
    const applyFilters = () => {
      try {
        let filteredData = customers;

        if (filters.gender !== "") {
          filteredData = filteredData.filter(
            (customer) =>
              customer.gender.toLowerCase() === filters.gender.toLowerCase()
          );
        }

        if (filters.country !== "") {
          filteredData = filteredData.filter(
            (customer) =>
              customer.country.toLowerCase() === filters.country.toLowerCase()
          );
        }

        if (filters.email !== "") {
          filteredData = filteredData.filter((customer) =>
            customer.email.toLowerCase().includes(filters.email.toLowerCase())
          );
        }

        setFilteredCustomers(filteredData);
        setError(null); // Reset error state if filtering is successful
      } catch (error) {
        setFilteredCustomers([]);
        setError("Error applying filters. Please check your filter criteria.");
        console.error("Error applying filters:", error);
      }
    };

    applyFilters();
  }, [filters, customers]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    router.push(`/customer/${customer.email}`);
  };

  const renderContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    if (loading) {
      return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
      return (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      );
    }

    if (isGrid) {
      return (
        <Grid container spacing={2}>
          {paginatedCustomers.map((customer, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${index}`}
                  alt="Avatar"
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="h6">{`${customer.firstName} ${customer.lastName}`}</Typography>
                <Typography>{`Email: ${customer.email}`}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <List>
          {paginatedCustomers.map((customer, index) => (
            <ListItem key={index}>
              <Paper
                elevation={3}
                sx={{ padding: "20px", width: "100%", cursor: "pointer" }}
                onClick={() => handleCustomerClick(customer)}
              >
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${index}`}
                  alt="Avatar"
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="h6">{`${customer.firstName} ${customer.lastName}`}</Typography>
                <Typography>{`Email: ${customer.email}`}</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <div>
      <RowSwitcher
        isGrid={isGrid}
        onToggle={handleToggle}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <FilterRow onFilterChange={handleFilterChange} />
      {renderContent()}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Typography
          variant="body1"
          style={{ margin: "0 10px", display: "inline-block" }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default DataGrid;
