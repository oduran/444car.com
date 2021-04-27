import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CDataTable,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";
import MainChartExample from "../charts/MainChartExample.js";
import { get } from "../../services/ApiServices";
import Config from "../../services/Config";
import usersData from "../users/UsersData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faLock,
  faSignOutAlt,
  faSignInAlt,
  faDesktop,
  faBomb,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const fields = [
  "dcName",
  "userName",
  "computerName",
  "createdTime",
  "ipAddress",
  "statusId",
  {
    key: "show_details",
    label: "",
    _style: { width: "3%" },
    sorter: false,
    filter: false,
  },
];
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      fields: null,
      props: props,
      userName: "",
      loadingState: null,
    };
    this.loginCheck(this.props.history);
  }

  setLoadingState = (state) => {
    if (state == "loading" || state == null) {
      this.setState({
        loadingState: (
          <div className="d-flex align-items-center text-dark m-3">
            <strong>Loading...</strong>
            <div
              className="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ),
      });
    } else {
      this.setState({
        loadingState: (
          <div className="d-flex align-items-center text-dark m-3">
            <strong>No Data...</strong>
          </div>
        ),
      });
    }
  };

  loginCheck(history) {
    // console.log("dashboard//")
    // console.log(history.location.state)

    if (
      (history.location.state == undefined || null) &&
      (window.localStorage.getItem("user") == undefined || null)
    ) {
      this.props.history.push("/");
    } else if (window.localStorage.getItem("user") != undefined || null) {
      console.log();
    } else {
      window.localStorage.setItem("user", history.location.state.detail);
    }
  }

  async componentDidMount() {
    this.setLoadingState("loading");
    const response = await get(
      Config.serverUrl +
        "api/event/getusereventssummary/" +
        this.state.props.match.params.id
    );
    if (response.data != null) {
      this.setState({ events: response.data.reverse() });
    }

    if (response.data && response.data.length > 0) {
      this.setState({
        fields: Object.keys(response.data[0]),
        userName: response.data[0].userName,
      });
    } else {
    }
    this.setLoadingState("loaded");
  }

  getCompIcon(status) {
    switch (status) {
      case "1105":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faUnlock}
            />{" "}
            <p>&nbsp;Unlock</p>
          </CRow>
        );
      case "1115":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faUnlock}
            />{" "}
            <p>&nbsp;Remote Unlock</p>
          </CRow>
        );
      case "3104":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "orange" }}
              icon={faLock}
            />{" "}
            <p>&nbsp;Lock</p>
          </CRow>
        );
      case "3114":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "orange" }}
              icon={faLock}
            />{" "}
            <p>&nbsp;Remote Lock</p>
          </CRow>
        );
      case "3106":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "orange" }}
              icon={faLock}
            />{" "}
            <p>&nbsp;Remote Multi-logon</p>
          </CRow>
        );
      case "2112":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "red" }}
              icon={faDesktop}
            />{" "}
            <p>&nbsp;Remote Disconnected</p>
          </CRow>
        );
      case "1110":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "blue" }}
              icon={faDesktop}
            />{" "}
            <p>&nbsp;Remote Connected</p>
          </CRow>
        );
      case "1119":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faDesktop}
            />{" "}
            <p>&nbsp;Remote Connect</p>
          </CRow>
        );
      case "1102":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faSignInAlt}
            />{" "}
            <p>&nbsp;LogOn</p>
          </CRow>
        );
      case "1111":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faSignInAlt}
            />{" "}
            <p>&nbsp;LoggedOn</p>
          </CRow>
        );
      case "1112":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faSignInAlt}
            />{" "}
            <p>&nbsp;Remote LogOn</p>
          </CRow>
        );
      case "2103":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "red" }}
              icon={faSignOutAlt}
            />{" "}
            <p>&nbsp;LogOff</p>
          </CRow>
        );
      case "2113":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "red" }}
              icon={faSignOutAlt}
            />{" "}
            <p>&nbsp;Remote LogOff</p>
          </CRow>
        );
      case "1106":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "black" }}
              icon={faBomb}
            />{" "}
            <p>&nbsp;Multi-logon</p>
          </CRow>
        );
      case "1116":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "black" }}
              icon={faBomb}
            />{" "}
            <p>&nbsp;Remote Multi-logon</p>
          </CRow>
        );
      case "4102":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faPlay}
            />{" "}
            <p>&nbsp;Service Started</p>
          </CRow>
        );
      case "4110":
        return (
          <CRow className="ml-1">
            <FontAwesomeIcon
              className="mt-1 mr-1"
              style={{ color: "green" }}
              icon={faPlay}
            />{" "}
            <p>&nbsp;Service Started</p>
          </CRow>
        );

      default:
        return "-";
    }
  }
  render() {
    return (
      <>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    {this.state.userName}'s Last Activities
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      res
                      items={this.state.events}
                      fields={fields}
                      noItemsViewSlot={this.state.loadingState}
                      itemsPerPageSelect={{
                        label: "Items per page",
                        values: [10, 50, 100],
                      }}
                      hover
                      striped
                      tableFilter
                      bordered
                      size="sm"
                      itemsPerPage={10}
                      pagination
                      scopedSlots={{
                        createdTime: (item) => (
                          <td>
                            <CRow>
                              {new Date(item.createdDateTime)
                                .toString()
                                .substring(0, 21)}
                            </CRow>
                          </td>
                        ),
                        statusId: (item) => (
                          <td>
                            {this.getCompIcon(
                              item.statusId + "" + item.processID
                            )}
                          </td>
                        ),
                        show_details: (item, index) => {
                          return <td className="py-2"></td>;
                        },
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        {/*<CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Traffic</h4>
                <div className="small text-muted">November 2017</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download"/>
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {
                    ['Day', 'Month', 'Year'].map(value => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))
                  }
                </CButtonGroup>
              </CCol>
            </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Combined All dark Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
            <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
          </CCardBody>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="success"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="info"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="warning"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="danger"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  value={40}
                />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
*/}
        {/*  <WidgetsBrand withCharts/>*/}
        {/*
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Traffic {' & '} Sales
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="6" xl="6">

                    <CRow>
                      <CCol sm="6">
                        <CCallout color="info">
                          <small className="text-muted">New Clients</small>
                          <br />
                          <strong className="h4">9,123</strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="danger">
                          <small className="text-muted">Recurring Clients</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </CCallout>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Monday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="34" />
                        <CProgress className="progress-xs" color="danger" value="78" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Tuesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="56" />
                        <CProgress className="progress-xs" color="danger" value="94" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Wednesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="12" />
                        <CProgress className="progress-xs" color="danger" value="67" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Thursday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="43" />
                        <CProgress className="progress-xs" color="danger" value="91" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Friday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="22" />
                        <CProgress className="progress-xs" color="danger" value="73" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Saturday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="53" />
                        <CProgress className="progress-xs" color="danger" value="82" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Sunday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="9" />
                        <CProgress className="progress-xs" color="danger" value="69" />
                      </div>
                    </div>
                    <div className="legend text-center">
                      <small>
                        <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                        New clients
                        &nbsp;
                        <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                        Recurring clients
                      </small>
                    </div>
                  </CCol>

                  <CCol xs="12" md="6" xl="6">

                    <CRow>
                      <CCol sm="6">
                        <CCallout color="warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="success">
                          <small className="text-muted">Organic</small>
                          <br />
                          <strong className="h4">49,123</strong>
                        </CCallout>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    <div className="progress-group mb-4">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user" />
                        <span className="title">Male</span>
                        <span className="ml-auto font-weight-bold">43%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="warning" value="43" />
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user-female" />
                        <span className="title">Female</span>
                        <span className="ml-auto font-weight-bold">37%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="warning" value="37" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-globe-alt" />
                        <span className="title">Organic Search</span>
                        <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="56" />
                      </div>
                    </div>


                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-facebook" className="progress-group-icon" />
                        <span className="title">Facebook</span>
                        <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="15" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-twitter" className="progress-group-icon" />
                        <span className="title">Twitter</span>
                        <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="11" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-linkedin" className="progress-group-icon" />
                        <span className="title">LinkedIn</span>
                        <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="8" />
                      </div>
                    </div>
                    <div className="divider text-center">
                      <CButton color="link" size="sm" className="text-muted">
                        <CIcon name="cil-options" />
                      </CButton>
                    </div>

                  </CCol>
                </CRow>

                <br />

                {/*  <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User</th>
                      <th className="text-center">Country</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-us" title="us" id="us" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>50%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="success" value="50" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-cc-mastercard" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>10 sec ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-muted">

                          <span>Recurring</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-br" title="br" id="br" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>10%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="info" value="10" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-cc-visa" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>5 minutes ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-warning"></span>
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-in" title="in" id="in" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>74%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="warning" value="74" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-stripe" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>1 hour ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-secondary"></span>
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>98%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="danger" value="98" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-paypal" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last month</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-es" title="es" id="es" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>22%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="info" value="22" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-google-pay"/>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last week</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>43%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="success" value="43" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-cc-amex" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Yesterday</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>*/}
      </>
    );
  }
}
