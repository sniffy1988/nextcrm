import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        p: 2,
        textAlign: "center",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2023
      </Typography>
    </Box>
  );
};

export default Footer;
