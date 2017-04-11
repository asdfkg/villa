var LoginFormHeading = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="columns">
                    <Heading1 value="LOGIN" />
                </div>
            </div>
        );
    }
});

var LoginForm = React.createClass({
    submit: function(e){
        e.preventDefault();
        return false;
      },
    reactQuery: function(){
        query('login-form', 'loginFormBtn', 'login');
    },
    render: function(){
        return (
            <div className="row">
                <div className="medium-6 medium-offset-3 columns">
                    <form id="login-form" onSubmit={this.submit}>
                        <fieldset>
                            <div className="row collapse prefix-radius">
                                <div className="small-1 columns"><span className="prefix"><i className="fa fa-envelope"></i></span></div>
                                <div className="small-11 columns"><input type="text" name="email" id="email" className="required" placeholder="Enter your email" /></div>
                            </div>
                            <div className="row collapse prefix-radius">
                                <div className="small-1 columns"><span className="prefix"><i className="fa fa-key"></i></span></div>
                                <div className="small-11 columns"><input type="password" name="password" id="password" className="required" placeholder="Enter your password" /></div>
                            </div>
                            <div className="row">
                                <div className="small-6 columns">
                                    <input type="checkbox" name="remember" id="remember" value="1" /><label for="remember">Remember me</label>
                                </div>
                                <div className="small-6 columns">
                                    <a href="#" data-reveal-id="recoverPasswordModal" className="right"><label className="underline">Forgot password?</label></a>
                                </div>
                            </div>
                            <div className="row collapse feedback"></div>
                            <div className="row collapse">
                                <button className="button submit tiny radius full-width" id="loginFormBtn" onClick={this.reactQuery}>
                                    <span>Login</span>
                                    <i className="fa fa-circle-o-notch fa-spin"></i>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
});

var RecoverPasswordModal = React.createClass({
    closepopup:function(e){ 
        e.preventDefault();
        $('#recoverPasswordModal').foundation('reveal', 'close');
    },
    submitpopup:function(e){
        e.preventDefault();
        query('recoverPasswordModalForm', 'recoverPasswordModalFormBtn', 'recoverPassword');
        return false;
    },
    render:function(){
        return  <form id="recoverPasswordModalForm" onsubmit="return false;">
                    <fieldset>
                        <legend>Recover Password</legend>
                        <div className="row collapse prefix-radius">
                            <div className="small-1 medium-2 large-1 columns"><span className="prefix"><i className="fa fa-envelope"></i></span></div>
                            <div className="small-11 medium-10 large-11 columns">
                                <input type="text" name="recoverPasswordModalEmail" id="recoverPasswordModalEmail" className="required" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="row collapse feedback"></div>
                        <div className="row collapse">
                            <div className="right">
                                <button className="button secondary tiny radius" onClick={this.closepopup}>Cancel</button>&nbsp;
                                <button className="button submit tiny radius" id="recoverPasswordModalFormBtn" onClick={this.submitpopup}>
                                    <span>Recover</span><i className="fa fa-circle-o-notch fa-spin"></i>
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
    }
});
var RecoverPasswordModalFeedback = React.createClass({
    render:function(){
        return <form>
                    <fieldset>
                        <legend>Recover Password</legend>
                        <div className="row">
                            <div className="columns"></div>
                        </div>
                    </fieldset>
                    <a className="close-reveal-modal" aria-label="Close">&#215;</a>
                </form>
        
    }
})