import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import OnboardingPage from "./OnboardingPage";
// import SegmentSelection from "./SegmentSelection"; // Removed unused import
import NBFCform from "./NBFCform";
import NotFound from "../NotFound";
import ContactPage from "../Contact";
import NbfcList from "./NbfcList";
import LoanProducts from "../LoanProduct/LoanProducts";
import BuyOutSegment from "./BuyOutSegment";
import LoanProductConfig from "../LoanProduct/LoanProductConfig";
import BREConfig from "../Bre/BREConfig";

const NBFCRoutes = () => {
  return (
    <>
      <Routes>
        {/* ONBOARDING */}
        <Route
          path="/onboarding"
          element={
            <Layout>
              <OnboardingPage />
            </Layout>
          }
        />

        {/* SEGMENT SELECTION */}
        {/* <Route
          path="/nbfc/segment-selection"
          element={
            <Layout>
              <SegmentSelection />
            </Layout>
          }
        /> */}

        {/* NBFC FORM */}
        <Route
          path="/onboarding/nbfc-form"
          element={
            <Layout>
              <NBFCform />
            </Layout>
          }
        />
        <Route
          path="/onboarding/nbfc-form/:id"
          element={
            <Layout>
              <NBFCform />
            </Layout>
          }
        />

        {/* LOAN PRODUCT CONFIG
        <Route
          path="/nbfc/product-config"
          element={
            <Layout>
              <LoanProductConfig />
            </Layout>
          }
        /> */}

        <Route
          path="/nbfc-list"
          element={
            <Layout>
              <NbfcList />
            </Layout>
          }
        />
        <Route
          path="/nbfc/details/:id"
          element={
            <Layout>  
            <LoanProducts />
            </Layout>
          }
        />
        <Route
          path="/nbfc/:id/product"
          element={
            <Layout>  
            <LoanProductConfig />
            </Layout>
          }
        />
        <Route
          path="/nbfc/:id/product/:productId"
          element={
            <Layout>  
            <LoanProductConfig />
            </Layout>
          }
        />
        <Route
          path="/nbfc/nbfc-segment"
          element={
            <Layout>
            <BuyOutSegment/>
            </Layout>
          }
        />
        <Route
          path="/nbfc/product-bre/:productId"
          element={
            <Layout>  
            <BREConfig />
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
