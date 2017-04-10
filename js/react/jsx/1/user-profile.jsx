var ProfileBannerImage = React.createClass({
    render: function(){
        return (
            <Image1 src={this.props.profileBannerImage} alt="" className="" />
        );
    }
});

var ProfileHeading = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <Heading1 value="USER EDIT" />
                </div>
            </div>
        );
    }
});


var ProfileForm = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <form action="" method="post" name="userEditForm" id="userEditForm">
                        <input name="userId" id="userId" type="hidden" defaultValue={this.props.ProfileData[0].userId}   onChange={function(){}} />
                        <input type="hidden" name="action" defaultValue="update"   onChange={function(){}} />
                        <table border="0" cellspacing="0" cellpadding="2">
                            <tbody>
                                <tr>
                                    <td valign="top">First Name</td>
                                    <td valign="top"><input name="firstName" id="firstName" type="text" defaultValue={this.props.ProfileData[0].firstName} className="textField"  onChange={function(){}} /></td>
                                </tr>
                                <tr>
                                    <td valign="top">Last Name</td>
                                    <td valign="top"><input name="lastName" id="lastName" type="text" defaultValue={this.props.ProfileData[0].lastName} className="textField"  onChange={function(){}} /></td>
                                </tr>
                                <tr>
                                    <td valign="top">Company</td>
                                    <td valign="top"><input name="userCompany" id="userCompany" type="text" defaultValue={this.props.ProfileData[0].userCompany==null?"":this.props.ProfileData[0].userCompany.length} className="textField"  onChange={function(){}} /></td>
                                </tr>
                                <tr>
                                    <td valign="top">Email</td>
                                    <td valign="top"><input name="userEmail" id="userEmail" type="text" defaultValue={this.props.ProfileData[0].userEmail} className="textField"  onChange={function(){}} /></td>
                                </tr>
                                <tr>
                                    <td valign="top">Password</td>
                                    <td valign="top"><input type="password" name="userPassword" id="userPassword" defaultValue={this.props.ProfileData[0].userPassword} className="textField"  onChange={function(){}} /></td>
                                </tr>
                                <tr>
                                    <td valign="top">Commission Villa (%)</td>
                                    <td valign="top"><input name="userCommissionVillaHotel" id="userCommissionVillaHotel" type="text" defaultValue={this.props.ProfileData[0].userCommissionVillaHotel} className="textField" disabled="disabled"   onChange={function(){}} /></td>
                                </tr>
                                <tr> 
                                    <td valign="top">Commission Service (%)</td>
                                    <td valign="top"><input name="userCommissionBasicLinen" id="userCommissionBasicLinen" type="text" defaultValue={this.props.ProfileData[0].userCommissionBasicLinen} className="textField" disabled="disabled"   onChange={function(){}}  /></td>
                                </tr>
                                <tr>
                                    <td valign="top">&nbsp;</td>
                                    <td valign="top"><input type="submit" className="button" name="userEditBtn" id="userEditBtn" defaultValue="Save" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
});