import {Navigate, Route, Routes} from "react-router";
import {DashboardPage} from "../pages/dashboard/DashboardPage";
import {UsersPage} from "../pages/users/UsersPage";

import {InvoicesPage} from "../pages/invoices/InvoicesPage";
import {BarChartPage} from "../pages/bar/BarChartPage";
import {CalendarPage} from "../pages/calendar/CalendarPage";
import {FaqPage} from "../pages/faq/FaqPage";
import {SideNav, Topbar} from "../../globalUI";
import {CreateEmployeePage} from "../pages/employees/CreateEmployeePage";
import {CreateUserPage} from "../pages/users/CreateUserPage";
import {EmployeesPage} from "../pages/employees/EmployeesPage";
import {EditUserPage} from "../pages/users/EditUserPage";
import {CreateInvoicePage} from "../pages/invoices/CreateInvoicePage";
import Pie from "../pages/pie/PieChart";

import LineChartPage from "../pages/line/LineChartPage";
import {EditEmployeePage} from "../pages/employees/EditEmployeePage";
import {RolesAndPermissionsPage} from "../pages/roles/RolesAndPermissions";
import {FormPage} from "../pages/form/FormPage";
import {TokenExpirationChecker} from "../components/TokenExpirationChecker";

export const DashboardRouter = () => {
    return (
        <>
            <TokenExpirationChecker />
            <div className="app">
                <SideNav />
                <main className="w-full flex flex-col py-1 md:p-6 px-1 overflow-x-hidden h-dvh">
                    <Topbar />
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/users/create" element={<CreateUserPage />} />
                        <Route path="/users/edit/:userId" element={<EditUserPage />} />
                        <Route path="/employees" element={<EmployeesPage />} />
                        <Route path="/employees/create" element={<CreateEmployeePage />} />
                        <Route path="/employee/edit/:_id" element={<EditEmployeePage />} />
                        <Route path="/invoices" element={<InvoicesPage />} />
                        <Route path="/invoices/create" element={<CreateInvoicePage />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/roles" element={<RolesAndPermissionsPage />} />
                        <Route path="/form" element={<FormPage />} />
                        <Route path="/bar" element={<BarChartPage />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/line" element={<LineChartPage />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </div>
        </>
    );
};


// console.log('ENTRE AL DASHBOARD');

//   const [ authenticated, setAuthenticated ] = useState( null )
//   const [ error, setError ] = useState( null )

//   const checkTokenExpiration = () => {
//       const token = localStorage.getItem( 'token' );
// if (!token) {
//     dispatch(onLogout());
//     return false;
// }
//       try {
//           const decoded = jwtDecode( token );
//           const isExpired = decoded.exp * 1000 < Date.now();

// if (isExpired) {
//     localStorage.removeItem('token');
//     dispatch(onLogout('Sesión expirada'));
//     return false;
// }
// return true;
// } catch (error) {
//     localStorage.removeItem('token');
//     dispatch(onLogout('Token inválido'));
//     return false;
// }
//   };
//   // Chequeo periódico cada minuto
//   useEffect( () => {
//       const interval = setInterval( () => {
//           console.log( 'checkTokenExpiration' );
//           checkTokenExpiration();
//       }, 60000 );
//       return () => clearInterval( interval );
//   }, [] );