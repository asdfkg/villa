var FeedbackHeading = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <Heading1 value="FEEDBACK REQUEST" />
                </div>
            </div>
        );
    }
});

var FeedbackContent = React.createClass({
    componentDidMount: function(){ 
        setTimeout(function(){
        tinymce.init({
            selector: '#messageHtml',
            height: 500,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: [
                '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });},2000);
    },
    submitClick: function(){
        return false;
    },
    sendFeedbackButtonClick: function(){
        $('#messageText').val(tinymce.get('messageHtml').getContent());
        query('feedbackRequestForm', 'feedbackRequestBtn', 'feedbackRequest');
        return false;
    },
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <form id="feedbackRequestForm" onSubmit={this.submitClick} >
                        <input type="hidden" name="reservationId" id="reservationId" value={this.props.feedbackData[0].reservationId} />
                        <input type="hidden" name="reservationName" id="reservationName" value={this.props.feedbackData[0].reservationName} />
                        <input type="hidden" name="reservationEmail" id="reservationEmail" value={this.props.feedbackData[0].reservationEmail} />
                        <input type="hidden" name="messageText" id="messageText" />
                       <textarea name="messageHtml" id="messageHtml" className="feedback-textarea" defaultValue={this.props.feedbackData[0].body}></textarea>
                        <button className="button" type="button" id="feedbackRequestBtn" onClick={this.sendFeedbackButtonClick}><span id="feedbackRequestBtnHtml">Send</span></button>
                        <div className="feedback"></div>
                    </form>
                </div>
            </div>
        );
    }
});
