import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Applications from "./Application";
import NotFound from "../NotFound";
import DetailsView from "./DeatilsView";

const ApplicationRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Applications />
            </Layout>
          }
        />
         <Route
          path="/:id"
          element={
            <Layout>
              <DetailsView />
            </Layout>
          }
        />

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ApplicationRoutes;
