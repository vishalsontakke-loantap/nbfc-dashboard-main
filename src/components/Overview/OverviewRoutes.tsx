import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Overview from "./Overview";
import NotFound from "../NotFound";

const OverviewRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Overview />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default OverviewRoutes;
