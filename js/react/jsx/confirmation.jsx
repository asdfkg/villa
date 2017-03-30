var UserRegistrationBlock = React.createClass({
    render: function() {
        return 
            <div style11={{padding:'15px', border:'solid 1px #DBDBDB'}}>
                <p style11={{fontWeight:'bold'}}>GreatVillaDeals Reservation: {this.props.data.propertyName}, {this.props.data.destName}</p>
                <table width="100%" border="0" cellpadding="2" cellspacing="0">
                <tbody>
                    <tr>
                        <td style11={{width:'150px'}}><strong>Booked by</strong></td>
                        <td>Property Owner</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style11={{width:'150px'}}><strong>Check-in date</strong></td>
                        <td>{this.props.data.reservationStartDt}</td>
                    </tr>
                    <tr>
                        <td><strong>Check-out date</strong></td>
                        <td>{this.props.data.reservationEndDt}</td>
                    </tr>
                </tbody>
                </table>
            </div>
    }
});
var GuestUserRegistrationBlock = React.createClass({
    render: function() {
        var data = this.props.data;
        var lineColor = '#C2C2C2';
        var titleColor = '#666666';
        var borderTopCss = {
            borderTop: '1px solid '+lineColor
          };
        var borderBottomCss = {
            borderBottom:'1px solid '+lineColor,
            padding:'5px',
            textAlign:'left',
            color:titleColor
        }
        var borderBottom2Css = {
            borderBottom:'1px solid '+lineColor,
            padding: '10px 0 30px 5px',
            textAlign:'left'
        };
        var whiteBack= {backgroundColor:'#fff'}
        var whiteBackPadding= {backgroundColor:'#fff',padding:'0 20px 0 0',textAlign:'right'}
        return (
            <table width="100%" border="0" cellpadding="0" cellspacing="0" id="templateColumns">
                <tbody>
                    <tr>
                        <td align="center" valign="top" width="100%" className="templateColumnContainer">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td dangerouslySetInnerHTML={{__html: this.props.data.reservationStatusId == 4?
                        'We are pleased to hold your selection for 24 hours. To complete your reservation please contact us directly to speak to a sales representative at +1 (305) 777 0146.<br /><br />Thank you for choosing GreatVillaDeals for your upcoming trip!<br /><br />Below is your booking confirmation with the details of your selection. You can print this receipt for future reference.':
                        'Your reservation has been received. Thank you for choosing GreatVillaDeals for your upcoming trip!<br><br>Below is your booking confirmation, which has also been emailed to you. You can print this receipt for future reference.<br><br>Please note: We still require a signed registration form - it has been pre-filled with all your information and emailed to you as attachment of your confirmation. Please sign it and fax back to us at +1 (305) 777 0147 or email it to <a href="mailto:villas@greatvilladeals.com ">villas@greatvilladeals.com </a>. Please return the signed reservation form within 24 hours so your booking can be confirmed.'
                }} ></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" width="50%" className="templateColumnContainer">
                            <table width="100%" border="0" cellspacing="0" cellpadding="5" style={{marginTop:'10px'}}>
                                <tbody> 
                                <tr>
                                    <th align="left">RESERVATION #: {padLeft(data.reservationId,6)}</th>
                                    <th align="left">DATE: {data.reservationCreateDt}</th>
                                </tr>
                                </tbody> 
                            </table>
                        </td>
                    </tr>
			
			
                    <tr>
                        <td align="left" valign="top" width="100%" className="templateColumnContainer" style={borderTopCss}>
                            <table width="50%" border="0" cellspacing="0" cellpadding="5">
                            <tbody> 
                                <tr>
                                    <td colspan="2" style={{fontWeight:'bold',color:titleColor}}>GUEST INFORMATION</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{data.reservationFirstname}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{data.reservationLastname}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{data.reservationEmail}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{data.reservationPhone}</td>
                                </tr>

                                {(data.reservationCompany)?
                                <tr>
                                    <td>Company</td>
                                    <td>{data.reservationCompany}</td>
                                </tr>:''
                                }

                                if ($row_rs_reservation_property['reservationStreet1']) $output .= '
                                <tr>
                                    <td>Street</td>
                                    <td>{data.reservationStreet1}{data.reservationStreet2?data.reservationStreet2:''}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{data.reservationCity}</td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>{data.reservationState}</td>
                                </tr>
                                <tr>
                                    <td>Zip Code</td>
                                    <td>{data.reservationPostcode}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{data.reservationCountry}</td>
                                </tr>
                                </tbody> 
                                </table>
                        </td>
                    </tr>
						
			
                    <tr>
                        <td align="center" valign="top" width="100%" className="templateColumnContainer" style11={borderTopCss}>
                            <table width="100%" border="0" cellspacing="0" cellpadding="5">
                            <tbody> 
                                <tr>
                                    <td style11={{fontWeight:'bold',textAlign:'left',color:titleColor}}>ADDITIONAL SERVICES (billed separately at check-out)</td>
                                </tr>
                                <tr>
                                    <td>
                                        {data.reservationAdditionalServices}
                                    </td>
                                </tr>
                                </tbody> 
                            </table>
                        </td>
                    </tr>';
			
			
                    <tr>
                        <td align="center" valign="top" width="100%" className="templateColumnContainer" style11={borderTopCss}>
                            <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                <tbody> 
                                <tr>
                                    <th style11={borderBottomCss}>DESTINATION</th>
                                    <th style11={borderBottomCss}>DATES</th>
                                    <th style11={borderBottomCss}>NIGHTS</th>
                                    <th style11={borderBottomCss}>TOTAL</th>
                                </tr>
                                <tr>
                                    <td valign="top" style11={borderBottom2Css}>Villa {data.propertyName}, {data.destName}</td>
                                    <td valign="top" style11={borderBottom2Css}>{data.reservationStartDt} - {data.reservationEndDt}</td>
                                    <td valign="top" style11={borderBottom2Css}>{data.numberOfNights}</td>
                                    <td valign="top" style11={borderBottom2Css}>{data.reservationRateCurrency}{data.reservationRateValue}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style11={{backgroundColor:'#fff'}}>&nbsp;</td>
                                    <td style11={whiteBackPadding}>Subtotal</td>
                                    <td style11={{backgroundColor:'#fff',padding:'0 0 0 10px',textAlign:'left'}}>{data.reservationRateCurrency}{data.reservationRateValue}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style11={whiteBack}>&nbsp;</td>
                                    <td style11={whiteBackPadding}>Tax</td>
                                    <td style11={{backgroundColor:'#fff',padding:'0 0 0 10px',textAlign:'left'}}>{data.reservationRateCurrency}{data.reservationRateTax*data.reservationRateValue/ 100}</td>
                                </tr>
                                <tr style11="font-weight:bold;">
                                    <td colspan="2" style11={whiteBack}>&nbsp;</td>
                                    <td style11={whiteBackPadding}>Total</td>
                                    <td style11={{backgroundColor:'#fff',padding:'0 0 0 10px',textAlign:'left'}}>{data.reservationRateCurrency}{data.reservationRateTotal}</td>
                                </tr>
                                </tbody> 
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            );
    }
});


var Confirmation1 = React.createClass({
    render: function() {
        var data = this.props.data;
        var reservationId = this.props.reservationId;
        var confirmationList = function(){
            if(reservationId){
                if(data.userGroupId==3){
                    return <UserRegistrationBlock data={data} />
                }else{
                    return <GuestUserRegistrationBlock data={data} />
                }                
            }else{
                return 'An error occurred, please try again.'
            }
        };
        return <div className="row">
	        <div className="columns">
                    {confirmationList()}
	        </div>
	    </div>
    }
});
var Confirmation = React.createClass({
    render: function() {
        return <div className="row">
	        <div className="columns" dangerouslySetInnerHTML={{__html: body}}>
                    
	        </div>
	    </div>
    }
});
