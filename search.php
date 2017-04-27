<?php
//require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php';
require_once './private/config.php';

//if ($_SERVER['REQUEST_METHOD'] == 'POST') header('Location: /search/'.$_POST['destination'].'/'.strtolower(trim(preg_replace('/\s/', '-', preg_replace(array('/[^A-Za-z0-9]/', '/\s\s+/'), ' ', $_POST['keyword'])), '-')).'/');
if ($_SERVER['REQUEST_METHOD'] == 'POST') header('Location: /search/'.strtolower(trim(preg_replace('/\s/', '-', preg_replace(array('/[^A-Za-z0-9]/', '/\s\s+/'), ' ', $_POST['keyword'])), '-')).'/');

//$destination = $_GET['dest'];
$destination = 'all';

$rs_destination = $_SESSION['DB']->querySelect('SELECT * FROM destination WHERE UPPER(destName) = ? LIMIT 1', array(strtoupper($destination)));
$row_rs_destination = $_SESSION['DB']->queryResult($rs_destination);
$totalRows_rs_destination = $_SESSION['DB']->queryCount($rs_destination);

//if (!$totalRows_rs_destination) header('Location: /luxury-rental-property-vacation-destinations');
$_GET['keyword'] = empty($_GET['keyword'])?'':$_GET['keyword'];
$_GET['check_in'] = (isset($_GET['check_in']) && !empty($_GET['check_in'])?$_GET['check_in']:date('m/d/Y'));
$_GET['check_out'] = (isset($_GET['check_out']) && !empty($_GET['check_out'])?$_GET['check_out']:date('m/d/Y', strtotime('+3 days')));
$checkInDt = $_GET['check_in'];
$checkOutDt = $_GET['check_out'];
$propertyArray = $_SESSION['RESERVATION']->getProperty($destination=='all'?'':$destination, $checkInDt, $checkOutDt, 0, 0, 0, 0, 0, $_GET['keyword'], '', 1);
$villaCtr = 0;
$villaCtr = count($propertyArray);
//$villas = NULL;
//$villas = $_SESSION['RESERVATION']->formatProperty($propertyArray);
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
    <script src="/js/react/jsx/search-result.jsx"  type="text/jsx"></script>
    <script src="/js/react/jsx/villazzo-search.jsx"  type="text/jsx"></script>
    <script src="/js/moment.min.js" ></script>
</head>

<body>
	<?php require_once 'inc-header.php'; ?>
    <section id="header-section" class="inner-bg"></section>
            <!-- Destination Start -->
            <section id="destination-header-image">
                <!--<img src="img/destination-header_<?php echo str_replace('-', '_', $destination); ?>.png">-->
                <div class="row">
                    <div class="small-12 columns">
                        <h1><?php echo 'LUXURY '.strtoupper($destination).' RENTALS | '.strtoupper($destination).' VILLA & LUXURY HOME VACATION RENTALS'; ?></h1>
                        <p>Out of over 100 vacation villas, <?php echo SITE_NAME;?> President Christian Jagodzinkski has personally hand-selected only the finest 10 properties between the beaches of Ramatuelle, Gassin, and the St. Tropez peninsula.</p>
                    </div>
                </div>
            </section>
            <!-- Start Destination Results Start-->
           
            
            <section id="destination-results">
            </section>
            <script type="text/jsx" charset="utf-8">
            /** @jsx React.DOM */

            var data =<?php echo json_encode($propertyArray);?>;
            var bookurl = '<?php echo ($_SESSION['USER']->getUserId())?'calendar':'services'; ?>';
            ReactDOM.render(
              <SearchResult siteid="<?php echo SITE_ID;?>" property={data} totalVillas="<?php echo number_format($villaCtr)?> VILLAS MATCH YOUR SEARCH FOR '<?php echo strtoupper(str_replace('-', ' ', $_GET['keyword'])); ?>'." bookurl={bookurl}/>,
              document.getElementById('destination-results')
            );       
            
            var imgurl = "<?php echo SITE_ID==1?"/img/destination-header_".str_replace('-', '_', $destination).".png":"/img/inner-bg1.png"; ?>";
             ReactDOM.render(
              /*<Image1 src="/img/destination-header_<?php echo str_replace('-', '_', $_GET['dest']); ?>.png"/>,*/
              <Image1 src={imgurl} />,
              document.getElementById('header-section')
            );
            </script>
            <!-- Start Destination Results End-->
            <!-- Destination End -->
        <?php require_once 'inc-footer.php'; ?>
		
		<?php require_once 'inc-js.php'; ?>
</body>

</html>