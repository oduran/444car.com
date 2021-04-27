import React, { Component } from "react";
import axios from "axios";
import { get, post } from "../../../services/ApiServices";
import { Steps, Button, message, Checkbox } from "antd";
import Config from "../../../services/Config";
import { Input } from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import { CDataTable } from "@coreui/react";
import "antd/dist/antd.css";
import $ from "jquery";
import jQuery from "jquery";
import OwlCarousel from 'react-owl-carousel';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "blueimp-file-upload";
import Swal from "sweetalert2";
import { flagSet } from "@coreui/icons";

import imageSrc1 from '../../Content/Images/car1.jpg';



//import 'owl.carousel/dist/assets/owl.carousel.css';
//import 'owl.carousel/dist/assets/owl.theme.default.css';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
//import "../../Content/Css/owl.carousel.min.css";
import "./style.css";

// import "../../Content/Js/fancybox.min.js";
// import "../../Content/Js/function.js";





const ref = React.createRef();
const addImageRef = React.createRef();
const options = {
    orientation: "landscape",
};

const { Step } = Steps;

export default class PublishAd extends React.Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            satisFiyati: "",
            imageFiles: null,
            imgCollection: "",
            selectedImageUrl: "",
            kiralamaSuresi: "",
            kullanimKm: "",
            eyalet: "",
            sehir: "",
            lokasyon: "",
            postaKodu: "",
            postaDescription: "",
            plaka: "",
            sasi: "",
            aracGorselleri: "",
            marka: "",
            uretimAy: "",
            uretimYil: "",
            model: "",
            yakitTuru: "",
            psKw: "",
            aracModelTipi: "",
            kasaTipi: "",
            uretimDonemi: "",
            garanti: 0,
            uzatilmisGaranti: 0,
            oncekiSahipler: 1,
            cekDefteri: 0, // buraları bool yaptım normalde "" di
            sigaraIcilmeyen: 0, // buraları bool yaptım normalde "" di
            kilometre: "",
            renk: "",
            metalik: 0, // buraları bool yaptım normalde "" di
            kapiSayisi: "",
            vites: "",
            motorHacmi: "",
            emisyon: "",
            genelBilgiler: "",
            kaydet: false,

            // asistan_ABC: false,
            // asistan_acilCagri: false,
            // asistan_ASR: false,
            // asistan_EBD: false,
            // asistan_EDL: false,
            // asistan_geceGorus: false,
            // asistan_icAynaAydinlatma: false,
            // asistan_otonom: false,
            // asistan_seritAsistani: false,
            // asistan_yokusAsistani: false,
            // asistan_ABS: false,
            // asistan_uzaktanKilitleme: false,
            // asistan_acilFrenAsistani: false,
            // asistan_EBA: false,
            // asistan_EBP: false,
            // asistan_ESP: false,
            // asistan_hizSabitleyici: false,
            // asistan_korNoktaUyarici: false,
            // asistan_sesliKontrol: false,
            // asistan_TCS: false,
            // asistan_trafikIsaretTanima: false,
            // asistan_yorgunlukUyarisi: false,
            // asistan_lastikBasincGostergesi: false,

            // koltuk_elektrikli: false,
            // koltuk_hafizali: false,
            // koltuk_isitmali: false,

            // parkyardimcisi_onSensor: false,
            // parkyardimcisi_arkaSensor: false,
            // parkyardimcisi_kamera: false,
            // parkyardimcisi_otomatikParkEdici: false,

            // sensorler_isikSensoru: false,
            // sensorler_yagmurSensoru: false,
            // sensorler_lastikArizaSensoru: false,
            // sensorler_farGeceensoru: false,

            // far_LED: false,
            // far_ayarlanabilirFarlar: false,
            // far_zenon: false,
            // far_farYikama: false,
            // far_adaptif: false,
            // far_sis: false,

            // multimedia_cdOynatici: false,
            // multimedia_sesSistemi: false,
            // multimedia_mp3Player: false,
            // multimedia_dokunmatikEkran: false,
            // multimedia_digitalRadio: false,
            // multimedia_aracBilgisayari: false,
            // multimedia_tv: false,

            // baglanti_bluetooth: false,
            // baglanti_usb: false,
            // baglanti_wifi: false,

            // aynalar_isitmali: false,
            // aynalar_otomatikKatlanir: false,
            // aynalar_hafizali: false,
            // aynalar_otomatikKararma: false,

            // havayastigi_surucu: false,
            // havayastigi_yolcu: false,
            // havayastigi_perde: false,
            // havayastigi_tavan: false,
            // havayastigi_yanKapi: false,
            // havayastigi_diz: false,

            // diger_siraKoltuk: false,
            // diger_deriDireksiyon: false,
            // diger_isitmaliOnCam: false,
            // diger_klima: false,
            // diger_sunroof: false,
            // diger_hidrolikDireksiyon: false,
            // diger_akilliBagajKapagi: false,
            // diger_ellerSerbestKiti: false,
            // diger_immobilayzir: false,
            // diger_merkeziKilitlemeSistemi: false,
            // diger_surguluCati: false,
            // diger_alasimJantlar: false,
            // diger_alarm: false,
            // diger_engellerineUygun: false,
            // diger_kayakCantasi: false,
            // diger_portBagaj: false,
            // diger_elektrikliPencereler: false,
            // diger_anahtarsizGiris: false,
            // diger_isitmaliDireksiyon: false,
            // diger_kayarKapi: false,
            // diger_romorkBaglantisi: false,
            // diger_otomatikBaslatma: false,

            //kiralama seçimleri
            kiramarka: "",
            kiraseri: "",
            kirakasatipi: "",
            kirayakit: "",
            kirasure: "",
            kirakullanim: "",
            kiramarka2: "",
            kiraseri2: "",
            kirakasatipi2: "",
            kirayakit2: "",
            kirasure2: "",
            kirakullanim2: "",
            kiramarka3: "",
            kiraseri3: "",
            kirakasatipi3: "",
            kirayakit3: "",
            kirasure3: "",
            kirakullanim3: "",
            kirafarketmez: false,




            // option arrayleri
            markalar: [],
            uretimAylari: [],
            uretimYillari: [],
            modeller: [],
            yakitTurleri: [],
            psKwler: [],
            modelTipleri: [],
            kasaTipleri: [],
            uretimDonemleri: [],
            kapiSayilari: [],
            vitesler: [],
            motorHacimleri: [],
            emisyonlar: [],

            renkler: [],
            sehirler: [],
            basliklar: [],
            loading: true,
            checkBoxLoading: true,
            aracId: "",
            isLoaderActive: false,
            advertiseNo: "",
            userId: null,


            current: 0,
            selectedCheckBoxes: [],
            baskaAracCheck: 0,
            kiralamaMarkalar: [],
            kiralamaMarkalar2: [],
            kiralamaMarkalar3: [],
            kiralamaSeriler: [],
            kiralamaSeriler2: [],
            kiralamaSeriler3: [],
            kiralamaKasalar: [],
            kiralamaKasalar2: [],
            kiralamaKasalar3: [],
            kiralamaYakitlar: [],
            kiralamaYakitlar2: [],
            kiralamaYakitlar3: [],
        };
        this._reCaptchaRef = React.createRef();
    }


    next() {
        if (this.state.current === 0) {
            if (this.state.aracId === "") {
                Swal.fire(
                    "Error",
                    "Lütfen araç bilgilerin tamamını doldurun",
                    "error"
                );
            } else {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        } else if (this.state.current === 1) {
            if (this.state.oncekiSahipler > 0 && this.state.kilometre !== "" && this.state.renk !== "") {
                document.getElementById("Kilometre").style.color = "#3c4b64";
                document.getElementById("Renk").style.color = "#3c4b64";

                const current = this.state.current + 1;
                this.setState({ current });
            } else {
                Swal.fire(
                    "Error",
                    "Lütfen gerekli bilgileri doldurun",
                    "error"
                );
                if (this.state.kilometre == "") { document.getElementById("Kilometre").style.color = "#ff0000"; }
                if (this.state.renk == "") { document.getElementById("Renk").style.color = "#ff0000"; }

            }
        } else if (this.state.current === 2) {
            const current = this.state.current + 1;
            this.setState({ current });

        } else if (this.state.current === 3) {

            if (this.state.kiralamaSuresi !== "" && this.state.kullanimKm !== "" && this.state.satisFiyati !== "" && this.handleChangePlaque(this.state.plaka)) {
                document.getElementById("KiralamaSuresi").style.color = "#3c4b64";
                document.getElementById("KullanimKm").style.color = "#3c4b64";
                document.getElementById("SatisFiyati").style.color = "#3c4b64";
                document.getElementById("Plaka").style.color = "#3c4b64";



                const current = this.state.current + 1;
                this.setState({ current });
            } else {
                var plakatext = "";
                if (!this.handleChangePlaque(this.state.plaka)) { plakatext += "\t Plakanızı arada - olacak şekilde girin(ABC-AB-1234 gibi)"; document.getElementById("Plaka").style.color = "#ff0000"; }
                Swal.fire(
                    "Error",
                    "Lütfen gerekli bilgileri doldurun." + plakatext,
                    "error"
                );
                if (this.state.kiralamaSuresi == "") { document.getElementById("KiralamaSuresi").style.color = "#ff0000"; }
                if (this.state.kullanimKm == "") { document.getElementById("KullanimKm").style.color = "#ff0000"; }
                if (this.state.satisFiyati == "") { document.getElementById("SatisFiyati").style.color = "#ff0000"; }
                if (this.state.plaka == "") { document.getElementById("Plaka").style.color = "#ff0000"; }
            }
        }


    }

    rentData = () => ([
        { marka: this.state.kiramarka, seri: this.state.kiraseri, kasaTipi: this.state.kirakasatipi, yakit: this.state.kirayakit, kirasure: this.state.kirasure, kullanim: this.state.kirakullanim },
        { marka: this.state.kiramarka2, seri: this.state.kiraseri2, kasaTipi: this.state.kirakasatipi2, yakit: this.state.kirayakit2, kirasure: this.state.kirasure2, kullanim: this.state.kirakullanim2 },
        { marka: this.state.kiramarka3, seri: this.state.kiraseri3, kasaTipi: this.state.kirakasatipi3, yakit: this.state.kirayakit3, kirasure: this.state.kirasure3, kullanim: this.state.kirakullanim3 },
    ]);


    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    componentDidMount() {


        const script = document.createElement("script");
        script.src = "../../Content/Js/jquery-3.5.1.min.js";
        document.body.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = "../../Content/Js/bootstrap.min.js";
        document.body.appendChild(script2);

        const script3 = document.createElement("script");
        script3.src = "../../Content/Js/bootstrap-datepicker.min.js";
        document.body.appendChild(script3);


        const script5 = document.createElement("script");
        script5.src = "../../Content/Js/fontawesome.min.js";
        document.body.appendChild(script5);


        const script8 = document.createElement("script");
        script8.src = "../../Content/Js/fancybox.min.js";
        document.body.appendChild(script8);

        const script9 = document.createElement("script");
        script9.src = "../../Content/Js/maskedinput.js";
        document.body.appendChild(script9);


        this.setState({ isLoaderActive: true });
        this.axiosAjax("get", "getuserid");
        this.axiosAjax("get", "getallbrands");
        this.axiosAjax("get", "getcolors");
        this.axiosAjax("get", "getheaders", 2);
        this.axiosAjax("get", "getcities", 2);
        this.axiosAjax("get", "getallbrandsrentcar");

    }

    onFileChange(e) {

        if (e.target.files.length + this.state.imgCollection.length < 9) {
            for (let index = 0; index < e.target.files.length; index++) {
                const element = e.target.files[index];
                if (element.size > 1000000) {
                    Swal.fire(
                        "Error",
                        "One of the files are too big! It should be smaller than 1 megabytes",
                        "error"
                    );
                }
            }
            var arr = [];
            for (var i = 0; i < e.target.files.length; i++) {
                var dd = URL.createObjectURL(e.target.files[i]);
                arr.push(
                    {
                        original: dd + "",
                        thumbnail: dd + ""
                    });
            }
            if (this.state.imageFiles != null) {
                var lastimages = arr.concat(this.state.imageFiles);
            }
            else {
                var lastimages = arr;
            }

            this.setState({
                imageFiles: lastimages
            })

            this.setState({ imgCollection: e.target.files });

            // this.setState({ imgCollection: this.state.imgCollection.concat(e.target.files) });

            //this.setState({ selectedImageUrl: URL.createObjectURL(e.target.files[0]) });
        } else {
            Swal.fire("Error", "Maksimum 8 resim eklebilir!", "error");

        }
    }
    getImage = (e) => {
        debugger;
        var targetSource;
        if(e?.target){
            var source = e.target.src;
            targetSource = e.target.src;
        }else{
            var source = e;
            targetSource = e;
        }
        
    
        Swal.fire({
            title: "Are you sure?",
            text: "You will delete " + targetSource.substring(targetSource.lastIndexOf('/') + 1) + " from images.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.value) {
                debugger;
                console.log("DELETED");
                var deleteIndex = this.state.imageFiles.map(a => a.original).indexOf(source);
                var newFileList = Array.from(this.state.imgCollection);
                newFileList.splice(deleteIndex, 1);
                
                var filtered = this.state.imageFiles.filter(function (el) { return el.original != source; });
                this.setState({ imageFiles: (filtered) ,imgCollection:newFileList});
                //TODO : buraya image urli disable etme yeri getirilecek
                Swal.fire(
                    "Image is Deleted!",
                    "Images is deleted successfully.",
                    "success"
                );

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Action cancelled", "error");
            }
        });
    }
    handleSubmit = async () => {

        //e.preventDefault();
        // var mailObj = {
        //     email: "merdol@gmail.com",
        //     subject: this.state.advertiseNo+" No lu ilan oluşturuldu",
        //     messageText: this.state.advertiseNo+" No lu ilan başarıyla ekledi"
        // }
        // await post(
        //     Config.serverUrl + "SendMail/SendMailFromUI",
        //     mailObj
        // );
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append("imgCollection", this.state.imgCollection[key]);
        }

        formData.append("adId", this.state.advertiseNo.toString());
        await post("/advertise/uploadAdvertiseImages", formData, {}).then((res) => {
            document.getElementById("finish").disabled = false;
            this.props.history.push("/dashboard/MyAds");
        });
    };
    chosenRentCars() {
        var arr = [];
        if (this.state.kiramarka != "") {
            arr.push(
                {
                    brand: this.state.kiramarka,
                    serial: this.state.kiraseri,
                    vehicle_body_type: this.state.kirakasatipi,
                    fuel_type: this.state.kirayakit,
                    rental_period: this.state.kirasure,
                    usage: parseInt(this.state.kirakullanim),
                }
            );
        }
        if (this.state.kiramarka2 != "") {
            arr.push({
                brand: this.state.kiramarka2,
                serial: this.state.kiraseri2,
                vehicle_body_type: this.state.kirakasatipi2,
                fuel_type: this.state.kirayakit2,
                rental_period: this.state.kirasure2,
                usage: parseInt(this.state.kirakullanim2),
            });
        }
        if (this.state.kiramarka3 != "") {
            arr.push({
                brand: this.state.kiramarka3,
                serial: this.state.kiraseri3,
                vehicle_body_type: this.state.kirakasatipi3,
                fuel_type: this.state.kirayakit3,
                rental_period: this.state.kirasure3,
                usage: parseInt(this.state.kirakullanim3),
            });
        }

        return arr;
    }
    // axios methods function
    async axiosAjax(methodType, action, data) {
        //this.setState({ isLoaderActive: true });
        let axiosResult;
        if (methodType === "get") {
            switch (action) {
                case "getallbrands": {
                    axiosResult = await get(Config.serverUrl + "brand/GetAllBrands");

                    this.setState({ markalar: axiosResult.data.result.sort(), loading: false });
                    break;
                }
                case "getregistrationmonth": {
                    axiosResult = await get(
                        Config.serverUrl + "brand/GetRegistiretionMonth/" + data
                    );

                    this.setState({ uretimAylari: axiosResult.data.result.sort() });
                    axiosResult.data.result.length === 1
                        ? this.setState({ uretimAy: axiosResult.data.result[0] })
                        : console.log("-");
                    this.setState({ loading: false });
                    //this.setState({ isLoaderActive: false });
                    break;
                }
                case "getcolors": {
                    axiosResult = await get(Config.serverUrl + "bussines/GetColors");

                    this.setState({ renkler: axiosResult.data.result.sort() });
                    break;
                }
                case "getheaders": {
                    axiosResult = await get(
                        Config.serverUrl + "vechileatribute/GetAtributesGroup/" + data
                    );

                    this.setState({ basliklar: axiosResult.data.result });
                    this.setState({ isLoaderActive: false });
                    break;
                }
                case "getcities": {
                    axiosResult = await get(Config.serverUrl + "city/GetCities/" + data);

                    this.setState({ sehirler: axiosResult.data.result });
                    this.setState({ isLoaderActive: false });
                    break;
                }
                case "getuserid": {
                    axiosResult = await get(Config.serverUrl + "user/GetUserProfileById");
                    if (axiosResult.data) {
                        debugger;
                      //  if (axiosResult.data.telephone == null || axiosResult.data.telephone == "") {
                      //      Swal.fire(
                      //          "Hata",
                      //          "Lütfen profilinizde telefon numaranızı tanımlayınız!",
                      //          "error"
                      //      ).then(() => {
                      //          this.props.history.push("/dashboard/Profile");
                      //      });
                      //      return;
                      //  }
                        this.setState({ userId: axiosResult.data.userid });
                    }

                    break;
                }
                case "getallbrandsrentcar": {
                    axiosResult = await get(Config.serverUrl + "brand/GetAllBrandsRentCar");
                    var res = axiosResult.data.result.slice(1);


                    this.setState({ kiralamaMarkalar: axiosResult.data.result });
                    this.setState({ kiralamaMarkalar2: axiosResult.data.result });
                    this.setState({ kiralamaMarkalar3: axiosResult.data.result });

                    break;
                }
                default:
                    break;
            }
        } else if (methodType === "post") {
            switch (action) {
                case "getbrands": {
                    axiosResult = await post(Config.serverUrl + "brand/GetBrands", data);
                    var axiosData = axiosResult.data.result.sort();

                    this.setState({ loading: false }); //this.setState({ isLoaderActive: false });
                    switch (Object.keys(data).length) {
                        case 2: {
                            this.setState({ uretimYillari: axiosData });

                            axiosData.length === 1
                                ? this.handleChanges("year", axiosData[0])
                                : console.log("-");
                            break;
                        }
                        case 3: {
                            this.setState({ modeller: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("model", axiosData[0])
                                : console.log("-");
                            break;
                        }
                        case 4: {
                            this.setState({ yakitTurleri: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("fuel", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 5: {
                            this.setState({ psKwler: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("ps", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 6: {
                            this.setState({ modelTipleri: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("modeltype", axiosData[0])
                                : console.log("-");
                            break;
                        }
                        case 7: {
                            this.setState({ kasaTipleri: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("bodytype", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 8: {
                            this.setState({ uretimDonemleri: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("period", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 9: {
                            this.setState({ kapiSayilari: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("door", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 10: {
                            this.setState({ vitesler: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("gear", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 11: {
                            this.setState({ motorHacimleri: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("engine", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        case 12: {
                            this.setState({ emisyonlar: axiosData });
                            axiosData.length === 1
                                ? this.handleChanges("emission", axiosData[0])
                                : console.log("-");

                            break;
                        }
                        default:
                            break;
                    }
                    break;
                }
                case "getdifferentrentcars": {
                    axiosResult = await post(Config.serverUrl + "brand/GetDiffrentRentCars", data);
                    var axiosRes = axiosResult.data.result.sort();
                    switch (Object.keys(data).length) {
                        case 1: {
                            this.setState({ kiralamaSeriler: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kiraseri", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 2: {
                            this.setState({ kiralamaKasalar: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kirakasa", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 3: {
                            this.setState({ kiralamaYakitlar: axiosRes });
                            break;
                        }

                        default:
                            break;
                    }
                    break;
                }
                case "getdifferentrentcars2": {
                    axiosResult = await post(Config.serverUrl + "brand/GetDiffrentRentCars", data);
                    axiosRes = axiosResult.data.result.sort();
                    switch (Object.keys(data).length) {
                        case 1: {
                            this.setState({ kiralamaSeriler2: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kiraseri2", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 2: {
                            this.setState({ kiralamaKasalar2: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kirakasa2", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 3: {
                            this.setState({ kiralamaYakitlar2: axiosRes });
                            break;
                        }

                        default:
                            break;
                    }
                    break;
                }
                case "getdifferentrentcars3": {
                    axiosResult = await post(Config.serverUrl + "brand/GetDiffrentRentCars", data);
                    var axiosRes = axiosResult.data.result.sort();
                    switch (Object.keys(data).length) {
                        case 1: {
                            this.setState({ kiralamaSeriler3: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kiraseri3", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 2: {
                            this.setState({ kiralamaKasalar3: axiosRes });

                            axiosRes.length === 1
                                ? this.handleKiralamaChanges("kirakasa3", axiosRes[0])
                                : console.log("-");
                            break;
                        }
                        case 3: {
                            this.setState({ kiralamaYakitlar3: axiosRes });
                            break;
                        }

                        default:
                            break;
                    }
                    break;
                }
                case "getcarid": {
                    axiosResult = await post(Config.serverUrl + "brand/GetBrands", data);
                    var axiosData = axiosResult.data.result;
                    this.setState({ aracId: axiosData });
                    console.log(axiosResult);
                    this.setState({ loading: false }); //this.setState({ isLoaderActive: false });
                    break;
                }
                case "addadvertise": {
                    this.setState({ kaydet: true });
                    document.getElementById("finish").disabled = true;
                    var checkboxes = this.handleCheckboxChange();
                    var formData = new FormData();
                    for (const key of Object.keys(this.state.imgCollection)) {
                        formData.append("imgCollection", this.state.imgCollection[key]);
                    }
                    var obj = {
                        RequestAdvertises: {
                            AdvertisesObj: {
                                user_id: this.state.userId,
                                brand_id: this.state.aracId,
                                sale_price: this.state.satisFiyati,
                                rental_period: this.state.kiralamaSuresi,
                                usage: parseInt(this.state.kullanimKm),
                                state_id: this.state.eyalet,
                                city: this.state.sehir,
                                location: this.state.lokasyon,
                                posta_code: this.state.postaKodu,
                                posta_description: this.state.postaDescription,
                                plaque: this.state.plaka,
                                chassis: this.state.sasi,
                                number_of_vehicle_owners: this.state.oncekiSahipler,
                                checkbook: this.state.cekDefteri,
                                non_smoking: this.state.sigaraIcilmeyen,
                                kilometer: this.state.kilometre,
                                color_id: this.state.renk,
                                metallic_color: this.state.metalik,
                                description: this.state.genelBilgiler,
                                diffrent_car_choose: this.state.baskaAracCheck,
                                extended_warranty: this.state.uzatilmisGaranti,
                                warranty: this.state.garanti

                            },
                            AdvertisesDetailObj: checkboxes,//checkboxes,
                            // AdvertisesImageObj: [
                            //   { images_link: "google.com/araba" },
                            //   { images_link: "google.com/araba1" },
                            // ],
                            AdvertisesDetailSpecialObj: this.chosenRentCars(),
                        },

                        formData,
                    };
                    axiosResult = await post(
                        Config.serverUrl + "Advertise/AddAdvertiseNew",
                        obj
                    ).then((res) => {
                        debugger;
                        if(res.data?.result === "Hatalı Plaka..!"){
                            this.setState({ kaydet: false });
                            Swal.fire(
                                "Hata",
                                "Plaka bilgileriniz hatalıdır, lütfen bilgilerinizi kontrol edin!",
                                "error"
                            ).then(() => {
                                                                    
                                   this.prev();
                                });
                        }
                        else if (res.data?.result !== "Kayıt Bulunamadı..!") {

                            this.setState({ kaydet: false });
                            this.setState({ advertiseNo: res.data.result });

                            this.handleSubmit();
                            Swal.fire(
                                "Başarılı",
                                res.data.result +
                                " numaralı ilanınız incelenmek üzere gönderilmiştir!",
                                "success"
                            );
                        } else {
                            Swal.fire("Error", "Something went wrong", "error");
                        }
                    });

                    break;
                }
                default:
                    break;
            }

        }

    }

    resetValues = (methodName) => {
        switch (methodName) {
            case "brand": {
                // marka seçilip aylar sorgulanır

                this.setState({ uretimAy: "" });
                this.setState({ uretimYil: "" });
                this.setState({ model: "" });
                this.setState({ yakitTuru: "" });
                this.setState({ psKw: "" });
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ uretimYillari: [] });
                this.setState({ modeller: [] });
                this.setState({ yakitTurleri: [] });
                this.setState({ psKwler: [] });
                this.setState({ modelTipleri: [] });
                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "month": {
                // ay seçilip yıllar sorgulanır
                this.setState({ uretimYil: "" });
                this.setState({ model: "" });
                this.setState({ yakitTuru: "" });
                this.setState({ psKw: "" });
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ modeller: [] });
                this.setState({ yakitTurleri: [] });
                this.setState({ psKwler: [] });
                this.setState({ modelTipleri: [] });
                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "year": {
                // yıl seçilip modeller sorgulanır

                this.setState({ model: "" });
                this.setState({ yakitTuru: "" });
                this.setState({ psKw: "" });
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ yakitTurleri: [] });
                this.setState({ psKwler: [] });
                this.setState({ modelTipleri: [] });
                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "model": {
                // model seçilip yakıtlar sorgulanır
                this.setState({ yakitTuru: "" });
                this.setState({ psKw: "" });
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ psKwler: [] });
                this.setState({ modelTipleri: [] });
                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "fuel": {
                // yakıt seçilip beygirler sorgulanır

                this.setState({ psKw: "" });
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ modelTipleri: [] });
                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "ps": {
                // beygir seçilip araçmodeltipi sorgulanır
                this.setState({ aracModelTipi: "" });
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ kasaTipleri: [] });
                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "modeltype": {
                // araçmodeltipi seçilir kasatipi sorgulanır
                this.setState({ kasaTipi: "" });
                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ uretimDonemleri: [] });
                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "bodytype": {
                // kasatipi seçilir üretim dönemi sorgulanır

                this.setState({ uretimDonemi: "" });
                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ kapiSayilari: [] });
                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "period": {
                // üretin dönemi seçilir kapı sayısı sorgulanır

                this.setState({ kapiSayisi: "" });
                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ vitesler: [] });
                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "door": {
                // kapı sayısı seçilir vites sorgulanır

                this.setState({ vites: "" });
                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ motorHacimleri: [] });
                this.setState({ emisyonlar: [] });
                break;
            }
            case "gear": {
                // vites seçilir motor sorgulanır

                this.setState({ motorHacmi: "" });
                this.setState({ emisyon: "" });

                this.setState({ emisyonlar: [] });
                break;
            }
            case "engine": {
                // motor seçilir emisyon sorgulanır
                this.setState({ emisyon: "" });
                break;
            } case "kiramarka": {

                this.setState({ kiraseri: "" });
                this.setState({ kirakasatipi: "" });
                this.setState({ kirayakit: "" });

                this.setState({ kiralamaSeriler: [] });
                this.setState({ kiralamaKasalar: [] });
                this.setState({ kiralamaYakitlar: [] });
                break;
            }
            case "kiramarka2": {

                this.setState({ kiraseri2: "" });
                this.setState({ kirakasatipi2: "" });
                this.setState({ kirayakit2: "" });

                this.setState({ kiralamaSeriler2: [] });
                this.setState({ kiralamaKasalar2: [] });
                this.setState({ kiralamaYakitlar2: [] });
                break;
            }
            case "kiramarka3": {

                this.setState({ kiraseri3: "" });
                this.setState({ kirakasatipi3: "" });
                this.setState({ kirayakit3: "" });

                this.setState({ kiralamaSeriler3: [] });
                this.setState({ kiralamaKasalar3: [] });
                this.setState({ kiralamaYakitlar3: [] });
                break;
            }
            case "kiraseri": {


                this.setState({ kirakasatipi: "" });
                this.setState({ kirayakit: "" });


                this.setState({ kiralamaKasalar: [] });
                this.setState({ kiralamaYakitlar: [] });
                break;
            }
            case "kiraseri2": {


                this.setState({ kirakasatipi2: "" });
                this.setState({ kirayakit2: "" });


                this.setState({ kiralamaKasalar2: [] });
                this.setState({ kiralamaYakitlar2: [] });
                break;
            }
            case "kiraseri3": {


                this.setState({ kirakasatipi3: "" });
                this.setState({ kirayakit3: "" });


                this.setState({ kiralamaKasalar3: [] });
                this.setState({ kiralamaYakitlar3: [] });
                break;
            }
            case "kirakasa": {



                this.setState({ kirayakit: "" });



                this.setState({ kiralamaYakitlar: [] });
                break;
            }
            case "kirakasa2": {
                this.setState({ kirayakit2: "" });
                this.setState({ kiralamaYakitlar2: [] });
                break;
            }
            case "kirakasa3": {
                this.setState({ kirayakit3: "" });
                this.setState({ kiralamaYakitlar3: [] });
                break;
            }
            case "kiraall": {
                this.setState({ kiramarka2: "" })
                this.setState({ kiraseri2: "" });
                this.setState({ kirakasatipi2: "" });
                this.setState({ kirayakit2: "" });

                this.setState({ kiralamaSeriler2: [] });
                this.setState({ kiralamaKasalar2: [] });
                this.setState({ kiralamaYakitlar2: [] });

                this.setState({ kiramarka: "" });
                this.setState({ kiraseri: "" });
                this.setState({ kirakasatipi: "" });
                this.setState({ kirayakit: "" });

                this.setState({ kiralamaSeriler: [] });
                this.setState({ kiralamaKasalar: [] });
                this.setState({ kiralamaYakitlar: [] });

                this.setState({ kiramarka3: "" })
                this.setState({ kiraseri3: "" });
                this.setState({ kirakasatipi3: "" });
                this.setState({ kirayakit3: "" });

                this.setState({ kiralamaSeriler3: [] });
                this.setState({ kiralamaKasalar3: [] });
                this.setState({ kiralamaYakitlar3: [] });
                break;
            }

            case "kiraall1": {
                this.setState({ kiramarka2: "" })
                this.setState({ kiraseri2: "" });
                this.setState({ kirakasatipi2: "" });
                this.setState({ kirayakit2: "" });

                this.setState({ kiralamaSeriler2: [] });
                this.setState({ kiralamaKasalar2: [] });
                this.setState({ kiralamaYakitlar2: [] });
                this.setState({ kirasure2: "" })
                this.setState({ kirakullanim2: "" })

                this.setState({ kiraseri: "" });
                this.setState({ kirakasatipi: "" });
                this.setState({ kirayakit: "" });

                this.setState({ kiralamaSeriler: [] });
                this.setState({ kiralamaKasalar: [] });
                this.setState({ kiralamaYakitlar: [] });

                this.setState({ kiramarka3: "" })
                this.setState({ kiraseri3: "" });
                this.setState({ kirakasatipi3: "" });
                this.setState({ kirayakit3: "" });
                this.setState({ kirasure3: "" });
                this.setState({ kirakullanim3: "" });

                this.setState({ kiralamaSeriler3: [] });
                this.setState({ kiralamaKasalar3: [] });
                this.setState({ kiralamaYakitlar3: [] });
                break;
            }
            case "kiraall2": {

                this.setState({ kiraseri2: "" });
                this.setState({ kirakasatipi2: "" });
                this.setState({ kirayakit2: "" });

                this.setState({ kiralamaSeriler2: [] });
                this.setState({ kiralamaKasalar2: [] });
                this.setState({ kiralamaYakitlar2: [] });

                this.setState({ kiramarka3: "" })
                this.setState({ kiraseri3: "" });
                this.setState({ kirakasatipi3: "" });
                this.setState({ kirayakit3: "" });
                this.setState({ kirasure3: "" });
                this.setState({ kirakullanim3: "" });

                this.setState({ kiralamaSeriler3: [] });
                this.setState({ kiralamaKasalar3: [] });
                this.setState({ kiralamaYakitlar3: [] });

                break;
            }
            default:
                break;
        }
    };
    // model marka yıl ay değişimlerinde get method çağırımı
    handleChanges = (methodName, event) => {
        var that = this;
        if (methodName !== "modeltype" && event === "") {
            this.setState({ loading: false }); //this.setState({ isLoaderActive: false });
            return;
        }
        this.setState({ loading: true }); //this.setState({ isLoaderActive: true });

        switch (methodName) {
            case "brand": {
                // marka seçilip aylar sorgulanır
                this.setState({ marka: event });
                this.axiosAjax("get", "getregistrationmonth", event);
                this.resetValues("brand");
                break;
            }
            case "month": {
                // ay seçilip yıllar sorgulanır
                this.setState({ uretimAy: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: event,
                });
                this.resetValues("month");
                break;
            }
            case "year": {
                // yıl seçilip modeller sorgulanır
                this.setState({ uretimYil: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(event),
                });
                this.resetValues("year");
                break;
            }
            case "model": {
                // model seçilip yakıtlar sorgulanır
                this.setState({ model: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: event,
                });
                this.resetValues("model");
                break;
            }
            case "fuel": {
                // yakıt seçilip beygirler sorgulanır
                this.setState({ yakitTuru: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: event,
                });
                this.resetValues("fuel");
                break;
            }
            case "ps": {
                // beygir seçilip araçmodeltipi sorgulanır
                this.setState({ psKw: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: event,
                });
                this.resetValues("ps");
                break;
            }
            case "modeltype": {
                // araçmodeltipi seçilir kasatipi sorgulanır
                this.setState({ aracModelTipi: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: event,
                });
                this.resetValues("modeltype");
                break;
            }
            case "bodytype": {
                // kasatipi seçilir üretim dönemi sorgulanır
                this.setState({ kasaTipi: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: event,
                });
                this.resetValues("bodytype");
                break;
            }
            case "period": {
                // üretin dönemi seçilir kapı sayısı sorgulanır
                this.setState({ uretimDonemi: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: this.state.kasaTipi,
                    productionPeriod: event,
                });
                this.resetValues("period");
                break;
            }
            case "door": {
                // kapı sayısı seçilir vites sorgulanır
                this.setState({ kapiSayisi: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: this.state.kasaTipi,
                    productionPeriod: this.state.uretimDonemi,
                    numberOfDors: event,
                });
                this.resetValues("door");
                break;
            }
            case "gear": {
                // vites seçilir motor sorgulanır
                this.setState({ vites: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: this.state.kasaTipi,
                    productionPeriod: this.state.uretimDonemi,
                    numberOfDors: this.state.kapiSayisi,
                    gear: event,
                });
                this.resetValues("gear");
                break;
            }
            case "engine": {
                // motor seçilir emisyon sorgulanır
                this.setState({ motorHacmi: event });
                this.axiosAjax("post", "getbrands", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: this.state.kasaTipi,
                    productionPeriod: this.state.uretimDonemi,
                    numberOfDors: this.state.kapiSayisi,
                    gear: this.state.vites,
                    engineCapacity: event,
                });
                this.resetValues("engine");
                break;
            }
            case "emission": {
                // motor seçilir emisyon sorgulanır
                this.setState({ emisyon: event });
                this.axiosAjax("post", "getcarid", {
                    brandName: that.state.marka,
                    registrationMonth: this.state.uretimAy,
                    registrationYear: parseInt(this.state.uretimYil),
                    model: this.state.model,
                    fuelType: this.state.yakitTuru,
                    ps: this.state.psKw,
                    modelType: this.state.aracModelTipi,
                    bodyType: this.state.kasaTipi,
                    productionPeriod: this.state.uretimDonemi,
                    numberOfDors: this.state.kapiSayisi,
                    gear: this.state.vites,
                    engineCapacity: this.state.motorHacmi,
                    emission: event,
                });
                break;
            }
            default:
                break;
        }
    };
    handleKiralamaChanges = (methodName, event) => {
        //var that = this;
        //this.setState({ loading: true }); //this.setState({ isLoaderActive: true });
        switch (methodName) {
            case "kiramarka": {
                this.setState({ kiramarka: event });
                if (event === "IT DOES NOT MATTER") {
                    this.setState({ kirafarketmez: true });

                    this.axiosAjax("post", "getdifferentrentcars", {
                        brandName: event,
                    });
                    this.resetValues("kiraall1");
                } else {
                    this.setState({ kirafarketmez: false });
                    this.axiosAjax("post", "getdifferentrentcars", {
                        brandName: event,
                    });
                    this.resetValues("kiramarka");
                }


                break;
            }
            case "kiramarka2": {
                this.setState({ kiramarka2: event });
                if (event === "IT DOES NOT MATTER") {
                    this.setState({ kirafarketmez: true });
                    this.axiosAjax("post", "getdifferentrentcars", {
                        brandName: event,
                    });
                    this.resetValues("kiraall2");
                } else {
                    this.axiosAjax("post", "getdifferentrentcars2", {
                        brandName: event,
                    });
                    this.resetValues("kiramarka2");
                }

                break;
            }
            case "kiramarka3": {
                this.setState({ kiramarka3: event });
                this.axiosAjax("post", "getdifferentrentcars3", {
                    brandName: event,

                });
                this.resetValues("kiramarka3");
                break;
            } case "kiraseri": {
                this.setState({ kiraseri: event });
                this.axiosAjax("post", "getdifferentrentcars", {
                    brandName: this.state.kiramarka,
                    serial: event
                });
                this.resetValues("kiraseri");
                break;
            } case "kiraseri2": {
                this.setState({ kiraseri2: event });
                this.axiosAjax("post", "getdifferentrentcars2", {
                    brandName: this.state.kiramarka2,
                    serial: event
                });
                this.resetValues("kiraseri2");
                break;
            } case "kiraseri3": {
                this.setState({ kiraseri3: event });
                this.axiosAjax("post", "getdifferentrentcars3", {
                    brandName: this.state.kiramarka3,
                    serial: event
                });
                this.resetValues("kiraseri3");
                break;
            }
            case "kirakasa": {
                this.setState({ kirakasatipi: event });
                this.axiosAjax("post", "getdifferentrentcars", {
                    brandName: this.state.kiramarka,
                    serial: this.state.kiraseri,
                    bodyType: event
                });
                this.resetValues("kirakasa");
                break;
            } case "kirakasa2": {
                this.setState({ kirakasatipi2: event });
                this.axiosAjax("post", "getdifferentrentcars2", {
                    brandName: this.state.kiramarka2,
                    serial: this.state.kiraseri2,
                    bodyType: event
                });
                this.resetValues("kirakasa2");
                break;
            } case "kirakasa3": {
                this.setState({ kirakasatipi3: event });
                this.axiosAjax("post", "getdifferentrentcars3", {
                    brandName: this.state.kiramarka3,
                    serial: this.state.kiraseri3,
                    bodyType: event
                });
                this.resetValues("kirakasa3");
                break;
            }
            default:
                break;
        }
    };
    handlePreviusOwner(action, event) {
        if (action === "previusowneradd") {
            this.setState({ oncekiSahipler: ++event });
            return;
        } else {
            if (event > 1) {
                this.setState({ oncekiSahipler: --event });
                return;
            }

        }
    };

    handleCheckboxChange = () => {


        var listOfCheckBoxVal = [];

    for (let i = 0; i < this.state.selectedCheckBoxes.length; i++) {
        listOfCheckBoxVal.push({ atribute_id: this.state.selectedCheckBoxes[i], value: 1 });
    }
    //this.setState({ selectedCheckBoxes: listOfCheckBoxVal.atribute_id });
    return listOfCheckBoxVal;
};
checkboxHandle = (id, selectedCheckBoxes) => {
    const index = selectedCheckBoxes.indexOf(id);
    if (index > -1) {
        this.state.selectedCheckBoxes.splice(index, 1);
    } else {
        let { selectedCheckBoxes } = this.state;
        selectedCheckBoxes.push(id);
    }
};
getCheckboxes(){
    return (Array.from(this.state.basliklar).map((item) => (
        <div key={item.DisplayName}>
            <div className="row"  key={item.DisplayName}>
                <div className="col-md-12"  key={item.DisplayName}>
                    <h2  key={item.DisplayName}>{item.DisplayName}</h2>
                </div>
                {Array.from(item.SubItems).map((subitem) => (
                    <div key={subitem.id} className="col-md-3">
                        <label>
                            <input
                                id={subitem.id}
                                name={subitem.id}
                                type="checkbox"
                                defaultChecked={this.state.selectedCheckBoxes?.includes(subitem.id) ? true : false}
                                onClick={() => this.checkboxHandle(subitem.id, this.state.selectedCheckBoxes)}
                            />
                            <label for={subitem.id} id={subitem.id}>
                                <span>
                                    <span></span>
                                </span>
                                {subitem.value}
                            </label>
                        </label>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )));
}
handleChangePlaque(plaque){
    if(plaque.match("[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}")!=null) {
      return true;
    }
    else{
        return false;
    }
  }

render() {
    const { current } = this.state;
   
    const myCheckboxes = this.getCheckboxes();
    const fields = [
        { key: 'marka', label: "Marka" },
        { key: 'seri', label: "Seri" },
        { key: 'kasaTipi', label: "Kasa Tipi" },
        { key: 'yakit', label: "Yakıt" },
        { key: 'kirasure', label: "Kira Süresi" },
        { key: 'kullanim', label: "Kullanım" },

        ];
        const steps = [
            {
                title: "Araç Bilgileri",
                content: (
                    <LoadingOverlay active={this.state.loading} spinner text="Yükleniyor...">
                        <div className="container">
                            <div className="subpage add_ad">
                                <div className="row" style={{ textAlign: "left" }}>
                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Marka</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.marka}
                                            onChange={(event) =>
                                                this.handleChanges("brand", event.target.value)
                                            }
                                        >
                                            <option value="">Marka seçiniz</option>
                                            {Array.from(this.state.markalar).map((brand) => (
                                                <option key={brand} value={brand}>
                                                    {brand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Üretim Ay</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.uretimAy}
                                            onChange={(event) =>
                                                this.handleChanges("month", event.target.value)
                                            }
                                        >
                                            <option value="">Ay seçiniz</option>
                                            {Array.from(this.state.uretimAylari).map((month) => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Üretim Yıl</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.uretimYil}
                                            onChange={(event) =>
                                                this.handleChanges("year", event.target.value)
                                            }
                                        >
                                            <option value="">Yıl seçiniz</option>
                                            {Array.from(this.state.uretimYillari).map((yil) => (
                                                <option key={yil} value={yil}>
                                                    {yil}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Model</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.model}
                                            onChange={(event) =>
                                                this.handleChanges("model", event.target.value)
                                            }
                                        >
                                            <option value="">Model seçiniz</option>
                                            {Array.from(this.state.modeller).map((mod) => (
                                                <option key={mod} value={mod}>
                                                    {mod}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Yakıt Türü</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.yakitTuru}
                                            onChange={(event) =>
                                                this.handleChanges("fuel", event.target.value)
                                            }
                                        >
                                            <option value="">Yakıt seçiniz</option>
                                            {Array.from(this.state.yakitTurleri).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>PS (kW)</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.psKw}
                                            onChange={(event) =>
                                                this.handleChanges("ps", event.target.value)
                                            }
                                        >
                                            <option value="">Beygir seçiniz (kW)</option>
                                            {Array.from(this.state.psKwler).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Araç Model Tipi</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.aracModelTipi}
                                            onChange={(event) =>
                                                this.handleChanges("modeltype", event.target.value)
                                            }
                                        >
                                            <option value="">Model tipi seçiniz</option>
                                            {Array.from(this.state.modelTipleri).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Kasa Tipi</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.kasaTipi}
                                            onChange={(event) =>
                                                this.handleChanges("bodytype", event.target.value)
                                            }
                                        >
                                            <option value="">Kasa tipi seçiniz</option>
                                            {Array.from(this.state.kasaTipleri).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Üretim Dönemi</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.uretimDonemi}
                                            onChange={(event) =>
                                                this.handleChanges("period", event.target.value)
                                            }
                                        >
                                            <option value="">Üretim dönemi seçiniz</option>
                                            {Array.from(this.state.uretimDonemleri).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Kapı Sayısı</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.kapiSayisi}
                                            onChange={(event) => this.handleChanges("door", event.target.value)}
                                        >
                                            <option value="">Kapı sayısı seçiniz</option>
                                            {Array.from(this.state.kapiSayilari).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Vites</label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.vites}
                                            onChange={(event) =>
                                                this.handleChanges("gear", event.target.value)
                                            }
                                        >
                                            <option value="">Vites türünü seçiniz</option>
                                            {Array.from(this.state.vitesler).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Motor hacmi (cc) </label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.motorHacmi}
                                            onChange={(event) =>
                                                this.handleChanges("engine", event.target.value)
                                            }
                                        >
                                            <option value="">Motor hacmini seçiniz</option>
                                            {Array.from(this.state.motorHacimleri).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="col-md-9">
                                        <label style={{ width: "40%", display: "inline-grid" }}>Emisyon </label>
                                        <select
                                            style={{ width: "50%" }}
                                            value={this.state.emisyon}
                                            onChange={(event) =>
                                                this.handleChanges("emission", event.target.value)
                                            }
                                        >
                                            <option value="">Emisyon cinsini seçiniz</option>
                                            {Array.from(this.state.emisyonlar).map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadingOverlay>
                ),
            },
            {
                title: "Araç Detay",
                content: (
                    <div className="container">
                        <div className="subpage add_ad">
                            <div className="row">
                                <div className="col-md-3">
                                    <label style={{ display: "inline-grid" }}>Sizden önceki sahipleri (Siz dahil)</label>
                                    <div className="plusandminus">
                                        <button
                                            id="minus"
                                            onClick={() =>
                                                this.handlePreviusOwner(
                                                    "previusownerminus",
                                                    this.state.oncekiSahipler
                                                )
                                            }
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input
                                            value={this.state.oncekiSahipler}
                                            type="text"
                                            id="previousowners"
                                            className="number"
                                            readOnly
                                        />
                                        <button
                                            id="plus"
                                            onClick={() =>
                                                this.handlePreviusOwner(
                                                    "previusowneradd",
                                                    this.state.oncekiSahipler
                                                )
                                            }
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>

                                </div>

                            <div className="col-md-3">
                                <label id="Kilometre">Kilometre</label>
                                <Input
                                    value={this.state.kilometre}
                                    onChange={(e) => {
                                        var a = e.target.value.replace(/[^0-9]/g, "");
                                        this.setState({
                                            kilometre: a,
                                        });
                                       
                                    }}
                                    placeholder="Kilometre"
                                    maxLength="7"
                                    type="text"
                                />
                                {/* <input
                                        value={this.state.kilometre}
                                        onChange={(event) => {
                                            this.setState({ kilometre: event.target.value });
                                        }}
                                        type="text"
                                    /> */}
                                </div>

                                <div className="col-md-3">
                                    <label id="Renk">Renk</label>
                                    <select
                                        value={this.state.renk}
                                        onChange={(event) => this.setState({ renk: event.target.value })

                                        }
                                    >
                                        <option value="">Renk seçiniz</option>
                                        {Array.from(this.state.renkler).map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.color}
                                            </option>
                                        ))}
                    ;
                  </select>
                                </div>

                                <div className="col-md-3">
                                    <label>Metalik</label>
                                    <input
                                        id="a101"
                                        name="Announcements"
                                        type="checkbox"
                                        checked={this.state.metalik}
                                        onChange={() =>
                                            this.setState({ metalik: !this.state.metalik })
                                        }
                                    />
                                    <label for="a101" id="a1"></label>
                                </div>
                                <div className="col-md-3">
                                    <label>Çek Defteri</label>
                                    <div>
                                        <input
                                            id="a99"
                                            name="Announcements"
                                            type="checkbox"
                                            checked={this.state.cekDefteri}
                                            onChange={() =>
                                                this.setState({
                                                    cekDefteri: !this.state.cekDefteri,
                                                })
                                            }
                                        />
                                        <label for="a99" id="a1"></label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label>Sigara İçilmeyen</label>
                                    <input
                                        id="a100"
                                        name="Announcements"
                                        type="checkbox"
                                        checked={this.state.sigaraIcilmeyen}
                                        onChange={() =>
                                            this.setState({
                                                sigaraIcilmeyen: !this.state.sigaraIcilmeyen,
                                            })
                                        }
                                    />
                                    <label for="a100" id="a1"></label>
                                </div>
                                <div className="col-md-3">
                                    <label>Garanti</label>
                                    <input
                                        id="a102"
                                        name="Announcements"
                                        type="checkbox"
                                        checked={this.state.garanti}
                                        onChange={() =>
                                            this.setState({
                                                garanti: !this.state.garanti,
                                            })
                                        }
                                    />
                                    <label for="a102" id="a1"></label>
                                </div>
                                <div className="col-md-3">
                                    <label>Uzatımış Garanti</label>
                                    <input
                                        id="a103"
                                        name="Announcements"
                                        type="checkbox"
                                        checked={this.state.uzatilmisGaranti}
                                        onChange={() =>
                                            this.setState({
                                                uzatilmisGaranti: !this.state.uzatilmisGaranti,
                                            })
                                        }
                                    />
                                    <label for="a103" id="a1"></label>
                                </div>

                                <br />
                                <br />

                            <div className="col-md-12">
                                <h2> Araç Görselleriniz</h2>
                               
                                    <div className="row fileupload-buttonbar">
                                        <div className="col-m-3">
                                            <span className="btn btn-success fileinput-button">
                                            <button style={{display:"block",width:"120px", height:"30px",color:"black"}} onClick={() => document.getElementById("uploadfile").click()}>Dosya Yükle</button>
                                                <input
                                                    id="uploadfile"
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={this.onFileChange}
                                                    name="files[]"
                                                    multiple
                                                    style={{display:"none"}}
                                                />
                                            </span>
                                        </div>
                                        <button
                                            type="reset"
                                            id="resetImg"
                                            style={{
                                                marginLeft: "20px",
                                            }}
                                            onClick={() => this.setState({imgCollection: "",imageFiles:null})}
                                            className="btn btn-warning cancel"
                                        >
                                            <i className="fas fa-ban"></i>
                                            {" "}
                                            <span>Tümünü İptal Et</span>
                                        </button>
                                    </div>
                                
                            </div>
                            {/* <div id="photos" className="row"></div>*/}
                            
                                
                            {this.state.imageFiles==null||this.state.imageFiles==""?<></>:
                             <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{marginTop:"20px", display: "flex",justifyContent: "center",textAlign:"center"}}>
                                    <button className="custom-file-upload" onClick={() => this.getImage(this.state.imageFiles[addImageRef.current.getCurrentIndex()].original)}>
                                    <i className="fas fa-trash-alt"></i>
                                    </button>
                             
                                 <ImageGallery  showPlayButton={false} ref={addImageRef} showFullscreenButton={true} items={this.state.imageFiles||null} /></div> }
                            
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: "Teknik Özellikler",
                content: (
                    <div className="container">
                        <div className="subpage add_ad">
                            <div>{myCheckboxes}</div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Genel Bilgiler</h2>
                                    <textarea
                                        placeholder="kişisel bilgi, iletişim bilgisi, plaka ve şasi numarasını vermeyin."
                                        value={this.state.genelBilgiler}
                                        onChange={(e) =>
                                            this.setState({ genelBilgiler: e.target.value })
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: "Kiralama Bilgileri",
                content: (

                    <div className="container">
                        <div className="subpage add_ad">
                            <div className="row">
                                <div className="col-md-9">
                                    <label id="KiralamaSuresi">Kiralama süreniz (Ay)</label>
                                    <select
                                        value={this.state.kiralamaSuresi}
                                        onChange={(event) =>
                                            this.setState({ kiralamaSuresi: event.target.value })
                                        }
                                    >
                                        <option value="">Kiralama süresi seçiniz</option>
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                        <option value={36}>36</option>
                                    </select>
                                </div>
                                <div className="col-md-9">
                                    <label id="KullanimKm">Kullanım (km/ay)</label>
                                    <Input
                                        value={this.state.kullanimKm}
                                        onChange={(e) => {
                                            var a = e.target.value.replace(/[^0-9]/g, "");
                                                    this.setState({
                                                        kullanimKm: a,
                                                    });
                                           
                                        }}
                                        placeholder="Kullanım"
                                        maxLength="7"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <label id="Plaka">Plaka </label>

                                    {/* <input type="text" name="licenseplate"  value={this.state.plaka}  onChange={(e) => {
                                        this.setState({ plaka: e.target.value });
                                    }} pattern="[A-Za-z0-9]" maxlength="7" placeholder="AB 1234"/> */}

                                    {/* <input style={{textTransform:"uppercase"}} type="text" pattern="[a-zA-Z0-9-]+" required/> */}
                                    <Input

                                        value={this.state.plaka}
                                        maxLength="11"
                                        placeholder="xxx-xx-1111"
                                        onChange={(e) => {

                                            this.setState({ plaka: e.target.value.replace(/["'+<>.,\/#!$%\^&\*;:{}=\_`~()]/g, "").toLocaleUpperCase('TR') });

                                        }}
                                        type="text"
                                    />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <label id="SatisFiyati">Satış Fiyatı</label>
                                    <div className="form-group">
                                        <div className="input-icon input-icon-right">
                                            <input
                                                disabled={this.state.plaka === ""}
                                                type="text"
                                                style={{ paddingRight: "20px" }}
                                                value={this.state.satisFiyati}
                                                className="form-control"
                                                onChange={(e) => {
                                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                                    this.setState({
                                                        satisFiyati: a,
                                                    });

                                                }}
                                                placeholder="Amount"
                                            />
                                            <i>€</i>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="row" >
                                <Checkbox checked={this.state.baskaAracCheck} onChange={() => this.setState({ baskaAracCheck: this.state.baskaAracCheck === 1 ? 0 : 1 })}> Başka bir araç kiralamak istiyorum</Checkbox>
                                <div className="container" hidden={!this.state.baskaAracCheck}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <label>Marka</label>
                                            <select
                                                value={this.state.kiramarka}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiramarka", event.target.value)
                                                }
                                            >
                                                <option value="">Marka</option>
                                                {Array.from(this.state.kiralamaMarkalar).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))};

                  </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Seri</label>
                                            <select
                                                value={this.state.kiraseri}
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiraseri", event.target.value)
                                                }
                                            >
                                                <option value="">Seri</option>
                                                {Array.from(this.state.kiralamaSeriler).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Kasa Tipi</label>
                                            <select
                                                value={this.state.kirakasatipi}
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleChanges("kirakasa", event.target.value)
                                                }
                                            >
                                                <option value="">Kasa Tipi</option>
                                                {Array.from(this.state.kiralamaKasalar).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Yakıt</label>
                                            <select
                                                value={this.state.kirayakit}
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.setState({ kirayakit: event.target.value })
                                                }
                                            >
                                                <option value="">Yakıt</option>
                                                {Array.from(this.state.kiralamaYakitlar).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Kiralama süreniz (Ay)</label>
                                            <select
                                                value={this.state.kirasure}
                                                onChange={(event) =>
                                                    this.setState({ kirasure: event.target.value })
                                                }
                                            >
                                                <option value="">Kiralama süresi seçiniz</option>
                                                <option value={6}>6</option>
                                                <option value={9}>9</option>
                                                <option value={12}>12</option>
                                                <option value={18}>18</option>
                                                <option value={24}>24</option>
                                                <option value={36}>36</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Kullanım (km/ay)</label>
                                            <Input
                                                value={this.state.kirakullanim}
                                                onChange={(e) => {
                                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                                this.setState({
                                                    kirakullanim: a,
                                                });
                                                    
                                                }}
                                                placeholder="Kullanım"
                                                maxLength="7"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                        
                                            <select
                                                value={this.state.kiramarka2}
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiramarka2", event.target.value)
                                                }
                                            >
                                                <option value="">Marka</option>
                                                {Array.from(this.state.kiralamaMarkalar2).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kiraseri2}
                                                disabled={this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiraseri2", event.target.value)
                                                }
                                            >
                                                <option value="">Seri</option>
                                                {Array.from(this.state.kiralamaSeriler2).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kirakasatipi2}
                                                disabled={this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kirakasa2", event.target.value)
                                                }
                                            >
                                                <option value="">Kasa Tipi</option>
                                                {Array.from(this.state.kiralamaKasalar2).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kirayakit2}
                                                disabled={this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.setState({ kirayakit2: event.target.value })
                                                }
                                            >
                                                <option value="">Yakıt</option>
                                                {Array.from(this.state.kiralamaYakitlar2).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                value={this.state.kirasure2}
                                                onChange={(event) =>
                                                    this.setState({ kirasure2: event.target.value })
                                                }
                                            >
                                                <option value="">Kiralama süresi seçiniz</option>
                                                <option value={6}>6</option>
                                                <option value={9}>9</option>
                                                <option value={12}>12</option>
                                                <option value={18}>18</option>
                                                <option value={24}>24</option>
                                                <option value={36}>36</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <Input
                                                value={this.state.kirakullanim2}
                                                disabled={this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(e) => {
                                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                                    this.setState({
                                                        kirakullanim2: a,
                                                    });
                                                   
                                                }}
                                                placeholder="Kullanım"
                                                maxLength="7"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                          
                                            <select
                                                value={this.state.kiramarka3}
                                                disabled={this.state.kiramarka3 == "IT DOES NOT MATTER" || this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiramarka3", event.target.value)
                                                }
                                            >
                                                <option value="">Marka</option>
                                                {Array.from(this.state.kiralamaMarkalar3).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kiraseri3}
                                                disabled={this.state.kiramarka3 == "IT DOES NOT MATTER" || this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kiraseri3", event.target.value)
                                                }
                                            >
                                                <option value="">Seri</option>
                                                {Array.from(this.state.kiralamaSeriler3).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                disabled={this.state.kiramarka3 == "IT DOES NOT MATTER" || this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                value={this.state.kirakasatipi3}
                                                onChange={(event) =>
                                                    this.handleKiralamaChanges("kirakasa3", event.target.value)
                                                }
                                            >
                                                <option value="">Kasa Tipi</option>
                                                {Array.from(this.state.kiralamaKasalar3).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kirayakit3}
                                                disabled={this.state.kiramarka3 == "IT DOES NOT MATTER" || this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.setState({ kirayakit3: event.target.value })
                                                }
                                            >
                                                <option value="">Yakıt</option>
                                                {Array.from(this.state.kiralamaYakitlar3).map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <select
                                                value={this.state.kirasure3}
                                                disabled={this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                onChange={(event) =>
                                                    this.setState({ kirasure3: event.target.value })
                                                }
                                            >
                                                <option value="">Kiralama süresi seçiniz</option>
                                                <option value={6}>6</option>
                                                <option value={9}>9</option>
                                                <option value={12}>12</option>
                                                <option value={18}>18</option>
                                                <option value={24}>24</option>
                                                <option value={36}>36</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                           
                                            <Input
                                                disabled={this.state.kiramarka2 == "IT DOES NOT MATTER" || this.state.kiramarka == "IT DOES NOT MATTER"}
                                                value={this.state.kirakullanim3}
                                                onChange={(e) => {
                                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                                    this.setState({
                                                        kirakullanim3: a,
                                                    });
                                                   
                                                }}
                                                placeholder="Kullanım"
                                                maxLength="7"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*<hr />
              <div className="row">
                <div className="col-md-6">
                  <a className="clear_text btn btn-secondary">TEMİZLE</a>
                </div>
                <div className="col-md-6">
                  <input
                    type="submit"
                    onClick={() => this.axiosAjax("post", "addadvertise")}
                    value="GÖNDER"
                  />
                </div>
              </div> */}
                        </div>
                    </div>
                ),
            },
            {
                title: "Önizleme",
                content: (
                    <div className="container">
                        <div className="subpage advertisement_detail">
                            <h1>Son Görünüm</h1>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                    <div className="advertisement_content" style={{ width: "100%", marginBottom: "20px" }}>
                                        <div className="price">
                                            <h2>Satış Fiyatı: {this.state.satisFiyati}€</h2>
                                            <h2>Kiralama süreniz (Ay): {this.state.kiralamaSuresi}</h2>
                                            <h2>Kullanım (km/ay): {this.state.kullanimKm}</h2>
                                        </div>
                                    </div>

                                </div>



                                <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5">
                                {this.state.imageFiles==null||this.state.imageFiles==""?<></>:
                                    <ImageGallery items={this.state.imageFiles || null} />}


                                    {/*  <div className="outer" style={{ textAlign: "center" }}>
                                  
 <OwlCarousel className='thumbs' loop margin={10} nav>
                              <div class="item">
                              <img src={imageSrc1}/>
                  </div>
                              <div class="item">
                              <img src={imageSrc1}/>
                                                           
                                                            </div>
                              <div class="item">
                              <img src={imageSrc1}/>
                              </div>
                              <div class="item">
                              <img src={imageSrc1}/>
                              </div>
                              <div class="item">
                              <img src={imageSrc1}/>
                              </div>
                              <div class="item">
                              <img src={imageSrc1}/>
                              </div>
                              </OwlCarousel> 
                                </div>*/}

                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7">
                                    <div className="advertisement_content">
                                        <div className="price">


                                        <button className="buttonload" id="finish" style={{ backgroundColor: "rgb(224, 110, 25)", borderColor: "rgb(224, 110, 25)" }} onClick={() => this.axiosAjax("post", "addadvertise")}>
                                            <i className={this.state.kaydet ? "fa fa-circle-o-notch fa-spin" : "fas fa-save"}></i>{this.state.kaydet ? "Ekleniyor" : "Kaydet"}
                                        </button>
                                        <button className="buttonload" id="finish" style={{ backgroundColor: "#08c", borderColor: "#08c",marginLeft:"50%" }} onClick={() => this.prev()}>
                                            <i className="fas fa-undo-alt"></i>Geri
                                        </button>

                                        </div>
                                        <br />
                                        <ul>
                                            <li><label>Marka</label> {this.state.marka}  </li>
                                            <li><label>Motor hacmi (cc)</label> {this.state.motorHacmi}  </li>
                                            <li><label>Üretim Ay / Yıl</label> {this.state.uretimAy}/{this.state.uretimYil}  </li>
                                            <li><label>Kapı Sayısı</label> {this.state.kapiSayisi}  </li>
                                            <li><label>Model</label> {this.state.model}  </li>
                                            <li><label>Vites</label> {this.state.vites}  </li>
                                            <li><label>Kilometre</label> {this.state.kilometre}  </li>
                                            <li><label>Emisyon</label> {this.state.emisyon}  </li>
                                            <li><label>Araç Model Tipi</label> {this.state.aracModelTipi}  </li>
                                            <li><label>Siz dahil önceki sahipleri </label> {this.state.oncekiSahipler}  </li>
                                            <li><label>Kasa Tipi</label> {this.state.kasaTipi}  </li>
                                            <li><label>Sigara içilmeyen</label> {this.state.sigaraIcilmeyen === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label>Üretim Dönemi</label> {this.state.uretimDonemi}  </li>
                                            <li><label>Çek Defteri</label> {this.state.cekDefteri === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label>PS (kW)</label> {this.state.psKw}  </li>
                                            <li><label>Renk</label> {this.state.renk}  </li>
                                            <li><label>Yakıt türü</label> {this.state.yakitTuru}  </li>
                                            <li><label> Metalik</label> {this.state.metalik === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label> Garanti</label> {this.state.garanti === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label> Uzatılmış Garanti</label> {this.state.uzatilmisGaranti === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label>Plaka </label> {this.state.plaka.toLocaleUpperCase('TR')} </li>
                                            <li><label>*Plakanız Platform sözleşmesinde kullanılmak üzere alınmaktadır. Araç fırması ile paylaşılmaz.</label></li>

                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="advertisement_detail_list">
                                        {Array.from(this.state.basliklar).map((item) => (
                                            <div key={item.DisplayName}>
                                                <h1>{item.DisplayName}</h1>
                                                <ul >
                                                    {Array.from(item.SubItems).map((subitem) => (
                                                        <li key={subitem.id}><i key={subitem.id} for={subitem.id} id={subitem.id} className={this.state.selectedCheckBoxes?.includes(subitem.id) ? "check" : ""} ></i>{subitem.value}</li>
                                                    ))}
                                                </ul>

                                            </div>
                                        ))}
                                        <h1>Genel Bilgiler</h1>
                                        <p>{this.state.genelBilgiler}</p>
                                        {this.state.baskaAracCheck === 1 ?
                                            <>
                                                <h1>Başka araç bilgileri</h1>
                                                <CDataTable
                                                    items={this.rentData()}
                                                    fields={fields}
                                                    hover
                                                /></> : null}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ),
            },
        ];

    return (
        <div>
            <div className="container">
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" style={{ marginTop: "10px" }}>
                    {" "}
                    {/* <LoadingOverlay
              active={this.state.isLoaderActive}
              spinner
              text="Loading..."
            > */}
                        {steps[current].content}{" "}
                        {/* </LoadingOverlay> */}
                    </div>
                    <hr />
                    <div className="steps-action">
                        {current > 0 && (
                            <Button style={{ marginLeft: 8, marginBottom: 10 }} onClick={() => this.prev()}>
                                Geri
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type="primary" style={{ marginLeft: 8, marginBottom: 10 }} onClick={() => this.next()}>
                                İleri
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
