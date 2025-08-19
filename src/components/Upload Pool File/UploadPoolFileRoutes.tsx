import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import DisbursementFileUpload from "./DisbursementFileUpload";
import DisbursementFileRundown from "./DisbursementFileRundown";
import DisbursementFileInfer from "./DisbursementFileInfer";

const UploadPoolFileRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <DisbursementFileUpload/>
            </Layout>
          }
        />

        <Route
          path="/file-rundown"
          element={
            <Layout>
              <DisbursementFileRundown/>
            </Layout>
          }
        />

        <Route
          path="/file-infer"
          element={
            <Layout>
              <DisbursementFileInfer/>
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UploadPoolFileRoutes;
