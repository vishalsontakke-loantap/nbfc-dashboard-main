import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import { ApiDocumentationScreen } from "./ApiDocumentationScreen";

const ApiDocumentationRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <ApiDocumentationScreen />    
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ApiDocumentationRoutes;
