var OverviewHeading = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <Heading1 value="RESERVATIONS" />
                </div>
            </div>
        );
    }
});


var reservationOverview = React.createClass({
    render: function(){
        return (
            <tr>
                <td valign="top">{this.props.overviewData.reservedDate}</td>
                <td valign="top">{this.props.overviewData.propertyName}</td>
                <td valign="top">
                    <span className="fakeLink" onclick="modalAlert('userInfo{this.props.overviewData.reservationId}', {this.props.overviewData.name}, '');">
                        {this.props.overviewData.name}
                    </span>
                </td>
                
            </tr>
        )
}});

var StatusForm = React.createClass({
    render: function(){
        var reservationStatusId = this.props.reservationStatusId; 
        return (
            <form action="" method="post" name="statusForm">
                <input name="action" type="hidden" value="update" />
                <input name="reservationId" type="hidden" value={this.props.reservationId} />
                <select name="status" onChange="submit();" >
                    {this.props.overviewReservationStatus.map(function(option,i) {
                       
                        return <option key={i} value={option.reservationStatusId} selected={option.reservationStatusId==reservationStatusId }  >
                                {option.reservationStatusName}
                        </option>
                    })}
                </select>
            </form>
        )
    }
});


var DeletePropertyRow = React.createClass({
    deleteProperty:function(reservationId){
        $('#delete'+reservationId).css('display', 'none');
        $('#deleteConfimation'+reservationId).css('display','block'); 
    },
    propertyStyle:function(reservationId){
        $('#delete'+reservationId).css('display','block');
        $('#deleteConfimation'+reservationId).css('display','none');
    },
    render: function(){
        return (
            <td valign="top">
                <span id={"delete"+this.props.reservationId} onClick={()=>this.deleteProperty(this.props.reservationId)} className="fakeLink">
                        <i className="fa fa-trash-o" title="Delete Reservation"></i>
                </span>
                <span id={"deleteConfimation"+this.props.reservationId} className="display-false">
                    Delete Reservation?<br />
                    <a href={"?action=delete&reservationId="+this.props.reservationId}>yes</a> | 
                    <span onClick={()=>this.propertyStyle(this.props.reservationId)} className="fakeLink">
                        no
                    </span>
                </span>
            </td>
        )
    }
});

var RateImage = React.createClass({
    render: function(){
        return (
            <img src={this.props.src} width="15" height="15" alt="rating" id="rating1" className="overview-margin-img-right" />
        )
    }
});

var FeedbackInfo = React.createClass({
    render: function(reservationId,reservationFirstname, reservationLastname, reservationFeedbackRating, reservationFeedbackComment){
        return (
            <table width="400" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td valign="top">Rating:</td>
                        <td valign="top">
                            <img src={"media/image/ratings/star-"+reservationFeedbackRating>=1 ? 'on' : 'off'+".png"} width="15" height="15" alt="rating" id="rating1" className="feedbackMarFive" />
                            <img src={"media/image/ratings/star-"+reservationFeedbackRating>=2 ? 'on' : 'off'+".png"} width="15" height="15" alt="rating" id="rating1" className="feedbackMarFive" />
                            <img src={"media/image/ratings/star-"+reservationFeedbackRating>=3 ? 'on' : 'off'+".png"} width="15" height="15" alt="rating" id="rating1" className="feedbackMarFive" />
                            <img src={"media/image/ratings/star-"+reservationFeedbackRating>=4 ? 'on' : 'off'+".png"} width="15" height="15" alt="rating" id="rating1" className="feedbackMarFive" />
                            <img src={"media/image/ratings/star-"+reservationFeedbackRating>=5 ? 'on' : 'off'+".png"} width="15" height="15" alt="rating" id="rating1" className="feedbackMarFive" />
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">Comment:</td>
                        <td valign="top">' . $row_rs_reservationProperty['reservationFeedbackComment'] . '</td>
                    </tr>
                </tbody>
            </table>
        )
    }
});

var PropertyFeedbackRow = React.createClass({
    
    
    propertyFeedbackModelAlert:function(reservationId,reservationFirstname, reservationLastname,reservationFeedbackRating,reservationFeedbackComment, type){
        modalAlert('feedbackInfo'+reservationId, reservationFirstname+' '+reservationLastname,
                    function()
                    {type=='feedbackinfo'?<FeedbackInfo reservationId={reservationId} reservationFirstname={reservationFirstname} reservationLastname={reservationLastname} 
                            reservationFeedbackRating={reservationFeedbackRating} reservationFeedbackComment={reservationFeedbackComment} />:<UserInfo />} 
        )
    },
    render: function(){
        var feedbackData='';
        if(this.props.reservationFeedbackCreateDt){
            var feedbackData = <span className="fakeLink" onClick={()=>this.propertyFeedbackModelAlert(this.props.reservationId,this.props.reservationFirstname, this.props.reservationLastname,this.props.reservationFeedbackRating,reservationFeedbackComment,feedbackinfo )} >
                    </span>
        }else{
            if(this.props.reservationFeedback){
               var feedbackData = <i className="fa fa-check color-green" title="Feedback Requested"></i>
            }else{
                var feedbackData = <a href={"/reservations/overview/feedback/"+this.props.reservationId}>
                    <i className="fa fa-comment" title="Request Feedback"></i>
                </a>               
            }
        }
        return (
            <td valign="top">
            {feedbackData}
            </td>
        )
    }
});





var OverviewList = React.createClass({
    
    render: function(){
        var allReservations = this.props.allReservations;
        var getView = this.props.getView;
        var overviewReservationStatus = this.props.overviewReservationStatus; 
        return (
            
            <div className="row">
                <div className="columns">
                    {this.props.overviewDestinations.map(function(destination,i) {
                        return <div key={i}>
                            <p className="overview-para">{destination.destName}</p>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" className="overview-table">
                                <tbody>
                                <tr>
                                    <th valign="top">Reserved</th>
                                    <th valign="top">Property</th>
                                    <th valign="top">Full Name</th>
                                    <th valign="top" className="overview-white-space">Check-in</th>
                                    <th valign="top">Days</th>
                                    <th valign="top">Total</th>
                                    <th valign="top">C/O</th>
                                    <th valign="top">Comm</th>
                                    <th valign="top" className="overview-status-td" >Status</th>
                                    <th valign="top">&nbsp;</th>
                                    <th valign="top" >&nbsp;</th>
                                </tr>
                                <tr>
                                    <td valign="top" colSpan={11} className="overview-blank-td">&nbsp;</td>
                                </tr>

                                {allReservations[destination.destId].map(function(property,ii) { 
                                    return <tr>
                                            <td valign="top">{property.reservedDate}</td>
                                            <td valign="top">{property.propertyName}</td>
                                            <td valign="top">
                                                <span className="fakeLink" onclick="modalAlert('userInfo{property.reservationId}', {property.fullname}, '');" /> 
                                                {property.fullname}
                                            </td>
                                            <td valign="top">
                                                {property.checkIn}
                                            </td>
                                            <td> {property.days} </td>
                                            <td> {property.total} </td>
                                            <td> {property.co} </td>
                                            <td> {property.comm} </td>
                                            <td> 
                                                <StatusForm  overviewReservationStatus = {overviewReservationStatus} reservationId={property.reservationId} reservationStatusId={property.reservationStatusId} />
                                            </td>
                                            <td> 
                                                <DeletePropertyRow  reservationId={property.reservationId}  />
                                            </td>
                                            <td> 
                                                <PropertyFeedbackRow  
                                                    reservationFeedback         ={property.reservationFeedback} 
                                                    reservationFeedbackComment  ={property.reservationFeedbackComment}
                                                    reservationFeedbackCreateDt ={property.reservationFeedbackCreateDt} 
                                                    reservationFeedbackRating   ={property.reservationFeedbackRating} 
                                                    reservationTitle            ={property.reservationTitle} 
                                                    reservationLastname         ={property.reservationLastname}
                                                    reservationFirstname        ={property.reservationFirstname} 
                                                    reservationId               ={property.reservationId}
                                                />
                                            </td>
                                        </tr>
                                })}
                                <tr>
                                    <td colSpan={10}>{getView=='all'?<a href="">View Less</a>:<a href="?view=all">View All</a>}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    })}
                </div>
            </div>

        );
    }
});
