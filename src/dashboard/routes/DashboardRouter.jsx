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

export const DashboardRouter = () => {
    console.log('ENTRE AL DASHBOARD');

    return (
        <div className="app">
            <SideNav />
            <main className="content w-auto p-6 pb-0 overflow-x-hidden">
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
                    <Route path="/roles" element={<RolesAndPermissionsPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/bar" element={<BarChartPage />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<LineChartPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </main>
        </div>
    );
};



{/* <Route path="/form" element={<FormPage />} /> */}


{/* <Route path="/faq" element={<FaqPage />} /> */}
{/* <Route path="/geography" element={<Geography />} /> */}
