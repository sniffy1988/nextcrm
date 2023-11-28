import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Order {
  number: number;
  "price ": number;
  currency: string;
  itemName: string;
  amount: number;
  createdAt: number;
  shippedAt: number;
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <Typography variant="h6">No orders available.</Typography>;
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Shipped At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.number}>
              <TableCell>{order.number}</TableCell>
              <TableCell>{order["price "]}</TableCell>
              <TableCell>{order.currency}</TableCell>
              <TableCell>{order.itemName}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>
                {new Date(order.createdAt * 1000).toLocaleString()}
              </TableCell>
              <TableCell>
                {order.shippedAt
                  ? new Date(order.shippedAt * 1000).toLocaleString()
                  : "Not shipped"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
