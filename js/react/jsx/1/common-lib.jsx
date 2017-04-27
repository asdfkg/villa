var DesktopFooter = React.createClass({
    mapOut:function(containerId){
        $('#'+containerId).css('display','none');
    },
    mapOver:function(containerId){
        $('#'+containerId).css('display','block');
    },
    render:function(){
        var curYear = new Date();
        var self = this;
        return <div>
            <div className="row"  data-equalizer>
                <div className="medium-4 columns" data-equalizer-watch>
                    <a href="mailto:villas@villazzo.com" className="footer-icon-margin"><i className="fa fa-envelope-o"></i></a>
                    <a href="https://www.facebook.com/Villazzo" target="_blank" className="footer-icon-margin"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/villazzo" target="_blank" className="footer-icon-margin"><i className="fa fa-twitter"></i></a>
                    <a href="https://instagram.com/villazzo/" target="_blank" className="footer-icon-margin"><i className="fa fa-instagram"></i></a>
                    <a href="https://plus.google.com/+Villazzo/posts" target="_blank" className="footer-icon-margin"><i className="fa fa-google-plus"></i></a>
                    <a href="https://www.youtube.com/user/VillazzoVideos" target="_blank" className="footer-icon-margin"><i className="fa fa-youtube"></i></a>
                    <a href="https://www.pinterest.com/villazzo/" target="_blank" className="footer-icon-margin"><i className="fa fa-pinterest-p"></i></a>

                    <p className="footer-copyright">&copy; {curYear.getFullYear()} <VillLink /></p>
                    <p className="text-grey">PRIVATE LUXURY VILLA RENTALS WITH 5-STAR HOTEL SERVICE. MIAMI-ASPEN-ST. TROPEZ</p>
                    <p><i className="fa fa-mobile"></i>&nbsp;<a href="tel:+1-877-845-5299">+1 (877) VILLAZZO</a></p>
                    <p><i className="fa fa-globe"></i>&nbsp;<a href="mailto:villas@villazzo.com">villas@villazzo.com</a></p>
                </div>
                <div className="medium-4 columns" data-equalizer-watch>
                    <img src="/img/footer-map.png" /><a href="/rental-villas/aspen" className="footerAspen"  onMouseOut={() => self.mapOut('footerAspen')} onMouseOver={() => self.mapOver('footerAspen')} title="Aspen"><img className="dispayNone" src="/img/v-on.png" alt="Aspen" id="footerAspen" /></a>
                    <a href="/rental-villas/miami" className="footerMiami"  onMouseOut={() => self.mapOut('footerMiami')} onMouseOver={() => self.mapOver('footerMiami')} title="Miami"><img className="dispayNone" src="/img/v-on.png" alt="Miami" id="footerMiami" /></a>
                    <a href="/rental-villas/saint-tropez" className="footerStTropez" onMouseOut={() => self.mapOut('footerStTropez')} onMouseOver={() => self.mapOver('footerStTropez')} title="Saint-Tropez"><img className="dispayNone" src="/img/v-on.png" alt="St-Tropez" id="footerStTropez" /></a>
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

var HeaderTopBar = React.createClass({
    handleSearchClick: function(){
        $("#mainSearchForm").submit();
    },
    render: function(){
        const styles = {width: '25px',position: 'absolute', top: '18px', right: '-55px', zIndex: '1000'};
        return <section id="top-bar-section" className="visible-for-medium-up">
                <div className="row full-width">
                    <div className="medium-4 columns"><span className="header-phone">+1 877 (VILLAZO)</span><hr /></div>
                    <div className="medium-4 columns">
                    
                        <div id="top-bar-logo" className="text-center">
                            <a href="/"><Image1 src="/img/logo.png" /></a>
                            
                        </div>
                    </div>

                    <div className="medium-4 columns s2">
                        <div className="w1">
                            <form action="/search/" id="mainSearchForm" method="post">
                                <span className="fa fa-search" onClick={this.handleSearchClick}></span>
                                <input type="search" name="keyword" id="top-bar-section-search" placeholder={this.props.siteid==1?"":"Search"}/>
                            </form>
                        </div>
                        <div className="w2">
                            <span className="header-login-cls"> | <span> <a href="/login">LOGIN</a></span></span>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>
    }
});


var DestinationText = React.createClass({
    render: function(){
        return   <div className="small-12 columns">
                        <h4>LUXURY VACATION VILLA RENTALS IN MIAMI, ASPEN & ST. TROPEZ</h4>
                        <p>Unlike a traditional villa rental agent, Villazzo functions as a true hotel operator. All Villazzo villas are within 15 minutes driving distance from our local operations offices in the heart of Saint-Tropez, Miami Beach, and Aspen. Out of the dozens of luxury homes we inspect, we only select the "Top 10". Most homes which you would find through other agents would not qualify for Villazzo's strict standards of design, quality, and maintenance.</p>
                        <p>If you book such a hand-selected vacation rental home as "VillaHotel", this amazing property is then converted into your own "Private Hotel" - with our signature hotel products, staff, and services. The result is a completely new experience in luxury travel.</p>
                        <p>We invite you to explore our destinations above and choose a luxury villa rental that suits your specific taste and needs. Since we understand that our guests want to customize their service packages, we have created three levels for you to choose from:  5-star VillaHotel, 4-star VillaHotel, and 3-star VillaHotel.</p>
                    </div>
    }
});
