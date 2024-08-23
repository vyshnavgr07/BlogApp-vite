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
const baseurl=import.meta.env.VITE_BASE_URL;

const Sidebar = () => {
  const token =localStorage.getItem('token')
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
      const userFetching=async()=>{
        try {
          const response = await axios.get(`${baseurl}api/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }})
        } catch (error) {
          console.error(error)
        }
      }
    },[])
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
            <CDBSidebar textColor="#fff" backgroundColor="#2C3539">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src="https://via.placeholder.com/100" 
                            alt="Logo"
                            style={{ width: '80px', borderRadius: '50%', marginBottom: '10px' }}
                        />
                        <NavLink
                            to="/adminpage"
                            className="text-decoration-none"
                            style={{ color: "inherit" }}
                        >
                            Blog
                        </NavLink>
                    </div>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-tachometer-alt">Dashboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/blogcreation" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-pen">Create Blog</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/login" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-sign-in-alt">Login</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/registration" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="fas fa-user-plus">Signup</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

            </CDBSidebar>
        </div>
    );
}

export default Sidebar;
