import React from 'react'
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const NavbarPage = (props) => {
    const { ...rest } = props;
    return (
        <>
            <Header
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "White"
                }}
                {...rest}
            />
        </>
    )
}


export default NavbarPage

