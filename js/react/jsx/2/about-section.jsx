var AboutBox = React.createClass({
  render: function() {
	return (
		<section id="about-section">
			<div className="row">
				<div className="large-centered columns">
				
					<Heading4 value={this.props.data.heading}/>
					<Image1 src1={this.props.data.image} />
					<div dangerouslySetInnerHTML={{__html: this.props.data.description}} />
					
				</div>
			</div>
		</section>
	);
  }
});
