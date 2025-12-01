import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import NBFCRoutes from "./components/NBFC/NBFCRoutes";
import OverviewRoutes from "./components/Overview/OverviewRoutes";
import ApplicationRoutes from "./components/Application/ApplicationRoutes";
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
import PrivateRoutes from "./components/HOC/PrivateRoutes";
import LoanAccountRoutes from "./components/LoanAccount/LoanAccountRoutes";
import LoanDetailsView from "./components/LoanDetailsView";
// import NbfcList from "./components/NBFC/NbfcList";

function LoginPageWrapper() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate("/overview")} />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthScreens />} />
        <Route path="/overview/*" element={<PrivateRoutes><OverviewRoutes /></PrivateRoutes>} />
        <Route path="/*" element={<PrivateRoutes><NBFCRoutes /></PrivateRoutes>} />
        <Route path="/upload-pool-file/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
        <Route path="/applications/*" element={<PrivateRoutes><ApplicationRoutes /></PrivateRoutes>} />
        <Route path="/loans/*" element={<PrivateRoutes><LoanAccountRoutes /></PrivateRoutes>} />
        <Route path="/manage-user/*" element={<PrivateRoutes><ManagerUserRoutes /></PrivateRoutes>} />
        <Route path="/api-documentation/*" element={<PrivateRoutes><ApiDocumentationRoutes /></PrivateRoutes>} />
        <Route path="/reports/*" element={<PrivateRoutes><ReportRoutes /></PrivateRoutes>} />
        <Route path="/help/*" element={<PrivateRoutes><HelpRoutes /></PrivateRoutes>} />
        <Route path="/" element={<LoginPageWrapper />} />
        <Route path="/bre" element={<PrivateRoutes><BreRoutes /></PrivateRoutes>} />
        <Route path="/roles-management/*" element={<PrivateRoutes><UserRolesRoutes /></PrivateRoutes>} />
        <Route path="/rlr-config/*" element={<PrivateRoutes><LendingRateRoutes /></PrivateRoutes>} />
        <Route
          path="/history/loan-applications/:batchId"
          element={
            <Layout>
              <LoanApplicationsPage />
            </Layout>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <Layout>
              <DetailsView />
            </Layout>
          }
        />
        <Route
          path="/loans/:id"
          element={
            <Layout>
              <LoanDetailsView />
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
          path="/loans/repayment/:id"
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
