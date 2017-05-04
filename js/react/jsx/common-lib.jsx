var Image1 = React.createClass({
    render: function () {
        return <img src={this.props.src} alt={this.props.alt} style={this.props.styles} className={this.props.classes} width={this.props.width} />
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
var Heading5 = React.createClass({
    render: function(){
        return <h5>{this.props.value}</h5>
    }
});
var VillLink = React.createClass({
    render: function(){
        return <Anchor href="https://www.villazzo.com" value="VILLAZZO" />
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
var Heading3 = React.createClass({
    render: function () {
        return <h3 dangerouslySetInnerHTML={{__html:this.props.value}} className={this.props.classes}></h3>
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
        if(this.props.step==4)
            return false;
        window.location.href=this.props.stepUrl2;
    },
    redirectStep1:function(){
        if(this.props.step==4)
            return false;
        
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
        var step2Text = this.props.siteid=="1"?" &nbsp;Customize Your <br /> Service Experience":"Review your<br/>Discount";
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
                                        <li className={step>=2?'active':''} onClick={self.redirectStep2} dangerouslySetInnerHTML={{__html:step2Text}}></li>
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
        return <p dangerouslySetInnerHTML={unescapeHTML(this.props.value)} className={this.props.className} ></p>
    }
});


/* Menus Component */
var MobileHeaderTopBar = React.createClass({
    render: function(){
        return <nav className="tab-bar show-for-small-only">
                    <section className="left-small">
                        <a className="left-off-canvas-toggle menu-icon" href="#"><span></span></a>
                    </section>
                    <section className="middle tab-bar-section">
                        <h1 className="title"><a href="/"><Image1 src={"/img/"+(this.props.siteid==1?"":"gvd-")+"logo.png"} styles={{height: "35px"}}/></a></h1>
                    </section>
                    {this.props.siteid==1?
                    <section className="right-small">
                        <i className="fa fa-search" onClick={function(){$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right'); $('#search').focus();}}></i>
                        <i className="fa fa-user" onClick={function(e){location.href='/login';}}></i>
                    </section>:''}
                </nav>
    }
});
var MobileHeaderTopBarMenu = React.createClass({
    render: function(){
        var divStyle = {
            padding: '2px 0 0 0 !important'
          };
    
        return  <aside className="left-off-canvas-menu">
                    <ul className="off-canvas-list">
                        <li><label>{this.props.siteid==1?'VILLAZZO':'GREATVILLADEALS'}</label></li>
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
                                return <li key={i} className="has-submenu">
                                        <a className="title">{object.label}</a>
                                            <ul className="left-submenu">
                                                <li className="back"><a href="#">Back</a></li>
                                                {object.child.map(function(o,ii){
                                                return <li key={i+""+ii} className="text-left"><a href={o.href}>{o.label}</a></li>
                                            })}
                                        </ul>
                                    </li>
                            }
                            else{
                               return <li key={i} ><a href={object.href}>{object.label}</a></li>
                            }
                        })}
                    </ul>
            </aside>
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
                                return <li key={i} className="has-dropdown not-click">                        
                                        <span className="hide-for-large-up">{object.label}</span>
                                        <span className="show-for-large-up pd-10">{object.label}</span>                            
                                        <ul className="dropdown">
                                            {object.child.map(function(o,ii){
                                                return <li key={i+""+ii} className="text-left"><a href={o.href}>{o.label}</a></li>
                                            })}
                                        </ul>
                                    </li>
                            }
                            else{
                               return <li key={i}>
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
var PropertySummaryInterestedPopupForm = React.createClass({
    closeButtonClick:function(){
        $('#propertyInterestedModal').foundation('reveal', 'close');
    },
    submitButtonClick:function(){
        ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Property Form', eventValue: 1});
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
