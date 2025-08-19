import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import History from "./History";
import NotFound from "../NotFound";

const HistoryRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <History />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default HistoryRoutes;
