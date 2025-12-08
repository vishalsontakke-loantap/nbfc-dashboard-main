import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import { UserListingScreen } from "./ManagerUser";
import NotFound from "../NotFound";

const ManagerUserRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <UserListingScreen/>
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
