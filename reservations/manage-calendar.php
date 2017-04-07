<?php
require_once '../private/config.php';

// restrict user access
$_SESSION['USER']->restrict('1,2,4');

$destId = (isset($_GET['destId'])?$_GET['destId']:1);
$today = (isset($_GET['date'])?$_GET['date']:date('Y-m-15'));
$calendarStartDt = '- 1 year';
$propertyName = (isset($_GET['property'])?$_GET['property']:NULL);
$checkInDt = NULL;
$checkOutDt = NULL;
$totalNights = 0;
$propertyQuery = NULL;

$rs_destination = $_SESSION['DB']->querySelect('SELECT destId, destName FROM destination WHERE destActive = 1');
$allDestination = $_SESSION['DB']->queryAllResult($rs_destination);

if ($propertyName)
{
	$rs_property = $_SESSION['DB']->querySelect('SELECT propertyId FROM property LEFT JOIN destination ON destination.destId=property.destId WHERE UPPER(propertyName) = ? LIMIT 1', array(str_replace('-', ' ', strtoupper($propertyName))));
	$row_rs_property = $_SESSION['DB']->queryResult($rs_property);
	$totalRows_rs_property = $_SESSION['DB']->queryCount($rs_property);
	
	$checkInDt = isset($_GET['check_in'])?$_GET['check_in']:'';
	$checkOutDt = isset($_GET['check_out'])?$_GET['check_out']:'';
	$calendarStartDt = $_GET['check_in'].' '.$calendarStartDt;
	$totalNights = ceil((strtotime($checkOutDt) - strtotime($checkInDt)) / 86400);
	$propertyQuery = ' AND property.propertyId = '.$row_rs_property['propertyId'];
}

$rs_reservationProperty = $_SESSION['DB']->querySelect('SELECT reservationProperty.propertyId, propertyName, destName FROM property LEFT JOIN reservationProperty ON reservationProperty.propertyId = property.propertyId LEFT JOIN destination on destination.destId = property.destId WHERE propertyActive = 1 AND property.site in ("3","'.SITE_ID.'") AND reservationProperty.site = '.SITE_ID.' AND property.destId = '.$destId.$propertyQuery.' GROUP BY property.propertyId ORDER BY propertyValue DESC');
$row_rs_reservationProperty = $_SESSION['DB']->queryAllResult($rs_reservationProperty);
$totalRows_rs_reservationProperty = $_SESSION['DB']->queryCount($rs_reservationProperty);

function prepareVilla($calendarStartDt,$destId,$propertyQuery){
    $year = date('Y', strtotime($calendarStartDt));
    $month = date('m', strtotime($calendarStartDt));
    $rs_reservationProperty = $_SESSION['DB']->querySelect('SELECT reservationStatusId,reservationStartDt ,reservationEndDt, reservationProperty.propertyId, propertyName, destName FROM property LEFT JOIN reservationProperty ON reservationProperty.propertyId = property.propertyId LEFT JOIN destination on destination.destId = property.destId WHERE propertyActive = 1 AND property.site in ("3","'.SITE_ID.'") AND reservationProperty.site = '.SITE_ID.
            ' AND property.destId = '.$destId.$propertyQuery.' AND reservationStartDt >= ? ORDER BY property.propertyId',array("2016-".$month."-01"));
    $allReservationProperty = $_SESSION['DB']->queryAllResult($rs_reservationProperty);

    $villBooking = [];
    $villaList = [];
    foreach($allReservationProperty as $data){
        $begin = new DateTime( $data['reservationStartDt'] );
        $begin->modify( '-1 day' );
        $end = new DateTime( $data['reservationEndDt'] );
        $end->modify( '+1 day' );
        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($begin, $interval, $end);
        if(!isset($villaList[$data['propertyId']])){
            $villaList[$data['propertyId']] = $data;
        }
        foreach ( $period as $dt ){
            $dt = $dt->format( "Y-m-d" );
            if(!isset($villBooking[$data['propertyId']][$dt])){
                $villBooking[$data['propertyId']][$dt]=$data['reservationStatusId'];
            }
        }
    }
    return $villBooking;
}
function getTotalBooking(){
    $rs_reservationPropertyDetails = $_SESSION['DB']->querySelect('SELECT rp.propertyId,(SELECT SUM(DATEDIFF(reservationEndDt, reservationStartDt)) AS reservationPropertyNightTotal FROM reservationProperty WHERE propertyId = rp.propertyId AND reservationStatusId = 2 AND YEAR(reservationEndDt) = YEAR(CURDATE())) AS reservationPropertyNightBookedTotal, 
        reservationRateCurrency, (SELECT SUM(reservationRateValue) AS reservationRateValueTotal FROM reservationProperty WHERE propertyId = rp.propertyId AND reservationStatusId = 2 AND YEAR(reservationEndDt) = YEAR(CURDATE())) AS reservationRateValueTotal 
    FROM reservationProperty rp Group By propertyId Order By propertyId');
    $totalReservation = $_SESSION['DB']->queryAllResult($rs_reservationPropertyDetails);
    $totalBooking = [];
    foreach($totalReservation as $data){
        if(!empty($data['propertyId'])){
            $totalBooking[$data['propertyId']] = $data;
        }
    }
    return $totalBooking;
}
$totalBooking = getTotalBooking();
$villBooking = prepareVilla($calendarStartDt,$destId,$propertyQuery);
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Reservations - <?php echo SITE_NAME;?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/calendar.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php include_once '../js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/calendar.jsx" type="text/jsx"></script>

</head>

<body>
	<?php require_once '../inc-header.php'; ?>

        <section id="header-section"></section>
        <section id="reservations-title-steps-section"></section>

        <section>
            <div class="row">
                <div class="columns">
                    <div id="all-destination"></div>
                    <div id="booking-calendar"></div>
                </div>
            </div>
        </section>

    <?php require_once '../inc-footer.php'; ?>
	
	<?php require_once '../inc-js.php'; ?>
        <script src="https://momentjs.com/downloads/moment.min.js" ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-range/2.0.3/moment-range.min.js" ></script>
    <script type="text/jsx">
            /** @jsx React.DOM */
            var bannerImage = "<?php echo SITE_ID == 1 ? "/img/destination-header_all.png" : "/img/inner-bg1.png" ?>";
            ReactDOM.render(
                <Image1 src={bannerImage}/>,
                document.getElementById('header-section')
            );             
            ReactDOM.render(
                <CalendarDestinations data={<?php echo json_encode($allDestination);?>}/>,
                document.getElementById('all-destination')
            );
            var data ={
                totalReservationProperty: <?php echo $totalRows_rs_reservationProperty; ?>,
                userGroup: <?php echo $_SESSION['USER']->getUserGroupId();?>,
                property: <?php echo json_encode($row_rs_reservationProperty); ?>,
                calendarStartDt: "<?php echo date('m/d/Y', strtotime($calendarStartDt)); ?>",
                destId: <?php echo $destId==null?"null":$destId; ?>,
                propertyName: <?php echo $propertyName==null?"null":"'".$propertyName."'"; ?>,
                checkInDt: <?php echo $checkInDt==null?"null":"'".date('m/d/Y', strtotime($checkInDt))."'"; ?>,
                checkOutDt: <?php echo $checkOutDt==null?"null":"'".date('m/d/Y', strtotime($checkOutDt))."'"; ?>,
                totalNights: <?php echo $totalNights;?>
            };
            var villaBooking = <?php echo json_encode($villBooking);?>;
            var totalBooking = <?php echo json_encode($totalBooking);?>;
            ReactDOM.render(
                <BookingCalendar data={data} totalBooking={totalBooking} villaBooking={villaBooking}/>,
                document.getElementById('booking-calendar')
            );     
        </script>
</body>

</html>
