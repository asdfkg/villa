var Image = React.createClass({
    render: function(){
        return <img src={this.props.src1} alt={this.props.alt} />
    }
});
var Anchor = React.createClass({
    render: function(){
        return <a href={this.props.href}>{this.props.value}</a>
    }
});
var Heading4 = React.createClass({
    render: function(){
        return <h4>{this.props.value}</h4>
    }
});
var Checkin = React.createClass({
    render: function(){
        return <input type="text" name="checkInDt" id="checkInDt" placeholder="MM/DD/YYYY" value={this.props.value1} />
    }
});
var Checkout = React.createClass({
    render: function(){
        return <input type="text" name="checkOutDt" id="checkOutDt" placeholder="MM/DD/YYYY" value={this.props.value1} />
    }
});

