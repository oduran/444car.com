import React, { Component } from "react";
import { saveLocale, getLocale } from "../../../Localization";
import { t } from "ttag";
import { Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from "../../../services/AuthService";
import { Spinner } from "reactstrap";

//Prod
import LoadingOverlay from "react-loading-overlay";
import { Layout } from "../../../components/Layout";
import "./style.css";
//Prod
const TEST_SITE_KEY = "6LdckVUaAAAAAFhXB_xLGKHc752dIO-Z11xq20-p";
//local
//pconst TEST_SITE_KEY = "6Levo1UaAAAAAHP8Xp1kKkVSeaB-q1-badarOLDX";

const ref = React.createRef();
const options = {
    orientation: "landscape",
};
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this._reCaptchaRef = React.createRef();
    }
    componentDidMount() {
        this.setState({ isLoaderActive: false });
    }
    currencyToInt(currency) {
        var number = Number(currency.replace(/[^0-9.-]+/g, ""));
        return parseInt(number);
    }

    setRemoveSpinner() {
        $(".loginUserButton").css("display", "none");
    }
    loginUser = async () => {
        $(".loginUserButton").css("display", "block");
        if (this.state.email != null && this.state.password) {
            try {
                let response = await AuthService.signIn(
                    this.state.email,
                    this.state.password
                );
                if (response.data.statusCode.toString() == "500") {
                    Swal.fire("Error", response.data.description, "error");
                    this.setRemoveSpinner();
                    return;
                }
                this.setState({ result: "Success" });
                localStorage.setItem("reload", "true");
                if (response.data.registration.toString() == "false") {
                    window.location.href = "/#/dashboard/profile";
                    return;
                }
                window.location.href = "/#/dashboard/myads";
            } catch (e) {
                debugger;
                $(".closeLogin").click();
                Swal.fire("Error", "Hata ! İşlem başarısız", "error");
                this.setRemoveSpinner();
                this.setState({ result: JSON.stringify(e.toString()) });
            }
        }
        this.setRemoveSpinner();
    };
    handleChange = (value) => {
        console.log("Captcha value:", value);
        this.setState({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
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
                                        <img src="Content/Images/how_it_works_1.gif" />
                                        <a href="/#/register">KAYIT OL</a>
                                    </div>
                                </div>
                                <div class="col-12  col-sm-12 col-md-12 col-lg-6">
                                    <div class="loginpages_title">
                                        <h1> </h1>
                                    </div>
                                    <div class="loginpages_form">
                                        <h1>Giriş Yap</h1>
                                        <label>E-Posta</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="exampleEmail"
                                            placeholder=""
                                            value={this.state.email}
                                            onChange={(e) => {
                                                this.setState({ email: e.target.value });
                                            }}
                                            placeholder="Email"
                                        />
                                        <label>Şifre</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="examplePassword"
                                            value={this.state.password}
                                            onChange={(e) => {
                                                this.setState({ password: e.target.value });
                                            }}
                                            placeholder="Password"
                                        />
                                        <div class="row">
                                            <div
                                                class="col-12 col-sm-12 col-md-12"
                                                style={{ textAlign: "center", margin: "1rem" }}
                                            >
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
                                                <label>
                                                    <input
                                                        id="a100"
                                                        name="Announcements"
                                                        type="checkbox"
                                                        value="SMS"
                                                    />
                                                    <label for="a100" id="a1">
                                                        <span>
                                                            <span></span>
                                                        </span>
                            Beni Hatırla
                          </label>
                                                </label>
                                            </div>

                                            <div class="col-6 col-sm-6 col-md-6">
                                                <a href="/#/forgotpassword">Şifremi Unuttum</a>
                                            </div>

                                            <div class="col-6  col-sm-6 col-md-6">
                                                <Spinner
                                                    className="loginUserButton"
                                                    style={{
                                                        width: "1rem",
                                                        height: "1rem",
                                                        display: "block",
                                                        marginLeft: "48%",
                                                        marginBottom: "2%",
                                                    }}
                                                />{" "}
                                                <input type="submit" onClick={this.loginUser} />{" "}
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
