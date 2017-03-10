var HomeSliderImage = React.createClass({
    render: function(){
        return <div className="item">
                    <Image1 src={this.props.sliderImage1} classes="img-responsive" />
                </div>
    }
});
var HomeSlider = React.createClass({
    componentDidMount: function(){
    $("#myCarousel .carousel-inner .item:eq(0)").addClass('active');    
    $("#myCarousel .carousel-indicators li:eq(0)").addClass('active');    
    //$(".carousel").carousel();
        $('.owl-carousel-header').owlCarousel({
            items: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            loop: true,
            dots: false,
            nav: true,
            navText: ['<img src="img/home/arrow-left.png" class="show-for-large-up">', '<img src="img/home/arrow-right.png" class="show-for-large-up">']
        });
    },
    render: function() {
        return (
            <section id="owl-carousel-section">
                <div className="owl-carousel-header">
                        {this.props.sliders.map(function(slider,i){
                             return <HomeSliderImage key={i} sliderImage1={slider.sliderImage1} sliderImage2={slider.sliderImage2} sliderHeading={slider.sliderHeading} sliderText={slider.sliderText} />
                        })}
                </div>
            </section>    
        );
  }
});