import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import ManagerUser from "./ManagerUser";
import NotFound from "../NotFound";

const ManagerUserRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <ManagerUser />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ManagerUserRoutes;
