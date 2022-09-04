import { Outlet } from "react-router-dom";
import Sidebar, { SidebarProps } from "./sidebar/sidebar";
import './appLayout.css';

const AppLayout = ({navItems: items}: SidebarProps) => {
    return <div className="app-container">
        <div className="side-menu">
            <Sidebar navItems={items} />
        </div>
        <div className="content">
            <Outlet />
        </div>
    </div>;
};

export default AppLayout;