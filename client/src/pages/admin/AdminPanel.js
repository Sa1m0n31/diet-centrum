import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/admin/AdminMenu";
import AdminHome from "../../components/admin/AdminHome";
import AdminTop from "../../components/admin/AdminTop";

const AdminPanel = ({selectedItem}) => {
    const [mainComponent, setMainComponent] = useState(<AdminHome />);

    useEffect(() => {
        switch(selectedItem) {

        }
    }, [selectedItem]);

    return <div className="container container--panel">
        <AdminMenu selectedItem={selectedItem} />
        <AdminTop />

        {mainComponent}
    </div>
};

export default AdminPanel;
