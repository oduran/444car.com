import React, { Component } from "react";
import { Table, Input } from "reactstrap";
import { t } from "ttag";
import Pdf from "react-to-pdf";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { get, post } from "../../../services/ApiServices";
import LoadingOverlay from "react-loading-overlay";
import { Layout } from "../../../components/Layout";
import "./style.css";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { Spinner } from "reactstrap";

const ref = React.createRef();
//Prod
const TEST_SITE_KEY = "6LdckVUaAAAAAFhXB_xLGKHc752dIO-Z11xq20-p";
//local
//pconst TEST_SITE_KEY = "6Levo1UaAAAAAHP8Xp1kKkVSeaB-q1-badarOLDX";

const options = {
  orientation: "landscape",
};

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      password: "",
      loading: false
    };
    this._reCaptchaRef = React.createRef();
   
  }
  componentDidMount() {}
  currencyToInt(currency) {
    var number = Number(currency.replace(/[^0-9.-]+/g, ""));
    return parseInt(number);
  }
  resetPassword = async (history) => {
   this.setState({loading:true});
    var that = this;
    if (this.state.password != this.state.newPassword) {
      Swal.fire(
        "Hata",
        "Girilen şifreler aynı değil",
        "error"
    );
    this.setState({loading:false});
      return;
    }
    if (this.state.password.length < 8) {
      Swal.fire(
        "Hata",
        "Girilen şifre minimum 8 karakter olmalı",
        "error"
    );
    this.setState({loading:false});
      return;
    }
    let guid = window.location.href.split("?")[1];
    let checkUser = await post("/User/SetPassword", {
      password: this.state.password,
      guid: guid,
    });
    if(checkUser?.status == 200){
      Swal.fire( "Başarılı",
      " Şifreniz başarıyla değiştirilmiştir!",
      "success").then(function(){
        that.props.history.push("/login");
    });
    }else{
      Swal.fire( "Hata",
      " Bağlantı hatası!",
      "error");
      this.setState({loading:false});
    }
   
  };
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
                            <div class="col-12  col-sm-12 col-md-12 col-lg-6">
                                    <div class="loginpages_title">
                                        <h1> </h1>
                                    </div>
                                    <div class="loginpages_form">
                                        <h1>Yeni Şifre Belirle</h1>
                                        <p> Yeni şifreniz minimum 8 karakterli olmalıdır </p>
                                        <label>Şifre:</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="exampleEmail"
                                            placeholder=""
                                            onChange={(e) => {
                                              this.setState({ password: e.target.value });
                                            }}
                                            placeholder="Şifre"
                                        />
                                        
                 
                                        <label>Şifre Tekrar:</label>
                                        <Input
                                            type="password"
                                            id="examplePassword"
                                            onChange={(e) => {
                                              this.setState({ newPassword: e.target.value });
                                            }}
                                            placeholder="Tekrar Şifre"
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
                                        <button
                        className="btn btn-info"
                        onClick={this.resetPassword}
                      >
                      {this.state.loading?<Spinner
                          
                          style={{
                            width: "1rem",
                            height: "1rem",
                            display: "block",
                            marginBottom: "2%",
                          }}
                        />: "Şifre Sıfırla"} 
                      </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
      </LoadingOverlay>
    );
  }
}
