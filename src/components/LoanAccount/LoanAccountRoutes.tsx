import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import LoanAccount from "./LoanAccount";
import NotFound from "../NotFound";
import LoanDetailsView from "../LoanDetailsView";
import { RepaymentSchedule } from "../RepaymentSchedule";

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
        <Route
          path="/:id"
          element={
            <Layout>
              <LoanDetailsView />
            </Layout>
          }
        />
        <Route
          path="/repayment/:id"
          element={
            <Layout>
              <RepaymentSchedule />
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
