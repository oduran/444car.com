import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const TheHeaderSignoutButton = () => {
  const history = useHistory();
  const SignOutOnClick = () => {
    Swal.fire({
      title: "Are you sure??",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("user");
        localStorage.removeItem("LicenseExpiration");
        sessionStorage.removeItem("agentRadio");
        sessionStorage.removeItem("dbPnum");
        sessionStorage.removeItem("agentPnum");
        sessionStorage.removeItem("multilogPnum");
        sessionStorage.removeItem("policyPnum");
        sessionStorage.removeItem("expirationShowed");

        history.push("login");
      }
    });
  };
  return (
    <CButton onClick={SignOutOnClick}>
      <FontAwesomeIcon
        className="fab"
        onClick={SignOutOnClick}
        title="Sign Out"
        style={{ color: "red" }}
        icon={faSignOutAlt}
      />{" "}
      Sign Out
    </CButton>
  );
};

export default TheHeaderSignoutButton;
