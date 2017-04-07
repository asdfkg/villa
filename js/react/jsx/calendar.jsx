var PageHeader = React.createClass({
    render: function(){
        return <div className="row">
                <div className="columns">
                    <Heading1 value="CALENDAR"></Heading1>
                </div>
            </div>
    }
});
ReactDOM.render(
    <PageHeader />,
    document.getElementById('reservations-title-steps-section')
); 
var CalendarDestinations = React.createClass({
    render: function(){
        return <div className="row">
                {this.props.data.map(function(d,i){
                return <a key={i} href={"?destId="+d.destId} style={{float:'left',width:'300px',marginRight:'20px'}}>
                        <Image1 src={"/img/destination-header_"+(d.destName.replace('-', '_').toLowerCase())+'.png'} alt={d.destName+" villa hotels"} />
                        </a>
                })}
            </div>
    }
});

var BookingCalendar = React.createClass({
    reactSlideLeft:function(propertyId){
        if ($('#slide'+propertyId).val() > 1){ 
            $('#property'+propertyId).animate({marginLeft: '+=306px'}, 1000);
            $('#slide'+propertyId).val(parseInt($('#slide'+propertyId).val()) - 1); 
        }
    },
    reactSlideRight:function(propertyId){
        if ($('#slide'+propertyId).val() < 34) { 
            $('#property'+propertyId).animate({marginLeft: '-=306px'}, 1000); 
            $('#slide'+propertyId).val(parseInt($('#slide'+propertyId).val()) + 1); 
        }
    },
    render: function(){
        var tdate = new Date(); 
        var tmonth = tdate.getMonth();
        var data = this.props.data;
        var self= this;
        var totalBooking = this.props.totalBooking;
        var villaBooking = this.props.villaBooking;
        return <div>{(this.props.data.userGroup==1 || this.props.data.userGroup==2) && this.props.data.property.map(function(property,i){
               return <div key={'prop-cal-'+i} style={{float:'left',width:'1005px',margin:'0px 0px 20px 0px'}}>
                        <div style={{float:'left',width:'1005px',margin:'0px 0px 20px 0px'}}>
                            <Heading3 value={property.propertyName} />
                            <input type="hidden" id={"slide"+property.propertyId} value={17 - tmonth} />
                            <span style={{float:'left',margin:'127px 10px 0px 0px',cursor:'pointer',fontSize:'1.5rem'}}>
                                <i className="fa fa-chevron-circle-left" onClick={()=>self.reactSlideLeft(property.propertyId)}></i>
                            </span>

                            <div style={{float:'left',width:'920px',height:'277px',margin:'0px 0px 10px 10px',overflow:'hidden'}}>
                                <div id={"property"+property.propertyId} style={{marginLeft:'-'+((14 - tmonth) * 306)+'px'}}>
                                    <span style={{float:'left',marginLeft:'12px'}}>
                                        <Calendar destId={data.destId} propertyId={property.propertyId} ddate={data.calendarStartDt} nav=''
                                        propertyName={data.propertyName} checkInDt={data.checkInDt} checkOutDt={data.checkOutDt} villaBooking={villaBooking[property.propertyId]==undefined?[]: villaBooking[property.propertyId]}/>
                                    </span>

                                {Array.apply(0, Array(36)).map(function(i,months){
                                    return <span key={'cal'+moment(data.calendarStartDt,"MM/DD/YYYY").add(months,'month').format('MM/YY')} style={{float:'left',marginLeft:'12px'}}>
                                            <Calendar destId={data.destId} propertyId={property.propertyId} ddate={moment(data.calendarStartDt,"MM/DD/YYYY").add(months,'month')} nav=''
                                            propertyName={data.propertyName} checkInDt={data.checkInDt} checkOutDt={data.checkOutDt} villaBooking={villaBooking[property.propertyId]==undefined?[]: villaBooking[property.propertyId]}/>
                                        </span>
                                })}
                                </div>
                            </div>
                            <span style={{float:'right',margin:'127px 20px 0px 0px',cursor:'pointer',fontSize:'1.5rem'}}>
                                <i className="fa fa-chevron-circle-right" onClick={()=>self.reactSlideRight(property.propertyId)}>
                                </i>
                            </span>
                        </div>

                        {data.propertyName ? <BookingPropertyDetail propertyName={data.propertyName} checkInDt={data.checkInDt} checkOutDt={data.checkOutDt} totalNights={data.totalNights} />:
                        
<BookingOverview bookingInfo={totalBooking[property.propertyId]} property={property} userGroup={data.userGroup} />}
                        <BookingRowButtons />
                </div>                
            })}</div>
    }
});

var BookingPropertyDetail = React.createClass({
    render: function(){
        return <table style={{textAlign:'left',marginLeft:'45px'}}>
            <tr><td>Check-In Date:</td><td style={{fontWeight:'bold'}}>{this.props.checkInDt?this.props.checkInDt:'TBD'}</td></tr>
            <tr><td>Check-Out Date:</td><td style={{fontWeight:'bold'}}>{this.props.checkOutDt?this.props.checkOutDt:'TBD'}</td></tr>
            <tr><td>Number of Nights:</td><td style={{fontWeight:'bold'}}>{this.props.totalNights>0?this.props.totalNights:'TBD'}</td></tr>
            <tr><td><a className="button tiny expand" href={"/reservations/services?property="+this.props.propertyName+'&check_in='+this.props.checkInDt+'&check_out='+this.props.checkOutDt}>CONTINUE</a></td></tr>
        </table>
    }
});
var BookingOverview = React.createClass({
    render: function(){
        var tdate = new Date(); 
        var tmonth = tdate.getMonth();
        return <table style={{textAlign:'left',marginLeft:'45px'}}>
            <tbody>
                <tr>
                        <th>Total Booked Nights {tdate.getFullYear()}:</th>
                        <td>{this.props.bookingInfo.reservationPropertyNightBookedTotal?this.props.bookingInfo.reservationPropertyNightBookedTotal:0}</td>
                </tr>
                {this.props.userGroup== 1 &&
                <tr>
                        <th>Total Villa Revenue {tdate.getFullYear()}:</th>
                        <td>{this.props.bookingInfo.reservationRateCurrency}{(this.props.bookingInfo.reservationRateValueTotal).toFixed()}</td>
                </tr>
                }
            </tbody>
        </table>
    }
});

var BookingRowButtons = React.createClass({
    render: function(){
        return <div style={{float:'right',margin:'-40px 47px 0px 0px',fontSize:'12px'}}>
                    <span className="calendar-legend reserved">Reserved</span>
                    <span className="calendar-legend booked">Booked</span>
                    <span className="calendar-legend owner">Owner</span>
                    <span className="calendar-legend hold">Hold</span>
            </div>
    }
});


//https://jsfiddle.net/guillaumepiot/fg9mkygo/2/

var calendar, endDay, firstDay, firstWeekDay, headerRow, i, j, lastWeekDay, len, len1, month, monthRange, row, startDate, week, weekRange, weeks, year,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function get_calendar(year, month) {

    startDate = moment([year, month]);
    firstDay = moment(startDate).startOf('month');
    endDay = moment(startDate).endOf('month');
    monthRange = moment.range(firstDay, endDay);

    weeks = [];

    monthRange.by('days', function (moment) {
        var ref;
        if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
            return weeks.push(moment.week());
        }
    });

    calendar = [];

    for (i = 0, len = weeks.length; i < len; i++) {
        week = weeks[i];
        if (i > 0 && week < weeks[i - 1]) {
            // We have switched to the next year

            firstWeekDay = moment([year, month]).add(1, "year").week(week).day(1);
            lastWeekDay = moment([year, month]).add(1, "year").week(week).day(7);
        }
        else {
            firstWeekDay = moment([year, month]).week(week).day(1);
            lastWeekDay = moment([year, month]).week(week).day(7);
        }
        weekRange = moment.range(firstWeekDay, lastWeekDay);
        calendar.push(weekRange);
    }

    return calendar;
}

var Calendar = React.createClass({
    getDefaultProps: function () {
        return {date: moment()}
    },
    getInitialState: function () {
        month = moment(this.props.ddate, "MM/DD/YYYY").month();
        year = moment(this.props.ddate, "MM/DD/YYYY").year();
        return {
            date: this.props.date,
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        }
    },
    setDate: function (day, e) {
        e.preventDefault();
        this.setState({date: day})
    },
    nextMonth: function (e) {
        e.preventDefault();
        if (this.state.month == 11) {
            month = 0;
            year = this.state.year + 1;
        }
        else {
            month = this.state.month + 1;
            year = this.state.year;
        }

        this.setState({
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        })
    },
    previousMonth: function (e) {
        e.preventDefault();
        if (this.state.month == 0) {
            month = 11;
            year = this.state.year - 1;
        }
        else {
            month = this.state.month - 1;
            year = this.state.year;
        }

        this.setState({
            month: month,
            year: year,
            calendar: get_calendar(year, month)
        })

    },
    render: function() {
        var headings = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    	context = this
    	state = this.state;
        setDate = this.setDate;
        weekCount = 0;
        villaBooking = this.props.villaBooking;
        propertyName = this.props.propertyName;
        checkInDt = this.props.checkInDt;
        checkOutDt = this.props.checkOutDt ;
    	weeks = state.calendar.map(function (week) {
            weekCount++;
            dayList = []
            week.by('days', function (day) {
                dayList.push(day)
            })
            days = dayList.map(function (day) {
                isCurrentMonth = day.month() == state.month
                isToday = day.format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')
                isSelected = villaBooking[day.format('YYYY-MM-DD')]!=undefined?villaBooking[day.format('YYYY-MM-DD')]:0;
                dayClasses = "calendar-day";
                if (!isCurrentMonth) {
                    dayClasses = "calendar-day-np";
                }else if (isSelected>0) {
                    var styles= {};
                    switch(isSelected){
                        case 1:
                            dayClasses += " reserved";
                            break;
                        case 2:
                            dayClasses += " booked";
                            break;
                        case 3:
                            dayClasses += " owner";
                            break;
                        case 5:
                            dayClasses += " hold";
                            break;
                    }
                }else{
                    var styles={background:'#7cbd25'}
                }
                if (isToday){
                    dayClasses += " calendar-day--today";
                }
                var checkoutStr ='';
                if ((!checkInDt && !checkOutDt) || (checkInDt && checkOutDt))
                    checkoutStr = '&check_in='+(day.format('MM/DD/YYYY'));
                if (checkInDt && !checkOutDt) 
                    checkoutStr  = '&check_in='+checkInDt+'&check_out='+(day.format('MM/DD/YYYY'));
                color={color:'#fff !important', textDecoration:'underline'};
                if(checkInDt==(day.format('MM/DD/YYYY')) || checkOutDt==(day.format('MM/DD/YYYY')))
                    color = {color: '#000 !important',textDecoration:'underline'};
                return <td key={day.format('D-MM-Y')} className={dayClasses} style={styles}>
                        <div className="day-number">
                        
                        {propertyName ?
                            <a href={'?property='+propertyname+checkoutStr} style={color}>{day.format('D')}</a>                            
                        :( !isCurrentMonth?' ':day.format('D')) }
                        </div>
                    </td>
            })
            return <tr key={ weekCount } className="calendar-row">{ days }</tr>
        });
        var nav = this.props.nav;
        var calendar = '';
        if(nav=='prev'){
            calendar = <div style={{float:'left',margin:'127px 10px 0px 0px'}}>
                            <a href={'?destId='+this.props.destId+'&date='+moment(this.state.date).subtract(1, 'months').format('YYYY-MM-DD')}>
                                <Image1 src="media/image/reservation/calendar/arrow_left.png" width="25" height="39" alt="Previous" />
                            </a>
                        </div>;
        }
        return <div>
                {calendar}

                <div className="calendarHolder">
                    <table cellPadding="0" cellSpacing="0" className="calendar">
                        <tbody>
                            <tr className="calendar-row">
                                <td className="calendar-day-head" colSpan={7}>
                                    { moment().month(this.state.month).format("MMMM") } { this.state.year }
                                </td>
                            </tr>
                            <tr className="calendar-row">
                                {headings.map(function(days,i){
                                    return <td className="calendar-day-subhead" key={i}>{days}</td>
                                })}
                            </tr>
                            {weeks}
                        </tbody>
                    </table>
                </div>
                {nav == 'next' && <span style={{float:'left',margin:'127px 0px 0px 10px'}}>
                        <a href={"?destId="+this.props.destId+'&date='+moment(this.state.date).add(1, 'M')}>
                            <Image1 src="media/image/reservation/calendar/arrow_right.png" width="25" height="39" alt="Next" />
                        </a>
                    </span>}
	
                <div>
                    Selection: { this.state.date.format("D MMMM YYYY") }
                </div>
            </div>;
    }
});
 