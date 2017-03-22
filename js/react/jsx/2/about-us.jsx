var AboutUsBannerImage = React.createClass({
    render: function(){
        return (
            <Image1 src={this.props.aboutUsBannerImage} alt="" className="" />
        );
    }
});

var AboutDescritionContent = React.createClass({
    render:function(){
        return (
            <div className="row">
                <div className="large-centered columns">
                    <p><GVDLink /> is a sub brand of Villazzo LLC, Miami Beach, Florida.</p>
                    <p>Villazzo LLC is a true hotel operator that goes far beyond the typical “concierge” service that most villa rental agencies offer. 
                        While <VillLink /> has firmly maintained its leadership position as a hotel management expert in the luxury private vacation villa segment, the company launched the brand <GVDLink /> in recognition of the growing niche of cost conscious travelers seeking online villa rentals.
                        When you book with <GVDLink />, you will not indulge in the 5-star hotel service that has built the <VillLink /> brand, but you will enjoy the below benefits: </p>
                    <ul class="aout-us-list">	
				
				<li>The best price in the industry (save another 10% off our “best rate” when you book online!) </li>
<li>Complete selection of the best luxury villas in each destination </li>
<li> A large number of properties personally inspected by the <VillLink /> team </li>
<li> Concierge service during your stay to arrange reservations and staffing </li>
			</ul>	
                    
                </div>
            </div>            		                    
        );
    }
})
