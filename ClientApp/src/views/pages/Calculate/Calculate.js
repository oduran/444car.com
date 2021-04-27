import React, { Component } from 'react';
import { Table, Input,Tooltip } from 'reactstrap';
import { t } from "ttag";
import Pdf from "react-to-pdf";
import CurrencyFormat from 'react-currency-format';
import { Space } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faLock,
  faSignOutAlt,
  faSignInAlt,
  faDesktop,
  faBomb,
  faPlay,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

import LoadingOverlay from "react-loading-overlay";
import { Layout } from '../../../components/Layout';
import './style.css';

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
                    <div className="path">
                    <div className="container">
                                <a href="#"> Homepage </a>
                                <i className="fas fa-caret-right"></i>
                                <a href="#">Calculate</a>
                    </div>
                </div>
                    <div className="container">
                        <div className="subpage calculation_sheet">
                            <h1>CALCULATE ANNUAL COST OF YOUR CAR</h1>
                            <p>“It will be nice to learn this 444CAR” </p>
                            <div className="calculation_sheet_form" ref={ref}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-4">
                                        <ul >

                                            <li>
                                                <label>
                                                    Araç Değeri
                                                  

                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Lütfen aracınızın şu anki değerini yazınız. Sayılar arasında noktalama kullanmayınız."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}} value={this.state.i_aracDegeri} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_aracDegeri: formattedValue })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />
                                            </li>
                                            <li >
                                                <label>
                                                    Alternatif Yatırım Getiri Tutarı
                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Lütfen tahmini veya internetten tespit ettiğiniz banka getirisini oran olarak yazınız. Örneğin % 20 getiri olduğu halde kutucuğa 20 yazınız."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}} value={this.state.i_alternatifYatirimGetirisi} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_alternatifYatirimGetirisi: formattedValue })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>

                                            <li>
                                                <label>
                                                    Araç Değer Düşüş Tutarı
                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Örneğin aracınızın değeri şu anda 100.000 TL ve 1 yıl sonra değeri 90.000 TL olacaksa aradaki fark olan 10000 yazınız."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_aracDegerDususu} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_aracDegerDususu: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>Kasko </label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_kasko} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_kasko: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>Trafik Sigortası</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_trafikSigorta} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_trafikSigorta: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>Yıllık Sigorta Kapsam Dışı Giderler</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_sigortaDisiGider} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_sigortaDisiGider: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />
                                            </li>
                                            <li>
                                                <label>Diğer Sigorta Giderleri</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_digerSigortaGideri} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_digerSigortaGideri: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <ul>

                                            <li>
                                                <label>Yıllık Araç Garanti Kapsam Dışı Giderler</label>
                                                <CurrencyFormat style={{textAlign:"right"}} value={this.state.i_aracGarantiKapsamDisi} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_aracGarantiKapsamDisi: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />
                                            </li>
                                            <li>
                                                <label>
                                                    Lastik
                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Lastikleri 3 yılda bir değişiyorsanız lastik bedelinin üçte birini yazınız."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_lastik} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_lastik: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>Periyodik Bakım</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_priyodikBakim} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_priyodikBakim: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>MTV</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_mtv} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_mtv: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li>
                                                <label>
                                                    Kış Lastiği
                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Lastikleri 3 yılda bir değişiyorsanız lastik bedelinin üçte birini yazınız."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_kisLastigi} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_kisLastigi: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />
                                            </li>
                                            <li>
                                                <label>Beklenmeyen Giderler
                                                <i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top" title="Parça, boya, küçük hasarlar, vb."></i>
                                                </label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_beklenmeyenGiderler} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_beklenmeyenGiderler: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>
                                            <li><label>Aracınızı Kiralama Aylık Bedeli<i className="fas fa-question-circle fa-lg" data-toggle="tooltip" data-placement="top"
                                                title="Teklif almadan önce de tahminen yazabilirsiniz"></i></label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.i_aracKiralamaBedeli} thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    this.setState({ i_aracKiralamaBedeli: this.currencyToInt(formattedValue) })
                                                    var that = this;
                                                    setTimeout(function () {
                                                        that.calculate();
                                                    }, 100)
                                                }} />

                                            </li>

                                        </ul>
                                    </div>
                                    <div className="col-md-12 col-lg-4">
                                        <ul>
                                            <li><label className="blue_title">Aracınızın Yıllık Maliyeti		</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_aracYillikMaliyet} disabled thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                }} /></li>
                                            <li><label className="blue_title">Yıllık Maliyet-Araç Değeri Oranı (%)	</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_aracDegerOrani} disabled prefix={'%'} onValueChange={(values) => {
                                                }} /></li>
                                            <li><label className="blue_title">Aracınızın Aylık Maliyeti</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_aylikMaliyet} disabled thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                }} /></li>
                                            <li><label className="blue_title">Araç Bedeli Aylık Alternatif Getirisi	</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_alternatifGetiriTutari} disabled thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                }} /></li>
                                            <li><label className="blue_title">Araç Dönem Sonu Değeri	</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_donemSonuDegeri} disabled thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                }} /></li>
                                            
                                            <li><label className="blue_title">Kiralama Halinde Dönem Sonu Getiri	</label>
                                                <CurrencyFormat style={{textAlign:"right"}}  value={this.state.o_kiralamaDonemSonuGeliri} disabled thousandSeparator={true} prefix={'€'} onValueChange={(values) => {
                                                }} /></li>

                                            <li><label className="blue_title">How does this make you feel? You can try with all possibilities, everything is fine </label>
                                                </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="share">
                                    <div className="row">
                                    
                                        <div className="col-md-12">
                                            <h2> Share </h2>
                                            
       
     
                                            <a className ="col-md-2" href="javascript:;"><i className="fab fa-linkedin-in"></i></a>
                                            <a className ="col-md-2" href="javascript:;"><i className="fab fa-twitter"></i></a>
                                            <a className ="col-md-2" href="javascript:;"><i className="fab fa-facebook-f"></i></a>
                                            <a className ="col-md-2" href="javascript:;"><i className="fab fa-instagram"></i></a>
                                           
                                            <a className ="col-md-2" href="javascript:;" className="pdf"><i className="fas fa-file-pdf"></i>
                                            <Pdf targetRef={ref} filename="calculation.pdf" options={options} scale={0.9}>
                                                {({ toPdf }) => <button style={{
                                                    background: "#b30b00",
                                                    border: "0"}} className="btn btn-info" onClick={toPdf}>Download PDF</button>}
                                            </Pdf></a>
                                            <a className ="col-md-2" href="javascript:;" className="clear"><i className="fas fa-broom"></i>Clear</a>
                                            <a className ="col-md-2" href="javascript:;" className="sendmymail"><i className="fas fa-paper-plane"></i>Send My Mail</a>
                                            <a className ="col-md-2" href="javascript:;" className="print"><i className="fas fa-print"></i>Print</a>
                                           
                                        </div>
                                       
                                    </div>
                                </div>


                                <div className="notification">
                                    THIS CALCULATION HAS BEEN CREATED TO VERIFY REQUESTS FROM CUSTOMERS
                               </div>

                            </div>
                        </div>
                    </div>
                    <div className="frequently_questions">
                        <div className="container">
                            <h1>
                                FREQUENTLY ASKED QUESTIONS
                </h1>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="frequently_questions_item">
                                        <img src="Content/Images/frequently_questions_1.png"/>
                                            <a href="#">CAR OWNERS</a>
                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="frequently_questions_item">
                                            <img src="Content/Images/frequently_questions_2.png"/>
                                                <a href="#">CAR COMPANIES</a>
                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="register_footer">
                                <div className="container">
                                    <label>
                                        Pay the platform fee after the transaction<br/>
                                            30-day money back guaranty<br/>
                                                Keep your privacy until the agreement<br/>
                                                    Platform assurance for your rental payment<br/>
                                                        User agreement to protect your rights<br/>
                                                            Customize the contract for your needs

                </label>
                                                        <a href="#">START IMMEDIATELY</a>
            </div>

        </div>
                </div>
            </Layout>
      </LoadingOverlay>
    );
  }
}
