var ContactFormImage = React.createClass({
    render: function(){
        return (
            <Image1 src={this.props.contactBannerImage} alt="" className="" />
        );
    }
});

var InputBox = React.createClass({
    render: function(){
        return (
            <input type={this.props.type} name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} className={this.props.class} />
        );
    }
});
 
var TextArea = React.createClass({
    render: function(){
        return (
            <textarea name={this.props.name} id={this.props.id} rows={this.props.rows} placeholder={this.props.placeholder} className={this.props.class} ></textarea>
        );
    }
});
var ContactFormFields = React.createClass({
    onFormDataSubmit: function(){
        query('contactForm', 'contactFormBtn', 'contact');
    },
    onFormDataReset: function(){
        $('#contactForm').trigger('reset');
    },
    render: function(){
        var self = this;
        var sendbrochure = (this.props.siteid ==1)?<div className="row">
                                <div className="medium-7 medium-centered columns">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <InputBox id="brochure" name="brochure" type="checkbox" value="1" />
                                            <label for="brochure">Send me your VillaHotel brochure</label>
                                        </div>
                                    </div>
                                </div>
                            </div>:'';
        return (
            <div className="row">
                    <div className="medium-8 medium-centered columns contact-form-panel">
                        <form id="contactForm" onsubmit="return false;">
                            <div className="row">
                                <div className="medium-5 columns">
                                    <select name="title" id="title">
                                        <option value="Title">Title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Miss">Miss</option>
                                    </select>
                                    <InputBox type="text" name="firstName" id="firstName" placeholder="First name*" className="required" />
                                    <InputBox type="text" name="lastName" id="lastName" placeholder="Last name*" className="required" />
                                    <InputBox type="text" name="email" id="email" placeholder="Email*" className="required" />
                                    <InputBox type="text" name="phone" id="phone" placeholder="Phone*" className="required" />
                                </div>
                                
                                <div className="medium-5 columns text-right">
                                    <InputBox type="text" name="address" id="address" placeholder={"Address"+(this.props.siteid ==1?'*':'')} className="" />
                                    <InputBox type="text" name="city" id="city" placeholder={"City"+(this.props.siteid ==1?'*':'')} className="" />
                                    <InputBox type="text" name="state" id="state" placeholder={"State"+(this.props.siteid ==1?'*':'')} className="" />
                                    <InputBox type="text" name="zipCode" id="zipCode" placeholder={"Zip Code"+(this.props.siteid ==1?'*':'')} className="" />
                                    <InputBox type="text" name="country" id="country" placeholder={"Country"+(this.props.siteid ==1?'*':'')} className="" />
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="medium-12 medium-centered columns">
                                    <TextArea name="message" id="message" rows="10" placeholder={"Comments"+(this.props.siteid ==2?'*':'')} className="react-contact-textarea" />
                                </div>
                            </div>
                            {sendbrochure}
                            <div className="row">
                                <div className="medium-7 medium-centered columns">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <InputBox id="newsletter" name="newsletter" type="checkbox" value="1" />
                                            <label for="newsletter">Please email me your monthly newsletter</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="medium-7 medium-centered columns">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <label>Please answer the following security code:
                                                <InputBox type="text" id="code" name="code" placeholder="What is 2 + 2?" className="required" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row collapse feedback"></div>
                            <div className="row">
                                <div className="medium-7 medium-centered columns">
                                    <div className="row text-center">
                                        <div className="small-6 columns">
                                            <span className="button small details-button radius expand" onClick={self.onFormDataReset}>RESET</span>
                                        </div>
                                        <div className="small-6 columns">
                                             <button type="button" className="button book-btn radius small expand submit" id="contactFormBtn" onClick={self.onFormDataSubmit}>
                                                <span>SUBMIT</span><i className="fa fa-circle-o-notch fa-spin"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
});


 
var ContactAddress = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="medium-7 medium-centered columns">
                    <div className="row">
                        {this.props.contactDetails.map(function(contactDetail,i){
                            return <div key={i} className="medium-6 columns">
                                <Heading6 className="text-center" value={contactDetail.propertyName} />
                                <p className="text-center">
                                    {contactDetail.address1}<br />
                                    {contactDetail.address2}<br />
                                    {contactDetail.telephone!=''?'Tel: '+contactDetail.telephone:''}<br />
                                    {contactDetail.fax!=''?'Fax: '+contactDetail.fax+'':''}
                                </p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
});
 
