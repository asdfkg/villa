<?php
require_once '../private/config.php';

if (!$_SESSION['RESERVATION']->get('reservationId')) die(header('Location: /reservations'));

$_SESSION['RESERVATION']->set('step', 4);

if ($_SESSION['RESERVATION']->get('reservationId'))
{
	if ($_SESSION['USER']->getUserGroupId() == 3)
	{
		$body = '
		<div style="padding:15px; border:solid 1px #DBDBDB;">
		<p style="font-weight:bold;">'.SITE_NAME.' Reservation: '.$row_rs_reservation_property['propertyName'].', '.$row_rs_reservation_property['destName'].'</p>
			<table width="100%" border="0" cellpadding="2" cellspacing="0">
	          <tr>
	            <td style="width:150px;"><strong>Booked by</strong></td>
	            <td>Property Owner</td>
	          </tr>
	          <tr>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	          </tr>
	          <tr>
	            <td style="width:150px;"><strong>Check-in date</strong></td>
	            <td>'.$_SESSION['UTILITY']->dateInvoice($row_rs_reservation_property['reservationStartDt']).'</td>
	          </tr>
	          <tr>
	            <td><strong>Check-out date</strong></td>
	            <td>'.$_SESSION['UTILITY']->dateInvoice($row_rs_reservation_property['reservationEndDt']).'</td>
	          </tr>
	        </table>
			</div>';
	}
	else
	{
		$body = $_SESSION['RESERVATION']->createReceipt($_SESSION['RESERVATION']->get('reservationId'));
	}
	
	// reset reservation
	//$_SESSION['RESERVATION'] = new Reservation();
}
else $body = 'An error occurred, please try again.';
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Confirmation - <?php echo SITE_NAME;?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php include_once '../js/reactLibrary.php'; ?>
    <?php if(SITE_ID == 1){ include_once '../js/chatScript.php'; } ?>
    <script src="/js/react/jsx/confirmation.jsx" type="text/jsx"></script>
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
    <!-- Reservations Services Header Image Section Start -->
    <section id="header-section"></section>
    <!-- Reservations Title and Steps Section Start -->
    <section id="reservations-title-steps-section"></section>
    
    <section id="confirmation-section"></section>
    
<?php require_once '../inc-footer.php'; ?>

<?php require_once '../inc-js.php'; ?>
    <script type="text/jsx">
        /** @jsx React.DOM */
        var StepUrl1 = '';
        var StepUrl2 = '';
		
        ReactDOM.render(
        <ServiceStep step="3" stepUrl1={StepUrl1} stepUrl2={StepUrl2} siteid="<?php echo SITE_ID; ?>"  />,
        document.getElementById('reservations-title-steps-section')
        );
        var data = <?php echo json_encode(@$row_rs_reservation_property);?>;
        var body = <?php echo json_encode($body);?>;
        ReactDOM.render(
        <Confirmation body="body" data={data} reservationId="<?php echo $_SESSION['RESERVATION']->get('reservationId');?>" userGroupId="<?php echo $_SESSION['USER']->getUserGroupId();?>"/>,
        document.getElementById('confirmation-section')
        );
        var imgurl = "<?php echo SITE_ID==1?"/img/destination-header_".str_replace('-', '_', $_SESSION['RESERVATION']->get('destName')).".png":"/img/inner-bg1.png"; ?>";
        ReactDOM.render(
        /*<Image1 src="/img/destination-header_<?php echo str_replace('-', '_', $_SESSION['RESERVATION']->get('destName')); ?>.png"/>,*/
        <Image1 src={imgurl}/>,
        document.getElementById('header-section')
        );
        


    </script>
</body>

</html>
