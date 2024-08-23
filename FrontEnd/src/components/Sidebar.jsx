import React, { useState } from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from "cdbreact";
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    const [showModal, setShowModal] = useState(false);
  return (
<div
  style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
>
  <CDBSidebar textColor="#fff" backgroundColor="#2C3539">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
      <NavLink
        to="/adminpage"
        className="text-decoration-none"
        style={{ color: "inherit" }}
      >
        Admin
      </NavLink>
    </CDBSidebarHeader>

    <CDBSidebarContent className="sidebar-content">
      <CDBSidebarMenu>
        <NavLink exact to="/" activeClassName="activeClicked">
          <CDBSidebarMenuItem icon="fas fa-tachometer-alt">Dashboard</CDBSidebarMenuItem>
        </NavLink>
        <NavLink exact to="/vieworder" activeClassName="activeClicked">
          <CDBSidebarMenuItem icon="fas fa-user">Profile</CDBSidebarMenuItem>
        </NavLink>
        <NavLink exact to="/adminproduct" activeClassName="activeClicked">
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

    <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
  </CDBSidebar>
</div>


  )
}

export default Sidebar