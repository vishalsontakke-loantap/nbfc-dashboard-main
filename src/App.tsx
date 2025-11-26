import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import NBFCRoutes from "./components/NBFC/NBFCRoutes";
import OverviewRoutes from "./components/Overview/OverviewRoutes";
import HistoryRoutes from "./components/History/HistoryRoutes";
import ManagerUserRoutes from "./components/Manager User/ManagerUserRoutes";
import ReportRoutes from "./components/Reports/ReportRoutes";
import HelpRoutes from "./components/Help/HelpRoutes";
import UploadPoolFileRoutes from "./components/Upload Pool File/UploadPoolFileRoutes";
import { Login } from "./components/Login";
import LoanApplicationsPage from "./components/LoanApplicationsPage";
import Layout from "./components/Layout";
import DetailsView from "./components/DeatilsView";
import PoolBatchView from "./components/PoolBatchView";
import { RepaymentSchedule } from "./components/RepaymentSchedule";
import LoanProductRoutes from "./components/LoanProduct/LoanProductRoutes";
import BreRoutes from "./components/Bre/BreRoutes";
import LendingRateRoutes from "./components/LendingRateConfiguration/LendingRateRoute";
import AuthScreens from "./components/login/AuthScreens";
import ApiDocumentationRoutes from "./components/API-Documentation/ApiDocumentationRoutes";
import UserRolesRoutes from "./components/Roles/UserRolesRoutes";
// import NbfcList from "./components/NBFC/NbfcList";

function LoginPageWrapper() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate("/overview")} />;
}

function App() {
  return (
    <>
      <Routes>
        {/*NBFC ROUTES */}
         <Route path="/" element={<AuthScreens />} />
        <Route path="/overview/*" element={<OverviewRoutes />} />
        <Route path="/*" element={<NBFCRoutes />} />
        <Route path="/upload-pool-file/*" element={<UploadPoolFileRoutes />} />
        <Route path="/history/*" element={<HistoryRoutes />} />
        <Route path="/manage-user/*" element={<ManagerUserRoutes />} />
        <Route path="/api-documentation/*" element={<ApiDocumentationRoutes />} />
        <Route path="/reports/*" element={<ReportRoutes />} />
        <Route path="/help/*" element={<HelpRoutes />} />
        <Route path="/" element={<LoginPageWrapper />} />
        {/* <Route path="/loan-products/*" element={<LoanProductRoutes />} /> */}
        <Route path="/bre" element={<BreRoutes />} />
        <Route path="/roles-management/*" element={<UserRolesRoutes />} />
        <Route path="/rlr-config/*" element={<LendingRateRoutes />} />
       <Route
          path="/history/loan-applications/:batchId"
          element={
            <Layout>
              <LoanApplicationsPage />
            </Layout>
          }
        />
         <Route
          path="/history/loan-applications/details"
          element={
            <Layout>
              <DetailsView />
            </Layout>
          }
        />
         <Route
          path="/history/pool-batch/details"
          element={
            <Layout>
              <PoolBatchView />
            </Layout>
          }
        />

        <Route
          path="/history/payment-details"
          element={
            <Layout>
              <RepaymentSchedule />
            </Layout>
          }
        />
        {/* <Route path="/nbfc/nbfc-list" element={<NbfcList/>} /> */}
      </Routes>
    </>
  );
}

export default App;
