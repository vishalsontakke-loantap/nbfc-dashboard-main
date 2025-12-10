import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import CollectionFileUpload from "./CollectionFileUpload";
import CollectionFileRundown from "./CollectionFileRundown";
import CollectionFileInfer from "./CollectionFileInfer";

const CollectionFileRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <CollectionFileUpload/>
            </Layout>
          }
        />

        <Route
          path="/:batchId"
          element={
            <Layout>
              <CollectionFileRundown/>
            </Layout>
          }
        />

        <Route
          path="/file-infer"
          element={
            <Layout>
              <CollectionFileInfer/>
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default CollectionFileRoutes;
