import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
    return (
        <section className="dashboard-shell">
            <DashHeader />
            <div className="dashboard">
                <Outlet />
            </div>
            <DashFooter />
        </section>
    );
}

export default DashLayout;