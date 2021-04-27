import React, { Component } from 'react';
import { saveLocale, getLocale } from '../../../Localization';
import { t } from "ttag";
import { Input, Button, FormGroup,Label } from 'reactstrap';
import Swal from "sweetalert2";
import $ from 'jquery';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from '../../../services/AuthService';
import { Spinner } from 'reactstrap';

//Prod
import LoadingOverlay from "react-loading-overlay";
import { Layout } from '../../../components/Layout';
import './style.css';

import './style.css';
import gifUrl from "../../Images/how_it_works_3.gif";
//Prod
//const TEST_SITE_KEY = "6LdckVUaAAAAAFhXB_xLGKHc752dIO-Z11xq20-p";
//local
const TEST_SITE_KEY = "6Levo1UaAAAAAHP8Xp1kKkVSeaB-q1-badarOLDX";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyNo: "",
            email: "",
            password: "",
            repassword: "",
            userContractText: false,
            isLoaderActive: true
        };
        this._reCaptchaRef = React.createRef();

    }
    componentDidMount() {
        this.setState({ isLoaderActive: false })
    }
    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
    };
    setCorporateType(event) {
        debugger;
        this.setState({ corporateType: parseInt(event.target.value) })
    };
    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    };
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    saveVehicleCompany = async () => {
        
        
        $(".saveVehicleCompanyButton").css("display", "block");
        if (this.state.email != null && this.validateEmail(this.state.email) && (this.state.password == this.state.repassword) && this.state.password != ""
           ) {
               if( this.state.userContractText){
                try {
                    document.getElementById("a11112").style.color = "#000000";
                    document.getElementById("a1").style.color = "#000000";

                    var res = await AuthService.register(this.state.corporateType, this.state.companyNo, this.state.email, this.state.password);
                    if(res.response.status==400){
                        Swal.fire("Error", res.response.data, "error");
                    }else{
                        this.setState({ result: "Success" });
                        Swal.fire("Success", "Kayıt Başarılı", "success").then(function(){
                            window.location.href = "/#/";
                        });
                    }
                   
                } catch (e) {
                    
                    Swal.fire("Error","Hata! - İşlem başarısız", "error");
                    this.setRemoveSpinner();
                    this.setState({ result: JSON.stringify(e.toString()) });
                }
               } else{
                Swal.fire("Warning", "Hata ! Hüküm ve koşulları kabul ediniz", "warning").then(function(){
                    document.getElementById("a11112").style.color = "#ff0000";
                    document.getElementById("a1").style.color = "#ff0000";

                });
               }
           
        }else if(this.validateEmail(this.state.email)==false){
            Swal.fire("Warning", "Hata ! Emailinizi kontrol ediniz", "warning");
        }else if((this.state.password != this.state.repassword)){
            Swal.fire("Warning", "Şifreler birbiri ile uyuşmuyor!", "warning");
        }else if(this.state.password == "") {
            Swal.fire("Warning", "Şifre boş bırakılamaz!", "warning");
        }
        this.setRemoveSpinner();
    }
    setRemoveSpinner() {
        $(".saveVehicleCompanyButton").css("display", "none");
    }
    saveVehicleOwner = async () => {
        if (this.state.email != null && this.validateEmail(this.state.email) && (this.state.password == this.state.repassword)
            && this.state.userContractText) {
            try {
                await AuthService.register("", "", this.state.email, this.state.password);
                this.setState({ result: "Success" });
                Swal.fire("Success", "Kayıt Başarılı", "success");
                this.closeDialogs();
                this.clearModal();
                this.toggleOwnerModal();

            } catch (e) {
                Swal.fire("Error", "Hata ! İşlem başarısız", "error");
                this.clearModal();
                this.toggleOwnerModal();
                this.closeDialogs();

                this.setState({ result: JSON.stringify(e.toString()) });
            }
        }
    }
    removeInputs = () => {
        this.setState({
            companyNo: "",
            email: "",
            password: "",
            repassword: "",
            userContractText: false,
        })
    }
    render() {
    return (
        <LoadingOverlay
            active={this.state.isLoaderActive}
            spinner
            text="Loading..."
        >
            <Layout>
      <div class="wrapper gray_bg">
          <div class="container">
              <div class="subpage">
                  <div class="row">
                      <div class="col-12  col-sm-12 col-md-12 col-lg-6 ">
                          <div class="loginpages_title">
                              <h1> </h1>
                          </div>
                          <div class="loginpages_form register">
                              <ul class="nav" id="myTab" role="tablist">
                                  <li>
                                                <a class="active" id="home-tab" onClick={this.removeInputs} data-toggle="tab" href="#bireyseluyelik" role="tab"
                                          aria-controls="home" aria-selected="true">Bireysel Üyelik</a>
                                  </li>
                                  <li>
                                                <a class="" id="profile-tab" data-toggle="tab" onClick={this.removeInputs} href="#kurumsaluyelik" role="tab"
                                          aria-controls="profile" aria-selected="false">Kurumsal Üyelik</a>
                                  </li>

                              </ul>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active"  id="bireyseluyelik" role="tabpanel"
                                      aria-labelledby="home-tab">

                                                <label>E-Posta</label>
                                                <Input value={this.state.email}
                                                    onChange={(e) => {
                                                        this.setState({ email: e.target.value });
                                                    }} type="text" placeholder="E-Posta" />
                                                <label>Şifre</label>
                                                <Input type="password" value={this.state.password}
                                                    onChange={(e) => {
                                                        this.setState({ password: e.target.value });
                                                    }} placeholder="Şifrenizi Giriniz" />
                                                <label>Şifre tekrar</label>
                                                <Input  type="password" value={this.state.repassword}
                                                    onChange={(e) => {
                                                        this.setState({ repassword: e.target.value });
                                                    }} placeholder="Şifrenizi Tekrar Giriniz" />
                                                <div class="row">
                                                    <div class="col-12  col-sm-12 col-md-12" style={{ textAlign: "center" }}>
                                                        <ReCAPTCHA
                                                            style={{ display: "inline-block",margin:"1rem" }}
                                                            theme="light"
                                                            ref={this._reCaptchaRef}
                                                            sitekey={TEST_SITE_KEY}
                                                            onChange={this.handleChange}
                                                            asyncScriptOnLoad={this.asyncScriptOnLoad} />
                                                    </div>
                                                    <div class="col-12  col-sm-12 col-md-12">
                                                                    <Input
                                                                    
                                                                onChange={(e) => {
                                                                this.setState({ userContractText: e.target.checked });
                                                                }} id="a100" name="Contact" type="checkbox"  />
                                                                    <label for="a100" id="a1"><span><span></span></span>Kaydolarak,
                                                    hüküm ve koşulları kabul ediyor ve verilerimin gizlilik
                                                    politikasına uygun olarak işlenmesine izin veriyorum.</label>
                                                        
                                                            </div>
                                                          <div class="col-12  col-sm-12 col-md-12">
                                                        <Spinner className="saveVehicleCompanyButton" style={{ width: '1rem', height: '1rem', display: 'block', marginLeft: '48%', marginBottom: '2%' }} />{' '}

                                                        <input type="submit" value="KAYDET" onClick={this.saveVehicleCompany} />
                                        </div>
                                                          </div>


                                                      </div>
                                            <div class="tab-pane fade" id="kurumsaluyelik" role="tabpanel"
                                                          aria-labelledby="profile-tab">
                                                          <label>Araç Alım-Satım ve Kiralama firmaları</label>
                                                          <label>Şirket Ünvanı</label>
                                                        <Input value={this.state.companyNo}
                                                            onChange={(e) => {
                                                                this.setState({ companyNo: e.target.value });
                                                    }} type="text" placeholder="Şirket Ünvanı" />
                                                <div className="row" onChange={this.setCorporateType.bind(this)}>
                                                     
                                                    <div class="col-md-6">

                                                        <input id="Araç Firmasıyım" name="Gender" type="radio"
                                                            value="1"/>

                                                            <label for="Araç Firmasıyım"
                                                                id="Araç Firmasıyım"><span><span></span></span>Araç Firmasıyım
                                            </label>
                                        </div>
                                                        <div class="col-md-6">
                                                            <input id="Araç Firması değilim" name="Gender" type="radio" value="2 "/>
                                                                <label for="Araç Firması değilim"
                                                                    id="Araç Firması değilim"><span><span></span></span>Araç Firması
                                                değilim </label>
                                        </div>

                                                        </div>
                                                                      <label>E-Posta</label>
                                                <Input value={this.state.email}
                                                    onChange={(e) => {
                                                        this.setState({ email: e.target.value });
                                                    }} type="text" placeholder="E-Posta" />
                                                                          <label>Şifre</label>
                                                <Input type="password" value={this.state.password}
                                                    onChange={(e) => {
                                                        this.setState({ password: e.target.value });
                                                    }} placeholder="Şifrenizi Giriniz" />
                                                                              <label>Şifre tekrar</label>
                                                <Input style={{marginBottom: '5%' }} type="password" value={this.state.repassword}
                                                    onChange={(e) => {
                                                        this.setState({ repassword: e.target.value });
                                                    }} placeholder="Şifrenizi Tekrar Giriniz" />
                                                                                  <div class="row">
                                                    <div class="col-12  col-sm-12 col-md-12">
                                                        <Input
                                                            
                                                            onChange={(e) => {
                                                                this.setState({ userContractText: e.target.checked });
                                                            }} id="a1111" name="Contact" type="checkbox" />
                                                        <label for="a1111" id="a11112">Kaydolarak,
                                                    hüküm ve koşulları kabul ediyor ve verilerimin gizlilik
                                                    politikasına uygun olarak işlenmesine izin veriyorum.</label>

                                                    </div>
                                                    <div class="col-12  col-sm-12 col-md-12" style={{ textAlign:"center" }}>
                                                        <ReCAPTCHA
                                                            style={{ display: "inline-block", margin: "1rem" }}
                                                            theme="light"
                                                            ref={this._reCaptchaRef}
                                                            sitekey={TEST_SITE_KEY}
                                                            onChange={this.handleChange}
                                                            asyncScriptOnLoad={this.asyncScriptOnLoad}/>
                                                    </div>
                                                    <div class="col-12  col-sm-12 col-md-12">
                                                        <Spinner className="saveVehicleCompanyButton" style={{ width: '1rem', height: '1rem', display: 'block', marginLeft: '48%', marginBottom: '2%' }} />{' '}

                                                        <input type="submit" value="KAYDET" onClick={this.saveVehicleCompany}/>
                                        </div>
                                                                                            
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>




                        </div>

                    </div>
                                                                          <div class="col-12  col-sm-12 col-md-12 col-lg-6 ">
                                                                              <div class="loginpages_title">
                                                                                  <h1> </h1>
                                                                              </div>
                                                                              <div class="loginpages_image">
                                        <img src={gifUrl} class="sifremiunuttum_image"/>
                                        <a href="/#/login">GİRİŞ YAP</a>
                        </div>


                                                                              </div>


                                                                          </div>

            </div>
                                                                  </div>
                                                                        </div>
                                                                        </Layout>
      </LoadingOverlay>
    )}

  
};
