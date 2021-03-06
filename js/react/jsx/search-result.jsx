var SearchTotal = React.createClass({
    render: function() {
        return <div className="row">
            <div className="columns">
                <p className="property-results-top-titles">{this.props.total}</p>
            </div>
        </div>
    }
});
var SearchResult = React.createClass({
    componentDidMount: function(){
        $(".prop-interested").on('click',function(){
            var propName = $(this).data('propertyname').toUpperCase();
            $("#propertyInterestedModal").foundation('reveal', 'open');
            $("#propertyInterestedModal #propertyInterestedModalPropertyName").val(propName );
            $("#propertyInterestedModal legend").html('Contact us about Villa '+propName );
            $("#propertyInterestedModal .feedback").html('');
        });
        $(".prop-min-booking").on('click',function(){
            var propName = $(this).data('property_name').toUpperCase();
            $("#propertyAvailabilityModal").foundation('reveal', 'open');
            $("#propertyAvailabilityModal #propertyInterestedModalPropertyName").val(propName );
            $("#propertyAvailabilityModal legend").html("Check Villa "+propName+"\'s Availability" );
            $("#propertyAvailabilityModal #propertyAvailabilityModalPropertyId").val($(this).data('propertyid'));
            $("#propertyAvailabilityModal .minDayTxt").html('<span>&nbsp;<b>Minimum stay </b>'+$(this).data('minbookdays')+' nights<input type="hidden" name="minBookingDays" value="'+$(this).data('minbookdays')+'"/> </span>');
            $("#propertyAvailabilityModal .feedback").html('');
        });
    },
    render: function() {
	var unescapeHTML= function(data){
            return {__html: data};
	};
  	var _data= this.props.property;
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
        var searchItemLeft = function(object){
            return (<div className="medium-6 columns property-image" data-equalizer-watch>
                        <span className="img-property-title">{object.property_name}</span>
                        <a href={"/"+object.dest_name+"-rental-villas/villa-"+object.property_name.toLowerCase().replace(' ','-')+(object.check_in_dt && object.check_out_dt?'?check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt):'')}>
                            <Image1 src={'https://www.villazzo.com'+object.property_img} />
                            {object.is_10p_discount == 1 && siteId==2 && 
                                <div className="saving_ribbon"><Image1 src="/img/discount_tag.png"  /></div>
                            }
                        </a>
                    </div>);
        };
        var location=function(object){
            return (
                    'Location: <span class="text-grey">'+object.property_location_name+'</span>'+
                        (object.property_area_sq && object.property_area_mt?
                                '<br />Total Area: <span class="text-grey">'+numberWithCommas(parseInt(object.property_area_sq).toFixed())+' sq ft ('+numberWithCommas(parseInt(object.property_area_mt).toFixed())+'m&sup2;)</span>'
                                :'')
                        +
                        (object.property_interior_sq && object.property_interior_mt?
                            '<br />Interior Space: <span class="text-grey">'+numberWithCommas(parseInt(object.property_interior_sq).toFixed())+' sq ft ('+numberWithCommas(parseInt(object.property_interior_mt).toFixed())+' m&sup2;)</span>'
                                :'')
                    );
        };
        var bookUrl = this.props.bookurl;
        var bookingDays = this.props.bookingDays;
        var checkInDt = this.props.checkInDt;
        var checkOutDt = this.props.checkOutDt;
        var dateDetail = { 
            checkInDt: checkInDt,
            checkOutDt: checkOutDt
        }; 
        var siteId = this.props.siteid;
        var destinationPage = this.props.destinationPage;
	return <div>
                {destinationPage=="1"?"":<SearchTotal total={this.props.totalVillas} />}
                <PropertySummaryDatePopupForm data={dateDetail} />
                    <div className="row text-center">
                        {_data.map(function (object,i) {
                            {var currency = <span dangerouslySetInnerHTML={unescapeHTML(object.dest_currency)}></span> }
                            if(destinationPage == "1" && siteId==2 && object.startingRate>0){
                               var propertyRate = <div>{currency} {numberWithCommas((object.startingRate).toFixed())} { siteId==1 && <br /> }<span className="text-grey">per night</span></div>
                            }else if(destinationPage == "1" && siteId=="1"){
                               var propertyRate = <div> Property Value: <span className="text-grey">{currency}{numberWithCommas((object.property_value).toFixed())}</span></div>
                            }else if(siteId =="1"){
                                {/* var propertyRate = (
                                        <div>{currency} {numberWithCommas((object.service_levels.five_star.night).toFixed())} { siteId==1 && <br /> } <span className="text-grey">per night</span></div>
                                ) */}
                                var propertyRate = '';
                            }else{
                                if (object.service_levels.villa_only.night && object.service_levels.villa_only.night>0) {
                                    var propertyRate = (
                                        <div>{currency} {numberWithCommas((object.service_levels.villa_only.night).toFixed())} { siteId==1 && <br /> } <span className="text-grey">per night</span></div>
                                        )
                                }else if (object.service_levels.three_star.night && object.service_levels.three_star.night>0) {
                                        var propertyRate = (
                                        <div>{currency} {numberWithCommas((object.service_levels.three_star.night).toFixed())} { siteId==1 && <br /> } <span className="text-grey">per night</span></div>
                                        )
                                }else if(object.service_levels.three_star.min > 0 && object.service_levels.three_star.max>0){
                                        var propertyRate = (
                                        <div>{currency} {numberWithCommas((object.service_levels.three_star.min).toFixed())} - {currency} {numberWithCommas((object.service_levels.three_star.max).toFixed())} { siteId==1 && <br /> } <span className="text-grey">per night</span></div>
                                        )
                                }else{
                                    var propertyRate = '';
                                }
                            }
                            if(siteId==2 && object.is_10p_discount==1){
                                var BookNowText = "BOOK NOW AND SAVE 10%";
                            } else{
                                var BookNowText = "BOOK NOW";
                            }
                            if(object.check_in_dt) object.check_in_dt = moment(object.check_in_dt,'YYYY-MM-DD').format('MM/DD/YYYY');
                            if(object.check_out_dt) object.check_out_dt = moment(object.check_out_dt,'YYYY-MM-DD').format('MM/DD/YYYY');
                            if (object.booked_till_dt){
                                object.booked_till_dt = moment(object.booked_till_dt,'YYYY-MM-DD').format('MM/DD/YYYY');
                                var propertyBook = (
                                    <Anchor classes="button book-btn radius tiny expand" href={"?dest="+object.dest_name+"&check_in="+getFormattedDate(object.booked_till_dt,1)+"&check_out="+getFormattedDate(object.booked_till_dt,4)} value={'AVAIL. '+getFormattedDate(object.booked_till_dt,1)}></Anchor>
                                )
                            } else if(object.check_in_dt && object.check_out_dt){
                                var propertyBook = <Anchor classes="button book-btn radius tiny expand" href={"/reservations/services?property="+object.property_name.toLowerCase().replace(' ','-')+'&check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt)} value={BookNowText}></Anchor>
                            }else{
                                var propertyBook = (
                                        <Anchor classes="button book-btn radius tiny expand" href={"/reservations/services?property="+object.property_name.toLowerCase().replace(' ','-')+'&check_in='+getFormattedDate(moment().format('MM/DD/YYYY'))+'&check_out='+getFormattedDate(moment().format('MM/DD/YYYY'),3)} value={BookNowText}></Anchor>
                                )
                            }
                            var propertyBook = object.bookable==false ? <button className="button book-btn radius tiny expand prop-interested" data-propertyname={object.property_name}>I'M INTERESTED</button>:propertyBook ;
                            if( object.min_book_days != null && object.min_book_days>0 && bookingDays < object.min_book_days ){
                                var propertyBook = <button className="button book-btn radius tiny expand prop-min-booking" 
                                    data-propertyname={object.property_name} data-propertyid={object.property_id}
                                    data-minbookdays={object.min_book_days}>CHECK AVAILABILITY</button>;
                            }

                            return <div key={i} className="small-12 columns property-spacer">
                                        <div className="row collapse" data-equalizer>
                                            {searchItemLeft(object)}
                                            <div className="medium-6 columns property-details" data-equalizer-watch>
                                                <div className="row text-center">
                                                    <div className="small-9 columns">
                                                        <Heading2 value={object.property_desc_short} classes="text-grey" />
                                                        <h2><i className="fa fa-bed"></i> {object.property_bedrooms} bedrooms</h2>
                                                        <Heading2 value={location(object)}/>
                                                        <h2 className="package_rate">{propertyRate}</h2>
                                                    </div>
                                                    <div className="small-3 columns">
                                                        {object.is_quality_inspected == 1 && siteId==2 &&
                                                            <Image1 src="/img/inspected-sticker4.png"  />
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row text-center">
                                                    <div className="small-5 columns">
                                                        <Anchor href={"/"+object.dest_name+"-rental-villas/villa-"+object.property_name.toLowerCase().replace(' ','-')+(object.check_in_dt && object.check_out_dt?'?check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt):'')} classes="button details-button radius tiny expand" value="DETAILS" />
                                                    </div>
                                                    <div className="small-7 columns">
                                                       {propertyBook}
                                                    </div>
                                                </div>
                                            </div>  	
                                        </div>
                                    </div>
                        })}
                        <PropertySummaryInterestedPopupForm siteid={siteId} data={{ propertyId: '',propertyName: ''}} />
                    </div>
		</div>
        
	
  }
});
