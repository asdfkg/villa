<?php
require_once '../private/config.php';

if ($_SESSION['RESERVATION']->get('step') == 4) 
    die(header('Location: /reservations'));

if ($_SESSION['RESERVATION']->get('step') == 2) 
    $_SESSION['RESERVATION']->set('step', 3);

function setBedroomVars(){
    $property = $_SESSION['RESERVATION']->getProperty('', $_POST['checkInDt'], $_POST['checkOutDt'], 0, 0, 0, 0, $_POST['propertyId']);
    $propertyArray = $property[0];
    return $propertyArray['property_bedrooms'];
}

if (isset($_POST['action']) && $_POST['action'] == 'checkout') {

        $_SESSION['RESERVATION']->set('bedrooms', setBedroomVars());
        $totalNightly = $_POST['rateNight'] * $_POST['nightTotal'];
    //    $totalCleaning = $_POST['cleaning'] * $_POST['nightTotal'] * $_SESSION['RESERVATION']->get('bedrooms');
        $totalCleaning = SITE_ID==1? $_POST['checkoutCleaning'] :($_POST['cleaning']!=null?$_POST['cleaning']:(199 + (99* $_SESSION['RESERVATION']->get('bedrooms'))));

	$_SESSION['RESERVATION']->set('propertyId', $_POST['propertyId']);
	$_SESSION['RESERVATION']->set('propertyName', $_POST['propertyName']);
	$_SESSION['RESERVATION']->set('destName', $_POST['destName']);
	$_SESSION['RESERVATION']->set('checkInDt', $_POST['checkInDt']);
	$_SESSION['RESERVATION']->set('checkOutDt', $_POST['checkOutDt']);
	$_SESSION['RESERVATION']->set('serviceLevel', $_POST['serviceLevel']);
	$_SESSION['RESERVATION']->set('nightTotal', $_POST['nightTotal']);
	$_SESSION['RESERVATION']->set('destCurrency', $_POST['destCurrency']);
	$_SESSION['RESERVATION']->set('destTax', $_POST['destTax']);
	$_SESSION['RESERVATION']->set('checkoutCleaning', $totalCleaning);
        $_SESSION['RESERVATION']->set('additionalPerStay', $_POST['additionalPerStay']);
        $_SESSION['RESERVATION']->set('perNight', $_POST['rateNight']);
        $_SESSION['RESERVATION']->set('rateNight', $totalNightly);
        $subTotal = $_SESSION['RESERVATION']->get('rateNight') + $_SESSION['RESERVATION']->get('checkoutCleaning')+ $_SESSION['RESERVATION']->get('additionalPerStay');
        $_SESSION['RESERVATION']->set('rateTotal', $subTotal );
	
/*
	$_SESSION['RESERVATION']->set('additionalServices', null);
	$_SESSION['RESERVATION']->set('additionalServicesTags', null);
	if (isset($_POST['additionalServices'])) {
		$additionalServices = null;
		$additionalServicesTagsArray = null;
		foreach ($_POST['additionalServices'] as $additionalService) {
			$additionalServiceArray = explode('|', $additionalService);
            $additionalServices .= $additionalServiceArray[1] . '<br />';
			$additionalServicesTags[] = $additionalServiceArray[0];
		}
		$additionalServices = trim($additionalServices, '<br />');
		$_SESSION['RESERVATION']->set('additionalServices', $additionalServices);
		$_SESSION['RESERVATION']->set('additionalServicesTags', $additionalServicesTags);
	}
*/
	$additionalServices = null;
	$additionalServicesTags = null;
	$_SESSION['RESERVATION']->set('additionalServices', null);
	$_SESSION['RESERVATION']->set('additionalServicesTags', null);

	foreach ($_POST as $name => $val) {
		if(strpos($name, 'option') !== false && strpos($name, 'Desc') === false && strpos($name, 'Rate') === false && $val) { $additionalServices .= $_POST[$name.'Desc'].' x '.$val.'<br />'; $additionalServicesTags[$name] = $_POST[$name]; }
	}
	$_SESSION['RESERVATION']->set('additionalServices', $additionalServices);
	$_SESSION['RESERVATION']->set('additionalServicesTags', $additionalServicesTags);
	
	if ($_POST['backToStep1']) 
            header('Location: ./?dest=all&property='.$_SESSION['RESERVATION']->get('propertyName').'&check_in='.date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkInDt'))).'&check_out='.date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkOutDt'))));
	else 
            header('Location: '.$_SERVER['REQUEST_URI']);
}

if (isset($_POST['discount'])) {
	if ($_POST['discount'] > 0) {
		$_SESSION['RESERVATION']->set('rateDiscount', $_POST['discount']);
		$_SESSION['RESERVATION']->set('rateTotal', $_SESSION['RESERVATION']->get('rateTotal') - ($_SESSION['RESERVATION']->get('rateTotal') * $_SESSION['RESERVATION']->get('rateDiscount') / 100));
	}
	header('Location: '.$_SERVER['REQUEST_URI']);
}
$destinationTaxRate = $_SESSION["RESERVATION"]->get("destTax");
$destinationTax = (SITE_TAX?$_SESSION["RESERVATION"]->get("rateTotal") * $_SESSION["RESERVATION"]->get("destTax") /100:0); 
$_SESSION["RESERVATION"]->set("destinationTax",$destinationTax);
$_SESSION['RESERVATION']->set('netTotal',$_SESSION["RESERVATION"]->get("rateTotal")+$_SESSION["RESERVATION"]->get("destinationTax"));
$_SESSION["RESERVATION"]->set("securityDeposit",$_SESSION["RESERVATION"]->get("netTotal")*10/100);
$_SESSION["RESERVATION"]->set("grandTotal",$_SESSION["RESERVATION"]->get("netTotal")+$_SESSION["RESERVATION"]->get("securityDeposit"));

if (!$_SESSION['RESERVATION']->get('propertyId')) 
    die(header('Location: /reservations'));
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Checkout - <?php echo SITE_ID==1?"VILLAZZO":"GREATVILLADEALS"; ?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
        <!-- Load React Library -->
    <?php include_once '../js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/checkout.jsx" type="text/jsx"></script>
        <!-- End Load React Library -->
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
            <!-- Reservations Services Header Image Section Start -->
        <section id="header-section" class="inner-bg"></section>
            <!-- Reservations Title and Steps Section Start -->
        <!-- Reservations Title and Steps Section Start -->
            <section id="reservations-title-steps-section">
            </section>
            
            <!-- Reservations Services Header Image Section Start -->
	            
            <!-- Reservations Title and Steps Section Start -->
        
            <!-- Checkout Form Start-->
            <section id="checkout-form-section">
            </section>
        <!-- Checkout Form End-->
        <?php require_once '../inc-footer.php'; ?>
		
		<?php require_once '../inc-js.php'; ?>
		
		<script type="text/javascript">
		<!--
		$(function()
		{
			$('#ccCountry').change(function() { 
                            switchStateField('ccCountry', 'ccStateUS', 'ccStateOther'); 
                        });
		});
		-->
		</script>
        
        <?php if ($_SESSION['USER']->getUserGroupId() == 1 || $_SESSION['USER']->getUserGroupId() == 2) { 
            $discount =  ($_SESSION['RESERVATION']->get('rateDiscount') ? 'Discounted ' . $_SESSION['RESERVATION']->get('rateDiscount') . ' %' : 'Discount (%)'); 
            } 
            else{
                $discount = 0;
            }
        ?>
        
        <script type="text/jsx">
            /** @jsx React.DOM */
            
            var checkoutBannerImage = "<?php echo SITE_ID==1?"/img/destination-header_".str_replace('-', '_', $_SESSION['RESERVATION']->get('destName')).".png":"/img/inner-bg1.png"  ;?>";
            ReactDOM.render(
                <Image1 src={checkoutBannerImage}/>,
                document.getElementById('header-section')
            );
            
            
            var StepUrl1 = '<?php echo './?dest=all&property=' . $_SESSION['RESERVATION']->get('propertyName') . '&check_in=' . date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkInDt'))) . '&check_out=' . date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkOutDt'))); ?>';
            var StepUrl2 = '<?php echo './services?property=' . $_SESSION['RESERVATION']->get('propertyName') . '&check_in=' . date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkInDt'))) . '&check_out=' . date('m/d/Y', strtotime($_SESSION['RESERVATION']->get('checkOutDt'))); ?>';
            var data = {
                userGroupId: '<?php echo $_SESSION['USER']->getUserGroupId(); ?>',
                createCreditCardDropDown:   <?php echo json_encode($_SESSION["UTILITY"]->createCreditCardDropDown("ccType", "ccType")); ?>,
                createMonthDropDown:        <?php echo json_encode($_SESSION["UTILITY"]->createMonthDropDown("ccExpMonth", "ccExpMonth")); ?>,
                createYearDropDown:         <?php echo json_encode($_SESSION["UTILITY"]->createYearDropDown("ccExpYear", "ccExpYear")); ?>,
                createStateDropDown:        <?php echo json_encode($_SESSION["UTILITY"]->createStateDropDown("ccStateUS", "ccStateUS")); ?>,
                createCountryDropDown:      <?php echo json_encode($_SESSION["UTILITY"]->createCountryDropDown("ccCountry", "ccCountry")); ?>
                //{createCountryDropDown: ''},
            };
            
            var propertyDescription = { 
                destination: '<?php echo "Villa " . $_SESSION["RESERVATION"]->get("propertyName"); ?>',
                arrival: '<?php echo date("F jS, Y", strtotime($_SESSION["RESERVATION"]->get("checkInDt"))); ?>',
                departure:    '<?php echo date("F jS, Y", strtotime($_SESSION["RESERVATION"]->get("checkOutDt"))); ?>',
                lengthOfStay: '<?php echo $_SESSION["RESERVATION"]->get("nightTotal"); ?> Nights',
                nightlyRate: '<?php echo $_SESSION["RESERVATION"]->get("destCurrency") . number_format($_SESSION["RESERVATION"]->get("rateNight")); ?>',
                perNight: '<?php echo $_SESSION["RESERVATION"]->get("destCurrency") . number_format($_SESSION["RESERVATION"]->get("perNight")); ?>',
                destinationTaxRate: '<?php echo number_format($destinationTaxRate,2);?>',
                destinationTax: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("destinationTax")); ?>',
                checkoutCleaning: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("checkoutCleaning")); ?>',
                <?php echo $_SESSION["RESERVATION"]->get("additionalPerStay")>0 ?"additionalPerStay: '".$_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("additionalPerStay"))."',":'';?>
                rateTotal: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("rateTotal")); ?>',
                netTotal: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("netTotal")); ?>',
                securityDeposit: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION["RESERVATION"]->get("securityDeposit")); ?>',
                userGroupId: '<?php echo $_SESSION['USER']->getUserGroupId(); ?>',
                grandTotal: '<?php echo $_SESSION['RESERVATION']->get('destCurrency').number_format($_SESSION['RESERVATION']->get('grandTotal')); ?>',
                discount: '<?php echo $discount; ?>',
                serviceLevel: <?php echo $_SESSION['RESERVATION']->get('serviceLevel'); ?>,
                additionalServices: <?php echo !empty($_SESSION['RESERVATION']->get('additionalServices'))?json_encode(array('data'=>$_SESSION['RESERVATION']->get('additionalServices'))):'null';?>
            };
            
            ReactDOM.render(
            <ServiceStep step="3" stepUrl1={StepUrl1} stepUrl2={StepUrl2} />,
            document.getElementById('reservations-title-steps-section')
            );
            ReactDOM.render(
            <CheckoutStep3  data={data} siteid="<?php echo SITE_ID;?>" />,
            document.getElementById('checkout-form-section')
            );
            ReactDOM.render(
                <PropertyDescription sitetax="<?php echo SITE_TAX;?>" siteid="<?php echo SITE_ID;?>"  data={propertyDescription}/>,
                document.getElementById('reservations-services-section')
            );


        </script> 
</body>

</html>