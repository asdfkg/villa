var Checkin = React.createClass({
    render: function(){
        return  <div className={this.props.innerpage=='true' || this.props.siteid=="1"?'large-3 medium-2 small-6 columns':"large-3 medium-3 small-4 columns"}>
                    <label>{(this.props.innerpage=='true' || this.props.siteid=="1")?'Check-In':''} <input type="text" name="checkInDt" class="hasDatepicker" id="checkInDt" placeholder="MM/DD/YYYY" onChange={function() {}} value={this.props.value1} /></label>
                </div>
    }
});
var Checkout = React.createClass({
    render: function(){
        return <div className={this.props.innerpage=='true' || this.props.siteid=="1"?'large-3 medium-3 small-6 columns':"large-3 medium-3 small-4 columns"}>
                    <label>{(this.props.innerpage=='true' || this.props.siteid=="1")?'Check-Out':''} <input type="text" name="checkOutDt" class="hasDatepicker" id="checkOutDt" placeholder="MM/DD/YYYY" onChange={function() {}}  value={this.props.value1} /></label>
                </div>
    }
});
var FilterButton = React.createClass({
    slideFilter:function(){
      $('.filtersPanel').slideToggle('slow'); 
      $("#rsFilter").trigger('click');
      return false;
    },
    render: function(){
        var self = this;
        return <div className="large-1 medium-3 small-3 columns">
            <label>Filters</label>
            <button type="button" className="button tiny expand filtersBtn" onClick={self.slideFilter}><i className="fa fa-tasks"></i>
            </button>
        </div>
    }
});

var SearchButton = React.createClass({
    render: function(){
        return  <div className={this.props.innerpage=='true'?'large-2 medium-4 small-9 columns':"large-2 medium-2 homepage-btn small-6 columns"}>
                    <button className="button tiny expand expand1 radius" onclick="submit();">FIND RESULTS</button>
                </div>
    }
});

var SearchHidden = React.createClass({
    render: function(){
        return <span>
                <input type="hidden" name="bedMin"      id="bedMin"     value={this.props.getParams.bed_min} />
                <input type="hidden" name="bedMax"      id="bedMax"     value={this.props.getParams.bed_max} />
                <input type="hidden" name="budgetMin"   id="budgetMin"  value={this.props.getParams.budget_min} />
                <input type="hidden" name="budgetMax"   id="budgetMax"  value={this.props.getParams.budget_max} />
                <input type="hidden" name="amenities"   id="amenities"  value={this.props.getParams.amenities} />
            </span>
    }
});


var SearchFilter = React.createClass({
    
    getInitialState: function () {
        var states     = {amenitiesList:[],selectedAmenitiesList:[]};
        var amenities   = this.props.amenitiesList;
        this.props.filters.map(function (filter, key) {
            states.amenitiesList[filter.featureId] = amenities.indexOf(""+filter.featureId)!= -1?'checked':'';
        });
        return states;
    },
    handleAmenityChange:function(event) {
        amenitiesList = this.state.amenitiesList;
        amenitiesList[event.currentTarget.value]=event.target.checked?'checked':'';
        return this.setState({amenitiesList: amenitiesList});
    },
    
    handleChange: function(event){
        istate = this.getInitialState();
        amenitiesArray = [];
        $(istate.amenitiesList).each(function(i,e){
            if(e=="checked")
            amenitiesArray.push(i);
        })
        $('#amenities').val(amenitiesArray.join(','));
        return this.setState({amenitiesList: istate.amenitiesList});
    },
    render: function(){
        //var amenitiesList = this.props.amenitiesList;
        var amenitiesList = this.state.amenitiesList;
        var marginRightStyle = {marginRight:0};
        var handleAmenityChange = this.handleAmenityChange;
        var siteid  = this.props.siteid;
        return (
            <div className="row">
                <div className="columns">
                    <div className="panel text-left filtersPanel">
                        <div className="row">
                            <div className="columns">
                                <Heading6 value="BEDROOMS" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-8 small-offset-2 columns">
                                <div className="range-label-holder">
                                    <div className="range-label">4</div>
                                    <div className="range-label">5</div>
                                    <div className="range-label">6</div>
                                    <div className="range-label">7</div>
                                    <div className="range-label" style={marginRightStyle}>8+</div>
                                </div>
                                <div className="slider-holder">
                                    <div id="bedroomsSlider" className="rangeSlider"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns">
                                <Heading6 value={ (siteid==1)?"PRICE RANGE":"PER NIGHT" } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-8 small-offset-2 columns">
                                <div className="range-label-holder">
                                    <div className="range-label">1,000</div>
                                    <div className="range-label">2,500</div>
                                    <div className="range-label">5,000</div>
                                    <div className="range-label">7,500</div>
                                    <div className="range-label" style={marginRightStyle}>10,000+</div>
                                </div>
                                <div className="slider-holder">
                                    <div id="budgetSlider" className="rangeSlider"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns">
                                <Heading6 value="AMENITIES" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns">
                                <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-3">
                                 <input type="checkbox" id="rsFilter" onChange={this.handleChange} style={{display:'none'}} />
                                {(this.props.filters && this.props.filters.map(function(filter,i){
                                    return <li key={i}>
                                        <input type="checkbox" id={'amenity_'+filter.featureId} className="amenities" value={filter.featureId} 
                                        onChange={handleAmenityChange}
                                        checked={amenitiesList[filter.featureId]}                                        
                                        />
                                        <label for={'amenity_'+filter.featureId}>
                                            {filter.featureReservation.replace('<br/>','')}
                                        </label>
                                    </li>
                                    }))}


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var SearchBox = React.createClass({
    componentDidMount: function(){
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
        $('.amenitiesBtn').click(function() {
            $('i', this).toggleClass('a fa-angle-double-down fa-2x a fa-angle-double-up fa-2x');
            $('.amenitiesPanel').slideToggle('slow');

        });
        if(this.props.getParams != undefined && this.props.getParams.bed_min!= undefined){
            bedroomslidervalue = [this.props.getParams.bed_min!=undefined && this.props.getParams.bed_min!=""?this.props.getParams.bed_min:4 , this.props.getParams.bed_max!=undefined && this.props.getParams.bed_max!=""?this.props.getParams.bed_max:8];
        }else{
            bedroomslidervalue = [4,8];
        }
        $('#bedroomsSlider').slider({
                range: true,
                min: 4,
                max: 8,
                step: 1,
                values: bedroomslidervalue,
                animate: 'fast'
        });
        if(this.props.getParams != undefined && this.props.getParams.budget_min!= undefined){
            budgetSlidervalue = [this.props.getParams.budget_min!=undefined && this.props.getParams.budget_min!=""?this.props.getParams.budget_min:0,this.props.getParams.budget_max!=undefined && this.props.getParams.budget_max!=0?this.props.getParams.budget_max:10000];
        }else{
            budgetSlidervalue = [0,10000];
        }

         $('#budgetSlider').slider({
            range: true,
            min: 0,
            max: 10000,
            step: 2500,
            values:budgetSlidervalue,
            animate: 'fast'
        });
        $('.rangeSlider').slider({
                change: function(event, ui)
                {
                        var bedroomRange = $('#bedroomsSlider').slider('values');
                        var budgetRange = $('#budgetSlider').slider('values');
                        $('#bedMin').val(bedroomRange[0]);
                        $('#bedMax').val(bedroomRange[1]);
                        $('#budgetMin').val(budgetRange[0]);
                        $('#budgetMax').val(budgetRange[1]);
                }
        });
        $('.amenities').click(function() {
            amenitiesArray=[];
            $('.amenities:checked').each(function(i,e){
                amenitiesArray.push($(e).val());
            })
            $('#amenities').val(amenitiesArray.join(','));
        });
        
    },
    getInitialState: function() {
        return {
            selected: this.props.data.destination
        }
    },
    handleChange: function(e) {
        this.setState({selected: e.target.value});
    },
    render: function() {
        var options = this.props.SearchOptions.map(function(option,i) {
            return (
                <option key={i} value={option.code}>{option.description}</option>
            )
        });
        var filterbutton = (this.props.innerpage=='true'?<FilterButton/>:'');
        var searchFilter = (this.props.innerpage=='true'?<SearchFilter filters={this.props.filters} amenitiesList={this.props.amenitiesList} siteid={this.props.siteid}/>:'');
        var SearchHiddenField = (this.props.innerpage=='true'?<SearchHidden getParams={this.props.getParams} />:'');
        return (
            <section id="reserve-your-villahotel-section">
                <div className="row" data-equalizer>
                    {(this.props.innerpage=='true' || this.props.siteid=="1")?
                    <div className="large-2 columns left-side show-for-large-up" data-equalizer-watch style={this.props.siteid=="1"?{height: '85px'}:{}}>
                        <Heading6 value={"Reserve Your Villa"+(this.props.siteid=="1"?"Hotel":'')} />
                    </div>:''}

                    <div className={(this.props.innerpage=='true' || this.props.siteid=="1"?'large-10':'large-12')+ ' medium-12 columns right-side text-center'} data-equalizer-watch>
                        <form method="post" action="/reservations/" onsubmit="return false;">
                            <input type="hidden" name="action"      value="reservation" />
                            {SearchHiddenField}
                            <div className="row">
                                <div className={this.props.innerpage=='true'?'large-3 medium-2 columns':'large-4 medium-3 small-3 columns'}>
                                    <label>{(this.props.innerpage=='true' || this.props.siteid=="1")?'Destination':''}
                                        <select id={this.props.id} name="dest" className='form-control' value={this.state.selected} onChange={this.handleChange}>
                                            {options}
                                        </select>
                                    </label>
                                </div>
                                <Checkin value1={this.props.data.checkin}   innerpage={this.props.innerpage} siteid={this.props.siteid} />
                                <Checkout value1={this.props.data.checkout} innerpage={this.props.innerpage} siteid={this.props.siteid} />
                                {filterbutton}
                                <SearchButton innerpage={this.props.innerpage} />
                            </div>
                            {searchFilter}
                        </form>
                    </div>
                </div>
            </section>
        );
    }
});
