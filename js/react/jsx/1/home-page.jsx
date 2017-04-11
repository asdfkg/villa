var HomeMobileDestination = React.createClass({
    render: function() {
        return (
            <div className="row text-center small-collapse">
                <div className="small-12 columns mobile-destinations-header">
                    <Heading2 value="Destinations" />
                </div>
                <div className="small-12 columns">
                    <h3><Anchor href="/rental-villas/miami" value="Miami" /></h3>
                </div>
                <div className="small-12 columns">
                    <h3><Anchor href="/rental-villas/saint-tropez" value="Saint-Tropez" /></h3>
                </div>
                <div className="small-12 columns">
                    <h3><Anchor href="/rental-villas/aspen" value="Aspen" /></h3>
                </div>
            </div>
        );
    }
});

var HomeDesktopDestination = React.createClass({
    render: function() {
        const styles = {
            border: '0px 0px 0px 0px'
        };
        return (
            <div className="row text-center" data-equalizer>
                <div className="medium-12 columns" data-equalizer-watch>
                    <div className="flex-video" style={styles} >
                        <iframe width={iframeWidth} height={iframeHeight} src={iframeUrl} frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        );
    }
});

var MobilePlus = React.createClass({
    render: function(){        
        return  <div className="small-12 columns show-for-small-only home-plus">
                <span>+</span>
            </div>
    }
});

var HomePrivateSection = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row text-center">
                    <div className="small-12 columns">
                        <h1>Your Private Hotel Has Arrived</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns home-round-box">
                        <div className="row text-center">
                            <div className="small-12 medium-4 columns content-box">
                                <a href="javascript:void(0)" data-reveal-id="homepageRound1Modal">
                                    <Image1 src={homeArrivingImage1} /></a>
                                <Heading6 value='Spectacular<br />Private Villas' />     
                            </div>
                            <MobilePlus />
                            <div id="middle-column-pluses" className="small-12 medium-4 columns content-box">
                                <a href="" data-reveal-id="homepageRound2Modal"><Image1 src={homeArrivingImage2} /></a>
                                <Heading6 value='Five Star Hotel<br />Transformation' />
                            </div>
                            <MobilePlus />
                            <div className="small-12 medium-4 columns content-box">
                                <a href="" data-reveal-id="homepageRound3Modal"><Image1 src={homeArrivingImage3} /></a>
                                <Heading6 value='Expert Staff<br />' /><br />
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="small-12 btm-btn">
                                <Anchor href="/about-luxury-villa-rentals/villahotel-concept" classes="button" value="= VillaHotel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
});



var HomeDesktopSpecialOffer = React.createClass({
    render: function() {
        return ( 
            <div className="small-4 columns">
                <Heading3 value="Special Offers" />
                <div className="small-12 columns special-offer-main" data-equalizer-watch >
                    <div className="row text-center">
                        <div className="small-12 columns special-offer-margin-left-zero">
                            <div className="text">
                                <div className="small-12 columns special-offer-margin-left-zero">
                                    <div className="special-offer-all-offer">
                                        <Anchor href="/about-luxury-villa-rentals/offers" classes="button tiny" value="SEE ALL OFFERS" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="title special-offer-title" >Mix it up!<br />Last Minute WMC offer in Miami!</div>
            </div>
        );
    }
})


var HomeDesktopTestimonial = React.createClass({
    componentDidMount: function(){
        $('.owl-carousel-testimonials').owlCarousel({
            items: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            loop: true,
            nav: false,
            dots: false
        });
    },
    render: function() {
        return ( 
            <div className="small-4 columns" id="home-testimonial">
                <Heading3 value="Client Testimonials" />
                <div className="small-12 columns">
                    <div className="owl-carousel-testimonials visible-for-medium-up" dangerouslySetInnerHTML={{__html:this.props.testimonial.data}}>
                    </div>
                </div>
            </div>
        );
    }
})

var HomeDesktopBlog = React.createClass({
    render: function() {
        return (
            <div className="small-4 columns" >
                <h3>From The Blog</h3>
                <a href={this.props.blogdata.blogImgLink}> <img src={this.props.blogdata.blogImgSrc} /> </a>
                <h6 className="home-blog-font">{this.props.blogdata.blogDate}:<br/>{this.props.blogdata.blogTitle}</h6>
                <span className="home-blog-font" ><a href={this.props.blogdata.blogViewUrl}>View&nbsp;<i className="fa fa-angle-right"></i></a></span>
            </div>
        );
    }
})


var MobileSubFootContent = React.createClass({
    render: function() {
        return (
            <div className="small-6 columns">
                <a href={this.props.href} ><Image1 src={this.props.src} /></a>
                <Heading6 value={this.props.heading} />
            </div>
        );
    }
})

var HomeMobileSubFooter = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row text-center small-collapsed">
                    <MobileSubFootContent href='/reservations/' src='img/home/home-subfooter_book.png' heading='Book Online' />
                    <MobileSubFootContent href='/about-luxury-villa-rentals/villahotel-concept' src='img/home/home-subfooter_villa_hotel.png' heading='VillaHotel' />
                </div>
                <div className="row text-center">
                    <div className="small-6 columns">
                        <a data-reveal-id="videoModal"><Image1 src='img/home/home-subfooter_what_is.png' /></a>
                        <Heading6 value="What is Villazzo" />
                    </div>
                    <MobileSubFootContent href='/about-luxury-villa-rentals/villazzo-investments' src='img/home/home-subfooter_villazzo_fund.png' heading='Villazzo Investments' />
                </div>
                <div className="row text-center">
                    <MobileSubFootContent href='/about-luxury-villa-rentals/offers' src='img/home/home-subfooter_specials.png' heading='Special Offers' />
                    <MobileSubFootContent href='/about-luxury-villa-rentals/villazzo-realty' src='img/home/home-subfooter_villazzo_realty.png' heading='Villazzo Realty' />
                </div>
            </div>
        );
    }
})

var HomeMobileRoundSubFooter = React.createClass({
    render: function() {
        return (
            <span>
                <div className="reveal-modal medium homepage-modal" id="homepageRound1Modal" data-reveal>
                    <Heading6 value="Spectacular Private Villas" />
                    <Paragraph className="visible-for-medium-up" value="Every villa meets Villazzo's 5-star standards for size, architectural excellence, outstanding features, quality furnishings and finishes." />
                    <p><Anchor href="/luxury-rental-property-vacation-destinations" value="Learn More" /></p>
                </div>
                <div className="reveal-modal medium homepage-modal" id="homepageRound2Modal" data-reveal>
                    <Heading6 value="Five Star Hotel Transformation" />
                    <Paragraph className="visible-for-medium-up" value="Once the property is selected, Villazzo transforms the residence into a 5-star hotel by adding tens of thousands of dollars worth of amenities and features." />                
                    <p><Anchor href="/video/transformation.mp4" value="Learn More" /></p>
                </div>
                <div className="reveal-modal medium homepage-modal" id="homepageRound3Modal" data-reveal>
                    <Heading6 value="Expert Staff" /><br />
                    <Paragraph className="visible-for-medium-up" value="At your service is your own private Hotel Manager and his expert team of hand-picked butlers, concierges, private chefs, housekeepers and chauffeurs." />
                    <p><Anchor href="/about-luxury-villa-rentals/villahotel-concept" value="Learn More" /></p>
                </div>
            </span>
        );
    }
})