var MedCol  = React.createClass({
  render:function(){
      return (
            <div className="medium-3 columns">
                {this.props.desc}
                <br/><span>{this.props.value}</span>
            </div>
        );
    }  
})
var BookingRow  = React.createClass({
  render:function(){
      return (
            <div className="row service">
                <div className="small-6 columns">
                   <p className="text-left" dangerouslySetInnerHTML={{__html:this.props.desc}}></p>
                </div>
                <div className="small-6 columns">
                   <p className="text-right" dangerouslySetInnerHTML={{__html: this.props.value}}></p>
                </div>
            </div>   
        );
    }  
})
var ReservationServiceSection  = React.createClass({
    render: function() {
        return (
            <div>
                <div className="large-2 columns left-side show-for-large-up text-center" data-equalizer-watch>
                    <Heading6 value="Your<br />Selection" />
                </div>
                <div className="medium-10 columns right-side text-center" data-equalizer-watch>
                    <div className="row">
                        <MedCol desc="Destination" value={this.props.data.property_name.toUpperCase()} />
                        <MedCol desc="Check-In Date" value={this.props.checkIn} />
                        <MedCol desc="Check-Out Date" value={this.props.checkOut} />
                        <MedCol desc="Length Of Stay" value={this.props.data.night_total+" Nights"} />
                    </div>
                </div>
            </div>
        );
    }
});
var CheckoutStep2ServiceLevels = React.createClass({
    reactServiceLevelToSubmit: function(level){
        serviceLevelToSubmit(level)
    },
    render: function(){
        return <div className="row">
                    <div className="columns">
                        <ul className="tabs" data-tab>
                            <li className="tab-title active" style={{width:'100%'}}>
                                <a href={"#service-level-"+this.props.data.level} onClick={this.reactServiceLevelToSubmit(this.props.data.level)}>
                                {[...Array(this.props.data.level)].map((x, i) =>
                                    <i className="fa fa-star hide-for-small" key={i + 1}></i>
                                )}
                                {this.props.data.name}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
    }
});
var CheckoutStep2 = React.createClass({
    reactSubmitServiceLevelForm: function(){
        submitServiceLevelForm();
    },
    render: function(){
        var property = this.props.property;
        var nightRate = this.props.serviceInfo.night;
        var newNightRate = nightRate - (nightRate*10/100);
        return (
                <div className="row">
                    <div className="columns">
                         <div className="services">
                            {this.props.siteid==2 && this.props.serviceInfo.services.map(function(service,i){
                               return <BookingRow key={i} desc={service.desc_long.toUpperCase()} value={(property.dest_currency+''+numberWithCommas((service.rate).toFixed()))}/> 
                            })}
                            <BookingRow desc="LENGTH OF STAY" value={property.night_total+' Nights'}/> 
                            <BookingRow desc={("10% off your rate for online booking").toUpperCase()} value={'-'+property.dest_currency+''+numberWithCommas((this.props.serviceInfo.night*10/100).toFixed())}/> 
                         </div>
                         <div className="options">
                            <form method="post" id={"serviceLevel"+this.props.selectedServiceLevel+"Form"}  action="./checkout" onsubmit="return false;">
                               <input type="hidden" name="action" value="checkout"/>
                                <input type="hidden" name="backToStep1" className="backToStep1" value="" />
				<input type="hidden" name="propertyId" value={property.property_id} />
				<input type="hidden" name="propertyName" value={property.property_name} />
				<input type="hidden" name="destName" value={property.dest_name} />
				<input type="hidden" name="checkInDt" value={property.check_in_dt} />
				<input type="hidden" name="checkOutDt" value={property.check_out_dt} />
				<input type="hidden" name="nightTotal" value={property.night_total} />
				<input type="hidden" name="serviceLevel" value={this.props.serviceInfo.level} />
				<input type="hidden" name="destCurrency" value={property.dest_currency} />
				<input type="hidden" name="destTax" value={property.dest_tax} />
				<input type="hidden" name="cleaning" value={property.cleaning} />
				<input type="hidden" name="additionalPerStay" value={property.additional_per_stay} />
				<input type="hidden" name="rateNight" value={newNightRate} />
                               <div className="row total">
                               <br />
                                  <div className="columns">
                                    <p className="text-right" dangerouslySetInnerHTML={{__html: ('Nightly Rate: ' +property.dest_currency+''+numberWithCommas((newNightRate).toFixed()))}}></p>
                                    <p className="text-right">
                                        <br />
                                        <button className="book-btn tiny radius" onClick={this.reactSubmitServiceLevelForm}>BOOK NOW</button>
                                    </p>
                                  </div>
                               </div>
                            </form>
                         </div>      
                    </div>
                 </div>
        );
    }
});

var IfUserGroupId = React.createClass({
    render: function(){
        if (this.props.userGroupID==1 || this.props.userGroupID==2) {
            return (<div className="row">
                    <div className="columns">
                        <label for="email" className="left inline">
                            <input type="checkbox" name="emailConfirmation" id="emailConfirmation" value="1" /> 
                            Send confirmation to this email
                        </label>
                    </div>
                </div>
            );
        }
        else {
            return false;
        }
    }
});

var IfUserGroupIdForm = React.createClass({
    render: function(){
        if (this.props.userGroupID==1 || this.props.userGroupID==2) {
            return (<form method="post">
                        <input type="text" name="discount" id="discount" placeholder={this.props.discount} />
                </form>
            );
        }
        else {
            return false;
        }
    }
});

var ContactRow = React.createClass({
    render: function(){
        if(this.props.type=='input'){
            var input = <input type="text" name={this.props.name} id={this.props.id} className={this.props.required=="true"?"required":''} placeholder="" />;
        }else{
            var input="";
        }
        var class1 = this.props.classes==48?4:6;
        var class2 = this.props.classes==48?8:12;

        return  (<div className="row">
                    <div className={"medium-"+class1+" small-"+class1+" columns"}>
                        <label for="phone" className="left inline">{this.props.labelText}</label>
                    </div>
                    <div className={"medium-"+class2+" small-"+class2+" columns"}>
                        {input}
                    </div>
                </div>
        );
    }
});

var PropertyDescriptionLayout = React.createClass({
    render: function(){
        return  (
            <div className="row">
                <div className="small-4 columns">
                    <Paragraph className="text-left" value={this.props.labelText} />
                </div>
                <div className="small-8 columns">
                    <Paragraph className="text-right" value={this.props.value} />
                </div>
            </div>
        );
    }
});

var PropertyDescription = React.createClass({
    render: function(){
var additionalPerStay = this.props.data.additionalPerStay!=undefined ? <PropertyDescriptionLayout labelText="ADDITIONAL PER STAY:" value={this.props.data.additionalPerStay} />:'';
        return  (
            <div id="rate-details">
                <div className="row text-center">
                    <div className="small-12 columns services">
                        <PropertyDescriptionLayout labelText="DESTINATION:" value={this.props.data.destination.toUpperCase()} />
                        <PropertyDescriptionLayout labelText="ARRIVAL:" value={this.props.data.arrival} />
                        <PropertyDescriptionLayout labelText="DEPARTURE:" value={this.props.data.departure} />
                        <PropertyDescriptionLayout labelText="LENGTH OF STAY:" value={this.props.data.lengthOfStay} />
                        <PropertyDescriptionLayout labelText="NIGHTLY RATE:" value={this.props.data.perNight} />
                        <PropertyDescriptionLayout labelText="CLEANING:" value={this.props.data.cleaning} />
                        {additionalPerStay }
                        <PropertyDescriptionLayout labelText={"DESTINATION TAX ("+this.props.data.destinationTaxRate+"%):"} value={this.props.data.destinationTax} />


                        <div className="row total">
                            <div className="small-3 columns">
                                <IfUserGroupIdForm userGroupID={this.props.data.userGroupId} discount={this.props.data.discount}/>
                            </div>
                            <div className="small-9 columns">
                                <p className="text-right"dangerouslySetInnerHTML={{__html:'TOTAL: '+this.props.data.netTotal}}></p>
                                <p className="text-right" dangerouslySetInnerHTML={{__html:'Security Deposit: '+this.props.data.securityDeposit}}></p>
                                <p className="text-right" dangerouslySetInnerHTML={{__html:'Grand Total: '+this.props.data.grandTotal}}></p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        );
    }
});

var CheckoutContact = React.createClass({
    render:function(){
        return <div>
                    <div className="row">
                        <div className="small-12 columns title">
                            <Heading6 value="CONTACT" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <div className="row">
                                <div className="medium-6 small-12 columns">
                                    <div className="row">
                                        <div className="medium-4 small-4 columns">
                                            <label for="title" className="left inline">Title</label>
                                        </div>
                                        <div className="medium-8 small-8 columns">
                                            <select name="title" id="title">
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                                <option value="Ms.">Ms.</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ContactRow classes='48' labelText="First Name" type="input" required="true" name="firstName" id="firstName" />
                                    <ContactRow classes='48' labelText="Last Name" type="input" required="true" name="lastName" id="lastName" />
                                    <ContactRow classes='48' labelText="Company" type="input" required="" name="company" id="company" />
                                    <ContactRow classes='48' labelText="Email" type="input" required="true" name="email" id="email" />
                                    <IfUserGroupId userGroupID={this.props.data.userGroupId} />
                                    <ContactRow classes='48' labelText="Phone" type="input" required="true" name="phone" id="phone" />
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    }
});
var CheckoutPayment = React.createClass({
    render: function(){
        var unescapeHTML= function(data){
            return {__html:data}
        };
        return <div>
                <div className="row">
                        <div className="small-12 columns title">
                            <Heading6 value="PAYMENT"></Heading6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <p>Your credit card information is only to confirm the reservation; your card will <strong>not</strong> be charged until your booking has been confirmed in writing.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="medium-6 small-12 columns">
                            <div className="row">
                                <div className="medium-4 small-4 columns">
                                    <label for="" className="left inline">Credit card type</label>
                                </div>
                                <div className="medium-8 small-8 columns" dangerouslySetInnerHTML={unescapeHTML(this.props.data.createCreditCardDropDown)} >
                                </div>
                            </div>
                           
                            <ContactRow classes='48' labelText="Name on card"       type="input" required="" name="ccName"  id="ccName" />
                            <ContactRow classes='48' labelText="Credit card number" type="input" required="" name="ccNumber" id="ccNumber" />

                            <div className="row">
                                <div className="medium-4 small-4 columns">
                                    <label for="" className="left inline">Expiration</label>
                                </div>
                                <div className="medium-4 small-4 columns" dangerouslySetInnerHTML={unescapeHTML(this.props.data.createMonthDropDown)} >
                                </div>
                                <div className="medium-4 small-4 columns" dangerouslySetInnerHTML={unescapeHTML(this.props.data.createYearDropDown)} >
                                </div>
                            </div>
                            <ContactRow classes='48' labelText="CVV code" type="input" required="" name="ccCVV" id="ccCVV" />
                        </div>
                        <div className="medium-6 small-12 columns">
                            
                            <ContactRow classes='48' labelText="Street"     type="input" required="" name="ccStreet1" id="ccStreet1" />
                            <ContactRow classes='48' labelText="Street 2"   type="input" required="" name="ccStreet2" id="ccStreet2" />
                            <ContactRow classes='48' labelText="City"   type="input" required="" name="ccCity" id="ccCity" />
                            <div className="row">
                                <div className="medium-4 small-4 columns">
                                    <label for="" className="left inline">State / Zip Code</label>
                                </div>
                                <div className="medium-4 small-4 columns">
                                    <input type="text" name="ccStateOther" id="ccStateOther" placeholder="" />
                                    <span dangerouslySetInnerHTML={unescapeHTML(this.props.data.createStateDropDown)}></span>
                                </div>
                                <div className="medium-4 small-4 columns">
                                    <input type="text" name="ccZipCode" id="ccZipCode" placeholder="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="medium-4 small-4 columns">
                                    <label for="" className="left inline">Country</label>
                                </div>
                                <div className="medium-8 small-8 columns">
                                    <span dangerouslySetInnerHTML={unescapeHTML(this.props.data.createCountryDropDown)}></span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    }
});

var CheckoutTerms = React.createClass({
    render: function(){
        var unescapeHTML= function(data){
            return {__html:data}
        };
        return <div>
                    <div className="row">
                        <div className="small-12 columns title">
                            <Heading6 value="TERMS & CONDITIONS"></Heading6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 columns">
                            <label id="termsAndContidionsLabel" for="termsAndContidions">
                                <input id="termsAndContidions" type="checkbox" className="required" /> 
                                &nbsp;I agree to the following General Terms & Conditions
                            </label>
                        </div>
                    </div>
                    <Terms />
        </div>
    }
})
var CheckoutStep3 = React.createClass({
    /*onHoldClick: function(){
        query('checkoutForm', 'holdBtn', 'reservationHold');
    },*/
    onBookNowClick: function(){
        query('checkoutForm', 'checkoutBtn', 'reservationBook');
    },
    render: function(){
        var self = this;
        var unescapeHTML= function(data){
            return {__html:data}
        };
        return <div className="row">
            <div className="small-12 columns checkout-form">
                <form id="checkoutForm" onsubmit="return false;">
                    <CheckoutContact data={this.props.data}/>
                    <CheckoutPayment data={this.props.data}/>
                    <div className="row">
                        <div className="small-12 columns title">
                            <Heading6 value="RESERVATION SUMMARY"></Heading6>
                        </div>
                    </div>
                    <section id="reservations-services-section"></section>
                    <CheckoutTerms />
                    <div className="row">
                        <div className="small-12 columns buttons">
                            <div className="row">
                                <div className="columns">
                                    <div className="feedback"></div>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="medium-6 columns">
                                    {/*<button type="button" className="button details-button submit tiny radius" id="holdBtn" onClick={self.onHoldClick}>
                                        <span className="react-nowrap">HOLD (24 HOURS)</span>
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    </button>*/}
                                </div>
                                <div className="medium-6 columns">
                                    <button type="button" className="button book-btn radius submit tiny" id="checkoutBtn" onClick={self.onBookNowClick}>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BOOK NOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
});


var Terms = React.createClass({
    render:function(){
        return (
            <div class="row">
                <div class="small-12 columns" id="terms">
                    <p><strong>KEY TERMS.</strong>&nbsp; &ldquo;The Company&rdquo; means GreatVillaDeals</p>
                    <p><strong>RATES.</strong>&nbsp;Any taxes (sales, occupancy, etc.) that may be required to be paid to governmental authorities are not included in the Rate, but such taxes shall be included in the Invoice to the Guest.&nbsp;<br />
                    A charge of $500 per day will apply for each day the maximum number of persons on the Property is exceeded, in addition to the possible loss of the security deposit as specified below.</p>
                    <p><strong>PRE-PAYMENT</strong>. For reservations made 70 days or more prior to arrival, 25% of rent is due upon signing this Reservation Form. The remaining balance of 75% must be paid at least 70 days prior to arrival. For reservations made within 70 days of arrival, full payment is required upon signing of this Registration Form. If payment is not received within 48 hours after signature, The Company is under no obligation to guarantee the reservation.</p>
                    <p><strong>CANCELLATIONS AND REFUNDS.</strong>&nbsp;Cancellation of a booking may result in the partial or complete loss of any pre-payments made, as specified below. All cancellations must be in writing. Cancellation charges are as follows:<br />
                    70 days or more prior to arrival No Penalty<br />
                    45-70 days prior to arrival 50% of Pre-Payment<br />
                    45 days or less prior to arrival 100% of Pre-Payment<br />
                    In case of severe natural causes (force majeure) prohibiting travel or adequate use of the Property during the booking period (such as hurricanes, flooding, earthquakes etc.), the booking may be canceled without penalty.</p>
                    <p><strong>AMENDMENTS TO BOOKINGS.</strong>&nbsp;If any changes are made to the booking within 14 days of the originally scheduled arrival date, The Company reserves the right to deem the changes as a cancellation and re-booking, in which event certain penalties may apply as provided herein. All requests for changes or amendments must be in writing.<br />
                    Should the selected Property not be available because of reasons outside of The Company&rsquo;s control, The Company reserves the right to relocate the Guest to a Property of equal or better quality (in The Company&rsquo;s sole determination) in the same destination.&nbsp; The Guest agrees to the right of The Company to relocate the Guest in such event.</p>
                    <p><strong>CREDIT CARDS AND AUTHORIZATION.</strong>&nbsp;Personal checks are not accepted for payment. Signature of the Credit Card Authorization and/or the Guest Registration Form shall constitute confirmation that the Guest has received, read, understood and agreed to all of the Terms and Conditions contained herein. Moreover, verbal authorization from the Guest (or from his/her agent) to use a credit card for the deposit and/or final payment shall constitute ratification of the Terms and Conditions stated herein.</p>
                    <p><strong>USE OF PROPERTY.</strong>&nbsp;The Guest and his/her licensees, invitees, family, vendors, employees or others (the &ldquo;Occupants&rdquo;) shall use the Property for residential vacation purposes only, and shall have exclusive use of the Property during their reservation period. In no event shall the Property be utilized, in whole or in part, by the Occupants for any commercial purposes. In the event of such improper use, The Company shall have the right to refuse access to the Property by the Occupants, or to immediately terminate the use of the Property by the Occupants, with no return of any deposit, prepayment or full payment.&nbsp; Moreover, the Occupants may not make any alterations to the Property whatsoever. The Guest may not authorize any other persons to utilize the Property in the Guest&rsquo;s absence; nor may the Guest assign or sublease the Property, in whole or in part.&nbsp; All Occupants who stay on the Property overnight must be properly registered with The Company, in writing.<br />
                    The Occupants shall use the Property only in a dignified and quiet manner that is respectful of the Property&rsquo;s neighbors and the neighborhood. Local laws prohibit private or public nuisances; noise violations; parking on the street; parking on the right of way; parking on (or blocking) adjacent private properties; parties that create disturbances of the peace, or any other acts that may be deemed improper or illegal by local regulatory authorities.&nbsp; Guests having any question as to whether certain conduct is violative of local, county, or state laws, rules, regulations or ordinances should consult The Company. Any violation of this paragraph shall be grounds for immediate termination of the stay, and may also constitute a violation of the statutes, ordinances or regulations of the local authorities, which may subject the Guest and/or the Occupants&nbsp; to civil, criminal or administrative fines, penalties or other sanctions. The Guest shall fully indemnify the Owner and The Company (and its officers, directors, managers, owners, employees and agents) in all respects as to any and all costs,&nbsp; expenses, fines or judgments sustained or incurred in any regard as a result of any breach hereof by the Guest or the Occupants.</p>
                    <p><strong>MAINTENANCE.</strong>&nbsp;The Company shall provide any routine maintenance and repair to the Property. For all maintenance and repair to the Property that is not covered by a management contract with the Owner, The Company will invoice the Guest for repairs and maintenance according to the The Company&rsquo;s current The Company Living price list. The Guest shall promptly notify The Company of any maintenance or repair requirements, or any defects.</p>
                    <p><strong>KEYS AND REMOTE CONTROLS</strong>. The Company shall furnish to the Guest 2 sets of keys to the Property, including garage door openers if applicable. Upon departure, all keys and garage door openers shall be forthwith returned to The Company.&nbsp; Failure to return such property at the time of departure will result in a charge of $200 to the Guest for each key/garage door opener that is not so returned.</p>
                    <p><strong>ACCESS TO PREMISES.&nbsp;</strong>The Company and Owner shall have the absolute right to enter the Property at any time for the protection, preservation, maintenance or safety of the Property or the Guest, or for emergency repairs.&nbsp; Owner/The Company shall also have the right to terminate the stay and to immediately discontinue any hospitality services and utilities to the Property in the event of a violation by the Guest or the Occupants of any material prohibitions or covenants.</p>
                    <p><strong>LIABILITY OF OWNER / THE COMPANY.&nbsp;</strong>The Company will use its best efforts to ensure that the Guest&rsquo;s stay is trouble free during the term of the reservation period. The Guest shall hold The Company and the Owner of the Property harmless as to any and all responsibility or liabilities for any claims, losses, damages, expenses arising from (a) personal injury, accidents or death, or (b) loss, damage or delay of baggage or other property, or (c) delays, inconveniences, loss of enjoyment, upset, disappointment, distress or frustration, whether physical or mental while on the premises of the Property or during the term of the reservation period. Owner and The Company shall not be held liable for any loss by reason of damage, theft or otherwise to the contents, belongings and personal effects of the Guest or the Occupants. Written notice of any claims asserted against The Company or Owner must be received by The Company or the Owner within two weeks (14 days) after the conclusion of the actual reservation period.&nbsp; The Guest shall be responsible for the payment of all sales, use, resort and similar taxes associated with the use of the Property during the reservation period, and the Guest shall hold The Company and the Owner of the Property harmless as to liability for the payment of such taxes. The Owner/The Company reserve the right to decline any request for bookings at any time and may, within their sole discretion, terminate any stay as a result of unreasonable behavior by the Guest or the Occupants.</p>
                    <p><strong>LIABILITY OF GUEST.</strong>&nbsp;The Guest assumes all liability for any loss, damage or injury of any nature to the Guest or the Occupants resulting or arising from or connected with the occupancy and use of the premises and the Property. The Guest will be liable for the repair or replacement costs caused by the willful damage, negligence, or the removal of any property by the Guest or the Occupants. The Guest agrees to be responsible for the actions or inactions of the Occupants on the Property during the reservation period, or any holdover of the reservation period. The Guest shall not be responsible for damage to the Property caused by events outside of the Guest&rsquo;s or Occupants&rsquo; control, such as weather-related damage.</p>
                    <p><strong>SUPPLIERS AND LIABILITY.</strong>&nbsp;Although The Company uses its best efforts to select the most reputable third party suppliers of products and services, it is not, and shall not be, responsible for their acts or omissions, nor does it guarantee the availability or security of suppliers&rsquo; facilities and services. Services of third party suppliers shall be deemed to be a contract between the Guest and the suppliers, and suppliers&rsquo; terms and conditions apply. The Guest agrees that it will hold The Company and the Owner of the Property harmless as to any and all losses sustained or incurred by the Guest or the Occupants due to the acts or omissions of independent suppliers of services.&nbsp;</p>
                    <p><strong>SECURITY/DAMAGE DEPOSIT.</strong>&nbsp;For VillaHotel reservations, the Security/Damage Deposit will be taken as a &ldquo;hold&rdquo; (i.e. not an actual charge that appears on the Guest&rsquo;s credit card statement) on a credit card provided to The Company by the Guest. For &ldquo;V&rdquo; Villa reservations, or if there is any problem taking a &ldquo;hold&rdquo; on the Guest&rsquo;s credit card, the Security/Damage Deposit&nbsp;&nbsp; has to be wired to The Company&rsquo;s escrow account prior to arrival, and returned to the Guest within 30 days after departure, provided that the Property and all furniture, fixtures, appliances and equipment are left in the same, good working condition at the time of departure and relinquishment of the Property as existed at the time of the commencement of the booking.&nbsp;<br />
                    The Security/Damage Deposit is due and payable at least 14 days prior to the Guest&rsquo;s arrival at the Property.&nbsp; The Guest shall be fully responsible for any breakages or missing items in the Property during the Term of the Lease, and will be charged for the cost of any necessary repairs or replacements.&nbsp; If the Property is abused by the Occupants during the term of this Agreement, then the Guest shall be charged supplementally for reasonable and necessary repairs, maintenance or housekeeping. Parties, &ldquo;public&rdquo; gatherings or large events on the Property, consisting of more than the maximum number of Occupants allowed (as stated in the reservation form) are strictly forbidden.&nbsp; The Property is located in a residential neighborhood, and may not be used as a locale for public events, commercial promotions of products or services, or other large gatherings.&nbsp; In the event that the Guest knowingly or unknowingly violates this prohibition, or other material prohibitions contained in these Conditions, considerable damage to the Property may be sustained.&nbsp; Because the amount of the damages may be difficult to ascertain (given the custom nature of the furniture, fixtures and equipment), and because The Company desires to provide a strong disincentive to any violation of this or other material prohibitions herein, the Security Damage shall be retained by the The Company or Owner, in its entirety, as liquidated damages in the event of such a breach.</p>
                    <p><strong>GOVERNING LAW.</strong>&nbsp;This Agreement is governed by the laws of the jurisdiction in which the Property is located. In the event a dispute arises between the parties under this agreement, the prevailing party shall be entitled to recover all costs and reasonable attorney&rsquo;s fees from the non-prevailing party.<br />
                    Guest confirms that he has a fully useable primary residence elsewhere and will refrain from making the Property his primary residence.&nbsp; Furthermore, in the event that these Terms and Conditions fail to address certain areas of potential contention between the Guest, The Company and/or the Owner, the Guest agrees that the laws governing lodging establishments and similar hotel operations shall govern the legal relationships between the parties hereto, even though the Property is not a hotel property nor a public lodging establishment.</p>
                    <p>The Guest confirms that he has carefully read these Terms and Conditions; has consulted with competent local counsel as to the interpretation of its provisions; and shall be responsible for the acts, or failures to act, of himself/herself and the Occupants coming onto the Property during the stay.</p>     
                </div>
            </div>            		                    

        );
    }
})
