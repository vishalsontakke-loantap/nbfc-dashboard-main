import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import Activities from "./Activities";
import ApplicationRoutes from "../Application/ApplicationRoutes";
import { CheckerDashboard } from "../Activity-Log/pages/CheckerDashboard";
import { PayloadViewer } from "../Activity-Log/PayloadViewer";
import { ApprovalDetail } from "../Activity-Log/pages/ApprovalDetail";

const ActivitiesRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <CheckerDashboard />
            </Layout>
          }
        />
         <Route
          path="/:id"
          element={
            <Layout>
              <ApprovalDetail  />
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
    