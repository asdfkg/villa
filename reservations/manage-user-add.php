<?php
require_once '../private/config.php';

// restrict user access
$_SESSION['USER']->restrict('1,2,4');

if (isset($_POST['action']) && $_POST['action'] == 'add' && $_POST['userGroup'] != '' && $_POST['firstName'] != '' && $_POST['lastName'] != '' && $_POST['userEmail'] != '' && $_POST['userPassword'] != '')
{
	$userId = $_SESSION['DB']->queryInsert('INSERT INTO USER (USERGROUP_ID, USER_FIRSTNAME, USER_LASTNAME, USER_EMAIL, USER_PASSWORD, USER_COMMISSION_VH, USER_COMMISSION_BL) VALUES (?, ?, ?, ?, AES_ENCRYPT(?, \''.$_SESSION['DB']->getEncryptKey().'\'),?, ?)',
	array(
		$_POST['userGroup'],
		$_POST['firstName'],
		$_POST['lastName'],
		$_POST['userEmail'],
		$_POST['userPassword'],
		$_POST['userCommissionVillaHotel'],
		$_POST['userCommissionBasicLinen']
	));
  
	if ($_POST['userGroup']==3 && isset($_POST['property']) && $_POST['property'] != '')
	{
		foreach($_POST['property'] as $key=>$value)
		{
			$_SESSION['DB']->queryInsert('INSERT INTO propertyOwner (propertyId, userId) VALUES (?, ?)', array($value, $userId));
		}  
	}
	header('Location: /reservations/user');
}

$rs_usergroup = $_SESSION['DB']->querySelect('SELECT * FROM USERGROUP');
$usergroups = $_SESSION['DB']->queryAllResult($rs_usergroup);

$rs_property = $_SESSION['DB']->querySelect('SELECT propertyId, propertyName FROM property WHERE property.site in ("3","'.SITE_ID.'") ORDER BY propertyName ASC');
$propertyList = $_SESSION['DB']->queryAllResult($rs_property);
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Reservations - <?php echo SITE_NAME;?></title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php include_once '../js/reactLibrary.php'; ?>
    <?php if(SITE_ID == 1){ include_once '../js/chatScript.php'; } ?>
    <script src="/js/react/jsx/manager-user.jsx" type="text/jsx"></script>
</head>
<body>
	<?php require_once '../inc-header.php'; ?>
        <section id="header-section"></section>
        <section id="reservations-title-steps-section"></section>

        <section id="add-user"></section>

    <?php require_once '../inc-footer.php'; ?>

    <?php require_once '../inc-js.php'; ?>
    <script type="text/jsx">
        /** @jsx React.DOM */
        var bannerImage = "<?php echo SITE_ID == 1 ? "/img/destination-header_all.png" : "/img/inner-bg1.png" ?>";
        ReactDOM.render(
            <Image1 src={bannerImage}/>,
            document.getElementById('header-section')
        );             
        ReactDOM.render(
            <div className="row">
                <div className="columns">
                    <Heading1 value="USER ADD"></Heading1>
                </div>
            </div>,
            document.getElementById('reservations-title-steps-section')
        );
        var userGroups  = <?php echo json_encode($usergroups);?>;
        var propertyList= <?php echo json_encode($propertyList);?>;
        ReactDOM.render(
            <AddUser userGroups={userGroups} propertyList={propertyList}/>,
            document.getElementById('add-user')
        );
    </script>
</body>

</html>
