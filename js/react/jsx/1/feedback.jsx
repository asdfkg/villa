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
        $('#test').html({this.props.body}); 

        tinymce.init({
            selector: '#test',
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
        });
    },
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <form id="feedbackRequestForm" onsubmit="return false;">
                        <input type="hidden" name="reservationId" id="reservationId" value={this.props.reservationId} />
                        <input type="hidden" name="reservationName" id="reservationName" value={this.props.reservationName} />
                        <input type="hidden" name="reservationEmail" id="reservationEmail" value={this.props.reservationEmail} />
                        <input type="hidden" name="messageText" id="messageText" />
                        <textarea id="test"></textarea>
                        <textarea name="messageHtml" id="messageHtml" className="feedback-textarea">
                            
                        </textarea>
                        <button className="button" id="feedbackRequestBtn" onclick="$('#messageText').val(tinymce.get('messageHtml').getContent());
                                                                                            query(form.id, id, 'feedbackRequest');"><span id="feedbackRequestBtnHtml">Send</span></button>
                        <div className="feedback"></div>
                    </form>
                </div>
            </div>
        );
    }
});
