import React, { Component } from 'react';
import { Table, Input, CardFooter } from 'reactstrap';
import   SelectSearch   from 'react-select-search';
import { t } from "ttag";
import { get, post } from "../../../services/ApiServices";
import styled from "@emotion/styled";
import Select from "react-dropdown-select";
import Swal from "sweetalert2";
import "./index.css";

import { CLabel, CButton, CModal, CModalHeader, CModalBody , CModalTitle,CFormGroup, CRow, CCard, CCardBody, CCardHeader, CInput, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CModalFooter } from '@coreui/react';
import { Tab } from 'bootstrap';
const ref = React.createRef();
const options = {
    orientation: 'landscape'
};
const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
        dropdownRenderer &&
        `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;const hraOptions = [{ id: 1, name: "HRA1" }, { id: 2, name: "HRA2" }, { id: 3, name: "HRA3" }];
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            ticaretImgCollection: null,
            faaliyetImgCollection: null,
            digerImgCollection:null,
            sirkulerImgCollection: null,
            yetkiliImgCollection: null,
            referenceOtp: null,
            currentOtpCode:null,
            otpCodeFromWS:null,
            msisdn: null,
            currentUserDoc: [{document_link:"",document_type_id:1}],
            updatedDocument: null,
            documentNames: ["", "Ticaret Sicil Kaydı", "Sirküler","Yetkili Temsil Belgesi","Faaliyet Belgesi"],
            userid: 14,
            userDocs: [],
            logintype: 1,
            searchBy:"name",
            name: "",
            surname: "",
            email: "",
            mobile: "",
            initialMobile: "",
            selectedCity: [],
            companytitle:"",
            address:"",
            fileUpdateModal:false,
            telephone:"",
            fax:"",
            url:"",
            city: "",
            SelectSearchOption: "",
            location:"",
            postcode:"",
            postcodeApi:"",
            taxadmin:"",
            taxid: "",
            taxidentification:"",
            kdvno:"",
            description: "",
            countries: [{name:""}],
            prodModal:false,
            selectBoxLoading:true
        };
        this.onTicaretSicilFileChange = this.onTicaretSicilFileChange.bind(this);
        this.sendOtpCode = this.sendOtpCode.bind(this);
        this.onSirkulerFileChange = this.onSirkulerFileChange.bind(this);
        this.onYetkiliTeslimFileChange = this.onYetkiliTeslimFileChange.bind(this);
        this.onFaaliyetFileChange = this.onFaaliyetFileChange.bind(this);
        this.onDigerFileChange = this.onDigerFileChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this._reCaptchaRef = React.createRef();
    }
    async componentDidMount() {
        
        this.getUserProfile();
    }

    async getUserProfile() {
        let res = await get("/user/GetUserProfileById"); //todo userid düzenle
        debugger;
        this.setState({
            userid: res.data.userid,
            logintype: res.data.logintype,
            name: res.data.name,
            surname: res.data.surname,
            email: res.data.email,
            mobile: res.data.mobile,
            initialMobile: res.data.mobile,
            userDocs: res.data.userDocs,
            companytitle: res.data.companytitle,
            address: res.data.address,
            telephone: res.data.telephone,
            fax: res.data.fax,
            url: res.data.url,
            city: res.data.city,
            location: res.data.location,
            postcode: res.data.postcode,
            postcodeApi: res.data.postcodeApi,
            taxadmin: res.data.taxadmin, //taxadmin
            taxidentification: res.data.taxidentification, //taxidentification
            taxid: res.data.taxid,//taxid
            kdvno: res.data.kdvno,
            description: res.data.description,
        });
        // dosyaları gönder deidğinde user documents kontrolu yapmaması nulldan farklı için ekliyor
        for (var i = 0; i < this.state.userDocs.length; i++) {
            if (this.state.userDocs[i].document_type_id == 1)
                this.setState({ ticaretImgCollection: "" })
            if (this.state.userDocs[i].document_type_id == 2)
                this.setState({ sirkulerImgCollection: "" })
            if (this.state.userDocs[i].document_type_id == 3)
                this.setState({ yetkiliImgCollection: "" })
            if (this.state.userDocs[i].document_type_id == 4)
                this.setState({ faaliyetImgCollection: "" })
        }
        debugger;
        let cities = await get("/city/getcities");
        let _selectedCity = cities.data.result.find(x => x.name == res.data.city);
        _selectedCity = (typeof _selectedCity == "undefined") ? cities.data.result[0] : _selectedCity;
        let _selectedHra = hraOptions.find(x => x.name == res.data.taxidentification);
        _selectedHra = (typeof _selectedHra == "undefined") ? hraOptions[0] : _selectedHra;

        this.setState({ countries: cities.data.result })

        this.setState({ selectedCity: [_selectedCity] });
        this.setState({ selectedHraValues: [_selectedHra] });


        this.setState({ selectBoxLoading: false })
    }

    onFileChange(e) {
        this.setState({ updatedDocument: e.target.files })
    }
    onDigerFileChange(e) {
        this.setState({ digerImgCollection: e.target.files })
    }
    onSirkulerFileChange(e) {
        this.setState({ sirkulerImgCollection: e.target.files })
    }
    onFaaliyetFileChange(e) {
        this.setState({ faaliyetImgCollection: e.target.files })
    }
    onYetkiliTeslimFileChange(e) {
        this.setState({ yetkiliImgCollection: e.target.files })
    }
    onTicaretSicilFileChange(e) {
        this.setState({ ticaretImgCollection: e.target.files })
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    updateImage = async (id, guid) => {
        let url = this.state.currentUserDoc.document_link.split('/');
        url.pop();
        let documentLink = url.join('/');

        for (const key of Object.keys(this.state.updatedDocument)) {

            var formData = new FormData();
            formData.append('user_id', this.state.userid);
            formData.append('document_type_id', this.state.currentUserDoc.document_type_id);
            formData.append('created_by', this.state.email);
            formData.append('document_link', documentLink);
            formData.append('old_document_link', this.state.currentUserDoc.document_link);
            formData.append('imgCollection', this.state.updatedDocument[key])
            let res1 = await post("/user/UpdateUserProfileDocument", formData);
            if (res1.status == 200) {
                Swal.fire("Success", "Files Uploaded Successfully", "success");
            }
        }
    }
    sendImage = async (id,guid) => {
        if (id == 1) {
            for (const key of Object.keys(this.state.ticaretImgCollection)) {
                debugger;
                var formData = new FormData();
                formData.append('user_id', this.state.userid);
                formData.append('document_type_id', 1);
                formData.append('created_by', this.state.email);
                formData.append('guid', guid);
                formData.append('imgCollection', this.state.ticaretImgCollection[key])
                let res1 = await post("/user/UploadUserProfileDocuments", formData);
            }
        }
        if (id == 2) {
            for (const key of Object.keys(this.state.sirkulerImgCollection)) {
                debugger;
                var formData = new FormData();
                formData.append('imgCollection', this.state.sirkulerImgCollection[key])
                formData.append('user_id', this.state.userid);
                formData.append('document_type_id', 2);
                formData.append('guid', guid);
                formData.append('created_by', this.state.email);
                let res2 = await post("/user/UploadUserProfileDocuments", formData);
            }
        }
        if (id == 3) {
            for (const key of Object.keys(this.state.yetkiliImgCollection)) {
                debugger;
                var formData = new FormData();
                formData.append('user_id', this.state.userid);
                formData.append('document_type_id', 3);
                formData.append('created_by', this.state.email);
                formData.append('guid', guid);
                formData.append('imgCollection', this.state.yetkiliImgCollection[key])
                let res3 = await post("/user/UploadUserProfileDocuments", formData);
            }
        }
        if (id == 4) {
            for (const key of Object.keys(this.state.faaliyetImgCollection)) {
                debugger;
                var formData = new FormData();
                formData.append('imgCollection', this.state.faaliyetImgCollection[key])
                formData.append('user_id', this.state.userid);
                formData.append('document_type_id', 4);
                formData.append('guid', guid);
                formData.append('created_by', this.state.email);
                let res4 = await post("/user/UploadUserProfileDocuments", formData);
                if (res4.status == 200) {
                    Swal.fire("Success", "Files Uploaded Successfully", "success");
                }
                else {
                    Swal.fire("Error", "File Could Not Upload", "error");
                }
            }
        }
    }
    handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        if (this.state.logintype == 1) {
            return;
        }
        await this.submitFiles();
    }
    submitFiles = async () => {
        if (this.state.logintype == 1) {
            return;
        }

        if (this.state.sirkulerImgCollection != null && this.state.ticaretImgCollection != null && this.state.faaliyetImgCollection != null && this.state.yetkiliImgCollection != null) {

            let guid = this.uuidv4();
            if (this.state.ticaretImgCollection != "")
                await this.sendImage(1, guid);
            if (this.state.sirkulerImgCollection != "")
                await this.sendImage(2, guid);
            if (this.state.yetkiliImgCollection != "")
                await this.sendImage(3, guid);
            if (this.state.faaliyetImgCollection != "")
                await this.sendImage(4, guid);
        }
        else {
            alert("Lütfen dosyaları yükleyiniz")
        }
    }
    handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (this.state.updatedDocument != null ) {

            let guid = this.uuidv4();
            await this.updateImage(this.state.currentUserDoc.document_type_id, this.state.currentUserDoc.document_link);

        }
        else {
            alert("Lütfen dosyaları yükleyiniz")
        }
    }

    setValues(selectedCity) {

        this.setState({ selectedCity: selectedCity });
    };

    setHraValues(selectedHraValues) {

        this.setState({ selectedHraValues: selectedHraValues });
    };

    async sendOtpCode() {
        debugger;
        if (this.state.mobile != null && this.state.mobile.length > 0 && this.isMobileNumber(this.state.mobile) && this.isMobileNumber(this.state.initialMobile)) {
            this.updateUser();
            this.getUserProfile()
            return;
        }
        if (!this.isMobileNumber(this.state.mobile)) {
            alert("Lütfen geçerli telefon numarası giriniz. Örn : 5xxxxxxx22");
            return;
        }
        var obj = { phoneNumber: this.state.mobile,countryCode:"tr" }
        let res = await post("/user/sendOtpCode", obj);
        debugger;
        if (res.data.code) {

            //this.setState({ referenceOtp: JSON.parse(res.data.result).result.reference })
            //this.setState({ msisdn: JSON.parse(res.data.result).result.msisdn })
            this.setState({ prodModal: true })
            this.setState({ otpCodeFromWS: res.data.code})
            return;
        }
        else {
            alert("Telefon numarası girmeden güncelleme yapamazsınız.")
            return;
        }
    }

    isMobileNumber(mobile) {
        var mob = /^[1-9]{1}[0-9]{9}$/;
        if (mob.test(mobile) == false) {
            return false;
        }
        return true;
    }

    async updateUserProfile() {

        //if (this.state.referenceOtp == null) {

        //    alert("Lütfen Telefonunuza Gelen Doğrulama Kodunu Giriniz.")
        //    return;
        //}
        //let otpObj = { reference: this.state.referenceOtp, phoneNumber: this.state.mobile, countryCode: "TR", code: this.state.currentOtpCode }
        //let res2 = await post("/user/CheckOtp", otpObj);
        //if (res2.status != 200) {
        //    alert("Doğrulama Kodunu Yanlış Girdiniz.")
        //    return;
        //}
        if (this.state.currentOtpCode != this.state.otpCodeFromWS) {
            alert("Doğrulama Kodunu Yanlış Girdiniz.")
            return;
        }
        this.updateUser();
        this.getUserProfile()
        this.setState({
            prodModal: false,
        })
    }
    async updateUser() {

        let cityName = ""
        if (this.state.selectedCity.length > 0 && this.state.selectedCity[0]) {
            cityName = this.state.selectedCity[0].name;
        }

        let hraName = ""
        if (this.state.selectedHraValues.length > 0 && this.state.selectedHraValues[0]) {
            hraName = this.state.selectedHraValues[0].name;
        }

        let obj =
        {
            userid: this.state.userid,
            logintype: this.state.logintype,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            mobile: this.state.mobile,
            companytitle: this.state.companytitle,
            address: this.state.address,
            telephone: this.state.telephone,
            fax: this.state.fax,
            url: this.state.url,
            city: cityName,
            location: this.state.location,
            postcode: this.state.postcode,
            postcodeApi: this.state.postcodeApi,
            taxadmin: this.state.taxadmin, //taxadmin
            taxidentification: hraName, //taxidentification
            taxid: this.state.taxid,//taxid
            kdvno: this.state.kdvno,
            description: this.state.description
        };

        let res = await post("/user/UpdateUserProfileById", obj);
        if (res.status == 200) {
            Swal.fire("Success", "Profile Updated Successfully", "success");
            await this.submitFiles();
        }
    }
    changeFile(currentUserDoc) {
        this.setState({ fileUpdateModal: true })
        this.setState({ currentUserDoc: currentUserDoc })
    }
    render() {
        return (

            <>
                <CRow>
                    <CCol xs="12" md="12" xl="12">
                        <CCard>
                            {(this.state.logintype == 2 || this.state.logintype == 3) ?
                                <CCardHeader>
                                    Şirket Yetkilisi
                             </CCardHeader> :
                                <CCardHeader>
                                    Kullanıcı Profili
                             </CCardHeader> 
                            }
                            <CCardBody>
                                <CRow>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Adınız</CLabel>
                                        <CInput value={this.state.name}
                                            onChange={(e) => {
                                                this.setState({ name: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Soyadınız</CLabel>
                                        <CInput value={this.state.surname}
                                            onChange={(e) => {
                                                this.setState({ surname: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                 </CRow>
                                <CRow>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Email</CLabel>
                                        <CInput value={this.state.email}
                                           disabled type="text" />
                                    </CCol>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>GSM</CLabel>
                                        {
                                            (this.state.initialMobile != null && this.state.initialMobile.length > 0 && this.isMobileNumber(this.state.initialMobile)) ? <CInput disabled type="text" value={this.state.initialMobile} />
                                                : <CInput  value={this.state.mobile}
                                                    onChange={(e) => {
                                                        this.setState({ mobile: e.target.value });
                                                    }} type="text" />

                                        }
                                        
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    <hr />

                    <CCol xs="12" md="12" xl="12">
                        <CCard>
                            {(this.state.logintype == 2 || this.state.logintype == 3) ?
                                <CCardHeader>
                                    Şirket Bilgileri
                             </CCardHeader> :
                                <CCardHeader>
                                    Kullanıcı Bilgileri
                             </CCardHeader>
                            }
                            
                            <CCardBody>
                                {(this.state.logintype == 2 || this.state.logintype == 3) &&
                                    <CRow>
                                        <CCol xs="12" md="12" xl="12">
                                            <CLabel>Şirket Ünvanı</CLabel>
                                            <CInput value={this.state.companytitle}
                                                disabled type="text" />
                                        </CCol>
                                    </CRow>
                                }
                                
                                <CRow>
                                    <CCol xs="12" md="12" xl="12">
                                        <CLabel>Adres</CLabel>
                                        <CInput value={this.state.address}
                                            onChange={(e) => {
                                                this.setState({ address: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Telefon</CLabel>
                                        <CInput value={this.state.telephone}
                                            onChange={(e) => {
                                                this.setState({ telephone: e.target.value });
                                            }} type="number" />
                                    </CCol>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Faks</CLabel>
                                        <CInput value={this.state.fax}
                                            onChange={(e) => {
                                                this.setState({ fax: e.target.value });
                                            }} type="number" />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="6" md="6" xl="6">
                                        <CLabel>Web Adresi</CLabel>
                                        <CInput value={this.state.url}
                                            onChange={(e) => {
                                                this.setState({ url: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="2" md="2" xl="2">
                                        <CLabel>Eyalet</CLabel>
                                        <StyledSelect
                                            placeholder="Select City"
                                            loading={this.state.selectBoxLoading}
                                            searchBy={this.state.searchBy}
                                            options={this.state.countries}
                                            labelField={this.state.searchBy}
                                            valueField={this.state.searchBy}
                                            separator={this.state.separator}
                                            clearable={this.state.clearable}
                                            onChange={values => this.setValues(values)}
                                            value={this.state.selectedCity}
                                            values={this.state.selectedCity}
                                            searchable={true}
                                        />
                                    </CCol>
                                    <CCol xs="4" md="4" xl="4">
                                        <CLabel>Şehir</CLabel>
                                        <CInput value={this.state.city}
                                            onChange={(e) => {
                                                this.setState({ city: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    <CCol xs="4" md="4" xl="4">
                                        <CLabel>Lokasyon</CLabel>
                                        <CInput value={this.state.location}
                                            onChange={(e) => {
                                                this.setState({ location: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="3" md="3" xl="3">
                                        <CLabel>Posta Kodu</CLabel>
                                        <CInput value={this.state.postcode}
                                            onChange={(e) => {
                                                this.setState({ postcode: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    <CCol xs="9" md="9" xl="9">
                                        <CLabel>Api From PostCode</CLabel>
                                        <CInput value={this.state.postcodeApi}
                                            onChange={(e) => {
                                                this.setState({ postcodeApi: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                </CRow>
                                {(this.state.logintype == 2 || this.state.logintype == 3) ?
                                    
                                <CRow>
                                    <CCol xs="3" md="3" xl="3">
                                        <CLabel>Vergi Dairesi</CLabel>
                                        <CInput value={this.state.taxadmin}
                                            onChange={(e) => {
                                                this.setState({ taxadmin: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    <CCol xs="1" md="1" xl="1">
                                        <CLabel>HRA/HRB</CLabel>
 
                                        <StyledSelect
                                            placeholder="Select HRA/HRB"
                                            loading={this.state.selectBoxLoading}
                                            searchBy={this.state.searchBy}
                                            options={hraOptions}
                                            labelField={this.state.searchBy}
                                            valueField={this.state.searchBy}
                                            separator={this.state.separator}
                                            clearable={this.state.clearable}
                                            onChange={values => this.setHraValues(values)}
                                            values={this.state.selectedHraValues}
                                            searchable={true}
                                        />
                                    </CCol>
                                    <CCol xs="3" md="3" xl="3">
                                        <CLabel>HRA/HRB No</CLabel>
                                        <CInput value={this.state.taxid}
                                            onChange={(e) => {
                                                this.setState({ taxid: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    <CCol xs="3" md="3" xl="3">
                                        <CLabel>KDV No</CLabel>
                                        <CInput value={this.state.kdvno}
                                            onChange={(e) => {
                                                this.setState({ kdvno: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                    </CRow>
                                    :
                                  <></>
                                }
                                <CRow>
                                    <CCol xs="12" md="12" xl="12">
                                        <CLabel>Impressium</CLabel>
                                        <CInput value={this.state.description}
                                            onChange={(e) => {
                                                this.setState({ description: e.target.value });
                                            }} type="text" />
                                    </CCol>
                                </CRow>
                                

                                <hr />
                                {((this.state.logintype == 2 || this.state.logintype == 3) && this.state.status != "O") &&
                                    <form onSubmit={this.handleSubmit}>
                                    {(this.state.userDocs.filter(z => z.document_type_id == 1).length > 0) ?
                                        <CRow>
                                            <CCol xs="2" md="2" xl="2">
                                                <a href={this.state.userDocs.filter(z => z.document_type_id == 1)[0].document_link} target="_blank">Ticaret Sicil Kaydı</a>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CButton className="btn btn-warning"  onClick={() => this.changeFile(this.state.userDocs.filter(z => z.document_type_id == 1)[0])} >Düzenle</CButton>
                                            </CCol>
                                        </CRow>
                                        :
                                        <CRow>
                                            <CCol xs="3" md="3" xl="3">
                                                <CLabel>Ticaret Sicil Kaydı</CLabel>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CInput type="file" onChange={this.onTicaretSicilFileChange} style={{ height: "35px" }} />
                                            </CCol>
                                        </CRow>

                                    }
                                    {(this.state.userDocs.filter(z => z.document_type_id == 2).length > 0) ?
                                        <CRow>
                                            <CCol xs="2" md="2" xl="2">
                                                <a href={this.state.userDocs.filter(z => z.document_type_id == 2)[0].document_link} target="_blank">Sirküler</a>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CButton className="btn btn-warning" onClick={() => this.changeFile(this.state.userDocs.filter(z => z.document_type_id == 2)[0])} >Düzenle</CButton>
                                            </CCol>
                                        </CRow>
                                        :
                                        <CRow>
                                            <CCol xs="3" md="3" xl="3">
                                                <CLabel>Sirküler</CLabel>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CInput type="file" onChange={this.onSirkulerFileChange} style={{ height: "35px" }} />
                                            </CCol>
                                        </CRow>

                                    }
                                    {(this.state.userDocs.filter(z => z.document_type_id == 3).length > 0) ?
                                        <CRow>
                                            <CCol xs="2" md="2" xl="2">
                                                <a href={this.state.userDocs.filter(z => z.document_type_id == 3)[0].document_link} target="_blank">Yetkili Temsil Belgesi</a>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CButton className="btn btn-warning" onClick={() => this.changeFile(this.state.userDocs.filter(z => z.document_type_id == 3)[0])} >Düzenle</CButton>
                                            </CCol>
                                        </CRow>
                                        :
                                        <CRow>
                                            <CCol xs="3" md="3" xl="3">
                                                <CLabel>Yetkili Temsil Belgesi</CLabel>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CInput type="file" onChange={this.onYetkiliTeslimFileChange} style={{ height: "35px" }} />
                                            </CCol>
                                        </CRow>

                                    }
                                   
                                    {(this.state.userDocs.filter(z => z.document_type_id == 4).length > 0) ?
                                        <CRow>
                                            <CCol xs="2" md="2" xl="2">
                                                <a href={this.state.userDocs.filter(z => z.document_type_id == 4)[0].document_link} target="_blank">Faaliyet Belgesi</a>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CButton className="btn btn-warning" onClick={() => this.changeFile(this.state.userDocs.filter(z => z.document_type_id == 4)[0])} >Düzenle</CButton>
                                            </CCol>
                                        </CRow>
                                        :
                                        <CRow>
                                            <CCol xs="3" md="3" xl="3">
                                                <CLabel>Faaliyet Belgesi</CLabel>
                                            </CCol>
                                            <CCol xs="9" md="9" xl="9">
                                                <CInput type="file" onChange={this.onFaaliyetFileChange} style={{ height: "35px" }} />
                                            </CCol>
                                        </CRow>

                                    }

                                        <div>
                                            <CRow>
                                                <CCol xs="3" md="3" xl="3">
                                                    <CLabel></CLabel>
                                                </CCol>
                                                <CCol xs="9" md="9" xl="9">
                                                    <CButton type="submit"
                                                        className="btn btn-primary" style={{ float: "left" }}> Dosyaları Yükle</CButton>
                                                </CCol>

                                            </CRow>
                                        </div>
                                    </form>
                                }
                            </CCardBody>
                            <CardFooter>
                                <CButton onClick={this.sendOtpCode}
                                 className="btn btn-primary" style={{float:"right"}}> Kaydet</CButton>

                            </CardFooter>
                        </CCard>
                    </CCol>
                </CRow>
                <CModal
                    show={this.state.prodModal}
                    size="lg"
                    onClose={() => {
                        this.setState({ prodModal : false });
                    }}
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Telefon Doğrulama</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Kodu Giriniz</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput value={this.state.currentOtpCode}
                                    onChange={(e) => {
                                        this.setState({ currentOtpCode: e.target.value });
                                    }} type="text" />
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton onClick={() => this.updateUserProfile()}
                            className="btn btn-success" style={{ float: "right" }}> Gönder</CButton>
                    </CModalFooter>
                </CModal>


                <CModal
                    show={this.state.fileUpdateModal}
                    size="lg"
                    onClose={() => {
                        this.setState({ fileUpdateModal : false });
                    }}
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Dosya Düzenleme</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <form onSubmit={this.handleUpdateSubmit}>
                                <CRow>
                                    <CCol xs="3" md="3" xl="3">
                                    <CLabel>{this.state.documentNames[this.state.currentUserDoc.document_type_id]}</CLabel>
                                    </CCol>
                                    <CCol xs="9" md="9" xl="9">
                                        <CInput type="file" onChange={this.onFileChange} style={{ height: "35px" }} />
                                    </CCol>
                                </CRow>
                            <div>
                                <CRow>
                                    <CCol xs="3" md="3" xl="3">
                                        <CLabel></CLabel>
                                    </CCol>
                                    <CCol xs="9" md="9" xl="9">
                                        <CButton type="submit"
                                            className="btn btn-primary" style={{ float: "left" }}> Dosyayı Güncelle</CButton>
                                    </CCol>

                                </CRow>
                            </div>
                        </form>
                    </CModalBody> 
                </CModal>


            </>
        );
    }
}
