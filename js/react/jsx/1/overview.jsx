var OverviewBannerImage = React.createClass({
    render: function(){
        return (
            <Image1 src={this.props.overviewBannerImage} alt="" className="" />
        );
    }
});

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
    propertyStyle:function(a,b){
         alert(a); 
        alert(b); 
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
                    <span onClick={()=>this.propertyStyle('nishant','sri')} className="fakeLink">
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

var PropertyFeedbackRow = React.createClass({
    render: function(){
        return (
            <span>
                test
            </span>
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
                                            <td> <PropertyFeedbackRow  />
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
