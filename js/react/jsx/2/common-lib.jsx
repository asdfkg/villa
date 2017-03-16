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

var HeaderTopBarMenu = React.createClass({
    render: function(){
        var _data= this.props.menuItems;
        return <section id="top-bar-navigation" className="top-bar-section visible-for-medium-up">
                <nav className="top-bar" id="header-nav" data-topbar role="navigation">
                <ul className="button-group">
                       { _data.map(function(object,i){
                            if(object.child!= undefined){
                                return <li className="has-dropdown not-click">                        
                                        <span className="hide-for-large-up">{object.label}</span>
                                        <span className="show-for-large-up pd-10">{object.label}</span>                            
                                        <ul className="dropdown">
                                            {object.child.map(function(o,ii){
                                                return <li className="text-left"><a href={o.href}>{o.label}</a></li>
                                            })}
                                        </ul>
                                    </li>
                            }
                            else{
                               return <li>
                                        <a href={object.href}>
                                            <span className="hide-for-large-up">{object.label}</span>
                                            <span className="show-for-large-up">{object.label}</span>
                                        </a>
                                    </li>
                            }
                        })}
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

                    { this.props.menuItems.map(function(object,i){
                            if(object.child!= undefined){
                                return <li className="has-submenu">
                                        <a className="title">{object.label}</a>
                                            <ul className="left-submenu">
                                                <li className="back"><a href="#">Back</a></li>
                                                {object.child.map(function(o,ii){
                                                return <li className="text-left"><a href={o.href}>{o.label}</a></li>
                                            })}
                                        </ul>
                                    </li>
                            }
                            else{
                               return <li><a href={object.href}>{object.label}</a></li>
                            }
                        })}
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


var PropertySummaryInterestedPopupForm = React.createClass({
    closeButtonClick:function(){
        $('#propertyInterestedModal').foundation('reveal', 'close');
    },
    submitButtonClick:function(){
        query('propertyInterestedModalForm', 'propertyInterestedModalFormBtn', 'propertyInterested');
    },
    render: function() {
        var unescapeHTML= function(data){
            return {__html:data};
        };
        var legendText = "Contact us about Villa "+this.props.data.propertyName; 
        return (
            <span>
                <div className="reveal-modal medium" id="propertyInterestedModal" data-reveal>
                    <form id="propertyInterestedModalForm" onsubmit="return false;">
                        <input type="hidden" id="propertyInterestedModalPropertyName" name="propertyInterestedModalPropertyName" value={this.props.data.propertyName} />
                        <fieldset>
                            <legend dangerouslySetInnerHTML={unescapeHTML(legendText)}></legend>
                            <div className="row collapse prefix-radius">
                                <div className="large-6 columns">
                                    <input type="text" name="propertyInterestedModalFirstName" id="propertyInterestedModalFirstName" className="required" placeholder="Enter your first name" />
                                </div>
                                <div className="large-6 columns">
                                    <input type="text" name="propertyInterestedModalLastName" id="propertyInterestedModalLastName" className="required" placeholder="Enter your last name" />
                                </div>
                            </div>
                            <div className="row collapse prefix-radius">
                                <div className="large-6 columns">
                                    <input type="text" name="propertyInterestedModalEmail" id="propertyInterestedModalEmail" className="required" placeholder="Enter your email" />
                                </div>
                                <div className="large-6 columns">
                                    <input type="text" name="propertyInterestedModalPhone" id="propertyInterestedModalPhone" className="required" placeholder="Enter your phone number" />
                                </div>
                            </div>
                            <div className="row collapse prefix-radius">
                                <div className="columns">
                                    <textarea name="propertyInterestedModalMessage" id="propertyInterestedModalMessage" placeholder="Enter your message" style={{height: '100px', resize: 'none'}}></textarea>
                                </div>
                            </div>
                            <div className="row collapse feedback"></div>
                            <div className="row collapse">
                                <div className="right">
                                    <button type="button" className="button details-button secondary radius tiny" onClick={this.closeButtonClick}>Cancel</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="button book-btn submit radius tiny" id="propertyInterestedModalFormBtn" onClick={this.submitButtonClick}>
                                        <span>Submit</span><i className="fa fa-circle-o-notch fa-spin"></i>
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="reveal-modal medium" id="propertyInterestedModalFeedback" data-reveal>
                    <form>
                        <fieldset>
                            <legend dangerouslySetInnerHTML={unescapeHTML(legendText)}></legend>
                            <div className="row">
                                <div className="columns"></div>
                            </div>
                        </fieldset>
                    </form>
                    <a className="close-reveal-modal" aria-label="Close">&#215;</a>
                </div>
            </span>
        );
    }
});

var PropertySummaryDatePopupForm = React.createClass({
    componentDidMount: function(){
        $('#checkInDt1').datepicker({
            defaultDate: '+1d',
            minDate: '+1d',
            onClose: function(selectedDate)
            {
                if (selectedDate)
                {
                    var nextDayDate = $(this).datepicker('getDate', '+3d');
                    nextDayDate.setDate(nextDayDate.getDate() + 3);
                    $('#checkOutDt1').datepicker('option', 'minDate', nextDayDate);
                }
            }
        });
        $('#checkOutDt1').datepicker(
            {defaultDate: '+1d',
            minDate: '+1d',
        });
        $(document).foundation();
    },
    submitButtonClick: function(){
        query('propertyAvailabilityModalForm', 'propertyAvailabilityModalFormBtn', 'propertyAvailability');
    },
    closeButtonClick: function(){
        $('#propertyAvailabilityModal').foundation('reveal', 'close');
    },
    render: function() {
        var unescapeHTML= function(data){
            return {__html:data};
        };
        var legendText = "Check Villa "+this.props.data.propertyName+"\'s Availability"; 
        var minDayTxt = (this.props.data.minBookDays>0)?<span>&nbsp;<b>Minimum stay </b>180 nights<input type="hidden" name="minBookingDays" value={this.props.data.minBookDays}/> </span>:'';
        return (
            <span>
                <div className="reveal-modal medium" id="propertyAvailabilityModal" data-reveal>
                    <form id="propertyAvailabilityModalForm" onsubmit="return false;">
                        <input type="hidden" id="propertyAvailabilityModalPropertyId" name="propertyAvailabilityModalPropertyId" value={this.props.data.propertyId} />
                        <input type="hidden" name="redirect" value={"/reservations/services?property="+this.props.data.propertyName} />
                        <fieldset>
                                <legend dangerouslySetInnerHTML={unescapeHTML(legendText)}></legend>
                                <span className='minDayTxt'>{minDayTxt}</span>
                                <div className="row collapse prefix-radius">
                                    <div className="large-6 columns">
                                        <input type="text" name="checkInDt" id="checkInDt1" className="required" placeholder="Enter your arrival date" onChange={function() {}} value={this.props.data.checkInDt} />
                                    </div>
                                    <div className="large-6 columns">
                                        <input type="text" name="checkOutDt" id="checkOutDt1" className="required" placeholder="Enter your departure date" onChange={function() {}} value={this.props.data.checkOutDt} />
                                    </div>
                                </div>
                                <div className="row collapse feedback"></div>
                                <div className="row collapse">
                                    <div className="right">
                                        <button type="button" className="button secondary radius details-button tiny" onClick={this.closeButtonClick}>Cancel</button> &nbsp;&nbsp;&nbsp;
                                        <button type="button" className="button book-btn radius submit tiny" id="propertyAvailabilityModalFormBtn" onClick={this.submitButtonClick}><span>Check</span><i className="fa fa-circle-o-notch fa-spin"></i></button>
                                    </div>
                                </div>
                        </fieldset>
                    </form>
                </div>

                <div className="reveal-modal medium" id="propertyAvailabilityModalFeedback" data-reveal>
                    <form>
                        <fieldset>
                            <legend dangerouslySetInnerHTML={unescapeHTML(legendText)}></legend>
                            <div className="row">
                                <div className="columns"></div>
                            </div>
                        </fieldset>
                    </form>
                    <a className="close-reveal-modal" aria-label="Close">&#215;</a>
                </div>
            </span>
        );
    }
});
