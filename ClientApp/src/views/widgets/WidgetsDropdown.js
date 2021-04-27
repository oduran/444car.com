import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetBrand,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = (props) => {
  const now = Date.now();
  // render
  return props.isLoading ? (
    <CRow className="d-flex justify-content-center mb-4">
      <CSpinner color="info" />
    </CRow>
  ) : (
    <CRow>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header={
            props.totalOnlineSession ? props.totalOnlineSession.toString() : "0"
          }
          text="Total Login of Last 7 Days"
          footerSlot={
            <>
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "80px" }}
                dataPoints={props.onlineInteractiveSession}
                pointHoverBackgroundColor="primary"
                label="Interactive"
                labels={props.eventDaysInt}
              />
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "80px" }}
                dataPoints={props.onlineRdpSession}
                pointHoverBackgroundColor="danger"
                label="RDP"
                labels={props.eventDaysRdp}
              />
            </>
          }
        ></CWidgetDropdown>
        {/* <CChartLine
          datasets={[
            {
              label: "Total Sessions of Last 7 Days",
              backgroundColor: "rgb(228,102,81,0.9)",
              data: props.onlineSessions,
            },
            {
              label: "Total Multi-logon Sessions of Last 7 Days",
              backgroundColor: "rgb(0,216,255,0.9)",
              data: props.multilogonSessions,
            },
          ]}
          options={{
            tooltips: {
              enabled: true,
            },
          }}
          labels={["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"]}
        /> */}
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={
            props.totalMultilogonSession
              ? props.totalMultilogonSession.toString()
              : "0"
          }
          text="Total Multi-logon Sessions of Last 7 Days"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "175px" }}
              dataPoints={props.multilogonSessions}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Multilogon Sessions"
              labels={props.eventDays}
            />
          }
        >
          {/*     <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

      <CCol sm="12" lg="4">
        <CCol sm="12" lg="12">
          <CWidgetBrand
            color="gradient-warning"
            rightHeader={
              props.onlineAgents
                ? (props.onlineAgents - props.offlineCounts).toString()
                : "0"
            }
            rightFooter="online computer"
            leftHeader={
              props.offlineCounts ? props.offlineCounts.toString() : "0"
            }
            leftFooter="offline computer"
          >
            <div className="text-value-lg">AGENTS</div>
          </CWidgetBrand>
        </CCol>

        <CCol sm="12" lg="12" className="mt-0">
          <CWidgetBrand
            color="gradient-primary"
            rightHeader={
              props.protectedUsers ? props.protectedUsers.toString() : "0"
            }
            rightFooter="Protected Users"
            leftHeader={
              props.totalProtectedUsersCount
                ? props.totalProtectedUsersCount.toString()
                : "0"
            }
            leftFooter="Protected Group Users"
          >
            <div className="text-value-lg">USERS</div>
          </CWidgetBrand>
        </CCol>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
