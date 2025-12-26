  import { Route, Routes, useNavigate } from "react-router-dom";
  import "./App.css";

  import NotFound from "./components/NotFound";
  import NBFCRoutes from "./components/NBFC/NBFCRoutes";
  import OverviewRoutes from "./components/Overview/OverviewRoutes";
  import ApplicationRoutes from "./components/Application/ApplicationRoutes";
  import ManagerUserRoutes from "./components/Manager User/ManagerUserRoutes";
  import ReportRoutes from "./components/Reports/ReportRoutes";
  import HelpRoutes from "./components/Help/HelpRoutes";
  import UploadPoolFileRoutes from "./components/Upload Pool File/UploadPoolFileRoutes";
  import BreRoutes from "./components/Bre/BreRoutes";
  import LendingRateRoutes from "./components/LendingRateConfiguration/LendingRateRoute";
  import AuthScreens from "./components/login/AuthScreens";
  import ApiDocumentationRoutes from "./components/API-Documentation/ApiDocumentationRoutes";
  import UserRolesRoutes from "./components/Roles/UserRolesRoutes";
  import PrivateRoutes from "./components/HOC/PrivateRoutes";
  import LoanAccountRoutes from "./components/LoanAccount/LoanAccountRoutes";
  import ActivitiesRoutes from "./components/Activity/ActivityRoutes";
  import CollectionFileRoutes from "./components/Collection/CollectionFileRoutes";
  import LoanStatement from "./components/LoanAccount/LoanStatement";
  import { useSelector } from "react-redux";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { OfflineState } from "./components/Error";
  // import NbfcList from "./components/NBFC/NbfcList";



  function App() {
    const user = useSelector((state: any) => state.auth.user);
    // console.log("SSS", user)

    const isOnline = useNetworkStatus();

    if (!isOnline) {
      return <OfflineState />;
    }
    if (!user) {
    return (
      <Routes>
        <Route path="/*" element={<AuthScreens />} />
      </Routes>
    );
  }
    if (user.user_type == "nbfc") {
      return (
        <>
          <Routes>
            <Route path="/" element={<AuthScreens />} />
            <Route path="/overview/*" element={<PrivateRoutes><OverviewRoutes /></PrivateRoutes>} />
            <Route path="/*" element={<PrivateRoutes><NBFCRoutes /></PrivateRoutes>} />
            <Route path="/upload-pool-file/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
            <Route path="/applications/*" element={<PrivateRoutes><ApplicationRoutes /></PrivateRoutes>} />
            <Route path="/loans/*" element={<PrivateRoutes><LoanAccountRoutes /></PrivateRoutes>} />
            {/* <Route path="/manage-user/*" element={<PrivateRoutes><ManagerUserRoutes /></PrivateRoutes>} /> */}
            <Route path="/api-documentation/*" element={<PrivateRoutes><ApiDocumentationRoutes /></PrivateRoutes>} />
            <Route path="/reports/*" element={<PrivateRoutes><ReportRoutes /></PrivateRoutes>} />
            <Route path="/help/*" element={<PrivateRoutes><HelpRoutes /></PrivateRoutes>} />
            <Route path="/bre" element={<PrivateRoutes><BreRoutes /></PrivateRoutes>} />
            {/* <Route path="/roles-management/*" element={<PrivateRoutes><UserRolesRoutes /></PrivateRoutes>} /> */}
            {/* <Route path="/rlr-config/*" element={<PrivateRoutes><LendingRateRoutes /></PrivateRoutes>} /> */}
            {/* <Route path="/activity/*" element={<PrivateRoutes><ActivitiesRoutes /></PrivateRoutes>} /> */}
            <Route path="/uploads/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
            <Route path="/collection/*" element={<PrivateRoutes><CollectionFileRoutes /></PrivateRoutes>} />
            {/* <Route
            path="/history/loan-applications/:batchId"
            element={
              <Layout>
                <LoanApplicationsPage />
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
          /> */}


            {/* <Route path="/nbfc/nbfc-list" element={<NbfcList/>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      );
    } else if (user.user_type == "bank") {
      return (
        <>
          <Routes>
            <Route path="/" element={<AuthScreens />} />
            <Route path="/overview/*" element={<PrivateRoutes><OverviewRoutes /></PrivateRoutes>} />
            <Route path="/*" element={<PrivateRoutes><NBFCRoutes /></PrivateRoutes>} />
            <Route path="/upload-pool-file/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
            <Route path="/applications/*" element={<PrivateRoutes><ApplicationRoutes /></PrivateRoutes>} />
            <Route path="/loans/*" element={<PrivateRoutes><LoanAccountRoutes /></PrivateRoutes>} />
            {/* <Route path="/manage-user/*" element={<PrivateRoutes><ManagerUserRoutes /></PrivateRoutes>} /> */}
            <Route path="/api-documentation/*" element={<PrivateRoutes><ApiDocumentationRoutes /></PrivateRoutes>} />
            <Route path="/reports/*" element={<PrivateRoutes><ReportRoutes /></PrivateRoutes>} />
            <Route path="/help/*" element={<PrivateRoutes><HelpRoutes /></PrivateRoutes>} />
            <Route path="/bre" element={<PrivateRoutes><BreRoutes /></PrivateRoutes>} />
            {/* <Route path="/roles-management/*" element={<PrivateRoutes><UserRolesRoutes /></PrivateRoutes>} /> */}
            {/* <Route path="/rlr-config/*" element={<PrivateRoutes><LendingRateRoutes /></PrivateRoutes>} /> */}
            {/* <Route path="/activity/*" element={<PrivateRoutes><ActivitiesRoutes /></PrivateRoutes>} /> */}
            <Route path="/uploads/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
            <Route path="/collection/*" element={<PrivateRoutes><CollectionFileRoutes /></PrivateRoutes>} />
            {/* <Route
            path="/history/loan-applications/:batchId"
            element={
              <Layout>
                <LoanApplicationsPage />
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
          /> */}


            {/* <Route path="/nbfc/nbfc-list" element={<NbfcList/>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      );
    } else {
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
            <Route path="/bre" element={<PrivateRoutes><BreRoutes /></PrivateRoutes>} />
            <Route path="/roles-management/*" element={<PrivateRoutes><UserRolesRoutes /></PrivateRoutes>} />
            <Route path="/rlr-config/*" element={<PrivateRoutes><LendingRateRoutes /></PrivateRoutes>} />
            <Route path="/activity/*" element={<PrivateRoutes><ActivitiesRoutes /></PrivateRoutes>} />
            <Route path="/uploads/*" element={<PrivateRoutes><UploadPoolFileRoutes /></PrivateRoutes>} />
            <Route path="/collection/*" element={<PrivateRoutes><CollectionFileRoutes /></PrivateRoutes>} />
            {/* <Route
            path="/history/loan-applications/:batchId"
            element={
              <Layout>
                <LoanApplicationsPage />
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
          /> */}


            {/* <Route path="/nbfc/nbfc-list" element={<NbfcList/>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      );
    }
  }

  export default App;
