import React, {useContext} from 'react';
import {ContentContext} from "../../App";

const BeforeFooterSection = () => {
    const { c } = useContext(ContentContext);

    return <div className="section section--beforeFooter">
        <h3 className="beforeFooter__header">
            {c.beforeFooterHeader}
        </h3>
        <h4 className="beforeFooter__subheader" dangerouslySetInnerHTML={{
            __html: c.beforeFooterSubheader
        }}>

        </h4>
        <a className="btn btn--beforeFooter center"
           href={c.beforeFooterButtonLink}>
            {c.beforeFooterButtonText}
        </a>
    </div>
};

export default BeforeFooterSection;
