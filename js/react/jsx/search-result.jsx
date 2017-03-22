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
            var propName = $(this).data('propertyname').toUpperCase();
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

            var dt = new Date(dt);
            if(numberOfDaysToAdd != 0){
                dt.setDate(dt.getDate() + numberOfDaysToAdd);
            }
            var dd = dt.getDate();
            var mm = dt.getMonth()+1;
            var y = dt.getFullYear();
            return mm+'/'+ dd + '/'+ y;
        };
        var searchItemLeft = function(object){
            return (<div className="medium-6 columns property-image" data-equalizer-watch>
                        <span className="img-property-title">{object.property_name}</span>
                        <a href={"/"+object.dest_name+"-rental-villas/villa-"+object.property_name.toLowerCase().replace(' ','-')+(object.check_in_dt && object.check_out_dt?'?check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt):'')}>
                            <Image1 src={'https://www.villazzo.com'+object.property_img} />
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
                            '<br />Interior Space: <span class="text-grey">'+numberWithCommas(parseInt(object.property_interior_sq).toFixed())+' sq ft ('+numberWithCommas(parseInt(object.property_interior_mt).toFixed())+'m&sup2;)</span>'
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
	return <div>
                <SearchTotal total={this.props.totalVillas} />
                <PropertySummaryDatePopupForm data={dateDetail} />
                    <div className="row text-center">
                        {_data.map(function (object,i) {
                            {var currency = <span dangerouslySetInnerHTML={unescapeHTML(object.dest_currency)}></span> }
                            if (object.service_levels.villa_only.night && object.service_levels.villa_only.night>0) {
                                var propertyRate = (
                                    <div>{currency} {numberWithCommas((object.service_levels.villa_only.night).toFixed())} <br /><span className="text-grey">per night</span></div>
                                    )
                            }else if (object.service_levels.three_star.night && object.service_levels.three_star.night>0) {
                                    var propertyRate = (
                                    <div>{currency} {numberWithCommas((object.service_levels.three_star.night).toFixed())} <br /><span className="text-grey">per night</span></div>
                                    )
                            }else if(object.service_levels.three_star.min > 0 && object.service_levels.three_star.max>0){
                                    var propertyRate = (
                                    <div>{currency} {numberWithCommas((object.service_levels.three_star.min).toFixed())} - {currency} {numberWithCommas((object.service_levels.three_star.max).toFixed())} <br /><span className="text-grey">per night</span></div>
                                    )
                            }else{
                                var propertyRate = '';
                            }
                            var BookNowText = siteId=="1"?"Book Now":"Book now and Save 10%";
                            if (object.booked_till_dt){
                                var propertyBook = (
                                    <Anchor classes="button book-btn radius tiny expand" href={"?dest="+object.dest_name+"&check_in="+getFormattedDate(object.booked_till_dt,1)+"&check_out="+getFormattedDate(object.booked_till_dt,4)} value={'AVAIL. '+getFormattedDate(object.booked_till_dt,1)}></Anchor>
                                )
                            } else if(object.check_in_dt && object.check_out_dt){
                                var propertyBook = <Anchor classes="button book-btn radius tiny expand" href={"/reservations/services?property="+object.property_name.toLowerCase().replace(' ','-')+'&check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt)} value={BookNowText}></Anchor>
                            }else{
                                var propertyBook = (
                                        <Anchor classes="button book-btn radius tiny expand" href={"/reservations/services?property="+object.property_name.toLowerCase().replace(' ','-')+'&check_in='+getFormattedDate(new Date())+'&check_out='+getFormattedDate(new Date(),3)} value={BookNowText}></Anchor>
                                )
                            }
                            var propertyBook = object.bookable==false ? <button className="button book-btn radius tiny expand prop-interested" data-propertyname={object.property_name}>I'M INTERESTED</button>:propertyBook ;
                            if( object.min_book_days != null && object.min_book_days>0 && bookingDays < object.min_book_days ){
                                var propertyBook = <button className="button book-btn radius tiny expand prop-min-booking" 
                                    data-propertyname={object.property_name} data-propertyid={object.id}
                                    data-minbookdays={object.min_book_days}>CHECK AVAILABILITY</button>;
                            }

                            return <div key={i} className="small-12 columns property-spacer">
                                    <div className="row collapse" data-equalizer>
                                        {searchItemLeft(object)}
                                        <div className="medium-6 columns property-details" data-equalizer-watch>
                                            <div className="row text-center">
                                                <div className="small-12 columns">
                                                    <Heading2 value={object.property_desc_short} classes="text-grey" />
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                <div className="small-12 columns">
                                                    <h2><i className="fa fa-bed"></i> {object.property_bedrooms} bedrooms</h2>
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                <div className="small-12 columns">
                                                    <Heading2 value={location(object)}/>
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                    <div className="small-12 columns">
                                                    <h2>{propertyRate}</h2>
                                                    </div>
                                            </div>
                                            <div className="row text-center">
                                                    <div className="small-4 small-offset-2 columns">
                                                            <Anchor href={"/"+object.dest_name+"-rental-villas/villa-"+object.property_name.toLowerCase().replace(' ','-')+(object.check_in_dt && object.check_out_dt?'?check_in='+getFormattedDate(object.check_in_dt)+'&check_out='+getFormattedDate(object.check_out_dt):'')} classes="button details-button radius tiny expand" value="DETAILS" />
                                                    </div>
                                                    <div className={"small-"+(siteId=="1"?"4":"6")+" columns"}>{propertyBook}</div>
                                                    <div className="small-4 columns"></div>
                                            </div>
                                        </div>  	
                                    </div>
                            </div>
                        })}
                        <PropertySummaryInterestedPopupForm data={{ propertyId: '',propertyName: ''}} />
                    </div>
		</div>
        
	
  }
});
