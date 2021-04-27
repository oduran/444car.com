import React, { Component } from 'react';
import { saveLocale, getLocale } from '../Localization';
import { t } from "ttag";
import { Collapse, Container, Modal, Col, Form, FormGroup, Label,Input, ModalHeader, ModalBody, ModalFooter, Navbar, NavbarBrand, DropdownItem, Dropdown, NavbarToggler, DropdownToggle, DropdownMenu, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


import Logo from './Content/Images/logo.svg';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from '../services/AuthService';

const TEST_SITE_KEY = "6LfZDzoaAAAAAAc_hmw82IN9rQPoYBoRQEgOXV9i";
const DELAY = 1500;

export class Footer extends Component {
    static displayName = Footer.name;

  constructor (props) {
    super(props);
     

    } 

    render() {
        const activeStyle = { color: "#000000" };

        return (
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 footer_left">
                            <img src={Logo}/>
                            <label> <strong style={{color: "#0088cc"}}>Keep on</strong>  Driving</label>
                                <div class="copyright">© 2021 444Car All rights reserved.</div>
                </div>
                            <div class="col-lg-6 col-md-6 footer_nav">
                                <ul>
                                    <li><a href="#">How?</a></li>
                                    <li><a href="#">Calculate</a></li>
                                    <li><a href="#">Enterprise</a></li>
                                    <li><a href="#">Car Companies</a></li>
                                    <li><a href="#">Pricing</a> </li>
                                </ul>

                                <ul>
                                    <li><a href="#">Customer Questions</a></li>
                                    <li><a href="#">Car Company Questions</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">444CARD</a></li>
                                    <li><a href="#">Payment Assurance</a> </li>
                                </ul>

                                <ul>
                                    <li><a href="#">Customer Protection Agreement</a></li>
                                    <li><a href="#">Bonus Program</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">User Agreement</a></li>
                                    <li><a href="#">Privacy Policy</a> </li>
                                    <li><a href="#">About 444CAR</a> </li>
                                </ul>

                            </div>
                            <div class="col-lg-3 col-sm-12 footer_right">
                                <p>Bückerheide 10, 45139, Frillendorf, Germany
                        <br/> GSM: (0123) 456-7890
                        <br/> E-posta: info@444car.de
                        <br/> Faks: (0123) 456-7890
                    </p>
                                            <div class="footer_social">
                                                <a href="#" class="fb"><i class="fab fa-facebook-f"></i></a>
                                                <a href="#" class="tw"><i class="fab fa-twitter"></i></a>
                                                <a href="#" class="yt"><i class="fab fa-instagram"></i></a>
                                            </div>
                </div>
            </div>
        </div>
            </footer>
        )
    }
}
