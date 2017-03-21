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
var FooterSecond = React.createClass({
    render:function(){
        var curYear = new Date();
        return <div className="orange-bg-footer" >
                <div className="row"  data-equalizer="">
                    <div className="medium-6 columns">
                        <p className="footer-copyright">&copy; {curYear.getFullYear()} <VillLink /></p>
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

var HeaderTopBar = React.createClass({
    handleSearchClick: function(){
        $("#mainSearchForm").submit();
    },
    render: function(){
        return <section id="top-bar-section" className="visible-for-medium-up bg-black-class">
                <div className="row full-width">
                    <div className="medium-6 columns">
                    
                        <div id="top-bar-logo" className="text-center">
                            <a href="/"><Image1 src="/img/gvd-logo.png" /></a>
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