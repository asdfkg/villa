var AddUser = React.createClass({
    ReactGroupChange:function(){
        
        if($("select#userGroup").val()==3){
            $('#propertyDropDown').show();
        }else{
            $('#propertyDropDown').hide();
        }
    },
    render: function(){
        return <div className="row">
                <div className="columns">
                    <form action="" method="post" name="userAddForm" id="userAddForm">
                        <input type="hidden" name="action" value="add" />
                        <table border="0" cellspacing="0" cellpadding="2">
                        <tbody>
                            <tr>
                                <td valign="top">User Type</td>
                                <td valign="top">
                                    <select name="userGroup" id="userGroup" id="userGroup" onChange={this.ReactGroupChange} className="dropDown">
                                        <option value="">---</option>
                                        {this.props.userGroups.map((group,i)=>
                                            <option key={"grp"+i} value={group.USERGROUP_ID}>{group.USERGROUP_NAME}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr id="propertyDropDown" style={{display:'none'}}>
                                <td valign="top">Property</td>
                                <td valign="top">
                                    {this.props.propertyList.map((property,i)=>
                                        <div key={i+"props"}><input name="property[]" type="checkbox" value={property.propertyId} />
                                        {property.propertyName}<br /></div>
                                    )}
                                 </td>
                            </tr>
                            <tr>
                                <td valign="top">First Name</td>
                                <td valign="top"><input name="firstName" id="firstName" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Last Name</td>
                                <td valign="top"><input name="lastName" id="lastName" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Company</td>
                                <td valign="top"><input name="userCompany" id="userCompany" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Email</td>
                                <td valign="top"><input name="userEmail" id="userEmail" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Password</td>
                                <td valign="top"><input name="userPassword" id="userPassword" type="password" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Commission Villa (%)</td>
                                <td valign="top"><input name="userCommissionVillaHotel" id="userCommissionVillaHotel" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Commission Service (%)</td>
                                <td valign="top"><input name="userCommissionBasicLinen" id="userCommissionBasicLinen" type="text" className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">&nbsp;</td>
                                <td valign="top"><input type="submit" className="button" name="userAddBtn" id="userAddBtn" value="Submit" /></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
    }
})
var UserList = React.createClass({
    
    render: function(){
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var dtFormat=function(dt){
        return (moment(dt).format("MMMM") + " " +moment(dt).format("D") + ", " +moment(dt).format("YYYY"));
    }
        return (
            <div className="row">
                <div className="columns">
                    <div style={{float:'left',width:'100%'}}>
                        <p><Anchor href="/reservations/user/add" value="Add a new user" /></p>
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr style={{fontWeight:'bold'}}>
                                  <td valign="top" style={{width:'150px'}}>Type</td>
                                  <td valign="top" style={{width:'200px'}}>Name</td>
                                  <td valign="top" style={{width:'250px'}}>Email</td>
                                  <td valign="top" style={{width:'150px'}}>Created</td>
                                  <td valign="top" style={{width:'150px'}}>Last Login</td>
                                  <td valign="top" style={{width:'50px'}}>&nbsp;</td>
                                </tr>
                                 
                                <tr>
                                  <td valign="top" colSpan="6" style={{backgroundColor:'#dac172',height:'5px',padding:'0px'}}>&nbsp;</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users.map((user,i)=>
                                    <tr key={i}>
                                        <td valign="top">{user.USERGROUP_NAME}</td>
                                        <td valign="top"><a href={"/reservations/user/"+user.USER_ID}>{user.USER_FIRSTNAME} {user.USER_LASTNAME}</a></td>
                                        <td valign="top">{user.USER_EMAIL}</td>
                                        <td valign="top">{dtFormat(user.USER_CREATE_DT,"YYYY-MM-DD")}</td>
                                        <td valign="top">{user.LAST_USER_LOG_DT?dtFormat(user.LAST_USER_LOG_DT,"YYYY-MM-DD"):"NEVER"}</td>
                                        <td valign="top"><a href={"?action=deleteUser&userId="+user.USER_ID}><i className="fa fa-trash-o" title="Delete user"></i></a></td>
                                    </tr>
                                )}
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        );
    }
});


var EditUser = React.createClass({
    render: function(){
        {/* var options = this.props.UserGroup.map(function(option,i) {
            return (
                <option key={i} value={option.userGroupId} {option.userGroupId == option.userUserGroupId 0 && sselected="selected" } >
                    {option.userGroupName}
                </option>
            )
        }); */}
        return (
            <div className="row">
                <div className="columns">
                    <form action="" method="post" name="userEditForm" id="userEditForm">
                    <input name="userId" id="userId" type="hidden" value={this.props.UserData.userId} />
                    <input type="hidden" name="action" value="update" />
                    <table border="0" cellspacing="0" cellpadding="2">
                        <tbody>

                            <tr>
                                <td valign="top">User Type</td>
                                <td valign="top">
                                    <select name="userGroup" id="userGroup" className="dropDown" defaultValue={UserData.userUserGroupId} >
                                       {this.props.UserGroup.map((group,i)=>
                                            <option key={i+'grp'} value={group.USERGROUP_ID}>{group.USERGROUP_NAME}</option>
                                        )}

                                    </select>
                                </td>
                            </tr>

                            {
                                this.props.UserData.userUserGroupId == 3 &&
                                <tr>
                                    <td valign="top">Property</td>
                                    <td valign="top">
                                        {this.props.UserData.propertyName}
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td valign="top">First Name</td>
                                <td valign="top"><input name="firstName" id="firstName" type="text" defaultValue={this.props.UserData.firstName} className="textField"  /></td>
                            </tr>
                            <tr>
                                <td valign="top">Last Name</td>
                                <td valign="top"><input name="lastName" id="lastName" type="text" defaultValue={this.props.UserData.lastName} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Company</td>
                                <td valign="top"><input name="userCompany" id="userCompany" type="text" defaultValue={this.props.UserData.userCompany} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Email</td>
                                <td valign="top"><input name="userEmail" id="userEmail" type="text" defaultValue={this.props.UserData.userEmail} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Password</td>
                                <td valign="top"><input name="userPassword" id="userPassword" type="password"  defaultValue={this.props.UserData.userPassword} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Commission Villa (%)</td>
                                <td valign="top"><input name="userCommissionVillaHotel" id="userCommissionVillaHotel" type="text" defaultValue={this.props.UserData.userCommissionVillaHotel} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">Commission Service (%)</td>
                                <td valign="top"><input name="userCommissionBasicLinen" id="userCommissionBasicLinen" type="text" defaultValue={this.props.UserData.userCommissionBasicLinen} className="textField" /></td>
                            </tr>
                            <tr>
                                <td valign="top">&nbsp;</td>
                                <td valign="top"><input type="submit" className="button" name="userEditBtn" id="userEditBtn" value="Save" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                </div>
            </div>
        )
    }
});