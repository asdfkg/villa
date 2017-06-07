<?php
require_once '../private/config.php';

if ($_SESSION['RESERVATION']->get('reservationId')) {
	$_SESSION['RESERVATION'] = new Reservation();
	$_SESSION['RESERVATION']->set('step', 1);
}

if (isset($_POST['action']) && $_POST['action'] == 'reservation'){
    $post = $_POST;
    $post['dest'] = urldecode($post['dest']);
    $lastSearch = json_encode($post);
    setcookie("lastSearch",$lastSearch,time()+(60*60*24*20));
    die(header('Location: ?dest='.$_POST['dest'].'&check_in='.date('m/d/Y', strtotime($_POST['checkInDt'])).'&check_out='.date('m/d/Y', strtotime($_POST['checkOutDt'])).'&bed_min='.(@$_POST['bedMin']).'&bed_max='.(@$_POST['bedMax']).'&budget_min='.(@$_POST['budgetMin']).'&budget_max='.(@$_POST['budgetMax']).'&amenities='.(@$_POST['amenities'])));
}
$dest = '';
if(!isset($_GET['dest'])){
    $get = json_decode(@$_COOKIE['lastSearch'],2);
    if(!empty($get)){
        $_GET['check_in'] = $get['checkInDt'];
        $_GET['check_out'] = $get['checkOutDt'];
        $_GET['dest'] = $get['dest'];
        $_GET['amenities'] =isset($get['amenities'])?$get['amenities']:null;
        $_GET['budget_max'] = isset($get['budgetMax'])?$get['budgetMax']:null;
        $_GET['budget_min'] = isset($get['budgetMin'])?$get['budgetMin']:null;
        $_GET['bed_max'] = isset($get['bedMax'])?$get['bedMax']:null;
        $_GET['bed_min'] = isset($get['bedMin'])?$get['bedMin']:null;
    }elseif(in_array(date('m'),array(11,12,1,2))){
        $dest = 'miami';
    }elseif(in_array(date('m'),array(3,4,5,6))){
        $dest = 'saint-tropez';
    }
}
$_GET['check_in'] = (isset($_GET['check_in']) && !empty($_GET['check_in'])?$_GET['check_in']:date('m/d/Y'));
$_GET['check_out'] = (isset($_GET['check_out']) && !empty($_GET['check_out'])?$_GET['check_out']:date('m/d/Y', strtotime('+3 days')));
//if (!isset($_GET['dest'])) header('Location: ?dest='.($_SESSION['RESERVATION']->get('destName')?$_SESSION['RESERVATION']->get('destName'):'all').'&check_in='.($_SESSION['RESERVATION']->get('checkInDt')?date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkInDt'))):date('m/d/Y')).'&check_out='.($_SESSION['RESERVATION']->get('checkOutDt')?date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkOutDt'))):date('m/d/Y', strtotime('+3 days'))));

if (!isset($_GET['dest'])) die(header('Location: ?dest='.$dest.'&property='.(isset($_GET['property'])?$_GET['property']:'').'&check_in='.(isset($_GET['check_in'])?$_GET['check_in']:date('m/d/Y')).'&check_out='.(isset($_GET['check_out'])?$_GET['check_out']:date('m/d/Y', strtotime('+3 days')))));

$destination = $_GET['dest']=='all'?NULL:$_GET['dest'];
$checkInDt = $_GET['check_in'];
$checkOutDt = $_GET['check_out'];
$bedMin = isset($_GET['bed_min'])?$_GET['bed_min']:NULL;
$bedMax = isset($_GET['bed_max'])?$_GET['bed_max']:NULL;
$budgetMin = isset($_GET['budget_min'])?$_GET['budget_min']:NULL;
$budgetMax = isset($_GET['budget_max'])?$_GET['budget_max']:NULL;
$amenities = isset($_GET['amenities'])?$_GET['amenities']:NULL;
$amenities = explode(",",$amenities);
$amenities = array_filter($amenities);
$amenities = implode(",",$amenities);
$searchKeyword = isset($_POST['keyword'])?$_POST['keyword']:NULL;
/*
$_SESSION['RESERVATION']->set('destName', $destination);
$_SESSION['RESERVATION']->set('checkInDt', date('Y-m-d', strtotime($checkInDt)));
$_SESSION['RESERVATION']->set('checkOutDt', date('Y-m-d', strtotime($checkOutDt)));
$_SESSION['RESERVATION']->set('bedroomMin', $bed);
*/

if ($destination == 'all') $rs_destination = $_SESSION['DB']->querySelect('SELECT * FROM destination LIMIT 1');
else $rs_destination = $_SESSION['DB']->querySelect('SELECT * FROM destination WHERE UPPER(destName) = ? LIMIT 1', array(strtoupper(urldecode($destination))));
$row_rs_destination = $_SESSION['DB']->queryResult($rs_destination);
$totalRows_rs_destination = $_SESSION['DB']->queryCount($rs_destination);

$propertyId = 0;
if (isset($_GET['property']) && $_GET['property'] != '') {
	$rs_property = $_SESSION['DB']->querySelect('SELECT propertyId FROM property LEFT JOIN destination ON destination.destId=property.destId WHERE site IN ("3","'.SITE_ID.'") AND UPPER(propertyName) = ? LIMIT 1', array(str_replace('-', ' ', strtoupper($_GET['property']))));
	$row_rs_property = $_SESSION['DB']->queryResult($rs_property);
	$totalRows_rs_property = $_SESSION['DB']->queryCount($rs_property);
	if ($totalRows_rs_property) $propertyId = $row_rs_property['propertyId'];
}
$diff = strtotime($checkOutDt)-strtotime($checkInDt);
$diff=$diff/60/60/24;

$propertyArray = $_SESSION['RESERVATION']->getProperty(urldecode($destination), $checkInDt, $checkOutDt, $bedMin, $bedMax, $budgetMin, $budgetMax, $propertyId, $searchKeyword, $amenities, 1);
$villaCtr = 0;
$villaCtr = count($propertyArray);
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Reservations - <?php echo SITE_ID==1?'VILLAZZO':'GREAT VILLA DEALS'; ?> </title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
    <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/reservations.css">
    <script src="/js/vendor/modernizr.js"></script>
    <!-- React -->
    <?php include_once '../js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/search-result.jsx"  type="text/jsx"></script>
    <script src="/js/react/jsx/villazzo-search.jsx"  type="text/jsx"></script>
    <script src="/js/moment.min.js" ></script>
    <!-- /React -->
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
        <!-- Contact Us Header Image Section Start -->
        <section id="header-section" class="inner-bg"></section>
        <!-- Contact Us Header Image Section End -->
        <div class="show-for-medium-up new-form-bg" id="searchBoxForm"></div>
        <?php require_once 'inc-reservation.php'; ?>
        
        <!-- Reservations Title and Steps Section Start -->
        <section id="reservations-title-steps-section"></section>
        <!-- Reservations Title and Steps Section End -->
        <!-- Start Destination Results Start-->
        <section id="destination-results" class="villa_list">
        </section>
<!--        React-->
        <script type="text/jsx" charset="utf-8">
            /** @jsx React.DOM */

            var data =<?php echo json_encode($propertyArray);?>;
            var bookurl = '<?php echo ($_SESSION['USER']->getUserId())?'calendar':'services'; ?>';
            ReactDOM.render(
              <SearchResult siteid="<?php echo SITE_ID;?>" property={data} bookingDays="<?php echo $diff;?>" checkInDt="<?php echo $checkInDt;?>" checkOutDt="<?php echo $checkOutDt;?>" totalVillas="<?php echo number_format($villaCtr)?> VILLAS" bookurl={bookurl}/>,
              document.getElementById('destination-results')
            );
            var headerImg = "<?php echo SITE_ID ==1?"/img/destination-header_".str_replace('-', '_', $_GET['dest']).".png":"/img/inner-bg1.png";?>";
            var mobileBannerImage = "/img/mobile-inner-bg1.png";
            ReactDOM.render(
                <?php  /*<Image1 src="/img/destination-header_<?php echo str_replace('-', '_', $_GET['dest']); ?>.png"/>,*/
                if(SITE_ID == 1){ ?>
                    <Image1 src={headerImg}/>,
                <?php  } if(SITE_ID == 2){ ?>
                    <span>
                        <Image1 src={mobileBannerImage} classes='visible-for-small-only' />
                        <Image1 src={headerImg} classes='visible-for-medium-up' />
                    </span>,
                <?php }  ?>
              
              document.getElementById('header-section')
            );
    
            var StepUrl1 = '<?php echo (isset($_GET['property']) ? 'location.href = "./services?property='.$_GET['property'].'&check_in='.$checkInDt.'&check_out='.$checkOutDt : ''); ?>';
            var StepUrl2 = '<?php //echo './services?property='.$_SESSION['RESERVATION']->get('propertyName').'&check_in='.date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkInDt'))).'&check_out='.date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkOutDt'))); ?>';
            ReactDOM.render(
                <ServiceStep step="1" siteid="<?php echo SITE_ID;?>" stepUrl1={StepUrl1} stepUrl2={StepUrl2} />,
                document.getElementById('reservations-title-steps-section')
            );
        </script>
        <!--/React-->
        <!-- Start Destination Results End-->
        <!-- SubFooter Section End -->
    <?php require_once '../inc-footer.php'; ?>
	
	<?php require_once '../inc-js.php'; ?>
    <script type="text/javascript">
	// disable equalization for mobile
	$(window).on('load resize', function(e)
	{
		var equalize = true;
		if ($(document).width() <= 640) equalize = false;
		$(document).foundation({ equalizer : { equalize_on_stack: equalize }});  
	});
    </script>
</body>

</html>
