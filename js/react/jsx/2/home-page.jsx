var HomeDestinations  = React.createClass({
  render:function(){
      return (
            <div className="row text-center" data-equalizer>
                <div className="medium-12 columns" data-equalizer-watch>
                    <div className="flex-video2 react-iframe-video2" >
                        <iframe width={this.props.iframeDetail.width} height={this.props.iframeDetail.height} src={this.props.iframeDetail.videoURL} frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>  
        );
    }  
});

var ArrivedContentBox  = React.createClass({
  render:function(){
      return (
            <div className="small-12 medium-4 columns content-box" id={this.props.id} >
                <a href="" data-reveal-id={this.props.revealId}>
                    <Image1 src={this.props.imgUrl} />
                </a>
                <Heading6 value={this.props.headingText} />
            </div>
        );
    }  
});

var ArrivedSubContentBox  = React.createClass({
  render:function(){
      return (
            <div className="small-12 columns show-for-small-only home-plus">
                <span>{this.props.spanText}</span>
            </div>
        );
    }  
});

var HomeArrived  = React.createClass({
  render:function(){
      return (
            <section id="your-private-hotel-has-arrived">
                <div className="row text-center">
                    <div className="small-12 columns">
                        <Heading1 value="Why GreatVillaDeals?" />
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns home-round-box">
                        <div className="row text-center">
                            <ArrivedContentBox headingText='Get 10% Off When<br />You Book Online' id="" imgUrl={this.props.arriveData.img1} revealId="" />
                            <ArrivedSubContentBox spanText='+' />
                            <ArrivedContentBox headingText='Cheap Luxury' id="middle-column-pluses" imgUrl={this.props.arriveData.img2} revealId="" />
                            <ArrivedSubContentBox spanText='+' />
                            <ArrivedContentBox headingText='Best Villas<br />' imgUrl={this.props.arriveData.img3} revealId="" />
                        </div>
                        <div className="row text-center">
                            <div className="small-12 btm-btn">
                                <Anchor href="/about-luxury-villa-rentals/founders-vision" classes="button" value="= GreatVillaDeals" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
        );
    }  
});


var HomeDiscount  = React.createClass({
  render:function(){
      return (
            <div className="light-gray-bg">
                <div className="row">
                    <div className="medium-6 columns">
                        <div className="booking-detail">
                            <p>Find Your Next Villa.</p>
                            <div className="clr"></div><br/>
                            <Anchor href="/reservations/" classes="next-btn book-bt" value="10% Discount"></Anchor>
                        </div>
                    </div>
                    <div className="medium-6 columns">
                        <div className="offer-box">
                            <h2>Book online</h2>
                            <h4>and save</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }  
});


var HomeTestimonial  = React.createClass({
  render:function(){
      return (
            <div className="orange-bg">
                <div className="row">
                    <div className="medium-2 columns">
                        <div className="person-circle">
                            <center><Image1 src="img/person.png" /></center>
                        </div>
                    </div>
                    <div className="medium-10 columns">
                        <div className="person-content">
                            <p>“ We had a great time in this house and everything was clean an new! The service is great and the staff very professional and helpful. We were a family on vacation and the house has plenty of space. I would strongly recommend this rental. " </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }  
});


var HomeGoNext  = React.createClass({
  render:function(){
      return (
            <div className="row">
                <div className="where-next-box">
                    <h1>Showcasing Luxury Homes <span> at Amazing Prices</span></h1>
                    <p>Find your luxury villas at a great rate. <br />Best price guarantee!</p>
                    <div className="clr"></div>
                    <center><Anchor href="about-luxury-villa-rentals/founders-vision" classes="next-btn grey book-btn button book-bt" value="About Us"/></center>
                    <div className="clr"></div><br/>
                </div>
            </div>
        );
    }  
});


var HomeSearchBox  = React.createClass({
    componentDidMount: function(){
        $(function () {
            $('#checkInDt').datepicker({
                defaultDate: '+1d',
                minDate: '+1d',
                onClose: function(selectedDate)
                {
                    if (selectedDate)
                    {
                        var nextDayDate = $(this).datepicker('getDate', '+3d');
                        nextDayDate.setDate(nextDayDate.getDate() + 3);
                        $('#checkOutDt').datepicker('option', 'minDate', nextDayDate);
                    }
                }
            });

            $('#checkOutDt').datepicker({
                    defaultDate: '+1d',
                    minDate: '+1d'
            });
        });
    },
  render:function(){
      var options = this.props.SearchOptions.map(function(option,i) {
            return (
                <option key={i} value={option.code}>{option.description}</option>
            )
        });
      return (
            <div className="row gray-bg">
                <div className="container">
                    <form className="form-horizontal" method="POST" action="/reservations/" target=""> 
                        <input type="hidden" name="action"      value="reservation" />
                        <div className="col-lg-12">
                            <div className="medium-4 columns">
                                <div className="form-group">
                                    <div className="input-group width-100">
                                        <select id={this.props.id} className="selectpicker form-control" title="Destination" name="dest">
                                           {options}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        <div className="medium-3 columns">
                                <div className="form-group">
                                    <div className="input-group width-100">
                                        <input type="text" id="checkInDt" value={this.props.data.checkin} onChange={function(){}} title="checkin" name="checkInDt" required="" placeholder="Check-in" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        <div className="medium-3 columns">
                                <div className="form-group">
                                    <div className="input-group width-100">
                                        <input type="type"  id="checkOutDt" value={this.props.data.checkout} onChange={function(){}} title="checkout" name="checkOutDt" required="" placeholder="Check-out" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        <div className="medium-2 columns" id="guest-type-idd">
                                <div className="form-group">
                                    <button type="submit" className="next-btn">Find Results</button>
                                </div>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        );
    }  
});
