import React, { Component } from 'react';
import { saveLocale, getLocale } from '../Localization';
import { t } from "ttag";
import { Collapse, Container, Modal, Col, Form, FormGroup, Label,Input, ModalHeader, ModalBody, ModalFooter, Navbar, NavbarBrand, DropdownItem, Dropdown, NavbarToggler, DropdownToggle, DropdownMenu, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { get, post } from "../services/ApiServices";
import $ from 'jquery';
import Logo from './Content/Images/logo.svg';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from '../services/AuthService';
import { Spinner } from 'reactstrap';

//Prod
const TEST_SITE_KEY = "6LdckVUaAAAAAFhXB_xLGKHc752dIO-Z11xq20-p";
//local
//const TEST_SITE_KEY = "6Levo1UaAAAAAHP8Xp1kKkVSeaB-q1-badarOLDX";

const DELAY = 1500;

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.saveVehicleCompany = this.saveVehicleCompany.bind(this);
    this.saveVehicleOwner = this.saveVehicleOwner.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOwnerModal = this.toggleOwnerModal.bind(this);
 
      this.state = {
            forgotPasswordMail :"",
            disableSubmitButton :true,
            collapsed: true,
            dropdownOpen:false,
            dropdownLoginOpen:false,
            registerModal: false,
            corporateType:0,
            loginModal:false,
            registerOwnerModal:false,
            companyNo:"",
            email:"",
            password:"",
            repassword: "",
            userContractText: false,
            secretContractText: false,
            kvkkContractText: false,
            lang: getLocale(),
            callback: "not fired",
            value: "[empty]",
            load: false,
            expired: "false"
      };
      this._reCaptchaRef = React.createRef();

    }
    setRemoveSpinner() {
        $(".saveVehicleCompanyButton").css("display", "none");
        $(".loginUserButton").css("display", "none");
        $(".sendForgotPasswordButton").css("display", "none");
    }
    componentDidMount() {
        this.setRemoveSpinner();
    }
    clearModal() {
        this.setState({
            companyNo: "",
            email: "",
            password: "",
            repassword: "",
            userContractText: false,
            secretContractText: false,
            kvkkContractText: false,
            lang: getLocale(),
            callback: "not fired",
            value: "[empty]",
            load: false,
            expired: "false"
        })
    }

    saveVehicleCompany = async () => {
     $(".saveVehicleCompanyButton").css("display", "block");
        if (this.state.email != null && this.validateEmail(this.state.email) && (this.state.password == this.state.repassword)
            && this.state.userContractText) {
            try {
                await AuthService.register(this.state.corporateType,this.state.companyNo, this.state.email, this.state.password);
                this.setState({ result: "Success" });
                Swal.fire("Success", "Kayıt Başarılı", "success");
                this.closeDialogs();
                 this.clearModal();
                this.toggleModal();
            } catch (e) {
                Swal.fire("Error", "Hata ! İşlem Başarısız", "error");
                this.clearModal();
                this.toggleModal();
                this.closeDialogs();
                this.setRemoveSpinner();
                this.setState({ result: JSON.stringify(e.toString()) });
            }
        }
        this.setRemoveSpinner();

    }
    closeDialogs() {
        $('.closeRegister').click();
        $('.closeLogin').click();
    }
    saveVehicleOwner = async () => {
        if (this.state.email != null && this.validateEmail(this.state.email) && (this.state.password == this.state.repassword)
            && this.state.userContractText) {
            try {
                await AuthService.register("","",this.state.email, this.state.password);
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
                this.clearModal();
                this.setRemoveSpinner();
                this.setState({ result: JSON.stringify(e.toString()) });
            }
        }
        this.setRemoveSpinner();
    }

    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
    };

    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    };
    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    toggleOwnerModal() {
        this.setState({
            registerOwnerModal: !this.state.registerOwnerModal
        });
    }
    toggleModal() {
        this.setState({
            registerModal: !this.state.registerModal
        });
    }
    toggleLoginModal() {
        this.setState({
            loginModal: !this.state.loginModal
        });
    }
    changeLanguage(e) {
        e.preventDefault();
        const newLang = this.state.lang == "en" ? "tr" : "en";
        this.setState({ lang: newLang });
        this.setLocale(newLang)
    }
    changeValue(e) {
        const newLang = e.target.innerHTML.toLowerCase();
        this.setState({ lang: newLang });
        this.setLocale(newLang)
    }
    toggleForgotPassword() {
        $(".unsucces").css("display", "none");
        $(".succes").css("display", "none");
        $(".forgot_password").slideToggle();
    }
    setLocale(locale) {
        saveLocale(locale);
        window.location.reload();
    }
    toggle(event) {
        let langCode = event.target.innerText.toLowerCase().replace("<div>", "").replace("</div>", "")
        if (langCode != this.state.lang) {
            
            const newLang = event.target.innerHTML.toLowerCase();
            this.setState({ lang: newLang });
            this.setLocale(newLang);
        }
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleLogin(event) {

        this.setState({
            dropdownLoginOpen: !this.state.dropdownLoginOpen
        });
    }
    individualClick() {
        $(".corporate").removeClass('active');
        $(".individual").addClass("active");
        $(".kurumsal_item").hide();
        $(".bireysel_item").slideDown();
    }
    corporateClick() {
        $(".corporate").addClass("active");
        $(".individual").removeClass('active');
        $(".bireysel_item").hide();
        $(".kurumsal_item").slideDown();
    }
    setCorporateType(event) {
        this.setState({ corporateType: parseInt(event.target.value) })
    }
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    sendForgotPassword = async () => {
        $(".sendForgotPasswordButton").css("display", "block");
        let checkUser = await post("/User/SendMailForPassword", { email: this.state.forgotPasswordMail });
        if (checkUser.data) {
            $(".unsucces").css("display", "none");
            $(".succes").css("display", "block");
        }
        else {
            $(".succes").css("display", "none");
            $(".unsucces").css("display", "block");
        }
        this.setRemoveSpinner();

    }
    checkUser = async() =>  {
        if (this.validateEmail(this.state.forgotPasswordMail)) {
            let checkUser = await post("/User/CheckUser", { email: this.state.forgotPasswordMail });
            this.setState({ disableSubmitButton: false })
        }
        else {
            this.setState({ disableSubmitButton: true })
        }
    }

    render() {
        const activeStyle = { color: "#000000" };

        return (
            <header>

                <div className="modal fade" id="login_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Kullanıcı Girişi </h5>
                                <button type="button" className="close closeLogin" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="login_modal_content">
                                    <Form>
                                        <FormGroup>
                                            <Label style={{float:"left"}} for="exampleEmail">{t`Email`}</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder=""
                                                value={this.state.email}
                                                onChange={(e) => {
                                                    this.setState({ email: e.target.value });
                                                }} placeholder="Email" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label style={{ float: "left" }} for="examplePassword">{t`Password`}</Label>
                                            <Input type="password" name="password" id="examplePassword"
                                                value={this.state.password}
                                                onChange={(e) => {
                                                    this.setState({ password: e.target.value });
                                                }} placeholder="Password" />
                                        </FormGroup>
                                        <FormGroup>
                                            <ReCAPTCHA
                                                style={{ display: "inline-block" }}
                                                theme="light"
                                                ref={this._reCaptchaRef}
                                                sitekey={TEST_SITE_KEY}
                                                onChange={this.handleChange}
                                                asyncScriptOnLoad={this.asyncScriptOnLoad}
                                            />
                                        </FormGroup>
                                    </Form>
                                    <Spinner className="loginUserButton" style={{ width: '1rem', height: '1rem', display: 'block', marginLeft: '48%', marginBottom: '2%' }} />{' '}

                                    <Button color="primary" style={{width:"100%"}} onClick={this.loginUser}>Login</Button>{' '}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ul className="login_modal_bottom">
                                    <li>Üye Değilim <a data-toggle="modal" data-target="#register_modal">Kayıt Ol</a></li>
                                    <li><a onClick={this.toggleForgotPassword} className="password_change">Şifremi Unuttum</a></li>
                                </ul>
                                <div className="forgot_password">
                                    <hr />
                                    <h1>Şifre Hatırlatma </h1>
                                    <ul className="login_modal_content">
                                        <li> <label>Kullanıcı Adı:</label><Input type="text" onBlur={this.checkUser} 
                                            onChange={(e) => {                                             
                                                this.setState({ forgotPasswordMail: e.target.value });
                                               
                                            }} />
                                        </li>
                                        <li>
                                            <label>&nbsp;</label>
                                            <Spinner className="sendForgotPasswordButton" style={{ width: '1rem', height: '1rem' }} />{' '}

                                            <Button type="submit" onClick={this.sendForgotPassword} className="btn btn-info"   >GÖNDER</Button>
                                        </li>
                                    </ul>
                                    <div className="notification unsucces"><i className="fas fa-times" /> Mail adresi bulunamadı... </div>
                                    <div className="notification succes"><i className="fas fa-check" /> Şifre sıfırlama linki mail
              adresinize gönderilmiştir. </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="forgotpassword_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Şifremi Unuttum </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="register_modal_content">
                                  
                                  
                                    <ul>
                                        
                                        <li><label>E-Posta</label><Input value={this.state.email}
                                            onChange={(e) => {
                                                this.setState({ email: e.target.value });
                                            }} type="text" placeholder="E-Posta" /></li>
                                        <li style={{ width: '100%' }}> <ReCAPTCHA
                                            style={{ display: "inline-block" }}
                                            theme="light"
                                            ref={this._reCaptchaRef}
                                            sitekey={TEST_SITE_KEY}
                                            onChange={this.handleChange}
                                            asyncScriptOnLoad={this.asyncScriptOnLoad}
                                        />
                                        </li>
                                        <li style={{ width: '100%' }}>
                                            <Spinner className="resetPasswordButton" style={{ width: '1rem', height: '1rem', display: 'block', marginLeft: '48%', marginBottom: '2%' }} />{' '}

                                            <Button style={{ width: '100%' }} color="primary" onClick={this.resetPassword}>{t`Reset Password`}</Button>{' '}

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Yeni Üyelik </h5>
                                <button type="button" className="close closeRegister" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="register_modal_content">
                                    <div className="register_modal_content_tab">
                                        <a href="#" onClick={this.individualClick} className="individual active">Bireysel </a>
                                        <a href="#" onClick={this.corporateClick} className="corporate"> Kurumsal</a>
                                    </div>
                                    <h1 className="bireysel_item">Aracını satmak/kiralamak isteyenler</h1>
                                    <h1 className="kurumsal_item">Araç alım satım, kiralama firmaları</h1>

                                    <ul>
                                        <li className="kurumsal_item"><label>Şirket Ünvanı</label><Input value={this.state.companyNo}
                                            onChange={(e) => {
                                                this.setState({ companyNo: e.target.value });
                                            }} type="text" placeholder="Şirket Ünvanı" /></li>
                                        <li className="kurumsal_item">
                                            <div className="row" onChange={this.setCorporateType.bind(this)}>

                                                <div className="col-6">
                                                    <input id="Radio" name="Radio" checked type="radio" value="1" />
                                                    <label for="Radio" id="Radio">Araç Firmasıyım</label>
                                                </div>
                                                <div className="col-6">

                                                    <input id="Radio1" name="Radio" type="radio" value="2" />
                                                    <label for="Radio1" id="Radio">Araç Firması Değilim</label>
                                                </div>
                                            </div>
                                        </li>
                                        <li><label>E-Posta</label><Input value={this.state.email}
                                            onChange={(e) => {
                                                this.setState({ email: e.target.value });
                                            }} type="text" placeholder="E-Posta" /></li>
                                        <li><label>Şifre</label><Input type="password"  value={this.state.password}
                                            onChange={(e) => {
                                                this.setState({ password: e.target.value });
                                            }}  placeholder="Şifrenizi Giriniz" /></li>
                                        <li><label>Şifre Tekrar</label><Input  type="password" value={this.state.repassword}
                                            onChange={(e) => {
                                                this.setState({ repassword: e.target.value });
                                            }}    placeholder="Şifrenizi Tekrar Giriniz" />
                                        </li>
                                        <li style={{ width: '100%' }}>
                                            <Input 
                                                onChange={(e) => {
                                                    this.setState({ userContractText: e.target.checked });
                                                }} id="Contact1" name="Contact" type="checkbox" defaultValue="Belediye binasına gelerek" />
                                            <label htmlFor="Contact1" id="Contact1">
                                                <span><span /></span> <a href="https://www.444car.de/assets/files/parabam-kullanici-uyelik-sozlesmesi.pdf" target="_blank"><u><strong>Kullanıcı Sözleşmesini</strong></u></a>,
                  <a href="https://www.444car.de/assets/files/parabam-gizlilik-politikasi.pdf" target="_blank"><u><strong>Gizlilik Politikasını</strong></u></a>,<br />
                                                <a href="https://www.444car.de/kvkk.pdf" target="_blank"><u><strong>KVKK
                        Bilgilendirme Metni</strong></u></a> ve
                  <a href="https://www.444car.de/assets/files/parabam-gizlilik-politikasi.pdf" target="_blank"><u><strong>Açık Rıza Metni</strong></u></a>ni Okudum ve Kabul
                  Ediyorum
                </label>
                                        </li>
                                        
                                        <li style={{ width: '100%' }}> <ReCAPTCHA
                                            style={{ display: "inline-block" }}
                                            theme="light"
                                            ref={this._reCaptchaRef}
                                            sitekey={TEST_SITE_KEY}
                                            onChange={this.handleChange}
                                            asyncScriptOnLoad={this.asyncScriptOnLoad}
                                        />
                                        </li>
                                        <li style={{ width: '100%' }}>
                                            <Spinner className="saveVehicleCompanyButton" style={{ width: '1rem', height: '1rem', display: 'block',marginLeft: '48%',marginBottom: '2%'}} />{' '}

                                            <Button style={{ width: '100%' }} color="primary" onClick={this.saveVehicleCompany}>{t`Register`}</Button>{' '}

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="header_content">
                        <div className="logo">
                            <a href="#"><img src={Logo} /></a>
                            <div className="mobile_right">
                                <div className="btn-primary" style={{
                                    marginRight: "10px"

                                }} >
                                    <Dropdown className="mobile_language" style={{
                                            padding: "0px", margin: "0px",
                                    }} nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle nav caret style={{
                                            color: "white", 
                                        }} >
                                                {this.state.lang.toUpperCase()}
                                            </DropdownToggle>
                                            <DropdownMenu className="select2-container--single">
                                            <DropdownItem> <div onClick={this.changeValue}>TR</div></DropdownItem>
                                                <DropdownItem onClick={this.changeValue}>EN</DropdownItem>
                                                <DropdownItem onClick={this.changeValue}>GER</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                 </div>
                                <div className="hamburgerbtn">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                        <div className="header_right">
                            <div className="nav">
                                <ul>
                                    <li className="active"><a href="#">HOMEPAGE</a></li>
                                    <li><a href="/#/Calculate">CALCULATE</a></li>
                                    <li><a href="#">CAR COMPANIES</a></li>
                                    <li><a href="#">ENTERPRISE</a></li>
                                    <li><a href="/#/FAQ">FAQ</a></li>
                                    <li><a href="#">PRICING</a></li>
                                    <li><a href="/#/Contact">CONTACT</a></li>

                                    <li style={{
                                       
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"}}>
                                        <Dropdown className="header_content .header_right .select2-container--default" style={{ background: "gray"}} nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                            <DropdownToggle nav caret className="select2-selection--single">
                                                {this.state.lang.toUpperCase()}
                                            </DropdownToggle>
                                            <DropdownMenu className="select2-container--single">
                                                <DropdownItem> <div onClick={this.changeValue}>TR</div></DropdownItem>
                                                <DropdownItem onClick={this.changeValue}>EN</DropdownItem>
                                                <DropdownItem onClick={this.changeValue}>GER</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div> 
                            <a href="/#/login" className="login_btn">LOGIN</a>
                            {/* <a href="#" data-toggle="modal" data-target="#register_modal" class="register_btn">Kayıt Ol</a>
              <a href="#" data-toggle="modal" data-target="#login_modal" class="login_btn">Giriş Yap</a> */}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
