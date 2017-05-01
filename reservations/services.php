<?php
require_once '../private/config.php';

if ($_SESSION['RESERVATION']->get('step') == 4) die(header('Location: /reservations'));

//if (!isset($_SESSION['RESERVATION']) || $_SESSION['RESERVATION']->get('reservationId')) $_SESSION['RESERVATION'] = new Reservation();

if ($_SESSION['RESERVATION']->get('step') == 1) $_SESSION['RESERVATION']->set('step', 2);

if (!isset($_GET['property'])) header('Location: /reservations');

$rs_property = $_SESSION['DB']->querySelect('SELECT propertyId FROM property LEFT JOIN destination ON destination.destId=property.destId WHERE UPPER(propertyName) = ?  AND property.site in ("3","'.SITE_ID.'") LIMIT 1', array(str_replace('-', ' ', strtoupper($_GET['property']))));
$row_rs_property = $_SESSION['DB']->queryResult($rs_property);
$totalRows_rs_property = $_SESSION['DB']->queryCount($rs_property);

$level = (isset($_GET['level'])?$_GET['level']:($_SESSION['RESERVATION']->get('serviceLevel')?$_SESSION['RESERVATION']->get('serviceLevel'):NULL));
$checkInDt = (isset($_GET['check_in'])?$_GET['check_in']:NULL);
$checkOutDt = (isset($_GET['check_out'])?$_GET['check_out']:NULL);

$property = $_SESSION['RESERVATION']->getProperty('', $checkInDt, $checkOutDt, 0, 0, 0, 0, $row_rs_property['propertyId']);
$propertyArray = $property[0];

if ($propertyArray['night_total'] < 3) header('Location: /reservations');

$serviceLevelsArray = $propertyArray['service_levels'];

$additionalServiceTags = array();
if ($_SESSION['RESERVATION']->get('additionalServicesTags')) $additionalServiceTags = $_SESSION['RESERVATION']->get('additionalServicesTags');

$additionalServices = array(
	array(
		'name'			=> 'optionLinenAndTowel',
		'frequency'		=> 'Times/Week',
		'placeholder'	=> '0-7',
		'desc'			=> 'Linen & Towel Service, Off-Site Professional Laundry ('.$propertyArray['dest_currency'].'139 + '.$propertyArray['dest_currency'].'39/BR)',
		'rate'			=> $propertyArray['property_bedrooms'] * 39,
		'value'			=> (isset($additionalServiceTags['optionLinenAndTowel']) ? $additionalServiceTags['optionLinenAndTowel'] : null),
		'min'			=> 0,
		'max'			=> 7
	),
	array(
		'name'			=> 'optionProductAndService',
		'frequency'		=> 'Times/Week',
		'placeholder'	=> '0-7',
		'desc'			=> 'VillaHotel Product Replenishment & Service ('.$propertyArray['dest_currency'].'149 + '.$propertyArray['dest_currency'].'49/BR)',
		'rate'			=> $propertyArray['property_bedrooms'] * 49,
		'value'			=> (isset($additionalServiceTags['optionProductAndService']) ? $additionalServiceTags['optionProductAndService'] : null),
		'min'			=> 0,
		'max'			=> 7
	),
	array(
		'name'			=> 'optionHouseKeeping',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '0-12',
		'desc'			=> 'Housekeeping ('.$propertyArray['dest_currency'].'29/H)',
		'rate'			=> 29,
		'value'			=> (isset($additionalServiceTags['optionHouseKeeping']) ? $additionalServiceTags['optionHouseKeeping'] : null),
		'min'			=> 0,
		'max'			=> 12
	),
	array(
		'name'			=> 'optionButler',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '4-24',
		'desc'			=> 'Butler ('.$propertyArray['dest_currency'].'49/H)',
		'rate'			=> 49,
		'value'			=> (isset($additionalServiceTags['optionButler']) ? $additionalServiceTags['optionButler'] : null),
		'min'			=> 4,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionChef',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '4-24',
		'desc'			=> 'Chef ('.$propertyArray['dest_currency'].'79/H)',
		'rate'			=> 79,
		'value'			=> (isset($additionalServiceTags['optionChef']) ? $additionalServiceTags['optionChef'] : null),
		'min'			=> 4,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionSecurity',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '0-24',
		'desc'			=> 'Personal Armed Security ('.$propertyArray['dest_currency'].'99/H)',
		'rate'			=> 99,
		'value'			=> (isset($additionalServiceTags['optionSecurity']) ? $additionalServiceTags['optionSecurity'] : null),
		'min'			=> 0,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionDriver',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '0-24',
		'desc'			=> 'Private Driver with Cadillac Escalade / Mercedes S-Class ('.$propertyArray['dest_currency'].'99/H)',
		'rate'			=> 99,
		'value'			=> (isset($additionalServiceTags['optionDriver']) ? $additionalServiceTags['optionDriver'] : null),
		'min'			=> 0,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionBabySitting',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '0-24',
		'desc'			=> 'Babysitting ('.$propertyArray['dest_currency'].'39/H)',
		'rate'			=> 39,
		'value'			=> (isset($additionalServiceTags['optionBabySitting']) ? $additionalServiceTags['optionBabySitting'] : null),
		'min'			=> 0,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionTraining',
		'frequency'		=> 'H/Day',
		'placeholder'	=> '0-24',
		'desc'			=> 'Personal Training ('.$propertyArray['dest_currency'].'99/H)',
		'rate'			=> 99,
		'value'			=> (isset($additionalServiceTags['optionTraining']) ? $additionalServiceTags['optionTraining'] : null),
		'min'			=> 0,
		'max'			=> 24
	),
	array(
		'name'			=> 'optionPreArrival',
		'frequency'		=> '',
		'placeholder'	=> '0 or 1',
		'desc'			=> 'Pre-arrival Groceries & Fridge Setup ('.$propertyArray['dest_currency'].'299)',
		'rate'			=> 299,
		'value'			=> (isset($additionalServiceTags['optionPreArrival']) ? $additionalServiceTags['optionPreArrival'] : null),
		'min'			=> 0,
		'max'			=> 1
	),
	array(
		'name'			=> 'optionMassage',
		'frequency'		=> '',
		'placeholder'	=> 'ANY',
		'desc'			=> 'Relaxing Swedish Massage ('.$propertyArray['dest_currency'].'179)',
		'rate'			=> 179,
		'value'			=> (isset($additionalServiceTags['optionMassage']) ? $additionalServiceTags['optionMassage'] : null),
		'min'			=> 0,
		'max'			=> 1000
	)
);

$services=[];
if(SITE_ID==1){
    $serviceLevels = $propertyArray['service_levels']['five_star'];
    $propertyServiceLevelsTab = ['level'=>5,'name'=>$serviceLevels['name']];
    $services[]=array('desc_long'=>$serviceLevels['services']['villa_only']['desc_long'].' + '.$serviceLevels['services']['management']['desc_long'].' + Villa Hotel Transformation','rate'=>$serviceLevels['base_night']);
    $serviceLevels['checkout_cleaning']=$serviceLevels['services']['checkout_cleaning']['rate'];
    $serviceLevels['management']=$serviceLevels['services']['management']['percentage'];
    $serviceLevels['services']=$services;
}else{
    $serviceLevels = $propertyArray['service_levels']['villa_only'];
    foreach($serviceLevels['services'] as $s){
        $services[]=$s;
    }
    $serviceLevels['services']=$services;
}
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Services - <?php echo SITE_ID==1?"VILLAZZO":"GREATVILLADEALS"; ?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php include_once '../js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/checkout.jsx?id=1.0.1" type="text/jsx"></script>
</head>

<body <?php echo SITE_ID==1?'onload="applyServices()"':'';?>>
	<?php require_once '../inc-header.php'; ?>
    
    <!-- Reservations Services Header Image Section Start -->
    <section id="header-section" class="inner-bg"></section>
    <!-- Reservations Title and Steps Section Start -->
    <section id="reservations-title-steps-section"></section>
    <!-- Reservations Title and Steps Section End -->
      
    <!-- Reservations Services Header Image Section Start -->
    <section id="reservations-services-section">
        <div class="row" id="your-selection" data-equalizer></div>
        
        <!-- Show Rate Details Start -->
        <div id="service-levels"></div>	
        <div id="rate-details"></div>
        <!-- Show Rate Details End -->
    </section>
    <?php require_once '../inc-footer.php'; ?>
	
    <?php require_once '../inc-js.php'; ?>
    
    <script type="text/jsx">
        /** @jsx React.DOM */
        var serviceBannerImage = "<?php echo SITE_ID==1? "/img/destination-header_".str_replace('-', '_', $propertyArray['dest_name']).".png":"/img/inner-bg1.png";?>";
        var propertyInfo = <?php echo json_encode($propertyArray); ?>;
        var services = <?php echo json_encode($serviceLevels); ?>;
        var selectedServiceLevel = <?php echo SITE_ID==1?$serviceLevels['level']:3;?>;
        var siteid = <?php echo SITE_ID;?>;
        ReactDOM.render(
            <CheckoutStep2 property={propertyInfo} siteid={siteid} serviceInfo={services} additionalServicesInfo={<?php echo json_encode($additionalServices);?>} selectedServiceLevel={selectedServiceLevel} totalNights="<?php echo $_SESSION['RESERVATION']->get('nightTotal');?>" />,
            document.getElementById('rate-details')
        );
        <?php
            if(SITE_ID==1): ?>
            ReactDOM.render(
                    <CheckoutStep2ServiceLevels data={<?php echo json_encode($propertyServiceLevelsTab);?>} />,
                    document.getElementById('service-levels')
            );
        <?php endif; ?>
        ReactDOM.render(
            <Image1 src={serviceBannerImage}/>,
            document.getElementById('header-section')
        );
        ReactDOM.render(
            <ServiceStep step="2" stepUrl1="" siteid="<?php echo SITE_ID;?>" stepUrl2=""/>,
            document.getElementById('reservations-title-steps-section')
        );
        ReactDOM.render(
            <ReservationServiceSection data={propertyInfo} checkOut="<?php echo date('F jS, Y', strtotime($propertyArray['check_out_dt'])); ?>" 
                checkIn="<?php echo date('F jS, Y', strtotime($propertyArray['check_in_dt'])); ?>" step={2} />,
            document.getElementById('your-selection')
        );

    </script>
        
    <script>
	// disable equalization for mobile
	$(window).on('load resize', function(e)	{
		var equalize = true;
		if ($(document).width() <= 640) equalize = false;
		$(document).foundation({ equalizer : { equalize_on_stack: equalize }});  
	});
	
	var selectedServiceLevel = 3; // default
	function serviceLevelToSubmit(level) {
		selectedServiceLevel = level;
	}
	
	function submitServiceLevelForm() {
		$('#serviceLevel' + selectedServiceLevel + 'Form').submit();
	}
	<?php 
        if(SITE_ID==1):?>
	function applyServices() {
		var rateNight = 0;
		var servicesTotal = 0;
		
		$('.option input[type="number"]').each(function () {
			if ($(this).val()) {
				if (Number($(this).val()) < Number($(this).attr('min')) || Number($(this).val()) > Number($(this).attr('max'))) $(this).val('');
				
				if ($(this).attr('id') == 'optionLinenAndTowel') servicesTotal += (139 + Number($('#' + $(this).attr('id') + 'Rate').val())) * Number($(this).val()) / 7;
				else if ($(this).attr('id') == 'optionProductAndService') servicesTotal += (149 + Number($('#' + $(this).attr('id') + 'Rate').val())) * Number($(this).val()) / 7;
				else servicesTotal += Number($(this).val()) * Number($('#' + $(this).attr('id') + 'Rate').val());
			}
			
			console.log(servicesTotal);
		});
		
		$('#checkoutBtn').attr('disabled', 'disabled');
		
		$.ajax(
		{
			type: 'POST',
			url: '/ajax.php',
			data: 'action=reservationPropertyRate&checkInDt=' + $('#checkInDt').val() + '&checkOutDt=' + $('#checkOutDt').val() + '&propertyId=' + Number($('#propertyId').val()) + '&servicesTotal=' + servicesTotal,
			dataType: 'json',
			cache: false,
			success: function(data)
			{
				switch (data.result)
				{
					case 0:
						alert('Unable to calculate rate, please refresh your browser.');
					break;
				
					case 1:
						rateBaseNight = data.property['service_levels']['five_star']['base_night'];
						rateNight = data.property['service_levels']['five_star']['night'];
						$('#rateNight').val(rateNight);
						$('#rateNightDisp1').html(rateBaseNight.toLocaleString());
						$('#rateNightDisp2').html(rateNight.toLocaleString());
						$('#checkoutBtn').removeAttr('disabled');
					break;
				}
			},
			error: function()
			{
			}
		});
	}
        <?php endif;?>
    </script>

</body>

</html>