import { Layout } from "../../../components/Layout";
import { get, post } from "../../../services/ApiServices";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import React, { Component, useState } from "react";
import Config from "../../../services/Config";
import { useHistory } from "react-router-dom";


import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

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

export default function MyAds() {
    const [userId, setUserId] = useState(undefined);
    const [detailClicked, setDetailClicked] = useState(false);
    const [data, setData] = useState([]);

    const [anotherCollapse, setAnotherCollapse] = useState(false);
    const [serviceCollapse, setServiceCollapse] = useState(false);
    const [standartCollapse, setStandartCollapse] = useState(false);
    const [extraCollapse, setExtraCollapse] = useState(false);
    const [carCompanyCollapse, setCarCompanyCollapse] = useState(false);

    const [changeImagesFlag, setChangeImagesFlag] = useState(true);
    const [detailModal, setDetailModal] = useState(false);
    const [offerModal, setOfferModal] = useState(false);
    const [adInfos, setAdInfos] = useState();
    const [basliklar, setBasliklar] = useState([""]);
    const [adDetails, setAdDetails] = useState();
    const [adImages, setAdImages] = useState([""]);
    const [imageFiles, setImageFiles] = useState([]);
    const [offerData, setOfferData] = useState([]);
    const [innerCollapse, setInnerCollapse] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [initialImageFiles, setInitialImageFiles] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [carInfo, setCarInfo] = useState([""]);
    const [rentedCars, setRentedCars] = useState([""]);
    const [selectedImageUrl, setSelectedImageUrl] = useState("");
    const [currentUserRole, setCurrentUSerRole] = useState(5);
    const baseUrl = "../../Content/assets/images/";
 
    const [loadingState, setLoadingState] = useState(
        <div className="d-flex align-items-center text-dark m-3">
            <strong>Loading...</strong>
            <div
                className="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
            ></div>
        </div>
    );

    const fields = [

        { key: "advertisesId", label: "Ad Id" },
        "brand",
        "model",
        { key: "registrationDate", _style: { width: "20%" } },
        { key: "expiredDate", _style: { width: "20%" } },
        "status",
        {
            key: "offers",
            label: "Offers",
            sorter: false,
            filter: false,
        },
        {
            key: "actions",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
        },
    ];
    const offerFields = [

       
        {
            key: "desc",
            label: "",
            sorter: false,
            filter: false,
        },
        {
            key: "offer1",
            label: "offer1",
            sorter: false,
            filter: false,
        },
        {
            key: "offer2",
            label: "Offer2",
            sorter: false,
            filter: false,
        },
        {
            key: "offer3",
            label: "offer3",
            sorter: false,
            filter: false,
        },
        {
            key: "offer4",
            label: "offer4",
            sorter: false,
            filter: false,
        },
    ];
    const modalFields = [
        { key: "advertise_id", label: "İlan No" },
        { key: "brand", label: "Marka" },
        { key: "serial", label: "Seri" },
        { key: "vehicle_body_type", label: "Kasa Tipi" },
        { key: "fuel_type", label: "Yakıt Türü" },
        { key: "rental_period", label: "Kiralama Süresi" },
        { key: "usage", label: "Kullanım(km)" },
    ];
    // ilan aktiflik pasiflik durumu a aktif o pending
    const getBadge = (status) => {
        switch (status) {
            case "A":
                return "success";
            case "O":
                return "warning";
            default:
                return "primary";
        }
    };
    async function fetchData() {

        let axiosResult = await get(Config.serverUrl + "advertise/GetAdvertises");
        let axiosForBasliklar = await get(Config.serverUrl + "vechileatribute/GetAtributesGroup/2");
        let axiosForUserRole = await get(Config.serverUrl + "user/GetUserRoleById");
        if (axiosResult.data.result) {
            var res = axiosResult.data.result;
            debugger;
            if (res.length > 0) {
                setUserId(res[0].userId);
                console.log(res[0].userId);
                setData(res);
                setBasliklar(axiosForBasliklar.data.result);
            } else {
                setLoadingState(null);
            }
        }
        setCurrentUSerRole(axiosForUserRole.data);
        console.log(axiosResult.data.result);
        console.log(axiosForBasliklar.data.result);
        console.log(axiosForUserRole);
        setLoadingState(
            <div className="d-flex align-items-center text-dark m-3">
                <strong>No Item...</strong>
            </div>
        );
        //this.setState({ basliklar: axiosResult.data.result });
    }
    async function getData(number) {
        let axiosForInfo = await get(Config.serverUrl + "advertise/GetAdvertisesById/" + number);
        let carInfo = await get(Config.serverUrl + "brand/GetBrandById/" + axiosForInfo.data.result.brand_id);
        let axiosForDetail = await get(Config.serverUrl + "advertise/GetAdvertiseDetailByAdvertseId/" + number);
        let axiosForImages = await get(Config.serverUrl + "advertise/GetAdvertiseImageByAdvertiseId/" + number);
        let axiosForRentedCars = await get(Config.serverUrl + "advertise/GetDifferentRentCarsByAdvertiseId/" + number);



        return ([axiosForInfo.data.result, axiosForDetail.data.result, axiosForImages.data.result, carInfo.data.result, axiosForRentedCars.data.result]);
    }

    const changeImage = (e) => {
        setSelectedImageUrl(e.target.src);
    }

    const openModal = async (item) => {
        setDetailClicked(true);
        var details = await getData(item.advertisesId);
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
        setDetailClicked(false);
        console.log(details);
        setDetailModal((detailModal) => !detailModal);
    }
    const closeModal = () => {
        setDetailModal((detailModal) => !detailModal);
    }
    const closeOfferModal = () => {
        setOfferModal((offerModal) => !offerModal);
    }
    const openOfferModal = (item) => {
        setOfferModal((offerModal) => !offerModal);
        setOfferData(item.offerList);
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
    async function updateAdvertiseImages() {
        if (newImageFiles.length > 0) {  // yeni image eklenmişse buraya gel
            let obj = { id: adInfos?.id, imageFiles: newImageFiles }
            var formData = new FormData();
            for (const key of Object.keys(newImageFiles)) {
                formData.append("imgCollection", newImageFiles[key]);
            }
            formData.append("adId", adInfos?.id);
            let adImages = await post(Config.serverUrl + "advertise/UpdateAdvertiseImages", obj);
        }
        if (JSON.stringify(imageFiles) != JSON.stringify(initialImageFiles)) { //ilanın serverdan gelen imageları silinmişse buraya gel
            for (var i = 0; i < imageFiles.length; i++) {
                imageFiles[i].original = imageFiles[i].original.replace(window.location.origin, "");
            }
            let _obj = { id: adInfos.id, images: imageFiles }
            let adImages = await post(Config.serverUrl + "advertise/RemoveAdvertiseImages", _obj);
        }
        fetchData();
    }
    const onEntering = () => { };
    const onEntered = () => { };
    const onExiting = () => { };
    const onExited = () => { };

    const toggle = (e) => {
        setCollapse(!collapse);
        e.preventDefault();
    }
    const anotherToggle = (e) => {
        setAnotherCollapse(!anotherCollapse);
        e.preventDefault();
    }
    const extraToggle = (e) => {
        setExtraCollapse(!extraCollapse);
        e.preventDefault();
    }
    const carCompanyToggle = (e) => {
        setCarCompanyCollapse(!carCompanyCollapse);
        e.preventDefault();
    }
    const servicesToggle = (e) => {
        setServiceCollapse(!serviceCollapse);
        e.preventDefault();
    }
    const standartToggle = (e) => {
        setStandartCollapse(!standartCollapse);
        e.preventDefault();
    }

    
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

    useEffect(() => {
        if (localStorage.getItem("reload") == "true") {
            localStorage.setItem("reload", "false");
            window.location.reload();
        }
        fetchData();
        //getData();
    }, []);

    return (
        <div>
            <CModal
                show={detailModal}
                onClose={closeModal}
                color="primary"
                size="xl"
            >
                <CModalHeader closeButton><b>{adInfos?.id} NUMARALI İLAN</b></CModalHeader>
                <CModalBody style={{ backgroundColor: "#ebedef" }}>
                    <div className="container">
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
                                {imageFiles==null||imageFiles==""?<></>:
                                <div>
                                    <label className="custom-file-upload" hidden={currentUserRole==5}>
                                        <input type="file" accept=".png, .jpg, .jpeg"
                                            onChange={onFileChange}
                                            name="files[]"
                                            multiple />
                                        Add New Image
                                    </label>

                                    <ImageGallery showPlayButton={false} showFullscreenButton={true} onClick={(e) => { if(currentUserRole==1)getImage(e) }} items={imageFiles} />
                                    </div>}



                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7">
                                    <div className="advertisement_content">
                                    <button className="buttonload" id="finish" style={{ backgroundColor: "rgb(224, 110, 25)", borderColor: "rgb(224, 110, 25)" }} onClick={() =>console.log("deneme")}>
                                            <i className="fas fa-save"></i>{"Teklif Ver"}
                                        </button>
                                        <ul>

                                            <li><label>Marka</label> {adInfos?.sale_price}  </li>
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
                                            <li><label>Plaka</label> {adInfos?.plaque} </li>
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
                            </div>
                        </div>
                    </div>



                </CModalBody>
                <CModalFooter>
                    <CButton onClick={updateAdvertiseImages} disabled={changeImagesFlag} color="primary">Save</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={closeModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            <CModal
                show={offerModal}
                onClose={closeOfferModal}
                color="primary"
                size="xl"
            >
                <CModalHeader closeButton><b>{adInfos?.id} NUMARALI İLAN</b></CModalHeader>
                <CModalBody style={{ backgroundColor: "#ebedef" }}>
                    <div className="container">
                        <div className="subpage advertisement_detail">
                            <div className="row">

                                <CCard style={{ width:"100%" }}>
                                    <CButton
                                        color="primary"
                                        onClick={toggle}
                                    >
                                        CAR COMPANY OFFER (VAT Included)
                                     </CButton>
                                    <CCollapse
                                        show={collapse}
                                        onEntering={onEntering}
                                        onEntered={onEntered}
                                        onExiting={onExiting}
                                        onExited={onExited}
                                    >
                                        <CCardBody>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Offer1</th>
                                                        <th>Offer2</th>
                                                        <th>Offer3</th>
                                                        <th>Offer4</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">OFFER VALUE (Euro)</th>
                                                        <td>7000</td>
                                                        <td>33333</td>
                                                        <td>22222</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Monthly Use (KM/month) </th>
                                                        <td>500</td>
                                                        <td>-</td>
                                                        <td>=</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Rental Term (Month)</th>
                                                        <td>12</td>
                                                        <td>24</td>
                                                        <td>=</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"> Payment / Month</th>
                                                        <td>6 Month / 300£</td>
                                                        <td>12 x 300£</td>
                                                        <td>=</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"> Payment / Month</th>
                                                        <td>11.04.2021</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard style={{ width: "100%" }}>
                                    <CButton
                                        color="primary"
                                        onClick={anotherToggle}
                                    >
                                        ANOTHER CAR FOR RENTAL
                                     </CButton>
                                    <CCollapse
                                        show={anotherCollapse}
                                        onEntering={onEntering}
                                        onEntered={onEntered}
                                        onExiting={onExiting}
                                        onExited={onExited}
                                    >
                                        <CCardBody>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Offer1</th>
                                                        <th>Offer2</th>
                                                        <th>Offer3</th>
                                                        <th>Offer4</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">ANOTHER CAR FOR RENTAL</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard style={{ width: "100%" }}>
                                    <CButton
                                        color="primary"
                                        onClick={servicesToggle}
                                    >
                                        Services by 444CAR
                                     </CButton>
                                    <CCollapse
                                        show={serviceCollapse}
                                        onEntering={onEntering}
                                        onEntered={onEntered}
                                        onExiting={onExiting}
                                        onExited={onExited}
                                    >
                                        <CCardBody>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Offer1</th>
                                                        <th>Offer2</th>
                                                        <th>Offer3</th>
                                                        <th>Offer4</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">> Free Payment Assurance</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Free Legal Protection</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Free Delivery/Return/Damage Record</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Unemployment Insurance  Policy Discount</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">50 € 444CARD For Fuel</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                                <CCard style={{ width: "100%" }}>
                                    <CButton
                                        color="primary"
                                        onClick={standartToggle}
                                    >
                                        Standart Free Services 
                                     </CButton>
                                    <CCollapse
                                        show={standartCollapse}
                                        onEntering={onEntering}
                                        onEntered={onEntered}
                                        onExiting={onExiting}
                                        onExited={onExited}
                                    >
                                        <CCardBody>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Offer1</th>
                                                        <th>Offer2</th>
                                                        <th>Offer3</th>
                                                        <th>Offer4</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">> 50 € Free Fuel</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">100 Km Total Free Mileage</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">100 € Damage Deductible Free Limit</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Car Insurance</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Liability Insurance</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Car Tax</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Winterfit Tires</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">General Inspections</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Periodic Vehicle Maintenance</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Broadcasting Fees</th>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            </div>
        </div>
                    </div >



                </CModalBody >
        <CModalFooter>
                    <CButton onClick={() => { alert()}}  color="primary">Save</CButton>{' '}
            <CButton
                color="secondary"
                 onClick={closeOfferModal}
            >Cancel</CButton>
        </CModalFooter>
            </CModal >

        <CRow>
            <CCol xs="12" md="12" xl="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={data}
                            fields={fields}
                            columnFilter
                            tableFilter
                            noItemsViewSlot={loadingState}
                            itemsPerPageSelect
                            itemsPerPage={5}
                            hover
                            loading={detailClicked}
                            sorter
                            pagination
                            scopedSlots={{
                                status: (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status === "A" ? "Active" : "Pending"}
                                        </CBadge>
                                    </td>
                                ),
                                registrationDate: (item) => (
                                    <td>{moment(item.registrationDate).format("DD/MM/YYYY")}</td>
                                ),
                                expiredDate: (item) => (
                                    moment(item.registrationDate) > moment(item.expiredDate) ?
                                        <td>{"null"}</td> :
                                        (<td>{moment(item.expiredDate).format("DD/MM/YYYY")}</td>)


                                ),
                                offers: (item, index) => {
                                    return (
                                        <td>
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => openOfferModal(item)}
                                            >
                                                Total Offers {item.offerList.length}
                                            </CButton></td>

                                    );
                                },
                                actions: (item, index) => {
                                    return (

                                        <td>
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => openModal(item)}
                                            >
                                                Detail
                      </CButton>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </div >
    );
}
