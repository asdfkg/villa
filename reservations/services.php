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

// service levels
$propertyServiceLevelsTab = '';
		
$propertyServiceLevelsContent = '
<div class="row">
	<div class="columns">
		<div class="tabs-content">';
		
$propertyServiceLevelsOptions = '';
$services=[];
foreach ($serviceLevelsArray as $serviceLevels)
{
        if(SITE_ID==1 && $serviceLevels['level'] == 5){
            $propertyServiceLevelsTab = ['level'=>5,'name'=>$serviceLevels['name']];
            $services[]="";
        }elseif(SITE_ID==2 && $serviceLevels['level'] == 0) {
            foreach($serviceLevels['services'] as $s){
                $services[]=$s;
            }
        }
        continue;
	if ($serviceLevels['level'] == 5) {

	    if (!empty($serviceLevels['services']))
	    {
	        $propertyServiceLevelsContent .= '
	        <div class="content'.($serviceLevels['level']==($level?$level:5)?' active':'').'" id="service-level-'.$serviceLevels['level'].'">
				<div class="services">';
			
/*
	        foreach ($serviceLevels['services'] as $servicelevel)
			{
				$propertyServiceLevelsContent .= '
							<div class="row service">
			                    <div class="small-6 columns">
			                        <p class="text-left">'.$servicelevel['desc_long'].'</p>
			                    </div>
			                    <div class="small-6 columns">
			                        <p class="text-right">'.$propertyArray['dest_currency'].number_format($servicelevel['rate']).'</p>
			                    </div>
			                </div>';
			}
*/
			
			$propertyServiceLevelsContent .= '
					<div class="row service">
	                    <div class="small-10 columns">
	                        <p class="text-left">'.$serviceLevels['services']['villa_only']['desc_long'].' + '.$serviceLevels['services']['management']['desc_long'].' + Villa Hotel Transformation</p>
	                    </div>
	                    <div class="small-2 columns">
	                        <p class="text-right">'.$propertyArray['dest_currency'].'<span id="rateNightDisp1">'.number_format($serviceLevels['base_night']).'</span></p>
	                    </div>
	                </div>';
			                
/*
			$propertyServiceLevelsContent .= '
					<div class="row total">
		                <div class="columns">
		                    <p class="text-right">'.($serviceLevels['level']>0?'As '.$serviceLevels['level'].' Star VillaHotel<br>':'').'Nightly Rate: '.$propertyArray['dest_currency'].number_format($serviceLevels['night']).'</p>
		                </div>
		            </div>';
*/
			$propertyServiceLevelsContent .= '</div>';
			
			if ($serviceLevels['level'] > 0) $propertyServiceLevelsContent .= '
			<div class="options">
				<form id="serviceLevel'.$serviceLevels['level'].'Form" method="post" action="./checkout.php">
					<input type="hidden" name="action" value="checkout">
					<input type="hidden" name="backToStep1" class="backToStep1" value="">
					<input type="hidden" name="propertyId" id="propertyId" value="'.$propertyArray['property_id'].'">
					<input type="hidden" name="propertyName" value="'.$propertyArray['property_name'].'">
					<input type="hidden" name="destName" value="'.$propertyArray['dest_name'].'">
					<input type="hidden" name="checkInDt" id="checkInDt" value="'.$propertyArray['check_in_dt'].'">
					<input type="hidden" name="checkOutDt" id="checkOutDt" value="'.$propertyArray['check_out_dt'].'">
					<input type="hidden" name="nightTotal" value="'.$propertyArray['night_total'].'">
					<input type="hidden" name="serviceLevel" value="'.$serviceLevels['level'].'">
					<input type="hidden" name="destCurrency" value="'.$propertyArray['dest_currency'].'">
					<input type="hidden" name="destTax" value="'.$propertyArray['dest_tax'].'">
					<input type="hidden" name="rateNight" id="rateNight" value="'.$serviceLevels['night'].'">
					<input type="hidden" name="managementPercentage" id="managementPercentage" value="'.$serviceLevels['services']['management']['percentage'].'">
					<input type="hidden" name="rateNightBase" id="rateNightBase" value="'.($serviceLevels['night']/(1+$serviceLevels['services']['management']['percentage']/100)).'">
					<input type="hidden" name="checkoutCleaning" id="checkoutCleaning" value="'.$serviceLevels['services']['checkout_cleaning']['rate'].'">
					<!--div class="row text-center header">
			            <div class="columns">
			                <h5>Customize Your Experience</h5>
			            </div>
			        </div-->';
			        
			        foreach ($additionalServices as $additionalService) {
						$propertyServiceLevelsContent .= '<div class="row option">
					        <div class="columns">
					            <div class="row collapse">
					                <div class="medium-12 columns">
					                    <div class="row">
					                        <label>
					                            <div class="small-3 medium-1 columns" style="margin-right:10px;"><input type="number" name="'.$additionalService['name'].'" id="'.$additionalService['name'].'" placeholder="'.$additionalService['placeholder'].'" value="'.$additionalService['value'].'" style="margin-top:-10px;" min="'.$additionalService['min'].'" max="'.$additionalService['max'].'" onchange="applyServices();"><input type="hidden" name="'.$additionalService['name'].'Desc" id="'.$additionalService['desc'].'Desc" value="'.$additionalService['desc'].'"><input type="hidden" name="'.$additionalService['name'].'Rate" id="'.$additionalService['name'].'Rate" value="'.$additionalService['rate'].'"></div>
					                            <div class="small-6 medium-1 columns">'.$additionalService['frequency'].'</div>
					                            <div class="small-12 medium-9 columns">'.$additionalService['desc'].'</div>
					                        </label>
					                    </div>
					                </div>
					            </div>
					        </div>
					    </div>';
					}
					
					$propertyServiceLevelsContent .= '<div class="row total">
			            <div class="columns">
			                <p class="text-right">'.($serviceLevels['level']>0?'As '.$serviceLevels['level'].' Star VillaHotel<br>':'').'Nightly Rate: '.$propertyArray['dest_currency'].'<span id="rateNightDisp2">'.number_format($serviceLevels['night']).'</span>
							<br><br><button class="tiny" id="checkoutBtn" onclick="submitServiceLevelForm();">CHECKOUT</button></p>
			        	</div>
			    	</div>
			    </form>
		    </div>';
	    	
	    	$propertyServiceLevelsContent .= '</div>';
		}
	}
}
$serviceLevels['services']=$services;
$propertyServiceLevelsContent .= '
					</div>
				</div>
			</div>';

/*
if (isset($_POST['action']) && $_POST['action'] == 'book')
{
	$_SESSION['RESERVATION']->set('destName', $_POST['destName']);
	$_SESSION['RESERVATION']->set('checkInDt', date('Y-m-d', strtotime($_POST['checkInDt'])));
	$_SESSION['RESERVATION']->set('checkOutDt', date('Y-m-d', strtotime($_POST['checkOutDt'])));
	$_SESSION['RESERVATION']->set('totalNights', $_POST['totalNights']);
	$_SESSION['RESERVATION']->set('destCurrency', $_POST['destCurrency']);
	$_SESSION['RESERVATION']->set('rateNight', $_POST['rateNight']);
	$_SESSION['RESERVATION']->set('rateTotal', $_POST['rateTotal']);
	
	header('Location: services');
}
*/
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
    <script src="/js/react/jsx/checkout.jsx" type="text/jsx"></script>
</head>

<body onload="applyServices()">
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
        <div id="rate-details">
            <?php echo $propertyServiceLevelsContent; ?>
        </div>
        <!-- Show Rate Details End -->
    </section>
    <?php require_once '../inc-footer.php'; ?>
	
    <?php require_once '../inc-js.php'; ?>
    
    <script type="text/jsx">
        /** @jsx React.DOM */
        var serviceBannerImage = "<?php echo SITE_ID==1? "/img/destination-header_".str_replace('-', '_', $propertyArray['dest_name']).".png":"/img/inner-bg1.png";?>";
        var propertyInfo = <?php echo json_encode($propertyArray); ?>;
        var services = <?php echo json_encode($serviceLevels); ?>;
        var selectedServiceLevel = 3;
        var siteid = <?php echo SITE_ID;?>;
        ReactDOM.render(
            <CheckoutStep2 property={propertyInfo} siteid={siteid} serviceInfo={services} selectedServiceLevel={selectedServiceLevel} totalNights="<?php echo $_SESSION['RESERVATION']->get('nightTotal');?>" />,
            document.getElementById('rate-details')
        );
        if(siteid==1){
            ReactDOM.render(
                    <CheckoutStep2ServiceLevels data={<?php echo json_encode($propertyServiceLevelsTab);?>} />,
                    document.getElementById('service-levels')
            );
        }
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
    </script>

</body>

</html>