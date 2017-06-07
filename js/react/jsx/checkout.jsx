var MedCol  = React.createClass({
  render:function(){
      return (
            <div className="medium-3 columns">
                {this.props.desc}
                <br/><span>{this.props.value}</span>
            </div>
        );
    }  
});
var BookingRow  = React.createClass({
  render:function(){
      return ( 
                <div className="row service">
                    <div className={"small-"+(this.props.siteid=="1"?'10':6)+" columns"}>
                       <p className="text-left" dangerouslySetInnerHTML={{__html:this.props.desc}}></p>
                    </div>
                    <div className={"small-"+(this.props.siteid=="1"?'2':6)+" columns"}>
                       <p className="text-right" dangerouslySetInnerHTML={{__html: this.props.value}}></p>
                    </div>
                </div>   
        );
    }  
});

var VillazzoBookingRow  = React.createClass({
     componentDidMount: function(){
        $('.additional-accordian').on('click',function(){
            /* if($('.additional-accordian img').attr('class') == "minus"){
                 $('.additional-accordian img').attr('src', '../img/plus-icon.png'); 
                 $('.additional-accordian img').attr('class', 'plus'); 
             }else{
                 $('.additional-accordian img').attr('src', '../img/minus-icon.png'); 
                 $('.additional-accordian img').attr('class', 'minus');                 
             } */
            $('#additional-accordian-content').toggle();
        });
    },
    render:function(){
        var propValue = this.props.value+" / NIGHT";
      return ( 
        <div>
            <div className="row service">
                <div className={"small-"+(this.props.siteid=="1"?'10':6)+" columns"}>
                   <p className="text-left" dangerouslySetInnerHTML={{__html:this.props.desc}}></p>
                </div>
                <div className={"small-"+(this.props.siteid=="1"?'2':6)+" columns"}>
                   <p className="text-right" dangerouslySetInnerHTML={{__html:propValue}}></p>
                </div>
            </div>
            <div className="services">
                <div className="row service additional_service">
                    <div className="small-10 columns">
                        <h4 className="text-left ">
                            <a href="javascript:void(0);">
                                <span className="additional-accordian"><Image1 src="../img/plus-icon.png"  classes="plus"/> {/* <Image1 src="../img/minus-icon.png"  classes="minus"/> */}</span> 
                                Additonal Services
                            </a>
                        </h4>
                    </div>
                    <div className={"small-"+(this.props.siteid=="1"?'2':6)+" columns"}>
                        <p className="text-right" id="additional-service-cost"></p>
                    </div>
                </div>
            </div>   
        </div>
        );
    }  
})


var ReservationServiceSection  = React.createClass({
    componentDidMount: function(){
        $(".prop-min-booking").on('click',function(){
            $("#propertyAvailabilityModal").foundation('reveal', 'open');
        });
    },
    render: function() {
        var getFormattedDate = function(dt){
            var numberOfDaysToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if(dt!= Object)
                var dt = moment(dt,'MM/DD/YYYY');
            else
                var dt = moment();
            if(numberOfDaysToAdd != 0){
                dt.add(numberOfDaysToAdd,'day');
            }
            return dt.format('MM/DD/YYYY');
            
        };
        var siteId = this.props.siteid;

         var checkInDt = moment(this.props.data.check_in_dt,'YYYY-MM-DD').format('MM/DD/YYYY');
         var checkOutDt = moment(this.props.data.check_out_dt,'YYYY-MM-DD').format('MM/DD/YYYY'); 
        // var checkInDt = this.props.data.check_in_dt;
        // var checkOutDt = this.props.data.check_out_dt;
        var dateDetail = { 
            checkInDt: checkInDt,
            checkOutDt: checkOutDt,
            propertyName: this.props.data.property_name,
            propertyId: this.props.data.property_id,
            minBookDays: this.props.data.min_book_days
        }; 
        return (
            <div>
                <PropertySummaryDatePopupForm data={dateDetail} />
                <div className="large-2 columns left-side show-for-large-up text-center" data-equalizer-watch>
                    <Heading6 value="Your<br />Selection" />
                </div>
                <div className="medium-10 columns right-side text-center edit-parent" data-equalizer-watch>
                    <div className="row">
                        {siteId=="1" &&
                            <div>
                                <div className="medium-3 columns">
                                    Destination
                                    <br/><span>
                                        <Anchor href={"/"+this.props.data.dest_name+"-rental-villas/villa-"+this.props.data.property_name.toLowerCase().replace(' ','-')+(this.props.checkIn && this.props.checkOut?'?check_in='+getFormattedDate(this.props.checkIn)+'&check_out='+getFormattedDate(this.props.checkOut):'')} classes="black-anchor" value={this.props.data.property_name.toUpperCase()} />
                                    </span>
                                </div> 
                                <div className="medium-6 columns nopadding">
                                    <div className="medium-5 columns border-left"> Check-In Date
                                    <br/><span>{this.props.checkIn}</span></div>
                                    <div className="medium-2 columns"> 
                                        <div className="icon">
                                            <i className="fa fa-calendar prop-min-booking" aria-hidden="true" data-propertyname={this.props.data.property_name} data-propertyid={this.props.data.property_id} data-minbookdays={this.props.data.min_book_days}></i>
                                        </div>
                                    </div>
                                   <div className="medium-5 columns border-right">Check-Out Date<br/><span>{this.props.checkOut}</span></div>
                                </div>
                                <div className="medium-3 columns">
                                    Length Of Stay
                                    <br/><span>{this.props.data.night_total+" Nights"}</span>
                                </div>
                            </div>
                        }
                        {siteId=="2" &&
                            <span>
                                <MedCol desc="Destination" value={this.props.data.property_name.toUpperCase()} />   
                                <MedCol desc="Check-In Date" value={this.props.checkIn} />
                                <MedCol desc="Check-Out Date" value={this.props.checkOut} />
                                <MedCol desc="Length Of Stay" value={this.props.data.night_total+" Nights"} />
                            </span>
                        }
                    </div>
                </div>
                {siteId=="1" &&
                    <div>
                        <img src={this.props.data.property_checkout_img} />
                        <div className="checkout-stwo-image">
                            <span>Your Trip</span>
                        </div>
                    </div>
                }
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

var CheckoutStep2AdditionalServiceLevels = React.createClass({
    componentDidMount: function(){
        $('.checkoutAdditionalService').on('change',function(){applyServices()});
        $('.reactMinus').on('click',function(){
            var d = $(this).parents('.reactPriceWrapper').find('.checkoutAdditionalService');
            var maxValue = Number(d.attr('max'));
            var minValue = Number(d.attr('min'));
            var boxValue = Number(d.val());
            if(isNaN(boxValue)){
                boxValue = minValue;
            }
            boxValue--;
            if(boxValue < minValue){  
                boxValue = minValue;
            }
            $(this).parents('.reactPriceWrapper').find('.checkoutAdditionalService').val(boxValue);
            applyServices();
        });
        $('.reactPlus').on('click',function(){
            var d = $(this).parents('.reactPriceWrapper').find('.checkoutAdditionalService');
            var maxValue = Number(d.attr('max'));
            var minValue = Number(d.attr('min'));
            var boxValue = Number(d.val());
            
            if(isNaN(boxValue) || boxValue < minValue){
                boxValue = minValue;
            }
            boxValue++;
            
            if(boxValue>maxValue){  
                boxValue = maxValue;
            }
            $(this).parents('.reactPriceWrapper').find('.checkoutAdditionalService').val(boxValue);
            applyServices();
        });
    },
    render: function(){
        return <div id="additional-accordian-content"> {this.props.data.map(function(srv,i){
                return <div key={i} className="row option">
                    <div className="columns">
                        <div className="row collapse">
                            <div className="medium-12 columns">
                                <div className="row">
                                    <label>
                                        {/* <div className="small-3 medium-1 columns" style={{marginRight:'10px'}}>
                                            <input type="number" className="checkoutAdditionalService" name={srv.name} id={srv.name} placeholder={srv.placeholder} value={srv.value} 
                                style={{marginTop:'-10px'}} min={srv.min} max={srv.max} onChange={this.reactApplyServices} />
                                            <input type="hidden" name={srv.name+"Desc"} id={srv.desc+"Desc"} value={srv.desc} />
                                            <input type="hidden" name={srv.name+"Rate"} id={srv.name+"Rate"} value={srv.rate} />
                                        </div> */}

                                        <div className="small-3 medium-1 columns reactPriceWrapper" style={{marginRight:'10px'}}>
                                            <span className="plusmin" min={srv.min} max={srv.max} >
                                                <i className="fa fa-minus reactMinus" aria-hidden="true"></i>
                                                <span className="minus">
                                                    <i className="fa fa-plus reactPlus" aria-hidden="true"></i>
                                                </span>
                                            </span>
                                            <span className="countinput">
                                                <input type="number" className="checkoutAdditionalService" name={srv.name} id={srv.name} placeholder={srv.placeholder} value={srv.value} min={srv.min} max={srv.max} onChange={this.reactApplyServices} />
                                                <input type="hidden" name={srv.name+"Desc"} id={srv.desc+"Desc"} value={srv.desc} />
                                                <input type="hidden" name={srv.name+"Rate"} id={srv.name+"Rate"} value={srv.rate} />
                                            </span>
                                        </div>



                                        <div className="small-6 medium-1 columns">{srv.frequency}</div>
                                        <div className="small-12 medium-9 columns">
                                            <span className="checkout-image-margin">
                                                <Image1 src={srv.serviceImage} />
                                            </span>
                                            {srv.desc}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                })}</div>
}});


var CheckoutStep2AdditionalMoreServiceLevels = React.createClass({
    componentDidMount: function(){
        $('.checkoutAdditionalService').on('change',function(){applyServices()});

        $('.more-additional-accordian').on('click',function(){
            /* if($('.more-additional-accordian a span').attr('class') == "down"){
                $('.more-additional-accordian a span i').removeClass('fa-caret-down');
                $('.more-additional-accordian a span i').addClass('fa-caret-up'); 
                $('.more-additional-accordian a span').attr('class', 'up'); 
            }else{
                $('.more-additional-accordian a span i').removeClass('fa-caret-up');
                $('.more-additional-accordian a span i').addClass('fa-caret-down'); 
                $('.more-additional-accordian a span').attr('class', 'down'); 
            } */
            $('#more-additional-accordian-content').toggle();
        });
    },
    render: function(){
        return <span>
                <div className="services">
                    <div className="row service additional_service">
                        <div className="small-12 columns">
                            <h4 className="text-left more-additional-accordian">
                                <a href="javascript:void(0);"><span className="down"><i className="fa fa-caret-down" aria-hidden="true"></i></span> 
                                    Even More Services
                                </a>
                            </h4>
                        </div>
                    </div>
                </div>
                <div id="more-additional-accordian-content"> {this.props.data.map(function(srv,i){
                    return <div key={i} className="row option">
                        <div className="columns">
                            <div className="row collapse">
                                <div className="medium-12 columns">
                                    <div className="row">
                                        <label>
                                            {/* <div className="small-3 medium-1 columns22" style={{marginRight:'10px'}}>
                                                <input type="number" className="checkoutAdditionalService" name={srv.name} id={srv.name} placeholder={srv.placeholder} value={srv.value} 
    style={{marginTop:'-10px'}} min={srv.min} max={srv.max} onChange={this.reactApplyServices} />
                                                <input type="hidden" name={srv.name+"Desc"} id={srv.desc+"Desc"} value={srv.desc} />
                                                <input type="hidden" name={srv.name+"Rate"} id={srv.name+"Rate"} value={srv.rate} />
                                            </div> */}

                                            <div className="small-3 medium-1 columns reactPriceWrapper" style={{marginRight:'10px'}}>
                                                <span className="plusmin" min={srv.min} max={srv.max} >
                                                    <i className="fa fa-minus reactMinus" aria-hidden="true"></i>
                                                    <span className="minus">
                                                        <i className="fa fa-plus reactPlus" aria-hidden="true"></i>
                                                    </span>
                                                </span>
                                                <span className="countinput">
                                                    <input type="number" className="checkoutAdditionalService" name={srv.name} id={srv.name} placeholder={srv.placeholder} value={srv.value} min={srv.min} max={srv.max} onChange={this.reactApplyServices} />
                                                    <input type="hidden" name={srv.name+"Desc"} id={srv.desc+"Desc"} value={srv.desc} />
                                                    <input type="hidden" name={srv.name+"Rate"} id={srv.name+"Rate"} value={srv.rate} />
                                                </span>
                                            </div>


                                            <div className="small-6 medium-1 columns">{srv.frequency}</div>
                                            <div className="small-12 medium-9 columns">
                                                <span className="checkout-image-margin">
                                                    <Image1 src={srv.serviceImage} />
                                                </span>
                                                {srv.desc}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    })}
                </div>
        </span>
}});


CheckoutStep2ServiceContent = React.createClass({
    reactSubmitServiceLevelForm: function(){
        submitServiceLevelForm();
    },
    render:function(){
        var property = this.props.property;
        var nightRate = this.props.serviceInfo.night;
        var siteId = this.props.siteid;
        var newNightRate = nightRate;
        if(property.is_10p_discount ==1 && siteId =="2"){
            newNightRate = (nightRate - (nightRate*10/100));
        }
        var rateNightBase = nightRate/(1+this.props.serviceInfo.management/100);
        var thead = siteId=="1"?<span>As {this.props.serviceInfo.level} Star VillaHotel<br /></span>:"";
        // property.is_10p_discount
        return (
            <div>
                <div className="services">
                    {siteId==2 && this.props.serviceInfo.services.map(function(service,i){
                       return <BookingRow key={i} siteid={siteId} desc={service.desc_long.toUpperCase()} value={(property.dest_currency+''+numberWithCommas((service.rate).toFixed()))}/> 
                    })}

                    {siteId==1 && this.props.serviceInfo.services.map(function(service,i){
                       return <VillazzoBookingRow key={i} siteid={siteId} desc={service.desc_long.toUpperCase()} value={(property.dest_currency+''+numberWithCommas((service.rate).toFixed()))}/> 
                    })}
                    {this.props.siteid=="2" &&
                        <BookingRow desc="LENGTH OF STAY" value={property.night_total+' Nights'}/>  }
                    {this.props.siteid=="2" && property.is_10p_discount == 1 &&
                        <BookingRow desc={("10% off your rate for online booking").toUpperCase()} value={'-'+property.dest_currency+''+numberWithCommas((this.props.serviceInfo.night*10/100).toFixed())}/> 
                    }
                 </div>
                 <div className="options">
                    <form method="post" id={"serviceLevel"+this.props.selectedServiceLevel+"Form"}  action="./checkout" onsubmit="return false;">
                       <input type="hidden" name="action" value="checkout"/>
                        <input type="hidden" name="backToStep1" className="backToStep1" value="" />
                        <input type="hidden" name="propertyId" id="propertyId" value={property.property_id} />
                        <input type="hidden" name="propertyName" value={property.property_name} />
                        <input type="hidden" name="destName" value={property.dest_name} />
                        <input type="hidden" name="checkInDt" id="checkInDt" value={property.check_in_dt} />
                        <input type="hidden" name="checkOutDt" id="checkOutDt" value={property.check_out_dt} />
                        <input type="hidden" name="nightTotal" value={property.night_total} />
                        <input type="hidden" name="serviceLevel" value={this.props.serviceInfo.level} />
                        <input type="hidden" name="destCurrency" value={property.dest_currency} />
                        <input type="hidden" name="destTax" value={property.dest_tax} />
                        <input type="hidden" name="cleaning" value={property.cleaning} />
                        <input type="hidden" name="additionalPerStay" value={property.additional_per_stay} />
                        <input type="hidden" name="rateNight" id="rateNight" value={newNightRate} />
                        <input type="hidden" name="managementPercentage" id="managementPercentage" value={this.props.serviceInfo.management} />
                        <input type="hidden" name="rateNightBase" id="rateNightBase" value={rateNightBase} />
                        <input type="hidden" name="checkoutCleaning" id="checkoutCleaning" value={this.props.serviceInfo.checkout_cleaning} />
                        {this.props.siteid=="1" &&
                            <span>
                                <CheckoutStep2AdditionalServiceLevels data={this.props.additionalServicesInfo} />
                                <CheckoutStep2AdditionalMoreServiceLevels data={this.props.moreServices} />
                            </span>
                        }
                       <div className="row total">
                          <div className="columns">
                                    {/* <p className="text-right" dangerouslySetInnerHTML={{__html: ('Nightly Rate: ' +property.dest_currency+''+numberWithCommas((newNightRate).toFixed()))}}></p>*/}
                            <p className="text-right">
                                {thead}
                                <span dangerouslySetInnerHTML={{__html: ('Rate: ' +property.dest_currency )}}/>
                                <span id="rateNightDisp2">{numberWithCommas((newNightRate).toFixed())} </span> / night
                                <br />
                                <br />
                                <button className="book-btn tiny radius" onClick={this.reactSubmitServiceLevelForm}>{siteId==1?"CHECKOUT":"BOOK NOW"}</button>
                            </p>
                          </div>
                       </div>
                    </form>
                 </div>
            </div>
         )
    }
});
var CheckoutStep2 = React.createClass({
    render: function(){
        return (
                <div className="row">
                    <div className="columns">
                        {this.props.siteid=="1" && 
                            <div className='tabs-content'>
                                <div className='content active' id='service-level-5'>
                                    <CheckoutStep2ServiceContent additionalServicesInfo={this.props.additionalServicesInfo} moreServices={this.props.moreServices} property={this.props.property} siteid={this.props.siteid} serviceInfo={this.props.serviceInfo} selectedServiceLevel={this.props.selectedServiceLevel} totalNights={this.props.totalNights}/>
                               </div>
                           </div>
                        }
                        {this.props.siteid!="1" && 
                            <CheckoutStep2ServiceContent property={this.props.property} siteid={this.props.siteid} serviceInfo={this.props.serviceInfo} selectedServiceLevel={this.props.selectedServiceLevel} totalNights={this.props.totalNights}/>
                        }
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
                        {this.props.siteid==1 && <PropertyDescriptionLayout labelText="LEVEL OF SERVICE:" value={this.props.data.serviceLevel+' Stars'} /> }
                        <PropertyDescriptionLayout labelText="NIGHTLY RATE:" value={this.props.data.perNight} />
                        <PropertyDescriptionLayout labelText="CHECKOUT CLEANING FEE:" value={this.props.data.checkoutCleaning} />
                        {additionalPerStay }
                        {this.props.data.additionalServices!= null && 
                            <PropertyDescriptionLayout labelText="ADDITIONAL SERVICES:" value={this.props.data.additionalServices.data} />
                        }
                        {this.props.siteid==2 && this.props.sitetax != "0" && <PropertyDescriptionLayout labelText={"DESTINATION TAX ("+this.props.data.destinationTaxRate+"%):"} value={this.props.data.destinationTax} />}


                        <div className="row total">
                            <div className="small-3 columns">
                                <IfUserGroupIdForm userGroupID={this.props.data.userGroupId} discount={this.props.data.discount}/>
                            </div>
                            <div className="small-9 columns">
                                <p className="text-right"dangerouslySetInnerHTML={{__html:'TOTAL: '+this.props.data.netTotal}}></p>
                                {this.props.siteid==2 && <p className="text-right" dangerouslySetInnerHTML={{__html:'Security Deposit: '+this.props.data.securityDeposit}}></p>}
                                {this.props.siteid==2 && <p className="text-right" dangerouslySetInnerHTML={{__html:'Grand Total: '+this.props.data.grandTotal}}></p>}
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
                                    <input type="text" name="ccStateOther" id="ccStateOther" placeholder="" style={{display:'none'}} />
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
                    <Terms siteid={this.props.siteid}/>
        </div>
    }
})
var CheckoutStep3 = React.createClass({
    onHoldClick: function(){
        query('checkoutForm', 'holdBtn', 'reservationHold');
    },
    onBookNowClick: function(){
        if(this.props.siteid==1){
            ga('send', 'event', { eventCategory: 'Sale', eventAction: 'Submit', eventLabel: 'Checkout', eventValue: 1});        
        }
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
                    {this.props.siteid==2?<div className="row">
                        <div className="small-12 columns title">
                            <Heading6 value="RESERVATION SUMMARY"></Heading6>
                        </div>
                    </div>:""}
                    {this.props.siteid==2?<section id="reservations-services-section"></section>:''}
                    <CheckoutTerms siteid={this.props.siteid} />
                    <div className="row">
                        <div className="small-12 columns buttons">
                            <div className="row">
                                <div className="columns">
                                    <div className="feedback"></div>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="medium-6 columns">
                                    {this.props.siteid=="1" && <button type="button" className="button details-button submit tiny radius" id="holdBtn" onClick={self.onHoldClick}>
                                        <span className="react-nowrap">HOLD (24 HOURS)</span>
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    </button>}
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
                    <p><strong>KEY TERMS.</strong>&nbsp; &ldquo;The Company&rdquo; means {this.props.siteid=="2"?"GreatVillaDeals":"Villazzo"}</p>
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
