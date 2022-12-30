import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/admin/AdminMenu";
import AdminHome from "../../components/admin/AdminHome";
import AdminTop from "../../components/admin/AdminTop";
import AdminProductList from "../../components/admin/AdminProductList";
import AdminProductEdition from "../../components/admin/AdminProductEdition";
import AdminContentEdition from "../../components/admin/AdminContentEdition";
import AdminDiscountCode from "../../components/admin/AdminDiscountCode";
import AdminCalendarEdition from "../../components/admin/AdminCalendarEdition";
import AdminBlogList from "../../components/admin/AdminBlogList";
import AdminBlogEdition from "../../components/admin/AdminBlogEdition";
import AdminPurchasesList from "../../components/admin/AdminPurchasesList";
import AdminPurchaseDetails from "../../components/admin/AdminPurchaseDetails";
import AdminTermsEdition from "../../components/admin/AdminTermsEdition";
import {authAdmin} from "../../helpers/api/admin";
import LoadingPage from "../shop/LoadingPage";

const AdminPanel = ({selectedItem, page}) => {
    const [mainComponent, setMainComponent] = useState(null);

    useEffect(() => {
        authAdmin()
            .then((res) => {
                if(res?.status === 201) {
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
                        case 2:
                            if(page === 0)
                                setMainComponent(<AdminPurchasesList />);
                            else if(page === 1)
                                setMainComponent(<AdminPurchaseDetails />);
                            break;
                        case 3:
                            if(page === 0)
                                setMainComponent(<AdminBlogList />);
                            else if(page === 1)
                                setMainComponent(<AdminBlogEdition />);
                            break;
                        case 4:
                            setMainComponent(<AdminContentEdition />);
                            break;
                        case 5:
                            setMainComponent(<AdminTermsEdition />);
                            break;
                        case 6:
                            setMainComponent(<AdminDiscountCode />);
                            break;
                        case 7:
                            setMainComponent(<AdminCalendarEdition />);
                            break;
                        default:
                            break;
                    }
                }
                else {
                    window.location = '/admin';
                }
            })
            .catch(() => {
                window.location = '/admin';
            });
    }, [selectedItem]);

    return mainComponent ? <div className="container container--panel">
        <AdminMenu selectedItem={selectedItem} />
        <AdminTop />

        {mainComponent}
    </div> : <LoadingPage />
};

export default AdminPanel;
