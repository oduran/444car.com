import React, { Component } from "react";
import axios from "axios";
import { get, post } from "../../../services/ApiServices";
import Config from "../../../services/Config";
import {
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Pdf from "react-to-pdf";
import LoadingOverlay from "react-loading-overlay";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";


import "../../Content/Css/bootstrap-grid.min.css";
import "../../Content/Css/fontawesome.min.css";
import "../../Content/Css/bootstrap-datepicker.min.css";
import "./style.css"; 
import styled from "@emotion/styled";
import $ from "jquery";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "blueimp-file-upload";
import Swal from "sweetalert2";
import { flagSet } from "@coreui/icons";

const ref = React.createRef();
const options = {
  orientation: "landscape",
};
export default class PublishAd extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      satisFiyati: "",
      imgCollection: "",
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
      oncekiSahipler: 0,
      cekDefteri: 0, // buralar?? bool yapt??m normalde "" di
      sigaraIcilmeyen: 0, // buralar?? bool yapt??m normalde "" di
      kilometre: "",
      renk: "",
      metalik: 0, // buralar?? bool yapt??m normalde "" di
      kapiSayisi: "",
      vites: "",
      motorHacmi: "",
      emisyon: "",

      asistan_ABC: false,
      asistan_acilCagri: false,
      asistan_ASR: false,
      asistan_EBD: false,
      asistan_EDL: false,
      asistan_geceGorus: false,
      asistan_icAynaAydinlatma: false,
      asistan_otonom: false,
      asistan_seritAsistani: false,
      asistan_yokusAsistani: false,
      asistan_ABS: false,
      asistan_uzaktanKilitleme: false,
      asistan_acilFrenAsistani: false,
      asistan_EBA: false,
      asistan_EBP: false,
      asistan_ESP: false,
      asistan_hizSabitleyici: false,
      asistan_korNoktaUyarici: false,
      asistan_sesliKontrol: false,
      asistan_TCS: false,
      asistan_trafikIsaretTanima: false,
      asistan_yorgunlukUyarisi: false,
      asistan_lastikBasincGostergesi: false,

      koltuk_elektrikli: false,
      koltuk_hafizali: false,
      koltuk_isitmali: false,

      parkyardimcisi_onSensor: false,
      parkyardimcisi_arkaSensor: false,
      parkyardimcisi_kamera: false,
      parkyardimcisi_otomatikParkEdici: false,

      sensorler_isikSensoru: false,
      sensorler_yagmurSensoru: false,
      sensorler_lastikArizaSensoru: false,
      sensorler_farGeceensoru: false,

      far_LED: false,
      far_ayarlanabilirFarlar: false,
      far_zenon: false,
      far_farYikama: false,
      far_adaptif: false,
      far_sis: false,

      multimedia_cdOynatici: false,
      multimedia_sesSistemi: false,
      multimedia_mp3Player: false,
      multimedia_dokunmatikEkran: false,
      multimedia_digitalRadio: false,
      multimedia_aracBilgisayari: false,
      multimedia_tv: false,

      baglanti_bluetooth: false,
      baglanti_usb: false,
      baglanti_wifi: false,

      aynalar_isitmali: false,
      aynalar_otomatikKatlanir: false,
      aynalar_hafizali: false,
      aynalar_otomatikKararma: false,

      havayastigi_surucu: false,
      havayastigi_yolcu: false,
      havayastigi_perde: false,
      havayastigi_tavan: false,
      havayastigi_yanKapi: false,
      havayastigi_diz: false,

      diger_siraKoltuk: false,
      diger_deriDireksiyon: false,
      diger_isitmaliOnCam: false,
      diger_klima: false,
      diger_sunroof: false,
      diger_hidrolikDireksiyon: false,
      diger_akilliBagajKapagi: false,
      diger_ellerSerbestKiti: false,
      diger_immobilayzir: false,
      diger_merkeziKilitlemeSistemi: false,
      diger_surguluCati: false,
      diger_alasimJantlar: false,
      diger_alarm: false,
      diger_engellerineUygun: false,
      diger_kayakCantasi: false,
      diger_portBagaj: false,
      diger_elektrikliPencereler: false,
      diger_anahtarsizGiris: false,
      diger_isitmaliDireksiyon: false,
      diger_kayarKapi: false,
      diger_romorkBaglantisi: false,
      diger_otomatikBaslatma: false,

      genelBilgiler: "",

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
      loading: false,
      checkBoxLoading: true,
      aracId: "",
      isLoaderActive: false,
      advertiseNo: "",
      userId: null,
    };
    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ isLoaderActive: true });
    this.axiosAjax("get", "getuserid");
    this.axiosAjax("get", "getallbrands");
    this.axiosAjax("get", "getcolors");
    this.axiosAjax("get", "getheaders", 2);
    this.axiosAjax("get", "getcities", 2);
  }
  onFileChange(e) {
    if (e.target.files.length < 9) {
      for (let index = 0; index < e.target.files.length; index++) {
        const element = e.target.files[index];
        if (element.size > 1000000) {
          Swal.fire(
            "Error",
            "One of the files are too big! It should be smaller than 1 megabytes",
            "error"
          );
          document.getElementById("resetImg").click();
        }
      }
      this.setState({ imgCollection: e.target.files });
      $("#photos").empty();
      for (var x = 0; x < e.target.files.length; x++) {
        if (e.target.files && e.target.files[x]) {
          var reader = new FileReader();

          reader.onload = function (event) {
            $("#photos").append(
              '<div class="col-md-3 col-sm-3 col-xs-3"><img src="' +
                event.target.result +
                '" class="img-thumbnail"></div>'
            );
          };

          reader.readAsDataURL(e.target.files[x]);
        }
      }
    } else {
      Swal.fire("Error", "Maksimum 8 resim eklebilir!", "error");
      document.getElementById("resetImg").click();
    }
  }
  handleSubmit = async () => {
    //e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
    }
    formData.append("adId", this.state.advertiseNo.toString());
    await post("/advertise/uploadAdvertiseImages", formData, {}).then((res) => {
      debugger;
      console.log(res.data);
      this.props.history.push("/dashboard/MyAds");
    });
  };
  // axios methods function
  async axiosAjax(methodType, action, data) {
    //this.setState({ isLoaderActive: true });
    let axiosResult;
    if (methodType === "get") {
      switch (action) {
        case "getallbrands": {
          axiosResult = await get(Config.serverUrl + "brand/GetAllBrands");
          console.log(axiosResult.data.result);
          this.setState({ markalar: axiosResult.data.result.sort() });
          break;
        }
        case "getregistrationmonth": {
          axiosResult = await get(
            Config.serverUrl + "brand/GetRegistiretionMonth/" + data
          );
          console.log(axiosResult.data.result);
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
          console.log(axiosResult.data.result);
          this.setState({ renkler: axiosResult.data.result.sort() });
          break;
        }
        case "getheaders": {
          axiosResult = await get(
            Config.serverUrl + "vechileatribute/GetAtributesGroup/" + data
          );
          console.log(axiosResult.data.result);
          this.setState({ basliklar: axiosResult.data.result });
          this.setState({ isLoaderActive: false });
          break;
        }
        case "getcities": {
          axiosResult = await get(Config.serverUrl + "city/GetCities/" + data);
          console.log(axiosResult.data.result);
          this.setState({ sehirler: axiosResult.data.result });
          this.setState({ isLoaderActive: false });
          break;
        }
        case "getuserid": {
          axiosResult = await get(Config.serverUrl + "user/GetUserProfileById");
          if (axiosResult.data) {
            console.log(axiosResult.data.userid);
            this.setState({ userId: axiosResult.data.userid });
          }

          break;
        }
        default:
          break;
      }
    } else if (methodType === "post") {
      switch (action) {
        case "getbrands": {
          axiosResult = await post(Config.serverUrl + "brand/GetBrands", data);
          debugger;
          var axiosData = axiosResult.data.result.sort();
          console.log(axiosResult.data.result.sort());
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
        case "getcarid": {
          axiosResult = await post(Config.serverUrl + "brand/GetBrands", data);
          var axiosData = axiosResult.data.result;
          this.setState({ aracId: axiosData });
          console.log(axiosResult);
          this.setState({ loading: false }); //this.setState({ isLoaderActive: false });
          break;
        }
        case "addadvertise": {
          this.setState({ isLoaderActive: true });
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
                usage: this.state.kullanimKm,
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
              },
              AdvertisesDetailObj: checkboxes,
              // AdvertisesImageObj: [
              //   { images_link: "google.com/araba" },
              //   { images_link: "google.com/araba1" },
              // ],
            },
            formData,
          };
          axiosResult = await post(
            Config.serverUrl + "Advertise/AddAdvertise",
            obj
          ).then((res) => {
            console.log(res);
            if (res.data.result != "Kay??t Bulunamad??..!") {
              this.setState({ isLoaderActive: false });
              this.setState({ advertiseNo: res.data.result });
              this.handleSubmit();
              Swal.fire(
                "Ba??ar??l??",
                res.data.result +
                  " numaral?? ilan??n??z incelenmek ??zere g??nderilmi??tir!",
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
        // marka se??ilip aylar sorgulan??r

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
        // ay se??ilip y??llar sorgulan??r
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
        // y??l se??ilip modeller sorgulan??r

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
        // model se??ilip yak??tlar sorgulan??r
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
        // yak??t se??ilip beygirler sorgulan??r

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
        // beygir se??ilip ara??modeltipi sorgulan??r
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
        // ara??modeltipi se??ilir kasatipi sorgulan??r
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
        // kasatipi se??ilir ??retim d??nemi sorgulan??r

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
        // ??retin d??nemi se??ilir kap?? say??s?? sorgulan??r

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
        // kap?? say??s?? se??ilir vites sorgulan??r

        this.setState({ vites: "" });
        this.setState({ motorHacmi: "" });
        this.setState({ emisyon: "" });

        this.setState({ motorHacimleri: [] });
        this.setState({ emisyonlar: [] });
        break;
      }
      case "gear": {
        // vites se??ilir motor sorgulan??r

        this.setState({ motorHacmi: "" });
        this.setState({ emisyon: "" });

        this.setState({ emisyonlar: [] });
        break;
      }
      case "engine": {
        // motor se??ilir emisyon sorgulan??r
        this.setState({ emisyon: "" });
        break;
      }
      default:
        break;
    }
  };
  // model marka y??l ay de??i??imlerinde get method ??a????r??m??
  handleChanges = (methodName, event) => {
    var that = this;
    if (methodName !== "modeltype" && event === "") {
      this.setState({ loading: false }); //this.setState({ isLoaderActive: false });
      return;
    }
    this.setState({ loading: true }); //this.setState({ isLoaderActive: true });

    switch (methodName) {
      case "brand": {
        // marka se??ilip aylar sorgulan??r
        this.setState({ marka: event });
        this.axiosAjax("get", "getregistrationmonth", event);
        this.resetValues("brand");
        break;
      }
      case "month": {
        // ay se??ilip y??llar sorgulan??r
        this.setState({ uretimAy: event });
        this.axiosAjax("post", "getbrands", {
          brandName: that.state.marka,
          registrationMonth: event,
        });
        this.resetValues("month");
        break;
      }
      case "year": {
        // y??l se??ilip modeller sorgulan??r
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
        // model se??ilip yak??tlar sorgulan??r
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
        // yak??t se??ilip beygirler sorgulan??r
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
        // beygir se??ilip ara??modeltipi sorgulan??r
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
        // ara??modeltipi se??ilir kasatipi sorgulan??r
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
        // kasatipi se??ilir ??retim d??nemi sorgulan??r
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
        // ??retin d??nemi se??ilir kap?? say??s?? sorgulan??r
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
        // kap?? say??s?? se??ilir vites sorgulan??r
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
        // vites se??ilir motor sorgulan??r
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
        // motor se??ilir emisyon sorgulan??r
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
        // motor se??ilir emisyon sorgulan??r
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
  handlePreviusOwner(action, event) {
    if (action === "previusowneradd") {
      this.setState({ oncekiSahipler: ++event });
      return;
    } else {
      this.setState({ oncekiSahipler: --event });
      return;
    }
  }
  handleCheckboxChange = () => {
    let arr = this.state.basliklar;
    var checkBoxNumber = 0;
    arr.forEach((element) => {
      checkBoxNumber += element.SubItems.length;
    });
    console.log(checkBoxNumber);
    var listOfCheckBoxVal = [];

    for (let i = 1; i <= checkBoxNumber; i++) {
      if (document.getElementById(i).checked == true) {
        listOfCheckBoxVal.push({ atribute_id: i, value: 1 });
      }
    }

    return listOfCheckBoxVal;
  };
  render() {
      return (
    <>
    <LoadingOverlay
        active={this.state.isLoaderActive}
        spinner
        text="Loading..."
    >
    <CRow>
        <CCol xs="12" md="12" xl="12">
          <CCard>
                              <CCardBody>
                                
              {/* <Loading
              loading={this.state.loading}
              background="#ffffff"
              loaderColor="#03fce3"
            /> */}

                <div className="subpage add_ad">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Sat???? Fiyat??</label>
                          <div class="form-group">
                            <div class="input-icon input-icon-right">
                              <input
                                type="text"
                                style={{ paddingRight: "20px" }}
                                value={this.state.satisFiyati}
                                class="form-control"
                                onChange={(e) => {
                                  var a = e.target.value.replace(/[^0-9]/g, "");
                                  this.setState({
                                    satisFiyati: a,
                                  });
                                  console.log(e.target.value);
                                }}
                                placeholder="Amount"
                              />
                              <i>???</i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Kiralama s??reniz (Ay)</label>
                      <select
                        value={this.state.kiralamaSuresi}
                        onChange={(event) =>
                          this.setState({ kiralamaSuresi: event.target.value })
                        }
                      >
                        <option value="">Kiralama s??resi se??iniz</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Kullan??m (km/ay)</label>
                      <Input
                        value={this.state.kullanimKm}
                        onChange={(e) => {
                          this.setState({ kullanimKm: e.target.value });
                        }}
                        placeholder="Kullan??m"
                        min={1}
                        max={100000000}
                        type="number"
                        step="1"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Eyalet</label>
                      <select
                        required
                        value={this.state.eyalet}
                        onChange={(event) =>
                          this.setState({ eyalet: event.target.value })
                        }
                      >
                        <option value="">Eyalet se??iniz</option>
                        {Array.from(this.state.sehirler).map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                        ;
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label>??ehir </label>
                      <Input
                        required
                        value={this.state.sehir}
                        onChange={(e) => {
                          this.setState({ sehir: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Lokasyon </label>
                      <Input
                        value={this.state.lokasyon}
                        onChange={(e) => {
                          this.setState({ lokasyon: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Posta Kodu </label>
                      <input
                        value={this.state.postaKodu}
                        onChange={(e) => {
                          this.setState({ postaKodu: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                    <div className="col-md-8">
                      <label>&nbsp; </label>
                      <input
                        value={this.state.postaDescription}
                        onChange={(e) => {
                          this.setState({ postaDescription: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Plaka </label>
                      <input
                        value={this.state.plaka}
                        onChange={(e) => {
                          this.setState({ plaka: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                    <div className="col-md-8" hidden>
                      <label>??asi </label>
                      <input
                        value={this.state.sasi}
                        onChange={(e) => {
                          this.setState({ sasi: e.target.value });
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <h2> Ara?? G??rselleriniz</h2>
                      <form onSubmit={this.handleSubmit} id="fileupload">
                        <div className="row fileupload-buttonbar">
                          <div className="col-lg-7">
                            <span className="btn btn-success fileinput-button">
                              <i className="fas fa-plus"></i>
                              <span>Dosya Y??kle...</span>
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={this.onFileChange}
                                name="files[]"
                                multiple
                              />
                            </span>

                            {/* <button
                              style={{
                                marginRight: "20px",
                                marginLeft: "20px",
                              }}
                              type="submit"
                              className="btn btn-primary start"
                            >
                              <i className="fas fa-play"></i>
                              <span>T??m??n?? Y??kle</span>
                            </button>*/}
                            <button
                              type="reset"
                              id="resetImg"
                              style={{
                                marginLeft: "20px",
                              }}
                              onClick={() => $("#photos").empty()}
                              className="btn btn-warning cancel"
                            >
                              <i className="fas fa-ban"></i>

                              <span>T??m??n?? ??ptal Et</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger delete"
                            >
                              <i className="fas fa-trash-alt"></i>{" "}
                              <span>T??m??n?? Sil</span>
                            </button>
                          </div>
                          {/* <div className="col-lg-5 fileupload-progress fade">
                          <div
                            className="progress progress-striped active"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div className="progress-bar progress-bar-success"></div>
                          </div>
                          <div className="progress-extended">&nbsp;</div>
                        </div> */}
                        </div>
                        {/* <table
                        role="presentation"
                        className="table table-striped"
                      >
                        <tbody className="files"></tbody>
                      </table> */}
                      </form>
                    </div>
                    <div id="photos" class="row"></div>
                    {/* <div
                    id="blueimp-gallery"
                    className="blueimp-gallery blueimp-gallery-controls"
                    aria-label="image gallery"
                    aria-modal="true"
                    role="dialog"
                    data-filter=":even"
                  >
                    <div className="slides" aria-live="polite"></div>
                    <h3 className="title"> </h3>
                    <a
                      className="prev"
                      aria-controls="blueimp-gallery"
                      aria-label="previous slide"
                      aria-keyshortcuts="ArrowLeft"
                    >
                      {" "}
                    </a>
                    <a
                      className="next"
                      aria-controls="blueimp-gallery"
                      aria-label="next slide"
                      aria-keyshortcuts="ArrowRight"
                    ></a>
                    <a
                      className="close"
                      aria-controls="blueimp-gallery"
                      aria-label="close"
                      aria-keyshortcuts="Escape"
                    ></a>
                    <a
                      className="play-pause"
                      aria-controls="blueimp-gallery"
                      aria-label="play slideshow"
                      aria-keyshortcuts="Space"
                      aria-pressed="false"
                      role="button"
                    ></a>
                     
                    <ol className="indicator"></ol>
                    
                  </div> */}
                  </div>
                  <hr />

                  {/* <Loader
        type="ThreeDots"
        style={{ margin: "auto",
        display: "flex",
        justifyContent: "center",
          width: "50%",
          padding: "10px"}}
        color="#00BFFF"
        height={100}
        width={100}
        visible={this.state.loading} //3 secs
      />  */}
                  <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text="Loading..."
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Marka</label>
                        <select
                          value={this.state.marka}
                          onChange={(event) =>
                            this.handleChanges("brand", event.target.value)
                          }
                        >
                          <option value="">Marka se??iniz</option>
                          {Array.from(this.state.markalar).map((brand) => (
                            <option key={brand} value={brand}>
                              {brand}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label>??retim Ay</label>
                        <select
                          value={this.state.uretimAy}
                          onChange={(event) =>
                            this.handleChanges("month", event.target.value)
                          }
                        >
                          <option value="">Ay se??iniz</option>
                          {Array.from(this.state.uretimAylari).map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>??retim Y??l</label>
                        <select
                          value={this.state.uretimYil}
                          onChange={(event) =>
                            this.handleChanges("year", event.target.value)
                          }
                        >
                          <option value="">Y??l se??iniz</option>
                          {Array.from(this.state.uretimYillari).map((yil) => (
                            <option key={yil} value={yil}>
                              {yil}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label>Model</label>
                        <select
                          value={this.state.model}
                          onChange={(event) =>
                            this.handleChanges("model", event.target.value)
                          }
                        >
                          <option value="">Model se??iniz</option>
                          {Array.from(this.state.modeller).map((mod) => (
                            <option key={mod} value={mod}>
                              {mod}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Yak??t T??r??</label>
                        <select
                          value={this.state.yakitTuru}
                          onChange={(event) =>
                            this.handleChanges("fuel", event.target.value)
                          }
                        >
                          <option value="">Yak??t se??iniz</option>
                          {Array.from(this.state.yakitTurleri).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>PS (kW)</label>
                        <select
                          value={this.state.psKw}
                          onChange={(event) =>
                            this.handleChanges("ps", event.target.value)
                          }
                        >
                          <option value="">Beygir se??iniz (kW)</option>
                          {Array.from(this.state.psKwler).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Ara?? Model Tipi</label>
                        <select
                          value={this.state.aracModelTipi}
                          onChange={(event) =>
                            this.handleChanges("modeltype", event.target.value)
                          }
                        >
                          <option value="">Model tipi se??iniz</option>
                          {Array.from(this.state.modelTipleri).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Kasa Tipi</label>
                        <select
                          value={this.state.kasaTipi}
                          onChange={(event) =>
                            this.handleChanges("bodytype", event.target.value)
                          }
                        >
                          <option value="">Kasa tipi se??iniz</option>
                          {Array.from(this.state.kasaTipleri).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label>??retim D??nemi</label>
                        <select
                          value={this.state.uretimDonemi}
                          onChange={(event) =>
                            this.handleChanges("period", event.target.value)
                          }
                        >
                          <option value="">??retim d??nemi se??iniz</option>
                          {Array.from(this.state.uretimDonemleri).map(
                            (item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            )
                          )}
                          ;
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label>Siz dahil ??nceki sahipleri </label>
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
                        <label>??ek Defteri</label>
                        <div>
                          <input
                            id="a99"
                            name="Announcements"
                            type="checkbox"
                            checked={this.state.cekDefteri}
                            onClick={() =>
                              this.setState({
                                cekDefteri: !this.state.cekDefteri,
                              })
                            }
                          />
                          <label for="a99" id="a1"></label>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label>Sigara ????ilmeyen</label>
                        <input
                          id="a100"
                          name="Announcements"
                          type="checkbox"
                          checked={this.state.sigaraIcilmeyen}
                          onClick={() =>
                            this.setState({
                              sigaraIcilmeyen: !this.state.sigaraIcilmeyen,
                            })
                          }
                        />
                        <label for="a100" id="a1"></label>
                      </div>

                      <div className="col-md-3">
                        <label>Kilometre</label>
                        <input
                          value={this.state.kilometre}
                          onChange={(event) => {
                            this.setState({ kilometre: event.target.value });
                          }}
                          type="text"
                        />
                      </div>

                      <div className="col-md-3">
                        <label>Renk</label>
                        <select
                          value={this.state.renk}
                          onChange={(event) =>
                            this.setState({ renk: event.target.value })
                          }
                        >
                          <option value="">Renk se??iniz</option>
                          {Array.from(this.state.renkler).map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.color}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label>Metalik</label>
                        <input
                          id="a101"
                          name="Announcements"
                          type="checkbox"
                          checked={this.state.metalik}
                          onClick={() =>
                            this.setState({ metalik: !this.state.metalik })
                          }
                        />
                        <label for="a101" id="a1"></label>
                      </div>

                      <div className="col-md-3">
                        <label>Kap?? Say??s??</label>
                        <select
                          value={this.state.kapiSayisi}
                          onChange={(event) =>
                            this.handleChanges("door", event)
                          }
                        >
                          <option value="">Kap?? say??s?? se??iniz</option>
                          {Array.from(this.state.kapiSayilari).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Vites</label>
                        <select
                          value={this.state.vites}
                          onChange={(event) =>
                            this.handleChanges("gear", event.target.value)
                          }
                        >
                          <option value="">Vites t??r??n?? se??iniz</option>
                          {Array.from(this.state.vitesler).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Motor hacmi (cc) </label>
                        <select
                          value={this.state.motorHacmi}
                          onChange={(event) =>
                            this.handleChanges("engine", event.target.value)
                          }
                        >
                          <option value="">Motor hacmini se??iniz</option>
                          {Array.from(this.state.motorHacimleri).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label>Emisyon </label>
                        <select
                          value={this.state.emisyon}
                          onChange={(event) =>
                            this.handleChanges("emission", event.target.value)
                          }
                        >
                          <option value="">Emisyon cinsini se??iniz</option>
                          {Array.from(this.state.emisyonlar).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>
                    </div>
                  </LoadingOverlay>
                  <hr />
                  {/* <Loader
        type="ThreeDots"
        style={{ margin: "auto",
        display: "flex",
        justifyContent: "center",
          width: "50%",
          padding: "10px"}}
        color="#00BFFF"
        height={100}
        width={100}
        visible={this.state.checkBoxLoading} //3 secs
      /> */}
                  {Array.from(this.state.basliklar).map((item) => (
                    <div key={item.DisplayName}>
                      <div className="row">
                        <div className="col-md-12">
                          <h2>{item.DisplayName}</h2>
                        </div>
                        {Array.from(item.SubItems).map((subitem) => (
                          <div key={subitem.id} className="col-md-3">
                            <label>
                              <input
                                id={subitem.id}
                                name={subitem.id}
                                type="checkbox"
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
                  ))}
                  <div className="row">
                    <div className="col-md-12">
                      <h2>Genel Bilgiler</h2>
                      <textarea
                        placeholder="ki??isel bilgi, ileti??im bilgisi, plaka ve ??asi numaras??n?? vermeyin."
                        onChange={(e) =>
                          this.setState({ genelBilgiler: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <a className="clear_text btn btn-secondary">TEM??ZLE</a>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="submit"
                        onClick={() => this.axiosAjax("post", "addadvertise")}
                        value="G??NDER"
                      />
                    </div>
                  </div>
                </div>
            </CCardBody>
        </CCard>
        </CCol>
      </CRow>
     </LoadingOverlay>
    </>
    );
  }
}
