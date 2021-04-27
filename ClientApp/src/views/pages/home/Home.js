import React from "react";
import { get, post } from "../../../services/ApiServices";
import LoadingOverlay from "react-loading-overlay";
import { Layout } from '../../../components/Layout';
import OwlCarousel from 'react-owl-carousel';
import './style.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          isLoaderActive: true
      }
  }
    componentDidMount() {
        this.setState({ isLoaderActive:false })
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
                    <OwlCarousel className="promo owl-carousel owl-theme" loop autoplay autoplayTimeout={5000} items="1">
                        <div className="item">
                            <img src="Content/Images/promo_1.jpg" />
                            <div className="container">
                                <div className="caption">
                                    <h1> <strong>We believe in we can reduce your vehicle costs and provide cash</strong></h1>
                                    <h1> <strong>Rent</strong> Your Own Car </h1>
                                    <h2>❝Sell and keep on driving❞</h2>       
                                    <a href="#" className="promo_link">DISCOVER</a>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="Content/Images/promo_2.jpg" />
                            <div className="container">
                                <div className="caption">
                                    <h1> <strong>Eliminate the uncertainty in the future and feel good </strong></h1>
                                    <h1> <strong>Rent</strong> Your Own Car </h1>
                                    <h2>Less stress, control on budget and ready cash </h2>
                                    <h2>Payment assurance, legal protection, all-inclusive and many others</h2>
                                    <a href="#" className="promo_link">DISCOVER</a>
                                </div>
                            </div>
                        </div>
                        
                    </OwlCarousel>

                    <div className="main_why_rent">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    
                                </div>
                                <div className="col-md-8">
                                    <h1>PROOF WITH CALCULATION</h1>
                                    <label>ADJUST PRICING TO USE THE ADVANTAGE OF SELLING</label>
                                    <hr />
                                    <br />
                                    <br />
                                    
                                    <p>Compare own car & rental car pricing
                                    <br />OR</p>
                                    <p>Compare & take the advantage over loan financing</p>

                                    <br />
                                    <label>CASH YOUR CAR & PAY LESS</label>

                                    <div className="main_calculate_input">
                                        <input type="text" placeholder="Type your car value" />
                                        <input type="submit" value="CALCULATE" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                    </div>


                    <div className="how_it_wors">
                        <div className="container">
                            <h1>HOW IT WORKS? </h1>
                            <div className="info">WITHOUT CREDIT OR SCORE CASH YOUR CAR TO STOP LOSS</div>
                            <p>We collect best offers from car rental campanies for you<br />
                                    We collect offers for each car for you
                    individually<br /> Receive the offers from car rental companies for mutual agreement</p>

                            <div className="steps">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-3">
                                        <div className="number">1</div>
                                        <div className="steps_item">
                                            <img src="Content/Images/how_it_works_1.gif" />
                                            <label>FILL THE FORM</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-3">
                                        <div className="number">2</div>
                                        <div className="steps_item">
                                            <img src="Content/Images/how_it_works_2.gif" />
                                            <label>BEST 4 OFFERS IN 3 DAYS</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-3">
                                        <div className="number">3</div>
                                        <div className="steps_item">
                                            <img src="Content/Images/how_it_works_3.gif" />
                                            <label>CONTACT DIRECTLY</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-6 col-lg-3">
                                        <div className="number">4</div>
                                        <div className="steps_item">
                                            <img src="Content/Images/how_it_works_4.gif" />
                                            <label>GET YOUR PAYMENT <br /> KEEP ON DRIVING</label>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="main_who_prefers">
                        <div className="container">
                            <h1>WHO PREFERS 444CAR?</h1>
                            <h2>AVAILABLE BOTH FOR INDIVIDUALS AND COMPANIES</h2>
                            <hr />
                            <h3>Those who want to</h3>

                            <p>use the car more economically</p>
                            <p>have an additional business/family car</p>
                            <p>make an individual investment</p>
                            <p>use the cash as working capital</p>
                            <p>have the more down payment for mortgage</p>
                            <p>use alternative financing instead of credit/interest</p>


                        </div>
                    </div>

                    <div className="main_why_rent">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src="Content/Images/why_rent_img.gif" />
                                </div>
                                <div className="col-md-8">

                                    <h1>WHY RENT MY OWN CAR?</h1>

                                    <h2>ADVANTAGE FOR OPTIMAL DEAL ON SALE AND RENT PRICING</h2>
                                    <hr />

                                    <p>Opportunity to compare sale and rent pricing for the optimal deal </p>
                                    <p>Cheaper than the brand-new car </p>
                                    <p>Advantage of the well-known history of your own car </p>
                                    <p>Collect best pricing offers specifically for your car</p>
                                    <label>Also please compare pricing out of 444CAR where ever online/offline</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="main_why_rent">
                        <div className="container">
                            <div className="row">
                                
                                <div className="col-md-8">

                                    <h1>RENT OPTION</h1>

                                    <label>SELL YOUR CAR AND RENT ANOTHER WITH “RENT PLUS OPTION”</label>
                                    <hr />
                                    <label>Car owner can prefer</label>
                                    <p>An upper segment car to test and use for long term </p>
                                    <p>A lower segment car to save more on costs </p>
                                    <p>A new model of same type  </p>
                                    <p>A different car just for a change</p>
                                    <label>ALL-IN-ONE SERVICE WITH OFFERS <br /> WITH VARIETY OF MODELS & TYPES </label>
                                </div>

                                <div className="col-md-4">
                                    <img src="Content/Images/why_rent_img.gif" />
                                </div>

                            </div>
                        </div>
                    </div>



                    <div className="main_howmeour_customers">
                        <div className="container">
                            <h1>HOW WE SUPPORT OUR CUSTOMERS?</h1>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_1.jpg" />
                                        <label>
                                            <strong>NON-PAYMENT & PAYMENT DELAY ASSURANCE</strong>
                                            <p>We give assurance to the car company for your monthly rental payments</p>
                                            <p> </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_2.jpg" />
                                        <label>
                                            <strong>PRIVACY</strong>
                                            <p>We don't share your name, contact info, car license and car mileage</p>
                                            <p>You can keep private until the agreement</p>
                                        </label>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_9.jpg" />
                                        <label>
                                            <strong>ALL INCLUSIVE</strong>
                                            <p>General inspection and manitenance</p>
                                            <p>Winter-summer tires </p>
                                            <p>Motor vehicle tax, broadcasting fee</p>
                                            <p>Car insurance, liability insurance</p>
                                        </label>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_3.jpg" />
                                        <label>
                                            <strong>LEGAL PROTECTION</strong>  
                                            <p>"Customer Protection Agreement" is available on the platform as on integral part of "User Agreement" and  has priority over
                                                the rental agreements to protect your rights</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_4.jpg" />
                                        <label>
                                            <strong>NO BUY BACK</strong>
                                            <p>You can not be forced to buy back the car or to pay any compensation charge at the end of term</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_5.jpg" />
                                        <label>
                                            <strong>VIDEO CHAT/TEXT CHANNEL</strong>
                                            <strong>(Free & Optional)</strong>
                                            <p>You can contact the car company directly<br />
                                            or<br />
                                            You can use 444CAR Video Chat/Text channel to context car companies to keep your privacy <br />
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_6.jpg" />
                                        <label>
                                            <strong>E-SIGNATURE </strong>
                                            <strong>(Free & Optional)</strong>
                                            <p>If you prefer you can use e-signature system of the Platform </p>
                                            <p>You can send/recive e-signed documents on platform</p>

                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-x12">
                                    <div className="item">
                                        <img src="Content/Images/howmeour_customers_7.jpg" />
                                        <label>
                                            <strong>PLATFORM FEE ADVANTAGES</strong>
                                            <p>Free to receive and view offers</p>
                                            <p>You can pay Platform fee after your agreement with car company</p>
                                            <p>If you have or buy a job protection insurance policy that holds car company as beneficiary %50 of your transaction fee will be paid back</p>
                                        </label>
                                    </div>
                                </div>         

                               

                            </div>
                        </div>
                    </div>



                    <div className="main_calculate">
                        <div className="container">
                            <h1>COMPARE 444CAR</h1>
                            <p>You can use the car value for an investment instead of enduring the alternative cost<br/>
                                Alternative cost, shows the price of buying a car and holding your cash as captive<br/>
                            </p>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="gorunmezheader"></th>
                                            <th className="light_gray">Alternative Cost</th>
                                            <th className="pink">Tax & Insurance</th>
                                            <th className="blue">Abrasian Expense</th>
                                            <th className="orange">Interest</th>
                                            <th className="gray">Time Cost</th>
                                            <th className="purple">Cash Finance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>444CAR</td>
                                            <td><i className="red"></i></td>
                                            <td><i className="red"></i></td>
                                            <td><i className="red"></i></td>
                                            <td><i className="red"></i></td>
                                            <td><i className="blue_statistics"></i></td>
                                            <td><i className="check"></i></td>
                                        </tr>
                                        <tr>
                                            <td>CREDIT</td>
                                            <td><i className="red"></i></td>
                                            <td><i className="check"></i></td>
                                            <td><i className="check"></i></td>
                                            <td><i className="check"></i></td>
                                            <td><i className="red_statistics"></i></td>
                                            <td><i className="check"></i></td>
                                        </tr>
                                        <tr>
                                            <td>OWN CAR</td>
                                            <td><i className="check"></i></td>
                                            <td><i className="check"></i></td>
                                            <td><i className="check"></i></td>
                                            <td><i className="red"></i></td>
                                            <td><i className="red_statistics"></i></td>
                                            <td><i className="red"></i></td>
                                        </tr>

                                    </tbody>
                                </table>
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
                                        <img src="Content/Images/frequently_questions_1.png" />
                                        <a href="#">CAR OWNERS</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="frequently_questions_item">
                                        <img src="Content/Images/frequently_questions_2.png" />
                                        <a href="#">CAR COMPANIES</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="register_footer">
                        <div className="container">
                            <label>

                                <p> No more need to "same day cash" by selling chepaer</p>
                                <p> No more need to "same day cash" by high interest lending</p>
                                <p> You have money decreasing every moment as car</p>
                                <p> Get the cash back and pay less than owning</p>
                                <br />
                                <br />
                                <label>COMPARE AND TAKE THE BEST FROM OFFERS</label>

                                <a href="#">START</a>

                            </label>
                            <img src="Content/Images/why_rent_img.svg"/>
                            
                        </div>

                    </div>


                </div>
            </Layout>
      </LoadingOverlay>
    );
  }
}
