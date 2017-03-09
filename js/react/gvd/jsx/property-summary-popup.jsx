

var PropertySummarySharePopupForm = React.createClass({
    closeButtonClick: function(){
        $('#propertyShareModal').foundation('reveal', 'close');
    },
    shareButtonClick: function(){
        query('propertyShareModalForm', 'propertyShareModalFormBtn', 'propertyShare');
    },
    getInitialState: function () {
        var states     = {propertyShareEmail:this.props.data.propertyShareEmail};
        return states;
    },
    handleChange: function(event) {
        return this.setState({propertyShareEmail: event.target.value});
      },
    render: function() {
        var unescapeHTML= function(data){
            return {__html:data};
        };
        var propertyShareEmail = this.state.propertyShareEmail;
        var legendText = "Share Villa "+this.props.data.propertyName; 
        return (
            <span>
                <div className="reveal-modal medium" id="propertyShareModal" data-reveal>
                    <form id="propertyShareModalForm" onsubmit="return false;">
                        <input type="hidden" id="propertyShareModalPropertyName" name="propertyShareModalPropertyName" value={this.props.data.propertyName} />
                        <input type="hidden" id="propertyShareModalPropertyUrl" name="propertyShareModalPropertyUrl" value={this.props.data.propertyShareLink} />
                        <fieldset>
                            <legend dangerouslySetInnerHTML={unescapeHTML(legendText)}></legend>
                            <div className="row collapse prefix-radius">
                                    <div className="columns">
                                        <input type="text" name="propertyShareModalEmailFrom" id="propertyShareModalEmailFrom" className="required" placeholder="Enter your email" value={propertyShareEmail} onChange={this.handleChange} />
                                    </div>
                            </div>
                            <div className="row collapse prefix-radius">
                                    <div className="columns">
                                        <input type="text" name="propertyShareModalEmailTo" id="propertyShareModalEmailTo" className="required" placeholder="Enter your friend's email" />
                                    </div>
                            </div>
                            <div className="row collapse feedback"></div>
                            <div className="row collapse">
                                <div className="right">
                                <button type="button" className="button details-button secondary tiny radius" onClick={this.closeButtonClick}>Cancel</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="button book-btn submit tiny radius" id="propertyShareModalFormBtn" onClick={this.shareButtonClick}><span>Share</span><i className="fa fa-circle-o-notch fa-spin"></i></button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="reveal-modal medium" id="propertyShareModalFeedback" data-reveal>
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


