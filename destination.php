<?php
require_once './private/config.php';

// get the destination information
$destination = $_GET['dest'];

$rs_destination = $_SESSION['DB']->querySelect('SELECT * FROM destination WHERE UPPER(destName) = ? LIMIT 1', array(strtoupper($destination)));
$row_rs_destination = $_SESSION['DB']->queryResult($rs_destination);
$totalRows_rs_destination = $_SESSION['DB']->queryCount($rs_destination);

if (!$totalRows_rs_destination) header('Location: /luxury-rental-property-vacation-destinations');

if ($destination == 'aspen') $destinationDesc = 'Out of dozens of Aspen vacation homes, Villazzo President Christian Jagodzinski has personally hand-selected only the finest 10 properties between Snowmass and Aspen. His strict selection is based on his own demanding criteria for privacy, amenities, décor, ambience, and design. Most properties simply do not qualify - they are either antiquated, poorly maintained or poorly furnished. Below are the only vacation homes in the Aspen area worthy of the Villazzo label.';
else if ($destination == 'miami') $destinationDesc = 'Out of over 100 rental properties, Villazzo President Christian Jagodzinski has personally hand-selected only the finest 10 properties in Miami and Miami Beach. His strict selection is based on his own demanding criteria for privacy, amenities, décor, ambience, and design. Most properties do not qualify- they are either antiquated, poorly maintained or poorly furnished.  Below are the only luxury rentals in Miami and Miami Beach worthy of the Villazzo label.';
else if ($destination == 'saint-tropez') $destinationDesc = 'Out of over 100 vacation villas, Villazzo President Christian Jagodzinski has personally hand-selected only the finest 10 properties between the beaches of Ramatuelle, Gassin, and the St. Tropez peninsula. His strict selection is based on his own demanding criteria for privacy, amenities, décor, ambience, and design. Most properties simply do not qualify - they are either antiquated, poorly maintained or poorly furnished. Below are the most exclusive luxury villas for rent in St Tropez worthy of the Villazzo label.';
else if ($destination == 'st-barth') $destinationDesc = 'Out of over 100 vacation villas, Villazzo President Christian Jagodzinski has personally hand-selected only the finest 10 properties St Barth. His strict selection is based on his own demanding criteria for privacy, amenities, décor, ambience, and design. Most properties simply do not qualify - they are either antiquated, poorly maintained or poorly furnished. Below are the most exclusive luxury villas for rent in St Barth worthy of the Villazzo label.';

$propertyArray = $_SESSION['RESERVATION']->getProperty($destination=='all'?'':$destination, '', '', 0, 0, 0, 0, 0, '', '', 1);
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title><?php echo $row_rs_destination['destMetaTitle']; ?></title>
    <meta name="Description" content="<?php echo $row_rs_destination['destMetaDesc']; ?>" />
    <meta name="Keywords" content="<?php echo $row_rs_destination['destMetaKeywords']; ?>" />
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php include_once 'js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/<?php echo SITE_ID; ?>/user-profile.jsx" type="text/jsx"></script>
    <script src="/js/react/jsx/search-result.jsx"  type="text/jsx"></script>
	<script src="/js/moment.min.js" ></script>
</head>

<body>
	<?php require_once 'inc-header.php'; ?>
    <!-- Destination Start -->
    <section id="destination-header-image"></section>
    <!-- Start Destination Results Start-->
    <section id="destination-results">
        <div class="row text-center"><?php //echo $villas; ?></div>
    </section>
    <!-- Start Destination Results End-->
    <!-- Destination End -->
    <!-- More Section Start -->
    <section id="more-section" class="visible-for-small-only">
        <div class="row text-center">
            <div class="small-12 small-centered columns">
                <a href="#"><span class="text-center">MORE</span></a>
            </div>
        </div>
    </section>
    <!-- More Section End -->
	<?php require_once 'inc-footer.php'; ?>
	<?php require_once 'modal/property-availability.php'; ?>
	<?php require_once 'inc-js.php'; ?>
	<script>
	// disable equalization for mobile
	$(window).on('load resize', function(e)
	{
		var equalize = true;
		if ($(document).width() <= 640) equalize = false;
		$(document).foundation({ equalizer : { equalize_on_stack: equalize }});  
	});
        
    $('#propertyAvailabilityModalCheckInDt').datepicker({
		defaultDate: '+1d',
		minDate: '+1d',
		onClose: function(selectedDate)
		{
			if (selectedDate)
			{
				var nextDayDate = $(this).datepicker('getDate', '+3d');
				nextDayDate.setDate(nextDayDate.getDate() + 3);
				$('#propertyAvailabilityModalCheckOutDt').datepicker('option', 'minDate', nextDayDate);
			}
		}
	});
	
	$('#propertyAvailabilityModalCheckOutDt').datepicker({
		defaultDate: '+1d',
		minDate: '+1d'
	});
	</script>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var bannerImage = "<?php echo SITE_ID==1?"/img/destination-header_".str_replace('-', '_', $destination).".png": "/img/inner-bg1.png"?>";
            
            ReactDOM.render(
                <div>
                    <Image1 alt="Villa Rentals" src={bannerImage} />
                    <div className="row">
                        <div className="small-12 columns">
                            <Heading1 value="<?php echo 'LUXURY '.strtoupper($destination).' VILLA & HOME VACATION RENTALS'; ?>"/>
                            <p><?php echo $destinationDesc; ?></p>
                        </div>
                    </div>
                </div>,
                document.getElementById('destination-header-image')
            );
    
            var data =<?php echo json_encode($propertyArray);?>;
            var bookurl = '<?php echo ($_SESSION['USER']->getUserId())?'calendar':'services'; ?>';
            ReactDOM.render(
              <SearchResult siteid="<?php echo SITE_ID;?>" destinationPage="1" property={data} totalVillas="" bookurl={bookurl}/>,
              document.getElementById('destination-results')
            );
        </script>
        
        
</body>

</html>