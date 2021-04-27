import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { loginCheck } from "../../../util/utils";
import LoadingOverlay from "react-loading-overlay";

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CInputRadio,
    CCardFooter,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CButtonToolbar,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea,
    CButton,
    CIcon,
    CInputCheckbox,
} from "@coreui/react";
import Autocomplete from "react-autocomplete";
import { get, post } from "../../../services/ApiServices";
import Config from "../../../services/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "semantic-ui-react";
import { Table } from "antd";
import ReactDragListView from "react-drag-listview";
import "./index.css";
const getBadge = (status) => {
    switch (status) {
        case 'A':
            return "success";
        case 'P':
            return "warning";
        default:
            return "primary";
    }
};
const fields = [
    { key: "userid", label: "Id" },
    { key: "email", label: "Email" },
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile" },
    { key: "status", label: "Status" },
    {
        key: "show_details",
        label: "",
        _style: { width: "3%" },
        sorter: false,
        filter: false,
    },
];

const docFields = [
    { key: "documentType", label: "Document Type" },
    { key: "documentLink", label: "Document Directory" },
    { key: "link", label: "Link" },
    {
        key: "show_details",
        label: "",
        _style: { width: "3%" },
        sorter: false,
        filter: false,
    },
];
const UserProfiles = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [userData, setUserData] = useState([]);
    const [policyData, setPolicyData] = useState([]);
    const [prodModal, setProdModal] = useState(false);
    const [answer, setAnswer] = useState("");
    const [faqId, setFaqId] = useState(0);
    const [language, setLanguage] = useState(0);
    const [eventType, setEventType] = useState("");
    const [question, setQuestion] = useState("");
    const [userModal, setUserModal] = useState(false);
    const [searchUserList, setSearchUserList] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [loadingState, setLoadingState] = useState(
        <div className="d-flex align-items-center text-dark m-3">
            <strong>Loading...</strong>
            <div
                className="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
            ></div>
        </div>
    );
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const [userButtonChecked, setUserButtonChecked] = useState(true);
    const [dName, setDName] = useState("");
    const [currentUserDocs, setCurrentUserDocs] = useState("");
    const [cName, setCname] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [domain, setDomain] = useState("");
    const [value, setValue] = useState("");
    const [domainFQDN, setDomainFQDN] = useState("");
    const [policyId, setPolicyId] = useState("");
    const [policyList, setPolicyList] = useState([]);
    const [adGroups, setAdGroups] = useState([]);
    const [adGroupsWithLabel, setAdGroupsWithLabel] = useState([]);
    const [removeSelected, setRemoveSelected] = useState(false);

    const [isUserSearched, setIsUserSearched] = useState(false);

    const [selectedGroupName, setSelectedGroupName] = useState("Select Group");
    const [selectedPolicyName, setSelectedPolicyName] = useState("");
    const [selectedPolicyId, setSelectedPolicyId] = useState(null);

    const [isProtected, setIsProtected] = useState(0);

    const radioInputChange = (e) => {
        if (e.target.value == "option1") {
            setLanguage(1);
        } else {
            setLanguage(2)
        }
    };
    const changeValue = (e) => {
        setSelectedPolicyName(e.currentTarget.textContent);
        setSelectedPolicyId(parseInt(e.currentTarget.id));
    };

    const pageChange = (newPage) => {
        currentPage !== newPage && history.push(`/users?page=${newPage}`);
    };

    const sendProtectedUser = async () => {


        var faq = {
            question: question,
            answer: answer,
            country_id: language,
            status: 'A',

        }
        if (eventType == "edit") {
            faq["id"] = faqId;
        }
        if (question == "" || answer == "") {
            Swal.fire("Error", "Please select policy!", "error");
            return;
        }


        Swal.fire({
            title: "Are you sure?",
            text: "You will add item to faq list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.value) {
                var result;
                if (faq.id > 0) {

                    result = await post(
                        Config.serverUrl + "faq/updateFaq",
                        faq
                    );
                }
                else {

                    result = await post(
                        Config.serverUrl + "faq/addfaq",
                        faq
                    );
                }

                if (result.status === 200) {
                    Swal.fire(
                        "FAQ Added!",
                        "FAQ added successfully.",
                        "success"
                    );
                    setQuestion("");
                    setAnswer("");
                    setFaqId(0);
                    setLanguage(0);
                    setProdModal(false);
                    fetchData();
                } else {
                    Swal.fire("Bad Request", result, "error");
                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Action cancelled", "error");
            }
        });

        //this.setState({userData : userData.push(obj)})
    };
    async function fetchData() {
        setLoadingState(
            <div className="d-flex align-items-center text-dark m-3">
                <strong>Loading...</strong>
                <div
                    className="spinner-border ml-auto"
                    role="status"
                    aria-hidden="true"
                ></div>
            </div>
        );
        // You can await here
        let configData = await get(Config.serverUrl + "user/getuserprofiles");
        var array = configData.data.result;

        var unique = [...new Set(array.map(item => item.userid))]; // [ 'A', 'B']
        var res = [];
        var currentUser = {};
        for (var i = 0; i < unique.length; i++) {
            let userDocs = [];
            for (var a = 0; a < array.length; a++) {
                if (unique[i] == array[a].userid) {
                    currentUser = array[a];
                    userDocs.push({ documentLink: array[a].documentLink, documentType: array[a].documentType })
                }
            }
            res.push({ userid: currentUser.userid, email: currentUser.email, name: currentUser.name, mobile: currentUser.mobile, documentLink:"dd" ,docs:userDocs})
        }

        setUserData(res)

        // ...

        setLoadingState(
            <div className="d-flex align-items-center text-dark m-3">
                <strong>No Item...</strong>
            </div>
        );
    }


    const searchUser = async () => {
        if (cName.length < 3) {
            Swal.fire("Warning", "You should enter at least 3 characters ", "error");
            return false;
        }
        var username = "";
        if (cName.indexOf("@") >= 0) {
            username = cName.substring(0, cName.indexOf("@"));
        } else {
            username = cName;
        }

        let result = await get(Config.serverUrl + "api/ad/findusers/" + username);
        // if (result.status != 200 && result.message.indexOf("404") >= 1) {
        //   Swal.fire("Warning", "User not found", "warning");
        //   return false;
        // }
        debugger;
        if (result.data.result == "null") {
            Swal.fire("Warning", "User not found", "warning");
            return false;
        }
        let data = result.data.result;
        if (data.length == 1) {
            setCname(
                data[0].properties.userprincipalname[0] // varsa display name
                    ? data[0].properties.userprincipalname[0]
                    : data[0].properties.cn[0]
            );
            setDisplayName(
                data[0].properties.displayname[0]
                    ? data[0].properties.displayname[0]
                    : data[0].properties.cn[0]
            );
            return data[0].properties.userprincipalname[0]
                ? data[0].properties.userprincipalname[0]
                : data[0].properties.cn[0];
        }
        setSearchUserList(data);

        setUserModal(true);
        return false;
    };

    const resetModalLabels = () => {
        setAnswer("");
        setQuestion("");
        setLanguage(0);
        setFaqId(0);
    };

    const onChangeGroupDropdown = (event, data) => {
        setSelectedGroupName(data.value);
    };

    const onRemoveClick = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will delete " + item.question + " from faq list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.value) {
                console.log("DELETED");
                var obj = {
                    id: item.id,
                };
                var result = await post(
                    Config.serverUrl +
                    "api/faq/removefaq", obj
                );
                if (result.status !== 500) {
                    Swal.fire(
                        "FAQ object is Deleted!",
                        "FAQ object is deleted successfully.",
                        "success"
                    );
                    fetchData();
                    // updateGroupPriority(newUserData);
                    //fetchData();
                } else {
                    Swal.fire("Bad Request", result, "danger");
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Action cancelled", "error");
            }
        });
    };



    const onRowClick = (item) => {
        console.log("not remove");
        //history.push(`/users/${item.id}`);
    };

    useEffect(() => {
        fetchData();
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);
    const onDragEnd = async (fromIndex, toIndex) => {
        setIsLoaderActive(true);
        if (toIndex < 0) return; // Ignores if outside designated area
        const items = [...userData];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, item);
        // updateGroupPriority(items);
    };

    const setProdEditModal = (item) => {
        setCurrentUserDocs(item.docs)
        
        setProdModal(true);

    }
    const showDocument = (url) => {
        var _url = url.replace(window.location.origin, "444car.com");
        var a = document.createElement('a');
        a.target = "_blank";
        a.href = url;
        a.click();

    }
    return (
        <>
            <LoadingOverlay active={isLoaderActive} spinner text="Loading...">
                <CRow>
                    <CCol xl={12}>

                        <CCard>
                            <CCardHeader>
                                <CCol col="12" sm="12" md="12" xl className="mb-3 mb-xl-0">
                                    <CButton
                                        onClick={() => { resetModalLabels(); setEventType("new"); setProdModal(true) }}
                                        block
                                        color="success"
                                    >
                                        Add New FAQ
                                 </CButton>
                                </CCol>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    res
                                    items={userData}
                                    fields={fields}
                                    noItemsViewSlot={loadingState}
                                    hover
                                    striped
                                    tableFilter
                                    bordered
                                    size="sm"
                                    itemsPerPage={5}
                                    onPaginationChange={(e) =>
                                        sessionStorage.setItem("dbPnum", String(e))
                                    }

                                    pagination
                                    scopedSlots={{
                                        status: (item, index) => {
                                            return item.status == "A" ? (
                                                <td className="py-2">

                                                    {"Aktif"}
                                                </td>
                                            ) : (
                                                    <td>{"Onay Bekliyor"}</td>
                                                );
                                        },
                                     
                                        show_details: (item, index) => {
                                            return item.docs ? (
                                                <td className="py-2" style={{ display: "flex" }}>
                                                    <CButton
                                                        style={{ marginRight: "10px" }}
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => setProdEditModal(item)}

                                                    >
                                                        {"Edit"}
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => {
                                                            onRemoveClick(item)
                                                        }}
                                                    >
                                                        {"Remove"}
                                                    </CButton>
                                                </td>
                                            ) : (
                                                    <td></td>
                                                );
                                        },

                                    }}
                                />

                            </CCardBody>
                        </CCard>





                    </CCol>
                    <CModal
                        show={prodModal}
                        size="lg"
                        onClose={() => {
                            setProdModal(false);
                            resetModalLabels();
                        }}
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Documents</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                                <CCol md="12">
                                    <CDataTable
                                        res
                                        items={currentUserDocs}
                                        fields={docFields}
                                        noItemsViewSlot={loadingState}
                                        hover
                                        striped
                                        tableFilter
                                        bordered
                                        size="sm"
                                        itemsPerPage={5}
                                        onPaginationChange={(e) =>
                                            sessionStorage.setItem("dbPnum", String(e))
                                        }

                                        pagination
                                        scopedSlots={{
                                            documentType: (item, index) => {
                                                if (item.documentType == 1) {
                                                    return <td>Ticari Sicil Kaydı</td>
                                                }
                                                if (item.documentType == 2) {
                                                    return <td>Sirküler</td>
                                                }
                                                if (item.documentType == 3) {
                                                    return <td>Yetkili Temsil Belgesi</td>
                                                }
                                                if (item.documentType == 4) {
                                                    return <td>Faaliyet Belgesi</td>
                                                }
                                           
                                            },
                                            show_details: (item, index) => {
                                                return item.documentLink ? (
                                                    <td className="py-2" style={{ display: "flex" }}>
                                                        <CButton
                                                            style={{ marginRight: "10px" }}
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => showDocument(item.documentLink)}

                                                        >
                                                            {"Link"}
                                                        </CButton>
                                                        <CButton
                                                            style={{ marginRight: "10px" }}
                                                            color="warning"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => setProdEditModal(item)}

                                                        >
                                                            {"Edit"}
                                                        </CButton>
                                                        <CButton
                                                            color="danger"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => {
                                                                onRemoveClick(item)
                                                            }}
                                                        >
                                                            {"Remove"}
                                                        </CButton>
                                                    </td>) : (<td></td>)
                                            },

                                        }}
                                    />
                                </CCol>
                          

                            {/*  <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="DName">DName</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput id="DName" onChange={event => setDName(event.target.value)} name="DName" placeholder="DName" />
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="DName">Domain</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput id="Domain" onChange={event => setDomain(event.target.value)}  name="Domain" placeholder="Domain" />
          </CCol>
        </CFormGroup> */}

                        </CModalBody>
                        <CModalFooter>
                            <CButton color="success" onClick={sendProtectedUser}>
                                Add
              </CButton>{" "}
                            <CButton
                                color="secondary"
                                onClick={() => {
                                    setProdModal(false);
                                    resetModalLabels();
                                }}
                            >
                                Cancel
              </CButton>
                        </CModalFooter>
                    </CModal>

                    <CModal
                        show={userModal}
                        size="lg"
                        onClose={() => setUserModal(false)}
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Add Protected User</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <th>Username</th>
                                    <th>Display Name</th>
                                </thead>
                                <tbody>
                                    {searchUserList.map((obj) => {
                                        return (
                                            <tr key={obj.path}>
                                                <td>
                                                    <CFormGroup row variant="checkbox" className="ml-2">
                                                        <CInputRadio
                                                            className="form-check-input"
                                                            id="radio1"
                                                            name="radios"
                                                            value={
                                                                obj.properties.userprincipalname
                                                                    ? obj.properties.userprincipalname[0]
                                                                    : obj.properties.cn[0]
                                                            }
                                                        />
                                                        <CLabel variant="checkbox" htmlFor="radio1">
                                                            {obj.properties.userprincipalname
                                                                ? obj.properties.userprincipalname[0]
                                                                : obj.properties.cn[0]}
                                                        </CLabel>
                                                    </CFormGroup>
                                                </td>
                                                <td>
                                                    <CFormGroup row variant="checkbox">
                                                        <CLabel variant="checkbox" htmlFor="radio1">
                                                            {obj.properties.displayname
                                                                ? obj.properties.displayname[0]
                                                                : obj.properties.cn[0]}
                                                        </CLabel>
                                                    </CFormGroup>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="success" >
                                Add
              </CButton>{" "}
                            <CButton color="secondary" onClick={() => setUserModal(false)}>
                                Cancel
              </CButton>
                        </CModalFooter>
                    </CModal>
                </CRow>
            </LoadingOverlay>
        </>
    );
};

export default UserProfiles;
