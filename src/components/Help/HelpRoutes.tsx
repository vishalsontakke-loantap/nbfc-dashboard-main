import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import NotFound from "../NotFound";
import Help from "./Help";

const HelpRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default HelpRoutes;
