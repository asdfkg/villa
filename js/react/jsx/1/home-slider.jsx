var HomeSliderImage = React.createClass({
    render: function(){
         if (this.props.sliderText == "" ) {
            return <div>
                <Image1 src={this.props.sliderImage1} classes="visible-for-small-only" />
                <Image1 src={this.props.sliderImage2} classes="visible-for-medium-up" />
                <div className="owl-content">
                    <Heading1 value={this.props.sliderHeading} />                   
                </div>
            </div>
        } else{
            return <div>
                <Image1 src={this.props.sliderImage1} classes="visible-for-small-only" />
                <Image1 src={this.props.sliderImage2} classes="visible-for-medium-up" />
                <div className="owl-content">
                    <h1>{this.props.sliderHeading}<br /><span className="sliderBannertext">{this.props.sliderText}</span></h1>
                </div>
            </div>
        }
    }
});

var HomeSlider = React.createClass({
    componentDidMount: function(){
        $('.owl-carousel-header').owlCarousel({
            items: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            loop: true,
            dots: false,
            nav: true,
            navText: ['<img src="img/home/1/arrow-left.png" className="show-for-large-up">', '<img src="img/home/1/arrow-right.png" className="show-for-large-up">']
        });
    }, 
    render: function() {
        return (
            <div className="owl-carousel-header">
                {this.props.sliders.map(function(slider,i){
                    return <HomeSliderImage key={i} sliderImage1={slider.sliderImage1} sliderImage2={slider.sliderImage2} sliderHeading={slider.sliderHeading} sliderText={slider.sliderText} />
                })}
            </div>
        );
    }
});