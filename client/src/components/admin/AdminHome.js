import React from 'react';
import AdminQuickMenu from "./AdminQuickMenu";
import AdminStats from "./AdminStats";

const AdminHome = () => {
    return <main className="admin center">
        <AdminQuickMenu />
        <AdminStats />
    </main>
};

export default AdminHome;
