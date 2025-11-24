
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import ContactPage from "../Contact";
import LoanProductConfig from "./LoanProductConfig";

const NBFCRoutes = () => {
  return (
    <>
      <Routes>
        {/* LOAN PRODUCT CONFIG */}
        <Route
          path="/"
          element={
            <Layout>
              <LoanProductConfig />
            </Layout>
          }
        />


        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
    </>
  );
};

export default NBFCRoutes;
