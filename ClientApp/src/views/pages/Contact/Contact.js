import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import { t } from "ttag";
import Pdf from "react-to-pdf";
import CurrencyFormat from 'react-currency-format';
import ReCAPTCHA from "react-google-recaptcha";
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
export default class Calculate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i_aracDegeri: 0,
            i_alternatifYatirimGetirisi: 0,
            i_kullanimKm: 0,
            i_aracDegerDususu: 0,
            i_kasko: 0,
            i_trafikSigorta: 0,
            i_digerSigortaGideri: 0,
            i_sigortaDisiGider: 0,
            i_aracGarantiKapsamDisi: 0,
            i_lastik: 0,
            i_priyodikBakim: 0,
            i_mtv: 0,
            i_kisLastigi: 0,
            i_beklenmeyenGiderler: 0,
            i_aracKiralamaBedeli: 0,
            o_aracYillikMaliyet: 0,
            o_aracDegerOrani: 0,
            o_aylikMaliyet: 0,
            o_donemSonuDegeri: 0,
            o_alternatifGetiriTutari: 0,
            o_kiralamaDonemSonuGeliri: 0,
        };
        this._reCaptchaRef = React.createRef();

    }
    componentDidMount() {

    }
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
    currencyToInt(currency) {
        var number = Number(currency.replace(/[^0-9.-]+/g, ""));
        return parseInt(number);
    }
    calculate() {
        debugger;
        let _i_aracDegeri = this.currencyToInt(this.state.i_aracDegeri);

        let aracYillikMaliyet = this.state.i_digerSigortaGideri + this.state.i_sigortaDisiGider + this.state.i_aracGarantiKapsamDisi + this.state.i_aracDegerDususu + this.state.i_kasko + this.state.i_trafikSigorta + this.state.i_lastik + this.state.i_priyodikBakim + this.state.i_mtv + this.state.i_kisLastigi + this.state.i_beklenmeyenGiderler
        let aracDegerOrani = (aracYillikMaliyet * 100) / _i_aracDegeri;
        let donemSonuDegeri = _i_aracDegeri;
        let alternatifGetiriTutari = ((_i_aracDegeri * this.state.i_alternatifYatirimGetirisi) / 100);
        let kiralamaDonemSonuGeliri = alternatifGetiriTutari + donemSonuDegeri;






        this.setState({ o_aracYillikMaliyet: Math.round(aracYillikMaliyet) });
        this.setState({ o_aracDegerOrani: Math.round(aracDegerOrani) });
        this.setState({ o_aylikMaliyet: Math.round(aracYillikMaliyet / 12) });
        this.setState({ o_alternatifGetiriTutari: Math.round(((_i_aracDegeri * this.state.i_alternatifYatirimGetirisi) / 12)) });
        this.setState({ o_donemSonuDegeri: Math.round(donemSonuDegeri) });
        this.setState({ o_alternatifGetiriTutari: Math.round(alternatifGetiriTutari) });
        this.setState({ o_kiralamaDonemSonuGeliri: Math.round(kiralamaDonemSonuGeliri) });

    }
    render() {
        return (
            <LoadingOverlay
                active={this.state.isLoaderActive}
                spinner
                text="Loading..."
            >
                <Layout>
                    <div className="wrapper">
                        <div class="path">
                            <div class="container">
                                <a href="#"> Anasayfa </a>
                                <i class="fas fa-caret-right"></i>
                                <a href="#">İletişim</a>
                            </div>
                        </div>

                        <div class="subpage">
                            <div class="container">
                                <div class="subpage_content">
                                    <div class="contact_page">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h1>İLETİŞİM</h1>

                                                <p> <strong> Bize Ulaşın : </strong>Bückerheide 10, 45139, Frillendorf, Germany
                                </p>
                                                <p>
                                                    <strong> GSM : </strong> (0123) 456-7890
                                </p>

                                                <p>
                                                    <strong> E-Mail :</strong> info@444car.de
                                </p>
                                                <p>
                                                    <strong> Faks :</strong> (0123) 456-7890
                                </p>
                                                <p>
                                                    <strong> WhatsApp :</strong> (0123) 456-7890
                                </p>
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.085113211833!2d7.050754615306262!3d51.45659372223835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8dd69439ae409%3A0x688285e5881b05f2!2sB%C3%BCckerheide%2010%2C%2045139%20Essen%2C%20Almanya!5e0!3m2!1str!2str!4v1611481475692!5m2!1str!2str"
                                                    width="90%" height="260" frameborder="0" allowfullscreen="" aria-hidden="false"
                                                    ></iframe>
                                            </div>


                                            <div class="col-md-6">

                                                <div class="contact_form">
                                                    <h2>İLETİŞİM FORMU</h2>
                                                    <ul>
                                                        <li><input type="text" placeholder="Adınız "/></li>
                                                            <li><input type="text" placeholder="Soyadınız"/></li>
                                                                <li><input type="text" placeholder="Telefon Numaranız"/></li>
                                                                    <li><input type="text" placeholder="E-Posta Adresiniz"/></li>
                                                        <li style={{ width: "100%" }}><textarea placeholder="Mesajınız"></textarea></li>
                      
                                                       
                      <li> <ReCAPTCHA
                          style={{ display: "inline-block"  }}
                          theme="light"
                          ref={this._reCaptchaRef}
                          sitekey={TEST_SITE_KEY}
                          onChange={this.handleChange}
                          asyncScriptOnLoad={this.asyncScriptOnLoad}
                        /></li>
                       
                     
                    
                   
                                                                        <li><input type="submit" value="GÖNDER"/></li>
                                    </ul>
                                </div>
                            </div>
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
