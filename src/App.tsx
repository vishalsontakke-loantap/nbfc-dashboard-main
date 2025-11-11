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
        <Route path="/overview/*" element={<OverviewRoutes />} />
        <Route path="/*" element={<NBFCRoutes />} />
        <Route path="/upload-pool-file/*" element={<UploadPoolFileRoutes />} />
        <Route path="/history/*" element={<HistoryRoutes />} />
        <Route path="/manager-user/*" element={<ManagerUserRoutes />} />
        <Route path="/reports/*" element={<ReportRoutes />} />
        <Route path="/help/*" element={<HelpRoutes />} />
        <Route path="/" element={<LoginPageWrapper />} />
        {/* <Route path="/nbfc/nbfc-list" element={<NbfcList/>} /> */}
      </Routes>
    </>
  );
}

export default App;
