import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import LoanAccount from "./LoanAccount";
import NotFound from "../NotFound";

const LoanAccountRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <LoanAccount />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default LoanAccountRoutes;
