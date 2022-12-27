import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/admin/AdminMenu";
import AdminHome from "../../components/admin/AdminHome";
import AdminTop from "../../components/admin/AdminTop";
import AdminProductList from "../../components/admin/AdminProductList";
import AdminProductEdition from "../../components/admin/AdminProductEdition";
import AdminContentEdition from "../../components/admin/AdminContentEdition";
import AdminDiscountCode from "../../components/admin/AdminDiscountCode";

const AdminPanel = ({selectedItem, page}) => {
    const [mainComponent, setMainComponent] = useState(<AdminHome />);

    useEffect(() => {
        switch(selectedItem) {
            case 0:
                setMainComponent(<AdminHome />);
                break;
            case 1:
                if(page === 0)
                    setMainComponent(<AdminProductList />);
                else if(page === 1)
                    setMainComponent(<AdminProductEdition />);
                break;
            case 4:
                setMainComponent(<AdminContentEdition />);
                break;
            case 6:
                setMainComponent(<AdminDiscountCode />);
                break;
            default:
                break;
        }
    }, [selectedItem]);

    return <div className="container container--panel">
        <AdminMenu selectedItem={selectedItem} />
        <AdminTop />

        {mainComponent}
    </div>
};

export default AdminPanel;
