var SearchBox = React.createClass({
  render: function() {
    return (
        <section id="reserve-your-villahotel-section">
            <div className="row" data-equalizer>
                <div className="large-2 columns left-side show-for-large-up" data-equalizer-watch>
                    <h6>Reserve Your VillaHotel</h6>
                </div>



                <div className="large-10 medium-12 columns right-side text-center" data-equalizer-watch>
                    <form method="post" action="/reservations/" onsubmit="return false;">
                        <input type="hidden" name="action" value="reservation" />
                        <input type="hidden" name="bedMin" id="bedMin" />
                        <input type="hidden" name="bedMax" id="bedMax" />
                        <input type="hidden" name="budgetMin" id="budgetMin" />
                        <input type="hidden" name="budgetMax" id="budgetMax" />
                        <input type="hidden" name="amenities" id="amenities" />

                        <div className="row">
                            <div className="large-4 medium-3 small-3 columns">
                                <label>Destination
                                    <select name="dest" value={this.props.data.destination}>
                                        <option value="all" selected={this.props.data.destination == "all"}>All</option>
                                        <option value="aspen" selected={this.props.data.destination == "aspen"} >Aspen</option>
                                        <option value="miami" selected={this.props.data.destination == "miami"}>Miami</option>
                                        <option value="saint-tropez" selected={this.props.data.destination == "saint-tropez"}>Saint-Tropez</option>
                                    </select>
                                </label>
                            </div>
                            <div className="large-3 medium-3 small-4 columns">
                                <label>Check-In 
                                    <Checkin value1={this.props.data.checkin} />
                                </label>
                            </div>
                            <div className="large-3 medium-3 small-4 columns">
                                <label>Check-Out 
                                    <Checkout value1={this.props.data.checkout} />
                                </label>
                            </div>
                            <div className="large-2 medium-3 small-6 columns">
                                <button className="button tiny expand" onclick="submit();">FIND RESULTS</button>
                                {this.props.data.destination}
                            </div>
                        </div>
                    </form>
                </div>


                

            </div>
        </section>
    );
  }
});




