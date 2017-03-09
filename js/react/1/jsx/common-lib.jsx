var Image1 = React.createClass({
    render: function () {
        return <img src={this.props.src} alt={this.props.alt} className={this.props.classes} width={this.props.width} />
    }
});

var Anchor = React.createClass({
    render: function(){
        return <a href={this.props.href} className={this.props.classes}>{this.props.value}</a>
    }
});
var Heading4 = React.createClass({
    render: function(){
        return <h4>{this.props.value}</h4>
    }
});
var VillLink = React.createClass({
    render: function(){
        return <Anchor href="https://www.villazzo.com" value="Villazzo" />
    }
});
var GVDLink = React.createClass({
    render: function(){
        return <Anchor href="http://www.greatvilladeals.com" value="GreatVillaDeals.com" />
    }
});
var Heading2 = React.createClass({
    render: function () {
        return <h2 dangerouslySetInnerHTML={{__html:this.props.value}} className={this.props.classes}></h2>
    }
});
var Heading1 = React.createClass({
    render: function(){
        return <h1>{this.props.value}</h1>
    }
});
var Heading6 = React.createClass({
    render: function(){
        return <h6 dangerouslySetInnerHTML={{__html:this.props.value}} className={this.props.className}></h6>
    }
});



var DesktopFooter = React.createClass({
    render:function(){
        return <div>
            <div className="row"  data-equalizer>
                <div className="medium-4 columns" data-equalizer-watch>
                    <a href="mailto:villas@villazzo.com"><i className="fa fa-envelope-o"></i></a>
                    <a href="https://www.facebook.com/Villazzo" target="_blank"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/villazzo" target="_blank"><i className="fa fa-twitter"></i></a>
                    <a href="https://instagram.com/villazzo/" target="_blank"><i className="fa fa-instagram"></i></a>
                    <a href="https://plus.google.com/+Villazzo/posts" target="_blank"><i className="fa fa-google-plus"></i></a>
                    <a href="https://www.youtube.com/user/VillazzoVideos" target="_blank"><i className="fa fa-youtube"></i></a>
                    <a href="https://www.pinterest.com/villazzo/" target="_blank"><i className="fa fa-pinterest-p"></i></a>

                    <p className="footer-copyright">&copy; 2016 <VillLink /></p>
                    <p className="text-grey">PRIVATE LUXURY VILLA RENTALS WITH 5-STAR HOTEL SERVICE. MIAMI-ASPEN-ST. TROPEZ</p>
                    <p><i className="fa fa-mobile"></i>&nbsp;<a href="tel:+1-877-845-5299">+1 (877) VILLAZZO</a></p>
                    <p><i className="fa fa-globe"></i>&nbsp;<a href="mailto:villas@villazzo.com">villas@villazzo.com</a></p>
                </div>
                <div className="medium-4 columns" data-equalizer-watch>
                    <img src="/img/footer-map.png" /><a href="/rental-villas/aspen" className="footerAspen" onmouseover="document.getElementById('footerAspen').style.display='block';" onmouseout="document.getElementById('footerAspen').style.display='none';" title="Aspen"><img className="dispayNone" src="/img/v-on.png" alt="Aspen" id="footerAspen" /></a>
                    <a href="/rental-villas/miami" className="footerMiami" onmouseover="document.getElementById('footerMiami').style.display='block';" onmouseout="document.getElementById('footerMiami').style.display='none';" title="Miami"><img className="dispayNone" src="/img/v-on.png" alt="Miami" id="footerMiami" /></a>
                    <a href="/rental-villas/saint-tropez" className="footerStTropez" onmouseover="document.getElementById('footerStTropez').style.display='block';" onmouseout="document.getElementById('footerStTropez').style.display='none';" title="Saint-Tropez"><img className="dispayNone" src="/img/v-on.png" alt="St-Tropez" id="footerStTropez" /></a>
                </div>
                <div className="medium-3 small-offset-1 columns" data-equalizer-watch>
                    <p>MIAMI OFFICE:<span className="text-grey"><br /><a href="tel:+1-305-777-0146">+1 (305) 777 0146</a></span></p>
                    <p>SAINT-TROPEZ OFFICE:<br /> <span className="text-grey"><a href="tel:+33-4-94-49-32-54">+33 (4) 94 49 32 54</a></span></p>
                    <p>ASPEN OFFICE:<br /> <span className="text-grey"> <a href="tel:+1-970-238-7000">+1 (970) 238 7000</a></span></p>
                </div>
            </div>
            <a className="exit-off-canvas"></a>
        </div>
    }
});


var MobileFooter = React.createClass({
    render:function(){
        return <div>
            <div className="row text-center">
                <div className="small-12 columns">
                    <a href="mailto:villas@villazzo.com"><i className="fa fa-envelope-o"></i></a>
                    <a href="https://www.facebook.com/Villazzo" target="_blank"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/villazzo" target="_blank"><i className="fa fa-twitter"></i></a>
                    <a href="https://instagram.com/villazzo/" target="_blank"><i className="fa fa-instagram"></i></a>
                    <a href="https://plus.google.com/+Villazzo/posts" target="_blank"><i className="fa fa-google-plus"></i></a>
                    <a href="https://www.youtube.com/user/VillazzoVideos" target="_blank"><i className="fa fa-youtube"></i></a>
                    <a href="https://www.pinterest.com/villazzo/" target="_blank"><i className="fa fa-pinterest-p"></i></a>
                </div>
            </div>
            <div className="row" data-equalizer>
                <div className="columns" data-equalizer-watch>
                    <small>&copy;&nbsp;Villazzo LLC</small>
                    <p className="text-grey">Private Hotels in Saint-Tropez, Miami, Aspen, Luxury villa Rentals and Vacation Homes with Full Hotel Service.</p>
                </div>
                <div className="columns footer-contact" data-equalizer-watch>
                    <i className="fa fa-mobile"></i>&nbsp;
                    <span className="footerContactSpan">
                        <a href="tel:1-877-845-5299">
                            +1 (877) VILLAZZO
                        </a>
                    </span>
                </div>
            </div>
            <a className="exit-off-canvas"></a>
        </div>
    }
});























var FooterSecond = React.createClass({
    render:function(){
        return <div className="orange-bg-footer" >
        <div className="row"  data-equalizer="">
            <div className="medium-6 columns">
                <p className="footer-copyright">&copy; 2016 <VillLink /></p>
            </div>
            <div className="medium-6 columns hide">
                <div className="footer-media">
                    <ul>
                        <li><a href="https://www.facebook.com/Villazzo" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="https://plus.google.com/+Villazzo/posts" target="_blank"><i className="fa fa-google" aria-hidden="true"></i></a></li>
                        <li><a href="https://twitter.com/villazzo" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="https://www.pinterest.com/villazzo/" target="_blank"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
                        <li><a href="" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        <li><a href="" target="_blank"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                        <li><a href="" target="_blank"><i className="fa fa-tumblr" aria-hidden="true"></i></a></li>
                        <li><a href="https://www.youtube.com/user/VillazzoVideos" target="_blank"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    }
});






var SliderImage = React.createClass({
    render: function(){
        return <div>
            <Image1 src={this.props.sliderImage1} classes="visible-for-small-only" />
            <Image1 src={this.props.sliderImage2} classes="visible-for-medium-up" />
            <div className="owl-content">
                <h1>{this.props.sliderHeading}<br />
                    <span className="homeSliderText">{this.props.sliderText}</span>
                </h1>
            </div>
        </div>
    }
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var ServiceStep = React.createClass({
    redirectStep2:function(){
        window.location.href=this.props.stepUrl2;
    },
    redirectStep1:function(){
        if(this.props.step>=3)
        {
            window.location.href=this.props.stepUrl1;
        }else{
            $(".backToStep1").val(1); 
            submitServiceLevelForm();
        }
        
    },
    render: function(){
        var self = this;
        var step = this.props.step;
        return (
            <div className="row" id="steps">
                <div className="columns">
                    <div className="row">
                        <div className="medium-5 columns">
                            <Heading1 value="RESERVATIONS" />
                        </div>
                        <div className="medium-7 columns">
                            <div className="row text-center">
                                <div className="columns">
                                    <ul id="progressbar">
                                        <li className="active" onClick={self.redirectStep1}>Select Your<br />Villa</li>
                                        <li className={step>=2?'active':''} onClick={self.redirectStep2} >Review your<br />Discount</li>
                                        <li className={step>=3?'active':''}>Contact And<br />Payment Information</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Paragraph = React.createClass({
    render: function(){
        var unescapeHTML= function(data){
            return {__html:data}
        };
        return <p dangerouslySetInnerHTML={unescapeHTML(this.props.value)} className={this.props.className}></p>
    }
});
var FooterFirst = React.createClass({
    render:function(){
        return <div className="row" data-equalizer="">
            <div className="medium-12 columns" data-equalizer-watch="">
                <div className="where-next-box">
                    <h1>Contact <span>Us </span></h1>
                    <div className="clr"></div><br />
                    <span className="contact-box">
                        LUXURY VILLA RENTALS WITH BEST PRICE GUARANTEE.  <br />
                        +1 (305) 777 0146 <br />
                        <Anchor href="mailto:villas@greatvilladeals.com " classes="mail-hover" value="villas@greatvilladeals.com" /><br />
                    </span>
                </div>
            </div>
        </div>    
}});


var HeaderTopBar = React.createClass({
    handleSearchClick: function(){
        $("#mainSearchForm").submit();
    },
    render: function(){
        return <section id="top-bar-section" className="visible-for-medium-up bg-black-class">
                <div className="row full-width">
                    <div className="medium-6 columns">
                    
                        <div id="top-bar-logo" className="text-center">
                            <a href="/"><Image1 src="/img/logo.png" /></a>
                            </div>
                        </div>
                    <div className="medium-2 columns"></div>
                    <div className="medium-4 columns serach-form-class">
                        <div className="form-wrapr">
                            <form action="/search/" id="mainSearchForm" method="post">
	                            <button className="btn btn-default serach-btn" type="button"><span className="fa fa-search" onClick={this.handleSearchClick}></span></button>
	                            <input type="search" name="keyword" id="top-bar-section-search" placeholder="Search"/>
	                    </form>
                        </div>
                    </div>
                </div>
            </section>
    }
});
var MobileHeaderTopBar = React.createClass({
    render: function(){
        return <nav className="tab-bar show-for-small-only">
                <section className="left-small">
                    <a className="left-off-canvas-toggle menu-icon" href="#"><span></span></a>
                </section>
                <section className="middle tab-bar-section">
                    <h1 className="title"><a href="/"><Image1 src="/img/logo.png" style="height: 35px;" /></a></h1>
                </section>
                </nav>
    }
});
var HeaderTopBarMenu = React.createClass({
    render: function(){
        return <section id="top-bar-navigation" className="top-bar-section visible-for-medium-up">
                <nav className="top-bar" id="header-nav" data-topbar role="navigation">
                    <ul className="button-group">
                        <li className="has-dropdown not-click">
                        
                            <span className="hide-for-large-up">VILLAS</span>
                            <span className="show-for-large-up pd-10">VILLAS & DESTINATIONS</span>
                            
                            <ul className="dropdown">
                                <li className="text-left"><a href="/luxury-rental-property-vacation-destinations">All Destinations</a></li>
                                <li className="text-left"><a href="/reservations/?dest=aspen&check_in=&check_out=">Aspen</a></li>
                                <li className="text-left"><a href="/reservations/?dest=miami&check_in=&check_out=">Miami</a></li>
                                <li className="text-left"><a href="/reservations/?dest=saint-tropez&check_in=&check_out=">Saint-Tropez</a></li>
                                <li className="text-left"><a href="/reservations/?dest=st-barth&check_in=&check_out=">St-Barth</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/reservations/">
                                <span className="hide-for-large-up">BOOK</span>
                                <span className="show-for-large-up">BOOK YOUR VILLA</span>
                            </a>
                        </li>   
                        <li>
                            <a href="/about-luxury-villa-rentals/founders-vision">
                                <span  className="hide-for-large-up">ABOUT</span>
                                <span className="show-for-large-up">ABOUT US</span>	
                            </a>
                        </li>
                        <li><a href="/about-luxury-villa-rentals/contact">CONTACT</a>
                        </li>
                    </ul>
                </nav>
            </section>
    }
});
var MobileHeaderTopBarMenu = React.createClass({
    render: function(){
        var divStyle = {
            padding: '2px 0 0 0 !important'
        };
    
        return  <aside className="left-off-canvas-menu">
                    <ul className="off-canvas-list">
                        <li><label>GREATVILLADEALS</label></li>
                        <li>
                            <form action="/search/" method="post">

                                <div className="row collapse">
                                    <div className="columns" styles={divStyle}>
                                        <input type="search" name="keyword" placeholder="Search"/>
                                    </div>
                                </div>
                            </form>
                        </li>
                        <li className="has-submenu">
                            <a className="title">VILLAS & DESTINATIONS</a>
                            <ul className="left-submenu">
                                <li className="back"><a href="#">Back</a></li>
                                <li className="text-left"><a href="/luxury-rental-property-vacation-destinations">Villas & Destinations</a></li>
                                <li className="text-left"><a href="/reservations/?dest=aspen&check_in=&check_out=">Aspen</a></li>
                                <li className="text-left"><a href="/reservations/?dest=miami&check_in=&check_out=">Miami</a></li>
                                <li className="text-left"><a href="/reservations/?dest=saint-tropez&check_in=&check_out=">Saint-Tropez</a></li>
                                <li className="text-left"><a href="/reservations/?dest=st-barth&check_in=&check_out=">St-Barth</a></li>
                            </ul>
                        </li>
                        <li><a href="/reservations/">BOOK YOUR VILLA</a></li>
                        <li><a href="/about-luxury-villa-rentals/founders-vision">ABOUT US</a></li>
                        <li><a href="/about-luxury-villa-rentals/contact">CONTACT</a></li>
                    </ul>
            </aside>
    }
});

var DestinationText = React.createClass({
    render: function(){
    return   <div className="small-12 columns">
                    <h4>AFFORDABLE LUXURY VACATION VILLA RENTALS IN MIAMI BEACH, ASPEN, ST TROPEZ AND ST BARTH</h4>
                    <p>Great Villa Deals features a vast selection of private villas at affordable rental rates.  Our listings consist of 30 properties in sought after destinations such as Aspen, the coastal areas such as St Tropez, St Barth and cultural areas such as Miami.</p>
                    <p>Villa rentals with Great Villa Deals is the ideal solution to saving money if you’re travelling as a family or group. Get more for your money compared to the cost of staying in a hotel. What’s more, you can enjoy total privacy and freedom during your holiday at top destinations around the globe.</p>
                    <p>We invite you to explore our destinations above and save on your next luxury villa rental. You don’t have to break the bank to indulge in your dream tropical holiday.</p>
                </div>
    }
});