import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export interface NavItem {
    display: string
    to: string
    section: string
}

export interface SidebarProps {
    navItems: NavItem[]
}

 const Sidebar = ({navItems: items}: SidebarProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = items.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        {
            items.map((item, index) => (
                <Link to={item.to} key={index}>
                    <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                        {item.display}
                    </div>
                </Link>
            ))
        }
    </div>
};

export default Sidebar;