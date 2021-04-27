import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";


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
const fields = ["name", "registered", "role", "status"];

const Tables = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>Simple Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>Loading...</strong>
                    <div
                      className="spinner-border ml-auto"
                      role="status"
                      aria-hidden="true"
                    ></div>
                  </div>
                }
                items={[]}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>Striped Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>Loading...</strong>
                    <div
                      className="spinner-border ml-auto"
                      role="status"
                      aria-hidden="true"
                    ></div>
                  </div>
                }
                items={[]}
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>Condensed Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>Loading...</strong>
                    <div
                      className="spinner-border ml-auto"
                      role="status"
                      aria-hidden="true"
                    ></div>
                  </div>
                }
                items={[]}
                fields={fields}
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>Bordered Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>No Item...</strong>
                  </div>
                }
                items={[]}
                fields={fields}
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Combined All Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>No Item...</strong>
                  </div>
                }
                items={[]}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Combined All dark Table</CCardHeader>
            <CCardBody>
              <CDataTable
                noItemsViewSlot={
                  <div className="d-flex align-items-center text-dark m-3">
                    <strong>No Item...</strong>
                  </div>
                }
                items={[]}
                fields={fields}
                dark
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
