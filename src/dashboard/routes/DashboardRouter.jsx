import {Navigate, Route, Routes} from "react-router";
import {DashboardPage} from "../pages/dashboard/DashboardPage";
import {TeamPage} from "../pages/team/TeamPage";

import {InvoicesPage} from "../pages/invoices/InvoicesPage";
import {BarChartPage} from "../pages/bar/BarChartPage";
import {CalendarPage} from "../pages/calendar/CalendarPage";
import {FaqPage} from "../pages/faq/FaqPage";
import {SideNav} from "../components/global/SideNav";
import {Topbar} from "../components/global/Topbar";
import {CreateEmployeePage} from "../pages/employees/create/CreateEmployeePage";
import {CreateUserPage} from "../pages/team/CreateUserPage";
import {EmployeesPage} from "../pages/employees/EmployeesPage";
import {EditUserPage} from "../pages/team/EditUserPage";

export const DashboardRouter = () => {
    return (
        <div className="app">
            <SideNav />
            <main className="content">
                <Topbar />
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/team/create" element={<CreateUserPage />} />
                    <Route path="/team/edit/:userId" element={<EditUserPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/employees/create" element={<CreateEmployeePage />} />
                    <Route path="/invoices" element={<InvoicesPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </main>
        </div>
    );
};



{/* <Route path="/form" element={<FormPage />} /> */}
{/* <Route path="/bar" element={<BarChartPage />} /> */}
{/* <Route path="/pie" element={<Pie />} /> */}
{/* <Route path="/line" element={<Line />} /> */}
{/* <Route path="/faq" element={<FaqPage />} /> */}
{/* <Route path="/geography" element={<Geography />} /> */}
{/* <Route path="/calendar" element={<CalendarPage />} /> */}