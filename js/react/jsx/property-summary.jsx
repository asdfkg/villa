var PropertyDetailsSection = React.createClass({
    render: function(){
        var details = this.props.PropertyDetailsData.map(function(detail,i) {
            if (detail.value!= "" && detail.value!=0){
                return (
                    <li key={i} dangerouslySetInnerHTML={{__html:'<span>'+detail.name+':</span>&nbsp;'+detail.value}}></li>
                )
            }
        });
        
        return (
            <div className="row" id="property-details">
                <div className="columns text-left show-for-small-only">
                    <span>DETAILS</span>
                </div>
                <div className="medium-2 columns text-right show-for-medium-up">
                    <span>DETAILS</span>
                </div>
                <div className="medium-10 columns">
                    <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
                        {details}
                    </ul>
                </div>
            </div>
        );
    }
});

var IfPropertyDriving = React.createClass({
    render: function(){
    var unescapeHTML= function(data){
        return {__html:data}
    };
    
        if (this.props.propertyDrivingData) {
            return <span>
                    <div className="row full-width text-center" id="property-amenities-separator"></div>
                    <div className="row" id="property-details">
                            <div className="columns text-left show-for-small-only">
                                <span>DRIVE TIMES</span>
                            </div>
                            <div className="medium-2 columns text-right show-for-medium-up">
                                <span>DRIVE TIMES</span>
                            </div>
                            <div className="medium-10 columns" dangerouslySetInnerHTML={unescapeHTML(this.props.propertyDrivingData)}></div>
                    </div>
                </span>
        }
        else {
            return false;
        }
    }
});

var IfPropertyAmenities = React.createClass({
    render: function(){
        var unescapeHTML= function(data){
            return {__html:data}
        };
        if (this.props.propertyAmenitiesData) {
            return <span>
                    <div className="row full-width text-center" id="property-amenities-separator"></div>
                    <div className="row" id="property-amenities">
                        <div className="columns text-left show-for-small-only">
                            <span>AMENITIES</span>
                        </div>
                        <div className="medium-2 columns text-right show-for-medium-up">
                            <span>AMENITIES</span>
                        </div>
                        <div className="medium-10 columns" dangerouslySetInnerHTML={unescapeHTML(this.props.propertyAmenitiesData)}></div>
                    </div>

                </span>
        }
        else {
            return false;
        }
    }
});


var PropertySummary = React.createClass({

    getInitialState: function(){
        return {readMore:true}
    },
    handleReadMoreClick :function(){
        $('#property-specifications').slideToggle('slow');
        this.setState( { readMore : !this.state.readMore } );
    },
    render: function() {
        var d1 = new Date(this.props.dateDetail.checkInDt);
        var d2 = new Date(this.props.dateDetail.checkOutDt);
        var totalNight = (d2-d1)/1000/60/60/24;
        //var bookBtn = (this.props.dateDetail.checkInDt && this.props.dateDetail.checkOutDt && this.props.dateDetail.availability =="1" && (this.props.dateDetail.minBookDays==null || totalNight>=this.props.dateDetail.minBookDays))?<a className='button small expand radius book-btn tiny' href={this.props.dateDetail.bookNowURL}>RESERVE</a>:<a data-reveal-id='propertyAvailabilityModal' className="button small expand radius book-btn tiny">CHECK AVAILABILITY</a>;
        var bookBtn = <button data-reveal-id='propertyAvailabilityModal' className="button small expand radius book-btn">CHECK AVAILABILITY</button>;
        if(this.props.dateDetail.bookable==0){
            bookBtn ='';
        }
        return (
            <section id="property-summary-section">
                <div className="row text-center" id="property-intro" data-equalizer>
                    {this.props.siteid=="1" && <div className="medium-2 columns left-side" data-equalizer-watch><Heading6 value={this.props.data.destName}  /></div>}
                    <div className={"medium-"+(this.props.siteid=="1"?10:12)+" columns right-side"} data-equalizer-watch dangerouslySetInnerHTML={{__html:this.props.data.propertyTitle}}></div>
                </div>
                <div className="row" id="property-desc">
                    <div className="small-12 columns text-justify">
                        <Paragraph value={this.props.data.propertyDescription} />
                    </div>
                 </div>
                 {(this.props.siteid=="1")?
                <div className="row">
                    <div className="small-12 columns text-center" id="property-rate">
                        <p>From  <span dangerouslySetInnerHTML={{__html:this.props.dateDetail.nightTotal}}></span> <span className="text-grey">Per Night</span><br />+<br />Services + 18% VillaHotel Management + Tax</p>
                    </div>
                </div>
:''}
                <div className="row text-center visible-for-medium-up">
                    <div className="medium-9 medium-centered columns">
                        <div className="row text-center">
                            {this.props.dateDetail.bookable!=0 && 
                            <div className="medium-4 columns">
                                {bookBtn}
                            </div>
                            }
                            <div className={"medium-4 columns"}>
	                        <button className="button small expand radius details-button" data-reveal-id="propertyInterestedModal">I'M INTERESTED</button>
                            </div>
                            <div className="medium-4 columns">
                                <button className="button small expand radius details-button" data-reveal-id="propertyShareModal">SHARE</button>
                            </div>
                        </div>
                    </div>
                </div>
                                
                <div className="row full-width text-center" id="property-details-trigger">
                    <p className="flip">
                        <span id="clickMe" onClick={this.handleReadMoreClick}>{this.state.readMore?'Click to show less':'click to show more'}</span> 
                        <i className={this.state.readMore?"fa fa-angle-double-down":"fa fa-angle-double-up"}></i>
                    </p>
                </div> 
                
                <div id="property-specifications">
                    <PropertyDetailsSection PropertyDetailsData={this.props.propertyDetails} />
                    <IfPropertyDriving propertyDrivingData={this.props.data.propertyDriving}/>
                    <IfPropertyAmenities propertyAmenitiesData={this.props.data.propertyAmenities}/>
                </div>
                
            </section>

        );
    }
});

var IfDatePicker = React.createClass({
    render: function(){
        var unescapeHTML= function(data){
            return {__html:data};
        };
        var selectedDates = '';
        if(this.props.bookable==1){
            selectedDates = selectedDates+ "<span>Travel Dates: "+this.props.fromatedCheckInDt+" - "+this.props.fromatedCheckOutDt+
                                "&nbsp;<a data-reveal-id='propertyAvailabilityModal'>Edit</a>"+
                            "</span>";
        }
        if(this.props.checkInDt && this.props.checkOutDt) {
            return (
                <section id="rate-section">
                    <div className="row full-width text-center">
                        <div className="columns" dangerouslySetInnerHTML={unescapeHTML(selectedDates)}></div>
                    </div>
                </section>
            );
        }
        else{
            return (
                <section id="rate-section">
                    <div className="row full-width text-center">
                        <div className="columns">
                            <a className="small" data-reveal-id="propertyShareModal">SHARE</a>
                            <span><a data-reveal-id='propertyAvailabilityModal'>CHECK AVAILABILITY</a></span>
                        </div>
                    </div>
                </section>
            );
        }
    }
});


var PropertySummaryDate = React.createClass({
    render: function() {
        return (
            <IfDatePicker checkInDt={this.props.data.checkInDt} checkOutDt={this.props.data.checkOutDt} bookable={this.props.data.bookable}
                    fromatedCheckInDt={this.props.data.fromatedCheckInDt} 
                    fromatedCheckOutDt={this.props.data.fromatedCheckOutDt} 
                    bookNowURL={this.props.data.bookNowURL}
            />
        );
    }
});





var PropertySummarySlider = React.createClass({
    render: function() {
        var images = this.props.sliderImages.map(function(image,i) {
            return (
                <div data-owlItem={image.propertySlideshowCtr} key={i} className="item">
                    <span className="img-property-title">
                        {image.propertyName}
                    </span>
                    <img src={image.path+image.filename} alt={image.title} />
                </div>
            )
        });
        return (
            <section id="owl-carousel-section">
                { this.props.siteid=="2" &&
                <div className="inner-content-title">
                    <h1>{this.props.propertyName}  - {this.props.destName} </h1>
		</div>
                }
                <div className="row">
                    <div className="columns">
                        <div id="sync1" className="owl-carousel" >
                            {images}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var PropertySummaryThumbSlider = React.createClass({
        componentDidMount: function(){
        var $sync1 = $('#sync1'), // select the main carousel
            $sync2 = $('#sync2'), // select the thumbnail carousel
            flag = true,
            duration = 300;
     
        // gallery carousel main view
        $sync1.owlCarousel({
                items: 1,
                slideSpeed: 1000,
                nav: true,
                navText: ['<img src='+this.props.sliderArrowLeft+' style="position: absolute; top: 47%; left: 0;" className="show-for-large-up">', '<img src='+this.props.sliderArrowRight+' style="position: absolute; top: 47%; right: 0;" className="show-for-large-up">'],
                loop: true,
                responsiveRefreshRate: 200,
                dots: false
            })
            .on('change.owl.carousel', function (e) {
                if (e.namespace && e.property.name == 'items' && !flag ) {
                    flag = true;
                    $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            })
            .on('click', '.owl-next', function() {
                $sync2.trigger('next.owl.carousel')
            })
            .on('click', '.owl-prev', function() {
                $sync2.trigger('prev.owl.carousel')
            });
            
        // gallery thumbnail carousel
        $sync2.owlCarousel({
                items: 5,
                nav: false,
                dots: false,
                dotsEach: false,
                margin: 0,
                responsive: {
                    0: {
                        items: 4,
                        margin: 0
                    },
                    767: {items: 6},
                    1000: {items: 6}
                },
                responsiveRefreshRate: 100,
                margin: 2
            })
            .on('click', '.owl-item', function () {
                $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            })
            .on('changed.owl.carousel', function (e) {
                if (!flag) {
                    flag = true;
                    $sync1.trigger('to.owl.carousel', [e.item.idex, duration, true]);
                    flag = false;
                }
            });
    },
    render: function() {
        var imagesThumb = this.props.sliderImages.map(function(image,i) {
            return (
                <div data-owlItem={image.propertySlideshowCtr} key={i} className="item">
                    <img src={image.path+image.filename} alt={image.title} />
                </div>
            )
        });
        return (
          <section id="owl-thumbnails-section" className="visible-for-medium-up">
                <div className="row">
                    <div className="columns">
                        <div id="sync2" className="owl-carousel" >
                            {imagesThumb}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

