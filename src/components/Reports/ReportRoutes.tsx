import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Reports from "./Reports";
import NotFound from "../NotFound";

const ReportRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ReportRoutes;
