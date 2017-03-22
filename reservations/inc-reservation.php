<?php
$rs_feature = $_SESSION['DB']->querySelect('SELECT featureId, featureReservation FROM feature WHERE featureReservation IS NOT NULL ORDER BY featureReservation ASC');
$row_rs_feature = $_SESSION['DB']->queryResult($rs_feature);
$totalRows_rs_feature = $_SESSION['DB']->queryCount($rs_feature);
$featuresList = [];
$amenitiesArray = array();
$amenitiesArray = explode(',', (isset($_GET['amenities']) ? $_GET['amenities'] : ''));
if ($totalRows_rs_feature) {
    do {
        $featuresList[] = $row_rs_feature;
    } while ($row_rs_feature = $_SESSION['DB']->queryResult($rs_feature));
}
?>
<script type="text/jsx" charset="utf-8">
var data = {
    destination: "<?php echo ($_GET['dest']) ?>",
    checkin: "<?php echo ($_GET['check_in'] ? date('m/d/Y', strtotime($_GET['check_in'])) : date('m/d/Y', strtotime('+7 days'))); ?>",
    checkout: "<?php echo ($_GET['check_out'] ? date('m/d/Y', strtotime($_GET['check_out'])) : date('m/d/Y', strtotime('+14 days'))); ?>",
};

var SearchOptions = [{description: 'All',code: 'all'},
               {description: 'Aspen',code: 'aspen'},
               {description: 'Miami',code: 'miami'},
               {description: 'Saint-Tropez',code: 'saint-tropez'},
               {description: 'St-Barth',code: 'st-barth'},
               {description: 'Turks & Caicos',code: 'turks%20%26%20caicos'}];
var featuresList = <?php echo json_encode($featuresList); ?>;
var amenitiesList = 
<?php
$amenitiesArray = array();
echo json_encode(explode(',', (isset($_GET['amenities']) ? $_GET['amenities'] : '')));
?>;
var getParams = <?php echo json_encode($_GET); ?>;
ReactDOM.render(
    <SearchBox data={data} SearchOptions={SearchOptions} siteid="<?php echo SITE_ID;?>" innerpage="true" getParams={getParams} filters={featuresList} amenitiesList={amenitiesList} />,
    document.getElementById('searchBoxForm')
);
</script>