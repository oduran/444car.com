import React, { Component } from 'react';
import { saveLocale, getLocale } from '../../../Localization';
import { t } from "ttag";
import {  Input, Button } from 'reactstrap';
import Swal from "sweetalert2";
import $ from 'jquery';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from '../../../services/AuthService';
import { Spinner } from 'reactstrap';
import { get, post } from '../../../services/ApiServices';

//Prod
import LoadingOverlay from "react-loading-overlay";
import { Layout } from '../../../components/Layout';
import './style.css';
//Prod
const TEST_SITE_KEY = "6LdckVUaAAAAAFhXB_xLGKHc752dIO-Z11xq20-p";
//local
//const TEST_SITE_KEY = "6Levo1UaAAAAAHP8Xp1kKkVSeaB-q1-badarOLDX";

const ref = React.createRef();
const options = {
    orientation: 'landscape'
};
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
            forgotPasswordMail: "",
            password: "",
        };
        this._reCaptchaRef = React.createRef();

    }
    componentDidMount() {
        this.setState({ isLoaderActive: false})
    }
    currencyToInt(currency) {
        var number = Number(currency.replace(/[^0-9.-]+/g, ""));
        return parseInt(number);
    }
    sendForgotPassword = async () => {
        $(".sendForgotPasswordButton").css("display", "block");
        let res = await post("/User/SendMailForPassword", { email: this.state.forgotPasswordMail });
        debugger;
        if (res.data !== -1) {
            $(".unsucces").css("display", "none");
            $(".succes").css("display", "block");
        }
        else { // unknown email which returns -1 from backend
            Swal.fire("Bilinmeyen mail", "Bu e-posta sitemize kayıtlı değildir!", "error");
            $(".succes").css("display", "none");
            $(".unsucces").css("display", "block");
        }
        this.setRemoveSpinner();
        if (res.data !== -1) {
            Swal.fire("Success", "Şifre sıfırlama linki başarıyla gönderildi", "success");
        }
    }
    setRemoveSpinner() {
        $(".sendForgotPasswordButton").css("display", "none");
    }
    loginUser = async () => {
        $(".loginUserButton").css("display", "block");
        if (this.state.email != null && this.state.password) {
            try {
                await AuthService.signIn(this.state.email, this.state.password);
                this.setState({ result: "Success" });
                window.location.href = "/#/dashboard/faqs"

            } catch (e) {
                debugger;
                $('.closeLogin').click();
                Swal.fire("Error", "Hata ! İşlem başarısız", "error");
                this.setRemoveSpinner();
                this.setState({ result: JSON.stringify(e.toString()) });
            }
        }
        this.setRemoveSpinner();
    };
    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
    };
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    checkUser = async () => {
        if (this.validateEmail(this.state.forgotPasswordMail)) {
            let checkUser = await post("/User/CheckUser", { email: this.state.forgotPasswordMail });
            this.setState({ disableSubmitButton: false })
        }
        else {
            this.setState({ disableSubmitButton: true })
        }
    };
    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    };
  render() {
    return (
   
            <Layout>
                <div class="wrapper gray_bg">
                    <div class="container">
                        <div class="subpage">

                            <div class="row">
                                <div class="col-12  col-sm-12 col-md-12 col-lg-6">

                                    <div class="loginpages_title">
                                        <h1> </h1>
                                    </div>
                                    <div class="loginpages_image">
                                        <img src="Content/Images/how_it_works_1.gif"/>
                                            <a href="/#/register">KAYIT OL</a>
                        </div>
                                    </div>
                                    <div class="col-12  col-sm-12 col-md-12 col-lg-6">
                                        <div class="loginpages_title">
                                            <h1> </h1>
                                        </div>
                                        <div class="loginpages_form">
                                            <h1>Şifremi Unuttum</h1>
                                            <label>E-Posta</label>
                                    <Input type="email" name="email" id="exampleEmail" onBlur={this.checkUser}  placeholder=""
                                        value={this.state.forgotPasswordMail}
                                            onChange={(e) => {
                                                this.setState({ forgotPasswordMail: e.target.value }); 
                                            }} placeholder="Email" />
                                                
                                    <div class="row">

                                        <div class="col-12 col-sm-12 col-md-12" style={{ textAlign: "center", margin: '1rem'}}>
                                            <ReCAPTCHA
                                                style={{ display: "inline-block" }}
                                                theme="light"
                                                ref={this._reCaptchaRef}
                                                sitekey={TEST_SITE_KEY}
                                                onChange={this.handleChange}
                                                asyncScriptOnLoad={this.asyncScriptOnLoad}
                                            />
                                        </div>
                                    </div>
                                                    <div class="row">
                                                        <div class="col-6  col-sm-6 col-md-6">
                                                           
                                </div>
                                                        
                                            <div class="col-6 col-sm-6 col-md-6">
                                                            </div>

                                                            <div class="col-6  col-sm-6 col-md-6">
                                            <Spinner className="sendForgotPasswordButton" style={{ width: '1rem', height: '1rem' }} />{' '}

                                            <Button type="submit" onClick={this.sendForgotPassword} className="btn btn-info"   >GÖNDER</Button>
                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                 

                </div>
            </div>
                                        </div>
                                    </div>
            </Layout>
    );
  }
}
