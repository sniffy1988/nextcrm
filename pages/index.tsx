import React from "react";
import Layout from "../app/components/Layout";
import DataGrid from "@/app/components/Grid";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <DataGrid />
      </div>
    </Layout>
  );
};

export default HomePage;
