<?php
require_once './private/config.php';

// property info
$rs_property = $_SESSION['DB']->querySelect('SELECT propertyId FROM property LEFT JOIN destination ON destination.destId=property.destId WHERE UPPER(propertyName) = ? AND property.site in ("3","'.SITE_ID.'") LIMIT 1', array(str_replace('-', ' ', strtoupper($_GET['prop']))));
$row_rs_property = $_SESSION['DB']->queryResult($rs_property);
$totalRows_rs_property = $_SESSION['DB']->queryCount($rs_property);

if (!isset($row_rs_property['propertyId'])) header('Location: /luxury-rental-property-vacation-destinations');

$checkInDt = (isset($_GET['check_in'])?$_GET['check_in']:NULL);
$checkOutDt = (isset($_GET['check_out'])?$_GET['check_out']:NULL);

$property = $_SESSION['RESERVATION']->getProperty('', $checkInDt, $checkOutDt, 0, 0, 0, 0, $row_rs_property['propertyId']);
$propertyArray = $property[0];

$propertyId = $propertyArray['property_id'];
$propertyName = $propertyArray['property_name'];
$destName = $propertyArray['dest_name'];
if ($destName == 'StTropez') $destName = 'Saint-Tropez';
$destFolder = str_replace(' ', '-', strtolower($destName));
$propertyGallery = $propertyName.($propertyArray['property_gallery_show_all']?'':'/limited');
$propertyTitle = $propertyArray['property_title'];
$propertyDescLong = $propertyArray['property_desc_long'];
$propertyLocationName = $propertyArray['property_location_name'];
$propertyLocationLat = $propertyArray['property_location_lat'];
$propertyLocationLong = $propertyArray['property_location_long'];
$propertyTotalArea = ($propertyArray['property_area_sq']&&$propertyArray['property_area_mt']?number_format((float)$propertyArray['property_area_sq']).' sq ft ('.number_format((float)$propertyArray['property_area_mt']).' m&sup2;)':'');
$propertyLivingArea = ($propertyArray['property_interior_sq']&&$propertyArray['property_interior_mt']?number_format((float)$propertyArray['property_interior_sq']).' sq ft ('.number_format((float)$propertyArray['property_interior_mt']).' m&sup2;)':'');
$propertyYearBuilt = $propertyArray['property_year_built'];
$propertyYearRemodeled = $propertyArray['property_year_remodeled'];
$propertyMaxPeople = $propertyArray['property_max_people'];
$propertyBedrooms = $propertyArray['property_bedrooms'];
$propertyBathrooms = $propertyArray['property_bathrooms'];
$serviceLevelsArray = $propertyArray['service_levels'];
$currency = $propertyArray['dest_currency'];
$checkInDt = $propertyArray['check_in_dt'];
$checkOutDt = $propertyArray['check_out_dt'];
// $nightTotal = $propertyArray['night_total'];
$nightTotal = $propertyArray['dest_currency'].number_format($propertyArray['service_levels']['three_star']['min']);

// property amenities
$rs_property_feature = $_SESSION['DB']->querySelect('SELECT * FROM propertyFeature LEFT JOIN feature on propertyFeature.featureId = feature.featureId WHERE propertyId = ? AND propFeatActive = 1 ORDER BY propFeatOrder', array($propertyId));
$row_rs_property_feature = $_SESSION['DB']->queryResult($rs_property_feature);
$totalRows_rs_property_feature = $_SESSION['DB']->queryCount($rs_property_feature);

$propertyAmenities = '';
if ($totalRows_rs_property_feature)
{
	$propertyAmenities = '<ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-2">';
	do
	{
		$propertyAmenities .= '<li>';
		if ($row_rs_property_feature['propFeatName']) $propertyAmenities .= $row_rs_property_feature['propFeatName'];
		else $propertyAmenities .= $row_rs_property_feature['featureName'];
		
		if ($row_rs_property_feature['propFeatValue']) $propertyAmenities .= ': '.$row_rs_property_feature['propFeatValue'];
		$propertyAmenities .= '</li>';
		
	} while ($row_rs_property_feature = $_SESSION['DB']->queryResult($rs_property_feature));
	$propertyAmenities .= '</ul>';
}

// property driving
$rs_property_driving = $_SESSION['DB']->querySelect('SELECT * FROM propertyDriving WHERE propertyId = ? ORDER BY propDrivingLocation', array($propertyId));
$row_rs_property_driving = $_SESSION['DB']->queryResult($rs_property_driving);
$totalRows_rs_property_driving = $_SESSION['DB']->queryCount($rs_property_driving);

$propertydriving = '';
if ($totalRows_rs_property_driving)
{
	$propertydriving = '<ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-2">';
	do {
		$propertydriving .= '<li><span>'.$row_rs_property_driving['propDrivingLocation'].':</span> '.$row_rs_property_driving['propDrivingTime'].' min</li>';
	} while ($row_rs_property_driving = $_SESSION['DB']->queryResult($rs_property_driving));
	$propertydriving .= '</ul>';
}

// property gallery
$propertyGalleryArray = array();
//$path = 'media/destination/'.$destFolder.'/'.$propertyGallery.'/';
$path = 'img/property/'.$propertyGallery.'/';
$propertySlideshowFull = NULL;
$propertySlideshowThumb = NULL;
$propertySlideshowArr=[];
if (file_exists($path))
{
	$directory = opendir($path);
	while (FALSE !== ($filename = readdir($directory)))
	{
		if (is_dir($path.$filename) || $filename[0] == '.' || $filename[1] == 'jpg' || strpos($filename, '@2x') !== FALSE || strpos($filename, '@3x') !== FALSE) continue; // skip sub directories, hidden files, & non-pngs
		$propertyGalleryArray[] = $filename;
	}
	sort($propertyGalleryArray);
	
	$propertySlideshowCtr = 1;
        $i= 0;
	foreach ($propertyGalleryArray as $filename)
	{
            $title = NULL;
            $titleArray = explode('_', trim($filename, '.jpg'));
            foreach ($titleArray as $data) if (!is_numeric($data)) $title .= $data.' ';
            $propertySlideshowArr[$i]['propertySlideshowCtr']   = $propertySlideshowCtr;
            $propertySlideshowArr[$i]['propertyName']           = $propertyName;
            $propertySlideshowArr[$i]['path']                   = 'https://www.villazzo.com/'.$path;
            $propertySlideshowArr[$i]['filename']               = $filename;
            $propertySlideshowArr[$i]['title']                  = $title;
            $propertySlideshowCtr ++;
            $i++;
	}
}

// service levels
/* 
 * TODO - CS Remove
 * 
 * $propertyServiceLevels = '';
foreach ($serviceLevelsArray as $serviceLevels)
{
	$propertyServiceLevels .= '<div class="medium-'.(12/count($serviceLevelsArray)).' columns data-equalizer-watch">
	    <ul class="pricing-table">
	        <li class="title">';
	        
	        for ($i = 0; $i < $serviceLevels['level']; $i ++) $propertyServiceLevels .= '<i class="fa fa-star"></i> ';
	         $propertyServiceLevels .= strtoupper($serviceLevels['name']).'</li>
	        <li class="description text-left">';
	        
	        if (!empty($serviceLevels['services']))
	        {
		        foreach ($serviceLevels['services'] as $serviceIcon => $serviceLevel)
				{
					if ($serviceLevel['type'] == 'service') $propertyServiceLevels .= '<div class="row"><div class="small-2 medium-3 columns"><img src="/img/reservations/services/icons/'.$serviceIcon.'.png"></div><div class="small-10 medium-9 columns">'.$serviceLevel['desc_short'].'</div></div>';
				}
			}
			$propertyServiceLevels .= '</li>
	        <li class="price">'.($serviceLevels['night']?$currency.number_format($serviceLevels['night']):$currency.number_format($serviceLevels['min']).' - '.$currency.number_format($serviceLevels['max'])).'<br><span class="text-grey">per night</span></li>';
	        
	        if ($serviceLevels['level'] == 0)
			{
		        $propertyServiceLevels .= '<li class="cta-button"><a class="button tiny" data-reveal-id="propertyVillaOnlyModal">LEARN MORE</a></li>';
	        }

			if ($serviceLevels['level'] > 0)
			{
				if ($checkInDt && $checkOutDt) $propertyServiceLevels .= '
		        <li class="cta-button"><a class="button tiny" href="/reservations/services?property='.$propertyName.'&level='.$serviceLevels['level'].'&check_in='.date('m/d/Y', strtotime($checkInDt)).'&check_out='.date('m/d/Y', strtotime($checkOutDt)).'">BOOK NOW</a></li>';
		        else $propertyServiceLevels .= '<li class="cta-button"><a class="button tiny" data-reveal-id="propertyAvailabilityModal">CHECK AVAILABILITY</a></li>';
	        }
	        $propertyServiceLevels .= '
	    </ul>
	</div>';
} */
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no"/>
    <title><?php echo ucwords('Villa '.$propertyName.' - '.$destName.' Villa Rental | '.(SITE_ID==1?"VILLAZZO":"GREATVILLADEALS")); ?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    
    <!-- Load React Library -->
    <?php include_once 'js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/property-summary.jsx" type="text/jsx"></script>
    <script src="/js/react/jsx/property-summary-popup.jsx" type="text/jsx"></script>
    <!-- End Load React Library -->

    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYpd2VEIF_n_fdZkFA3uYKRYKoYkiQIko&sensor=false"></script>
    <script type="text/javascript">
    <!--
	function initialize()
	{
		var map = new google.maps.Map(
			document.getElementById('property-map'), {
			center: new google.maps.LatLng(<?php echo (isset($propertyLocationLat)?$propertyLocationLat:0); ?>, <?php echo (isset($propertyLocationLong)?$propertyLocationLong:0); ?>),
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		});
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(<?php echo (isset($propertyLocationLat)?$propertyLocationLat:0); ?>, <?php echo (isset($propertyLocationLong)?$propertyLocationLong:0); ?>),
			map: map
		});
	
	}
    google.maps.event.addDomListener(window, 'load', initialize);
	-->
	</script>
</head>

<body onload="initialize()" onunload="GUnload()">
	<?php require_once 'inc-header.php'; ?>
        <section id="header-section" class="inner-bg"></section>
        <!-- React Owl Carousel Desktop Start -->
        <span id="property-slider-section-rc"></span>
        <span id="property-slider-thump-section-rc"></span>


        <!-- Owl Carousel Desktop End -->


	<!-- React Property Summary Section Start -->
        <span id="property-summary-section-rc"></span>
            <!-- Property Summary Section End -->
            
            <!-- Rates Section Start -->
        <span id="property-summary-change-date"></span>
            <!-- Rates Section End -->
            
            <!-- Property Map Section Start -->
            <section id="property-map-section">
                <div class="text-center">
                    <section>
                        <div id="property-map"></div>
                    </section>
                </div>
            </section>
            <!-- Property Map Section End -->
			<?php require_once 'inc-footer.php'; ?>
        
        <!-- End Property page popup's  -->
        <?php // TODO - CS Remove 
              //require_once 'modal/property-interested.php';
              //require_once 'modal/property-availability.php'; 
              //require_once 'modal/property-share.php';
        ?>
            <span id="property-interested-popup-form"></span>
            <span id="change-date-popup-form"></span>
            <span id="change-share-popup-form"></span>
            <?php require_once 'modal/property-villa-only.php'; ?>
			<?php require_once 'inc-js.php'; ?>
            
        <!-- React Script -->
        <script type="text/jsx">
            /** @jsx React.DOM */
            var data = {
                propertyTitle: "<?php echo $propertyTitle; ?>",
                destName: "<?php echo $propertyName.'<br>- '.$destName.' -'; ?>",
                propertyDescription: <?php echo str_replace('\n','<br />',json_encode($propertyDescLong)); ?>,
                propertyDriving:    '<?php echo $propertydriving; ?>',
                propertyAmenities: '<?php echo $propertyAmenities; ?>',
            };
            var details = [
                {name: 'Location',value:'<?php echo $propertyLocationName ?>'},
                {name: 'Bedrooms',value:'<?php echo $propertyBedrooms ; ?>'},
                {name: 'Interior space',value:'<?php echo $propertyLivingArea ; ?>'},
                {name: 'Bathrooms',value:'<?php echo $propertyBathrooms ; ?>'},
                {name: 'Total Area',value:'<?php echo $propertyTotalArea ; ?>'},  
            ]; 
            
            var dateDetail = { 
                checkInDt: '<?php echo !empty($checkInDt)?date("m/d/Y",strtotime($checkInDt)):''; ?>',
                checkOutDt: '<?php echo !empty($checkOutDt)?date("m/d/Y",strtotime($checkOutDt)):''; ?>',
                fromatedCheckInDt: '<?php echo !empty($checkInDt)?date("m/d/Y", strtotime($checkInDt)):''; ?>',
                fromatedCheckOutDt: '<?php echo !empty($checkOutDt)?date("m/d/Y", strtotime($checkOutDt)):''; ?>',
                propertyId: '<?php echo $propertyArray['property_id']; ?>',
                propertyName: '<?php echo $propertyArray['property_name']; ?>',
                propertyShareLink: '<?php echo "http://".$_SERVER["HTTP_HOST"]."/".str_replace(" ", "-", $propertyArray["dest_name"])."-rental-villas/villa-".str_replace(" ", "-", $propertyArray["property_name"]).(isset($propertyArray["check_in_dt"])&&isset($propertyArray["check_out_dt"])?"?check_in=".date("m/d/Y", strtotime($propertyArray["check_in_dt"]))."&check_out=".date("m/d/Y", strtotime($propertyArray["check_out_dt"])):""); ?>',
                propertyShareEmail: '<?php echo ($_SESSION["USER"]->getUserId()?$_SESSION["USER"]->getEmail():""); ?>',
                bookNowURL:     '<?php echo "/reservations/services?property=".$propertyName."&check_in=".date("m/d/Y", strtotime($checkInDt))."&check_out=".date("m/d/Y", strtotime($checkOutDt)) ?>',
                availability: '<?php echo $_SESSION['RESERVATION']->checkPropertyAvailability( date('Y-m-d',strtotime($checkInDt)), date('Y-m-d',strtotime($checkOutDt)), $propertyArray['property_id'])?"1":"2" ?>',
                bookable: '<?php echo $propertyArray['bookable']; ?>',
                minBookDays: <?php echo $propertyArray['min_book_days']==null?'null':$propertyArray['min_book_days']; ?>,
                nightTotal: "<?php echo $nightTotal;?>"
            }; 
        
            var propertySlideshowFull   = '<?php echo $propertySlideshowFull ?>';
            var propertySlideshowThumb  = '<?php echo $propertySlideshowThumb ?>'; 
            var sliderImages            = <?php echo json_encode($propertySlideshowArr) ?>;
            var sliderArrowLeft         = "img/home/<?php echo SITE_ID;?>/arrow-left.png";
            var sliderArrowRight        = "img/home/<?php echo SITE_ID;?>/arrow-right.png";
		
            ReactDOM.render(
                <PropertySummary siteid="<?php echo SITE_ID;?>" data={data}  propertyDetails={details} dateDetail={dateDetail} />,
                document.getElementById('property-summary-section-rc')
            );
            /*ReactDOM.render(
                <PropertySummaryDate data={dateDetail} />,
                document.getElementById('property-summary-change-date')
            );*/
            ReactDOM.render(
                <PropertySummaryDatePopupForm data={dateDetail} />,
                document.getElementById('change-date-popup-form')
            );
            ReactDOM.render(
                <PropertySummaryInterestedPopupForm data={dateDetail} siteid="<?php echo SITE_ID;?>"/>,
                document.getElementById('property-interested-popup-form')
            );
            ReactDOM.render(
                <PropertySummarySharePopupForm data={dateDetail} />,
                document.getElementById('change-share-popup-form')
            );
            ReactDOM.render(
                <PropertySummarySlider  sliderImages={sliderImages} siteid="<?php echo SITE_ID;?>" propertyName="<?php echo $propertyName;?>" destName="<?php echo $destName;?>"/>,
                document.getElementById('property-slider-section-rc')
            );
            ReactDOM.render(
                <PropertySummaryThumbSlider sliderImages={sliderImages} sliderArrowLeft={sliderArrowLeft} sliderArrowRight={sliderArrowRight} />,
                document.getElementById('property-slider-thump-section-rc')
            );  
            <?php if(SITE_ID==2){ ?>
            var serviceBannerImage = "/img/inner-bg1.png"  ;
            ReactDOM.render(
                <Image1 src={serviceBannerImage}/>,
                document.getElementById('header-section')
            );
            <?php } ?>
    </script>
        <!-- End React Script -->            
</body>

</html>
