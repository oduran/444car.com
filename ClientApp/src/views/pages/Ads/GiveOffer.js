import { Layout } from "../../../components/Layout";
import { get, post, postForm } from "../../../services/ApiServices";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import React, { Component, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import Config from "../../../services/Config";
import  jsPDF  from "jspdf";
import Pdf from "react-to-pdf";
//import OwlCarousel from 'react-owl-carousel';

//import 'owl.carousel/dist/assets/owl.carousel.css';
//import 'owl.carousel/dist/assets/owl.theme.default.css';


import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Spinner } from "reactstrap";

//import "../../Content/Css/owl.carousel.min.css";

import { Button, Card, Accordion } from 'react-bootstrap';

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDataTable,
    CBadge,
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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter, CModalTitle,
    CRow,
} from "@coreui/react";
import { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import "./style.css";
var selectedCheckBoxes = [];
var selectedExtraboxesNames = [];
const addImageRef = React.createRef();

export default function GiveOffer() {
    const [adId,setAdId] = useState("");
    const [userId, setUserId] = useState("");
    const [data, setData] = useState([]);
    const [adInfos, setAdInfos] = useState();
    const [loading,setLoading] = useState(true);
    const [basliklar, setBasliklar] = useState([""]);
    const [adDetails, setAdDetails] = useState();
    const [imageFiles, setImageFiles] = useState([]);
    const [carInfo, setCarInfo] = useState([""]);
    const [rentedCars, setRentedCars] = useState([""]);
    const [standartServices,setStandartServices] = useState([""]);
    const [extraServices,setExtraServices] = useState([""]);
    const [services444,setSetvices444] = useState([""]);
    const [loadingState, setLoadingState] = useState(
        <div className="d-flex align-items-center text-dark m-3">
            <strong>Yükleniyor...</strong>
            <div
                className="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
            ></div>
        </div>
    );
    const [offerId,setOfferId] = useState("");
    const [offerDetails,setOfferDetails] = useState([]);
    const [offerPrice,setOfferPrice] = useState("");
    const [offerKullanim,setOfferKullanim] = useState("");
    const [offerDate,setOfferDate] = useState("");
    const [offerAy,setOfferAy] = useState("");
    const [offerPay1,setOfferPay1] = useState("");
    const [offerPay2,setOfferPay2] = useState("");
    const [offerPay3,setOfferPay3] = useState("");
    const [saveLoading,setSaveLoading] = useState(false);
    const [updateOffer,setUpdateOffer] = useState(false);
    const [otherRent, setOtherRent] = useState(0);
    const [offerData, setOfferData] = useState([]);
    const [innerCollapse, setInnerCollapse] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [initialImageFiles, setInitialImageFiles] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [changeImagesFlag, setChangeImagesFlag] = useState(true);

    //const inputEl = useRef(null);
    const ref = React.createRef();

    const modalFields = [
        { key: "advertise_id", label: "İlan No" },
        { key: "brand", label: "Marka" },
        { key: "serial", label: "Seri" },
        { key: "vehicle_body_type", label: "Kasa Tipi" },
        { key: "fuel_type", label: "Yakıt Türü" },
        { key: "rental_period", label: "Kiralama Süresi" },
        { key: "usage", label: "Kullanım(km)" },
    ];

    async function getAdvertisementImage() {
        var details = await getData(53);
        debugger;
        setAdInfos(details[0]);
        setAdDetails(details[1].map(a => a.atribute_id));
        // setAdImages(details[2].map(a => a.images_link)); //"Content/"+a.images_link)); // DEV
        setCarInfo(details[3]);
        // setSelectedImageUrl(details[2][0].images_link);//"Content/"+details[2][0].images_link); //DEV
        setRentedCars(details[4]);
        //setSatisFiyati(detail)
        var arr = [];

        if (details[2].length == 0) {
            //     var dd = "Content/Images/notfound.png" ;
            //    arr.push(
            //        {
            //            original: dd + "",
            //            thumbnail: dd + ""
            //        });
            //setImageFiles({
            //    imageFiles: arr
            //})
        }
        else {

            for (var i = 0; i < details[2].length; i++) {
                details[2][i].images_link = window.location.origin + "/" + details[2][i].images_link.replace(/\\/g, "/");

                var dd = details[2][i].images_link;
                arr.push(
                    {
                        original: dd + "",
                        thumbnail: dd + ""
                    });
            }
            setImageFiles(arr)
            setInitialImageFiles(arr);
        }
    }

    async function fetchData() {

        getAdvertisementImage();            
        let axiosForBasliklar = await get(Config.serverUrl + "vechileatribute/GetAtributesGroup/2");
        let userInfo =  await get (Config.serverUrl+ "user/GetUserProfileById");
        let checkBoxes = await get (Config.serverUrl + "OfferAtribute/GetOfferAtributesGroup");
        
      
        let axiosForOffers = await get (Config.serverUrl+ "offer/GetUserOffers");
        let axiosForOfferDetail;
        if(axiosForOffers){
            if(axiosForOffers.data?.result){
                
                var index = axiosForOffers.data.result.findIndex(x => x.advertise_id === parseInt(window.location.href.split("/Ads/")[1]));
                if(index>-1){
                    
                    var elem = axiosForOffers.data.result[index];
                    setOfferId(elem.id);
                    setUpdateOffer(true);
                    setOfferPrice(elem.offer_value);
                    setOfferKullanim(elem.usage);
                    setOfferAy(elem.rental_period);
                    setOfferPay1(elem.payment1);
                    setOfferPay2(elem.payment2);
                    setOfferPay3(offerAy!=36?0:elem.payment3);
                    setOtherRent(elem.any_other_car_for_rent);
                    setOfferDate(elem.offer_due_date.split('T')[0]);
                    axiosForOfferDetail = await get(Config.serverUrl+ "offer/GetOfferDetailById/"+elem.id);
                    axiosForOfferDetail.data.result.forEach(element => {
                            selectedCheckBoxes.push({id:element.id, atribute_id: element.atribute_id, value: element.value,offer_id: element.offer_id})
                            if(element.value==1){
                                selectedExtraboxesNames.push({ name: checkBoxes.data.result[1].SubItems.find(o => o.id === element.atribute_id).value});
                            }
                    });
                    
                    console.log(selectedCheckBoxes);
                    console.log(selectedExtraboxesNames);
                
                }
                else{
                    checkBoxes.data.result[1].SubItems.forEach(element => {
                        selectedCheckBoxes.push({ atribute_id: element.id, value: 0,offer_id: parseInt(window.location.href.split("/Ads/")[1])})
                    });
                }
            }
        }
       
        setStandartServices(checkBoxes.data.result[0].SubItems);
        setExtraServices(checkBoxes.data.result[1].SubItems);
        await setAdId(parseInt(window.location.href.split("/Ads/")[1]));
        if (axiosForBasliklar.data) {
                setBasliklar(axiosForBasliklar.data.result);
        }
        setUserId(userInfo.data.userid);
        var details = await getData();
        setAdInfos(details[0]);
        setAdDetails(details[1].map(a => a.atribute_id));
        setCarInfo(details[3]);
        setRentedCars(details[4]);
        var arr = [];
        if (details[2].length == 0) {
        }
        else {
            for (var i = 0; i < details[2].length; i++) {
                details[2][i].images_link = window.location.origin + "/" + details[2][i].images_link.replace(/\\/g, "/");

                var dd = details[2][i].images_link;
                arr.push(
                    {
                        original: dd + "",
                        thumbnail: dd + ""
                    });
            }
            setImageFiles(arr)
            
        }
        setLoading(false);
      
    }
    async function getData() {
        var number = parseInt(window.location.href.split("/Ads/")[1]);
        let axiosForInfo = await get(Config.serverUrl + "advertise/GetAdvertisesById/" + number);
        let carInfo = await get(Config.serverUrl + "brand/GetBrandById/" + axiosForInfo.data.result.brand_id);
        let axiosForDetail = await get(Config.serverUrl + "advertise/GetAdvertiseDetailByAdvertseId/" + number);
        let axiosForImages = await get(Config.serverUrl + "advertise/GetAdvertiseImageByAdvertiseId/" + number);
        let axiosForRentedCars = await get(Config.serverUrl + "advertise/GetDifferentRentCarsByAdvertiseId/" + number);



        return ([axiosForInfo.data.result, axiosForDetail.data.result, axiosForImages.data.result, carInfo.data.result, axiosForRentedCars.data.result]);
    }
    const checkboxHandle = (id,value) => {
      
        var  index = selectedCheckBoxes.find(x => x.atribute_id === id).value;
        if (index == 0) {
            selectedCheckBoxes.find(x => x.atribute_id === id).value = 1;
            selectedExtraboxesNames.push({ name: value });
            
        } else {
            selectedCheckBoxes.find(x => x.atribute_id === id).value = 0;
            selectedExtraboxesNames.splice(index,1);
        }
       
    };

    async function updateAdvertiseImages() {
        debugger;
        if (newImageFiles.length > 0) {  // yeni image eklenmişse buraya gel
            let obj = { id: 53, imageFiles: newImageFiles }
            var formData = new FormData();
            for (const key of Object.keys(newImageFiles)) {
                formData.append("imgCollection", newImageFiles[key]);
            }
            formData.append("adId", 53);
            let adImages = await postForm(Config.serverUrl + "advertise/UpdateAdvertiseImages", obj);
        }
        if (JSON.stringify(imageFiles) != JSON.stringify(initialImageFiles)) { //ilanın serverdan gelen imageları silinmişse buraya gel
            for (var i = 0; i < imageFiles.length; i++) {
                imageFiles[i].original = imageFiles[i].original.replace(window.location.origin, "");
            }
            let _obj = { id: 53, images: imageFiles }
            let adImages = await post(Config.serverUrl + "advertise/RemoveAdvertiseImages", _obj);
        }
        fetchData();
    }

    async function saveOffer(){
        setSaveLoading(true);
        await updateAdvertiseImages();
        if(offerPrice==""||offerKullanim==""||offerDate==""||offerAy==""){
            Swal.fire("Uyarı","Lütfen hiçbir alanı boş bırakmayınız","warning");
            setSaveLoading(false);
            return;
        }
        if(offerPay1==""||offerPay2==""){
            Swal.fire("Uyarı","Lütfen ödeme bilgilerini doldurunuz","warning");
            setSaveLoading(false);
            return;
        }
        if(offerAy==36&&offerPay3==""){
            Swal.fire("Uyarı","36 aylık seçinde 3. ödeme kısmı boş bırakılamaz!","warning");
            setSaveLoading(false);
            return;
        }
        if(offerAy!=36){
            var res = (parseInt(offerPay1)+parseInt(offerPay2))*(offerAy/2);
        }else if(offerAy==36){
            var res = (parseInt(offerPay1)+parseInt(offerPay2)+parseInt(offerPay3))*12;
        }
        if(res>offerPrice){
            Swal.fire("Warning","The monthly amounts you entered is more than your rental offer! ","warning");
            setSaveLoading(false);
            return;
        }
        if(res>adInfos.sale_price){
            Swal.fire("Warning","The vehicle purchase price you have submitted can not be higher than the customer's request!","warning");
            setSaveLoading(false);
            return;
        }
        if(moment(offerDate).diff(moment(adInfos.advertise_start_date.split('T')[0]),'days') < 6){
            var a = adInfos.advertise_start_date.split('T')[0];
            // TODO: BURADA TARİHİ GETİRİP 6 GÜN EKLEYİP GÖSTERECEĞİM
            Swal.fire("Warning","A date smaller than (t+6)dd.mm.yyyy cannot be selected","warning");
            setSaveLoading(false);
            return;
        }
        var obj = {
            RequestOffers: {
                RequestOffer: {
                    
                    advertise_id: adId,
                    user_id: userId,
                    offer_value: offerPrice,
                    usage: parseInt(offerKullanim),
                    rental_period: parseInt(offerAy),
                    payment1: offerPay1,
                    payment2: offerPay2,
                    payment3: offerAy!=36?0:offerPay3,
                    offer_due_date: offerDate,
                    any_other_car_for_rent: otherRent
                  
                },
                OffersDetailObj: selectedCheckBoxes,
            }
        };   
        if(updateOffer){
            obj.RequestOffers.RequestOffer['id'] = offerId;
            let axiosResult = await post(
                Config.serverUrl + "Offer/UpdateOffer",
                obj
            ).then((res) => {
                setSaveLoading(false);
             
             
                if (res) {
                  
                    Swal.fire(
                        "Başarılı",
                        res.data.result +
                        " numaralı teklifiniz güncellenmek üzere gönderilmiştir!",
                        "success"
                    );
                } else {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            });
        }else{
            let axiosResult = await post(
                Config.serverUrl + "Offer/AddOffer",
                obj
            ).then((res) => {
                setSaveLoading(false);
                if (res) {
                   
                    Swal.fire(
                        "Başarılı",
                        res.data.result +
                        " numaralı teklifiniz incelenmek üzere gönderilmiştir!",
                        "success"
                    );
                    setUpdateOffer(true);
                } else {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            });
        }
        

    }
    const downloadPdf = () => {
        
        const string = renderToString(<PdfData />).toLocaleString('tr').replace('ı','i');
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.fromHTML(string);
        pdf.save("pdf");
    }
    const PdfData = () => (
        <div >
            <h1>Teklif Bilgileriniz</h1>
            <ul>

                <li><label>Marka: </label> {adInfos?.sale_price}  </li>
                <li><label>Motor hacmi (cc): </label> {carInfo[0]?.engine_capacity}  </li>
                <li><label>Üretim Ay / Yil: </label> {carInfo[0]?.registration_month}/{carInfo[0]?.registration_year}  </li>
                <li><label>Kapi Sayisi: </label>{carInfo[0]?.number_of_dors} </li>
                <li><label>Model: </label> {carInfo[0]?.model}  </li>
                <li><label>Vites: </label> {carInfo[0]?.gear}</li>
                <li><label>Kilometre: </label> {adInfos?.kilometer} </li>
                <li><label>Emisyon: </label> {carInfo[0]?.emission} </li>
                <li><label>Araç Model Tipi: </label> {carInfo[0]?.model_type} </li>
                <li><label>Siz dahil önceki sahipleri:  </label> {adInfos?.number_of_vehicle_owners}  </li>
                <li><label>Kasa Tipi: </label> {carInfo[0]?.vehicle_body_type}</li>
                <li><label>Sigara içilmeyen: </label> {adInfos?.non_smoking === 1 ? "Evet" : "Hayir"}  </li>
                <li><label>Üretim Dönemi: </label> {carInfo[0]?.production_period} </li>
                <li><label>Çek Defteri: </label> {adInfos?.checkbook === 1 ? "Evet" : "Hayir"}  </li>
                <li><label>PS (kW): </label> {carInfo[0]?.ps} </li>
                <li><label>Renk: </label> {adInfos?.color_id} </li>
                <li><label>Yakit türü: </label> {carInfo[0]?.fuel_type}</li>
                <li><label> Metalik: </label> {adInfos?.metalic_color === 1 ? "Evet" : "Hayir"}  </li>
                <li><label> Garanti: </label> {adInfos?.warranty === 1 ? "Evet" : "Hayir"}  </li>
                <li><label> Uzatilmis Garanti: </label> {adInfos?.extended_warranty === 1 ? "Evet" : "Hayir"}  </li>
            
            </ul>
            <label></label>   
                            <h3>YOUR OFFER (VAT Included)</h3>
                            <div className="row">

                               <label >Teklif Fiyati</label>
                               <div></div><label>{offerPrice} Euro</label>
                                </div>
                                <div className="row">
                                <label >Kullanim (km/ay)</label>
                                <div></div><label>{offerKullanim}</label>
                                </div>
                                <div className="row">
                                <label >Kiralama süreniz (Ay) </label>
                                <div></div><label>{offerAy}</label>
                                </div>
                                <div className="row">
                                <label >Teklif geçerlilik tarihi </label>
                                <div></div><label>{offerDate}</label>
                                </div>
                                <div className="row">
                                <label >{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month "}</label>
                                <div></div><label>{offerPay1}Euro</label>
                                </div>
                                <div className="row">
                                <label >{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month "}</label>
                                <div></div><label>{offerPay2}Euro</label>
                                </div>
                                <div className="row">
                                <label >{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month "}</label>
                                <div></div><label>{offerPay3} Euro</label>
                                </div>
                         
                                <label></label>   
                        <h4>Standart Free Services</h4>
                        <ul>
                        {Array.from(standartServices).map((subitem) => (
                         <li key={subitem.value}>  {subitem.value} </li>                            
                        ))}
                           </ul>                  
                           <label></label>   
                        <h4>Extra Free Services</h4>
                        <ul>
                        {Array.from(selectedExtraboxesNames).map((subitem) => (
                        <li key={subitem.name}>  {subitem.name} </li>                            
                        ))}
                            </ul>   
                         <label></label>   
                        <label>By approving this offer, you agree that you will not put a contrary application clause in the contract with the customer,</label>
                        <div></div> <label>it will be invalid even if you do, and it will be used as legal evidence in case of dispute.</label>
                       
                          
                          </div>
    
    );
    const PdfData2 = () => (
        <CCard>
                       
        <CCardBody style={{ backgroundColor: "#ebedef" }}>
        <div className="container" >
        <div >
        
        <div className="subpage advertisement_detail">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="advertisement_content" style={{ width: "100%", marginBottom: "20px" }}>
                        <div className="price">
                            <h2>Satış Fiyatı:{adInfos?.sale_price}€</h2>
                            <h2>Kiralama süreniz (Ay): {adInfos?.rental_period}</h2>
                            <h2>Kullanım (km/ay): {adInfos?.usage}</h2>
                        </div>
                    </div>

                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7">
                    <div className="advertisement_content">
                        <ul>

                            <li><label>Marka</label> {carInfo[0]?.brand}  </li>
                            <li><label>Motor hacmi (cc)</label> {carInfo[0]?.engine_capacity}  </li>
                            <li><label>Üretim Ay / Yıl</label> {carInfo[0]?.registration_month}/{carInfo[0]?.registration_year}  </li>
                            <li><label>Kapı Sayısı</label>{carInfo[0]?.number_of_dors} </li>
                            <li><label>Model</label> {carInfo[0]?.model}  </li>
                            <li><label>Vites</label> {carInfo[0]?.gear}</li>
                            <li><label>Kilometre</label> {adInfos?.kilometer} </li>
                            <li><label>Emisyon</label> {carInfo[0]?.emission} </li>
                            <li><label>Araç Model Tipi</label> {carInfo[0]?.model_type} </li>
                            <li><label>Siz dahil önceki sahipleri </label> {adInfos?.number_of_vehicle_owners}  </li>
                            <li><label>Kasa Tipi</label> {carInfo[0]?.vehicle_body_type}</li>
                            <li><label>Sigara içilmeyen</label> {adInfos?.non_smoking === 1 ? "Evet" : "Hayır"}  </li>
                            <li><label>Üretim Dönemi</label> {carInfo[0]?.production_period} </li>
                            <li><label>Çek Defteri</label> {adInfos?.checkbook === 1 ? "Evet" : "Hayır"}  </li>
                            <li><label>PS (kW)</label> {carInfo[0]?.ps} </li>
                            <li><label>Renk</label> {adInfos?.color_id} </li>
                            <li><label>Yakıt türü</label> {carInfo[0]?.fuel_type}</li>
                            <li><label> Metalik</label> {adInfos?.metalic_color === 1 ? "Evet" : "Hayır"}  </li>
                            <li><label> Garanti</label> {adInfos?.warranty === 1 ? "Evet" : "Hayır"}  </li>
                            <li><label> Uzatılmış Garanti</label> {adInfos?.extended_warranty === 1 ? "Evet" : "Hayır"}  </li>
                        
                        </ul>
                    </div>
                    
                </div>

                <hr />

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="advertisement_detail_list">
            <h1>YOUR OFFER (VAT Included)</h1>
            <div className="row">

                <div className="col-md-3"> <label id="TeklifFiyati">Teklif Fiyatı</label></div>
                <div className="col-md-3">
                   
                 
                        <div className="input-icon input-icon-right">
                            <input
                            style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                type="text"
                                
                                value={offerPrice}
                                className="form-control"
                                onChange={(e) => {
                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                    setOfferPrice(a);
                                }}
                                placeholder="Amount"
                            />
                            <i>€</i>
                        </div>
                  
                </div>
            </div>
            <div  className="row" style={{marginTop:"20px"}}>
            <div className="col-md-3"> <label id="KullanimKm">Kullanım (km/ay)</label></div>
            <div className="col-md-3">
                    <CInput
                        value={offerKullanim}
                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                        onChange={(e) => {
                            var a = e.target.value.replace(/[^0-9]/g, "");
                            setOfferKullanim(a);
                           
                        }}
                        placeholder="Kullanım"
                        maxLength="7"
                        type="text"
                    />
                </div>
                </div>
            <div  className="row" style={{marginTop:"20px"}}>
            <div className="col-md-3">
                            <label>Kiralama süreniz (Ay)</label></div>
           
            
            <div  className="col-md-3" >
                            <select
                                value={offerAy}
                                onChange={(event) =>{
                                    setOfferPay1("");
                                    setOfferPay2("");
                                    setOfferPay3("");
                                    setOfferAy(event.target.value);}
                                }
                            >
                                <option value="">Kiralama süresi seçiniz</option>                               
                                <option value={12}>12</option>
                                <option value={24}>24</option>
                                <option value={36}>36</option>
                            </select>
                            </div>  
                            </div>
            <div  className="row" style={{marginTop:"20px"}}>
            <div className="col-md-3"> <label id="tekliftarih">Teklif geçerlilik tarihi</label></div>
            <div className="col-md-3">
                    <CInput
                        type="date"
                        value = {offerDate}
                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                        onChange={(e) => {
                           setOfferDate(e.target.value)
                           
                        }}
                        placeholder="Tarih"
                        
                    />
                </div>
                </div>
            <div className="row" hidden={offerAy==""} style={{marginTop:"20px"}}>
            <div className="col-md-3" > <label id="ilkodeme"  style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month"}</label></div>
            <div className="col-md-3">
            
            
                    <div className="input-icon input-icon-right">
                        <input
                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                            type="text"
                            
                            value={offerPay1}
                            className="form-control"
                            onChange={(e) => {
                                var a = e.target.value.replace(/[^0-9]/g, "");
                                setOfferPay1(a);
                            }}
                            placeholder="Amount"
                        />
                        <i>€</i>
                    </div>
            
            </div>
            </div>
            <div className="row" hidden={offerAy==""} style={{marginTop:"20px"}}>
            <div className="col-md-3"> <label id="ikinciodeme"  style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month"}</label></div>
            <div className="col-md-3">
            
            
                    <div className="input-icon input-icon-right">
                        <input
                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                            type="text"
                            
                            value={offerPay2}
                            className="form-control"
                            onChange={(e) => {
                                var a = e.target.value.replace(/[^0-9]/g, "");
                                setOfferPay2(a);
                            }}
                            placeholder="Amount"
                        />
                        <i>€</i>
                    </div>
            
            </div>
            </div>
            <div className="row" hidden={offerAy==""||offerAy==12||offerAy==24} style={{marginTop:"20px"}}>
            <div className="col-md-3"> <label id="ucuncuodeme"style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>12 Months Payment / Month</label></div>
            <div className="col-md-3">
            
            
                    <div className="input-icon input-icon-right">
                        <input
                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                            type="text"
                            
                            value={offerPay3}
                            className="form-control"
                            onChange={(e) => {
                                var a = e.target.value.replace(/[^0-9]/g, "");
                                setOfferPay3(a);
                            }}
                            placeholder="Amount"
                        />
                        <i>€</i>
                    </div>
            
            </div>
            </div>
        
        
        <h1>STANDART FREE SERVICES</h1>
        {Array.from(standartServices).map((subitem) => (
                                                   <div className="form-check disabled" key={subitem.id} style={{float:"none"}}>
                                                   <label className="form-check-label">
                                                       <input style={{height:"18px"}} id={subitem.id}  className="form-check-input" type="checkbox" readOnly checked={subitem.defaultvalue==1} />
                                                       {subitem.value}
                                                   </label>
                                                   </div>
        ))}
                             
        <h1>EXTRA FREE SERVICES</h1>
        {Array.from(extraServices).map((subitem) => (
                                                   <div className="form-check disabled" key={subitem.id} style={{float:"none"}}>
                                                   <label className="form-check-label">
                                                       <input style={{height:"18px"}} id={subitem.id} 
                                                     onClick={() => checkboxHandle(subitem.id,subitem.value)} 
                                                    
                                                       defaultChecked={selectedCheckBoxes.find(x => x.atribute_id === parseInt(subitem.id)).value==1} className="form-check-input" type="checkbox"  />
                                                       {subitem.value}
                                                   </label>
                                                   </div>
        ))}
        <label style={{backgroundColor:"#f9f9a6",marginTop:"20px"}}>By approving this offer, you agree that you will not put a contrary application clause in the contract with the customer, it will be invalid even if you do, and it will be used as legal evidence in case of dispute.</label>
          </div>
          
          </div>
          
            </div>
        </div>
        </div>
        </div>
        </CCardBody>
    </CCard>

    );

    useEffect(() => {
        fetchData();
    }, []);
    
    const onFileChange = (e) => {
        if (e.target.files.length < 9) {
            var arr = [];
            for (var i = 0; i < e.target.files.length; i++) {
                var dd = URL.createObjectURL(e.target.files[i]);
                arr.push(
                    {
                        original: dd + "",
                        thumbnail: dd + ""
                    });
            }
            var lastimages = arr.concat(imageFiles);
            setNewImageFiles(e.target.files);
            setImageFiles(lastimages);
            setChangeImagesFlag(false);
        } else {
            Swal.fire("Error", "Maksimum 8 resim eklebilir!", "error");
            document.getElementById("resetImg").click();
        }
    }
    const getImage = (e) => {
        var targetSrc = e.target.src;
        var imageName = e.target.src.substring(e.target.src.lastIndexOf('/') + 1);
        Swal.fire({
            title: "Are you sure?",
            text: "You will delete " + e.target.src.substring(e.target.src.lastIndexOf('/') + 1) + " from images.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.value) {
                console.log("DELETED");
                var updatedIimageFiles = [];
                for (var i = 0; i < newImageFiles.length; i++) {
                    var dd = URL.createObjectURL(newImageFiles[i]);
                    if (dd != targetSrc) {
                        updatedIimageFiles.push(newImageFiles[i])
                    }
                }
                setNewImageFiles(updatedIimageFiles);
                var filtered = imageFiles.filter(function (el) { return el.original != targetSrc });
                setChangeImagesFlag(false);
                setImageFiles(filtered);
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
    return (
        <div className="example-print">
        
            <CRow>
            <h3 className="make-offer">Teklif Paneli</h3>
            <div className="offer-status">{updateOffer?"Teklifiniz Onay Bekliyor":"Henüz teklif vermediniz"}</div>
                {loading?loadingState: <CCol xs="12" md="12" xl="12">
                    <CCard>
                       
                        <CCardBody style={{ backgroundColor: "#ebedef" }}>
                        <div className="container" >
                        <div >
                        <Pdf hidden={!updateOffer} targetRef={ref} filename={"Teklif"+adId+".pdf"} scale={0.8}>
                         {({ toPdf }) => <button onClick={toPdf}>Pdf oluştur</button>}
                        </Pdf>
                        <div className="subpage advertisement_detail">
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                    <div className="advertisement_content" style={{ width: "100%", marginBottom: "20px" }}>
                                        <div className="price">
                                            <h2>Satış Fiyatı:{adInfos?.sale_price}€</h2>
                                            <h2>Kiralama süreniz (Ay): {adInfos?.rental_period}</h2>
                                            <h2>Kullanım (km/ay): {adInfos?.usage}</h2>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5">
                                                <div>
                                                    <label className="custom-file-upload">
                                                        <input type="file" accept=".png, .jpg, .jpeg"
                                                            onChange={onFileChange}
                                                            name="files[]"
                                                            multiple />
                                        Add New Image
                                    </label>

                                                    <ImageGallery showPlayButton={false} showFullscreenButton={false} onClick={(e) => { getImage(e) }} items={imageFiles} />
                                                </div>

                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7">
                                    <div className="advertisement_content">
                                        <ul>

                                            <li><label>Marka</label> {carInfo[0]?.brand}  </li>
                                            <li><label>Motor hacmi (cc)</label> {carInfo[0]?.engine_capacity}  </li>
                                            <li><label>Üretim Ay / Yıl</label> {carInfo[0]?.registration_month}/{carInfo[0]?.registration_year}  </li>
                                            <li><label>Kapı Sayısı</label>{carInfo[0]?.number_of_dors} </li>
                                            <li><label>Model</label> {carInfo[0]?.model}  </li>
                                            <li><label>Vites</label> {carInfo[0]?.gear}</li>
                                            <li><label>Kilometre</label> {adInfos?.kilometer} </li>
                                            <li><label>Emisyon</label> {carInfo[0]?.emission} </li>
                                            <li><label>Araç Model Tipi</label> {carInfo[0]?.model_type} </li>
                                            <li><label>Siz dahil önceki sahipleri </label> {adInfos?.number_of_vehicle_owners}  </li>
                                            <li><label>Kasa Tipi</label> {carInfo[0]?.vehicle_body_type}</li>
                                            <li><label>Sigara içilmeyen</label> {adInfos?.non_smoking === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label>Üretim Dönemi</label> {carInfo[0]?.production_period} </li>
                                            <li><label>Çek Defteri</label> {adInfos?.checkbook === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label>PS (kW)</label> {carInfo[0]?.ps} </li>
                                            <li><label>Renk</label> {adInfos?.color_id} </li>
                                            <li><label>Yakıt türü</label> {carInfo[0]?.fuel_type}</li>
                                            <li><label> Metalik</label> {adInfos?.metalic_color === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label> Garanti</label> {adInfos?.warranty === 1 ? "Evet" : "Hayır"}  </li>
                                            <li><label> Uzatılmış Garanti</label> {adInfos?.extended_warranty === 1 ? "Evet" : "Hayır"}  </li>
                                        
                                        </ul>
                                    </div>
                                    
                                </div>

                                <hr />


                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="advertisement_detail_list">
                                        {basliklar.length > 1 ? Array.from(basliklar).map((item) => (
                                            <div key={item?.DisplayName + "main"}>
                                                <Accordion>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={item?.DisplayName}>
                                                        <h1 >{item?.DisplayName}</h1>
                                                    </Accordion.Toggle>

                                                    <Accordion.Collapse eventKey={item?.DisplayName}>
                                                        <Card.Body>
                                                            <ul >
                                                                {Array.from(item.SubItems).map((subitem) => (
                                                                    <li key={subitem.id}><i htmlFor={subitem.id} key={subitem.id} id={subitem.id} className={adDetails?.includes(subitem.id) ? "check" : ""} ></i>{subitem.value}</li>
                                                                ))}
                                                            </ul>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                            </div>
                                        )) : null}
                                        <h1>Genel Bilgiler</h1>
                                        <p>{adInfos?.description}</p>
                                        {adInfos?.diffrent_car_choose === 1 ?
                                            <>
                                                <h1>Başka Araç Kiralama Bilgileri</h1>
                                                <CDataTable
                                                    items={rentedCars}
                                                    fields={modalFields}
                                                    hover
                                                /></> : null}
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="advertisement_detail_list" ref={ref}>
                            <h1>YOUR OFFER (VAT Included)</h1>
                            <div className="row">

                                <div className="col-md-3"> <label id="TeklifFiyati">Teklif Fiyatı</label></div>
                                <div className="col-md-3">
                                   
                                 
                                        <div className="input-icon input-icon-right">
                                            <input
                                            style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                                type="text"
                                                
                                                value={offerPrice}
                                                className="form-control"
                                                onChange={(e) => {
                                                    var a = e.target.value.replace(/[^0-9]/g, "");
                                                    setOfferPrice(a);
                                                }}
                                                placeholder="Amount"
                                            />
                                            <i>€</i>
                                        </div>
                                  
                                </div>
                            </div>
                            <div  className="row" style={{marginTop:"20px"}}>
                            <div className="col-md-3"> <label id="KullanimKm">Kullanım (km/ay)</label></div>
                            <div className="col-md-3">
                                    <CInput
                                        value={offerKullanim}
                                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                        onChange={(e) => {
                                            var a = e.target.value.replace(/[^0-9]/g, "");
                                            setOfferKullanim(a);
                                           
                                        }}
                                        placeholder="Kullanım"
                                        maxLength="7"
                                        type="text"
                                    />
                                </div>
                                </div>
                            <div  className="row" style={{marginTop:"20px"}}>
                            <div className="col-md-3">
                                            <label>Kiralama süreniz (Ay)</label></div>
                           
                            
                            <div  className="col-md-3" >
                                            <select
                                                value={offerAy}
                                                onChange={(event) =>{
                                                    setOfferPay1("");
                                                    setOfferPay2("");
                                                    setOfferPay3("");
                                                    setOfferAy(event.target.value);}
                                                }
                                            >
                                                <option value="">Kiralama süresi seçiniz</option>                               
                                                <option value={12}>12</option>
                                                <option value={24}>24</option>
                                                <option value={36}>36</option>
                                            </select>
                                            </div>  
                                            </div>
                            <div  className="row" style={{marginTop:"20px"}}>
                            <div className="col-md-3"> <label id="tekliftarih">Teklif geçerlilik tarihi</label></div>
                            <div className="col-md-3">
                                    <CInput
                                        type="date"
                                        value = {offerDate}
                                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                        onChange={(e) => {
                                           setOfferDate(e.target.value)
                                           
                                        }}
                                        placeholder="Tarih"
                                        
                                    />
                                </div>
                                </div>
                            <div className="row" hidden={offerAy==""} style={{marginTop:"20px"}}>
                            <div className="col-md-3" > <label id="ilkodeme"  style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month"}</label></div>
                            <div className="col-md-3">
                            
                            
                                    <div className="input-icon input-icon-right">
                                        <input
                                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                            type="text"
                                            
                                            value={offerPay1}
                                            className="form-control"
                                            onChange={(e) => {
                                                var a = e.target.value.replace(/[^0-9]/g, "");
                                                setOfferPay1(a);
                                            }}
                                            placeholder="Amount"
                                        />
                                        <i>€</i>
                                    </div>
                            
                            </div>
                            </div>
                            <div className="row" hidden={offerAy==""} style={{marginTop:"20px"}}>
                            <div className="col-md-3"> <label id="ikinciodeme"  style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>{offerAy==12?"6 Months Payment / Month":"12 Months Payment / Month"}</label></div>
                            <div className="col-md-3">
                            
                            
                                    <div className="input-icon input-icon-right">
                                        <input
                                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                            type="text"
                                            
                                            value={offerPay2}
                                            className="form-control"
                                            onChange={(e) => {
                                                var a = e.target.value.replace(/[^0-9]/g, "");
                                                setOfferPay2(a);
                                            }}
                                            placeholder="Amount"
                                        />
                                        <i>€</i>
                                    </div>
                            
                            </div>
                            </div>
                            <div className="row" hidden={offerAy==""||offerAy==12||offerAy==24} style={{marginTop:"20px"}}>
                            <div className="col-md-3"> <label id="ucuncuodeme"style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}>12 Months Payment / Month</label></div>
                            <div className="col-md-3">
                            
                            
                                    <div className="input-icon input-icon-right">
                                        <input
                                        style={{border: "1px solid #ccc",borderRadius:"0.3rem"}}
                                            type="text"
                                            
                                            value={offerPay3}
                                            className="form-control"
                                            onChange={(e) => {
                                                var a = e.target.value.replace(/[^0-9]/g, "");
                                                setOfferPay3(a);
                                            }}
                                            placeholder="Amount"
                                        />
                                        <i>€</i>
                                    </div>
                            
                            </div>
                            </div>
                            <div  className="row" style={{marginTop:"20px"}}>
                            <div className="col-md-3">
                                            <label>ANY OTHER CAR FOR RENTAL(*)</label></div>
                           
                            
                            <div  className="col-md-3" >
                                            <input   
                                            onChange={() => setOtherRent(!otherRent)} 
                                        
                                            checked={otherRent==1} type="checkbox"  />
                                      
                                            </div>  
                                            </div>                
                        
                        <h1>STANDART FREE SERVICES</h1>
                        {Array.from(standartServices).map((subitem) => (
                                                                   <div className="form-check disabled" key={subitem.id} style={{float:"none"}}>
                                                                   <label className="form-check-label">
                                                                       <input style={{height:"18px"}} id={subitem.id}  className="form-check-input" type="checkbox" readOnly checked={subitem.defaultvalue==1} />
                                                                       {subitem.value}
                                                                   </label>
                                                                   </div>
                        ))}
                                             
                        <h1>EXTRA FREE SERVICES</h1>
                        {Array.from(extraServices).map((subitem) => (
                                                                   <div className="form-check disabled" key={subitem.id} style={{float:"none"}}>
                                                                   <label className="form-check-label">
                                                                       <input style={{height:"18px"}} id={subitem.id} 
                                                                     onClick={() => checkboxHandle(subitem.id,subitem.value)} 
                                                                    
                                                                       defaultChecked={selectedCheckBoxes.find(x => x.atribute_id === parseInt(subitem.id)).value==1} className="form-check-input" type="checkbox"  />
                                                                       {subitem.value}
                                                                   </label>
                                                                   </div>
                        ))}
                        <label style={{backgroundColor:"#f9f9a6",marginTop:"20px"}}>By approving this offer, you agree that you will not put a contrary application clause in the contract with the customer, it will be invalid even if you do, and it will be used as legal evidence in case of dispute.</label>
                        <CRow style={{paddingTop:"20px",paddingBottom:"20px"}}>
                         <CButton style={{backgroundColor:"rgb(0, 136, 204)", color:"white",marginRight:"20px"}} onClick={saveOffer}>{saveLoading?<Spinner 
                          style={{
                            width: "1rem",
                            height: "1rem",
                            display: "block",
                            marginBottom: "2%",
                          }}
                        />:(updateOffer==true ? "Güncelle":"Teklif Ver")} </CButton>
                        <CButton hidden={!updateOffer} className="btn btn-danger" onClick={downloadPdf}> 
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                        PDF indir
                        </CButton>
                   
                        </CRow>
                          </div>
                          
                          </div>
                          
                            </div>
                        </div>
                        </div>
                        
                        </div>
                        </CCardBody>
                        
                        
                       
                    </CCard>
                </CCol>
            }
               </CRow>
        </div>
    );
}
