import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CImg,
    CContainer,
    CRow,
    CLabel,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import logo from "../assets/logo/logo.svg";
import Config from "../services/Config";
import { get, post } from "../services/ApiServices";

// sidebar nav config 
import navigation from "./_nav_arklock";

const navListConst = navigation;

const TheSidebar = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.sidebarShow);
    const [imgShow, setImgShow] = useState(true);
    const [navigationList, setNavigationList] = useState();
    const [lastAds,setLastAds] = useState(null);

    const setNavigationMenu = () => {
        let tempNav = [...navListConst];
        
    for (var i = 0; i < tempNav.length; i++) {
        if (tempNav[i].name === "Son İlanlar" && lastAds === false) {
          tempNav.splice(i, 1);
          i--;
        }
      }
        setNavigationList(tempNav);
    };
    const checkLogonType = async () => {
       
          let response = await get(Config.serverUrl+ "user/GetUserRoleById");
          if (response.data != "") {
            if (response.data === 1) {
               setLastAds(true);
            } else {
                let userInfo =  await get (Config.serverUrl+ "user/GetUserProfileById");
                let loginType = (userInfo.data.logintype);
                if(loginType===3){
                    setLastAds(true);
                }
               setLastAds(false);
            }
          } else {
            setLastAds(false);
          }
        }
      

    useEffect(() => {
        checkLogonType();
    }, []);

    useEffect(() => {
        if (lastAds != null) setNavigationMenu();
      }, [lastAds]);

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => {
                console.log("val ====" + val + "SHOW === " + show);
                dispatch({ type: "set", sidebarShow: val });
            }}
            onMinimizeChange={(e) => {
                setImgShow(e);
            }}
        >
            {imgShow ? (
                <CContainer className="bg-dark" style={{ background:"#303c54 !important" }}>
                    <CRow>
                        <a
                            className="mr-auto ml-auto"
                            target="_blank"
                            href="https://www.444car.de"
                        >
                            <CImg
                                src={logo}
                                className="mb-2 mt-2"
                                width="88"
                                height="88"
                                align="left"
                            />
                        </a>
                    </CRow>
                </CContainer>
            ) : (
                    <CContainer className="bg-light" style={{ background: "#303c54 !important" }}>
                        <a
                            className="mr-auto ml-auto"
                            target="_blank"
                            href="https://www.444car.de"
                        >
                            <CImg
                                src={logo}
                                className="mb-2 mt-2 c-sidebar-brand-minimized"
                                width="32"
                                height="32"
                                align="center"
                            />
                        </a>
                    </CContainer>
                )}
            <CSidebarNav>
                <CCreateElement
                    items={navigationList ? navigationList : []}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
};
export default React.memo(TheSidebar);
