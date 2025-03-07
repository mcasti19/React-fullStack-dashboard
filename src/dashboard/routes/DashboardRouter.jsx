import {Navigate, Route, Routes} from "react-router"
import {DashboardPage} from "../pages/dashboard/DashboardPage"
import {TeamPage} from "../pages/team/TeamPage"
import {EmployeesPage} from "../pages/employees/EmployeesPage"
import {InvoicesPage} from "../pages/invoices/InvoicesPage"
import {BarChartPage} from "../pages/bar/BarChartPage"
import {CalendarPage} from "../pages/calendar/CalendarPage"
import {FaqPage} from "../pages/faq/FaqPage"
import {SideNav} from "../components/global/SideNav";
import {Topbar} from "../components/global/Topbar";
import {CreateEmployeePage} from "../pages/employees/create/CreateEmployeePage"


export const DashboardRouter = () => {
    return (
        <div className="app">
            <SideNav />
            <main className="content">
                <Topbar />
                <Routes>
                    {/* Ruta raíz */}
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/employees/create" element={<CreateEmployeePage />} />
                    <Route path="/invoices" element={<InvoicesPage />} />

                    {/* <Route path="/form" element={<FormPage />} /> */}
                    {/* <Route path="/bar" element={<BarChartPage />} /> */}
                    {/* <Route path="/pie" element={<Pie />} /> */}
                    {/* <Route path="/line" element={<Line />} /> */}
                    {/* <Route path="/faq" element={<FaqPage />} /> */}
                    {/* <Route path="/geography" element={<Geography />} /> */}
                    {/* <Route path="/calendar" element={<CalendarPage />} /> */}

                    {/* Cualquier otra ruta lleva a la raiz  */}
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    )
}



