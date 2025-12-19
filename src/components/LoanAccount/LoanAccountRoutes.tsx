import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import LoanAccount from "./LoanAccount";
import NotFound from "../NotFound";
import LoanDetailsView from "./LoanDetailsView";
import { RepaymentSchedule } from "../RepaymentSchedule";
import LoanStatement from "../LoanStatement";

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
        <Route
        path="/statement/:loan_id"
          element={
            <Layout>
              <LoanStatement /> 
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
