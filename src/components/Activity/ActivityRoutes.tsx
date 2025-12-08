import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import Activities from "./Activities";
import ApplicationRoutes from "../Application/ApplicationRoutes";

const ActivitiesRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Activities />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ActivitiesRoutes;
    