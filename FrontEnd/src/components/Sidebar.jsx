import React, { useEffect, useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const baseurl = import.meta.env.VITE_BASE_URL;

const Sidebar = () => {
    const token = localStorage.getItem('token');
  
    
    const [data, setData] = useState(null);
    
    const userFetching = async () => {
        try {
            const response = await axios.get(`${baseurl}api/user/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setData(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        userFetching();
    }, []);

const logout=()=>{
  localStorage.clear('token')
}

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <img
                            src={data?.profilePic || "https://via.placeholder.com/80"}
                            alt="Profile"
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                marginBottom: '10px'
                            }}
                        />
                        <NavLink
                            to="/adminpage"
                            className="text-decoration-none"
                            style={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "18px",
                                textTransform: "uppercase"
                            }}
                        >
                            {data?.username || "User"}
                        </NavLink>
                    </div>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked" className="sidebar-link">
                            <CDBSidebarMenuItem icon="fas fa-tachometer-alt">
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/blogcreation" activeClassName="activeClicked" className="sidebar-link">
                            <CDBSidebarMenuItem icon="fas fa-pen">
                                Create Blog
                            </CDBSidebarMenuItem>
                        </NavLink>
                        {token ? (
    
    <NavLink exact onClick={logout} activeClassName="activeClicked" className="sidebar-link">
        <CDBSidebarMenuItem icon="fas fa-sign-out-alt">
            Logout
        </CDBSidebarMenuItem>
    </NavLink>
) : (
   
    <>
        <NavLink exact to="/login" activeClassName="activeClicked" className="sidebar-link">
            <CDBSidebarMenuItem icon="fas fa-sign-in-alt">
                Login
            </CDBSidebarMenuItem>
        </NavLink>
        <NavLink exact to="/registration" activeClassName="activeClicked" className="sidebar-link">
            <CDBSidebarMenuItem icon="fas fa-user-plus">
                Signup
            </CDBSidebarMenuItem>
        </NavLink>
    </>
)}

                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: "center", padding: "20px", fontSize: "14px", color: "#aaa" }}>
                    &copy; 2024 Your Company
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
}

export default Sidebar;
