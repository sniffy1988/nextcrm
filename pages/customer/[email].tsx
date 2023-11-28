import { useEffect, useState } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { useCustomerContext } from "../../app/context/CustomerContext";
import OrderTable from "../../app/components/OrderTable";

import { useRouter } from "next/router";

interface Order {
  number: number;
  "price ": number;
  currency: string;
  itemName: string;
  amount: number;
  createdAt: number;
  shippedAt: number;
}

const itemsPerPage = 5; // Adjust as needed

const CustomerPage: React.FC = () => {
  const router = useRouter();

  const { selectedCustomer } = useCustomerContext();

  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/orders.json");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCustomer) {
      router.push("/");
    }
  }, [selectedCustomer, router]);

  if (!selectedCustomer) {
    return <Typography variant="h6">Redirecting...</Typography>;
  }

  const handleBackToList = () => {
    router.push("/");
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography>{`Email: ${selectedCustomer.email}`}</Typography>
        <Typography>{`Gender: ${selectedCustomer.gender}`}</Typography>
        <Typography>{`Country: ${selectedCustomer.country}`}</Typography>
        <Typography>{`City: ${selectedCustomer.city}`}</Typography>
        <Typography>{`State: ${selectedCustomer.state}`}</Typography>
        <Typography>{`Postal Code: ${selectedCustomer.postCode}`}</Typography>
        <Typography>{`Street: ${selectedCustomer.street}`}</Typography>
        <Typography>{`Street Number: ${selectedCustomer.streetNumber}`}</Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4">
          {`${selectedCustomer.firstName} ${selectedCustomer.lastName}`} Orders
        </Typography>
        <OrderTable orders={paginatedOrders} />
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
      </Paper>
      <Button
        variant="outlined"
        onClick={handleBackToList}
        style={{ marginTop: "20px" }}
      >
        Back to List
      </Button>
    </div>
  );
};

export default CustomerPage;
