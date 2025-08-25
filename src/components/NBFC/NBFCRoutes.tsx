import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import OnboardingPage from "./OnboardingPage";
import SegmentSelection from "./SegmentSelection";
import NBFCform from "./NBFCform";
import BREConfig from "./BREConfig";
import LoanProductConfig from "./LoanProductConfig";
import NotFound from "../NotFound";
import ContactPage from "../Contact";
import NbfcList from "./NbfcList";
import LoanProducts from "./LoanProducts";

const NBFCRoutes = () => {
  return (
    <>
      <Routes>
        {/* ONBOARDING */}
        <Route
          path="/"
          element={
            <Layout>
              <OnboardingPage />
            </Layout>
          }
        />

        {/* SEGMENT SELECTION */}
        <Route
          path="/nbfc/segment-selection"
          element={
            <Layout>
              <SegmentSelection />
            </Layout>
          }
        />

        {/* NBFC FORM */}
        <Route
          path="/nbfc/nbfc-form"
          element={
            <Layout>
              <NBFCform />
            </Layout>
          }
        />

        {/* LOAN PRODUCT CONFIG */}
        <Route
          path="/nbfc/product-config"
          element={
            <Layout>
              <LoanProductConfig />
            </Layout>
          }
        />

        {/* BRE CONFIG */}
        <Route
          path="/nbfc/bre-config"
          element={
            <Layout>
              <BREConfig />
            </Layout>
          }
        />
        <Route
          path="/nbfc-list"
          element={
            <Layout>
              <NbfcList />
            </Layout>
          }
        />
        <Route
          path="/nbfc-details"
          element={
            <Layout>
            <LoanProducts />
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
