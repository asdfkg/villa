<?php
require_once '../private/config.php';

// restrict user access
$_SESSION['USER']->restrict('1,2,4');

$rs_user = $_SESSION['DB']->querySelect('SELECT a.LAST_USER_LOG_DT, USERGROUP_NAME, USER.USER_ID,USER.USER_FIRSTNAME,USER.USER_LASTNAME,USER.USER_EMAIL,USER.USER_CREATE_DT FROM USER LEFT JOIN USERGROUP ON USERGROUP.USERGROUP_ID = USER.USERGROUP_ID LEFT JOIN (SELECT MAX( USER_LOG_DT ) AS LAST_USER_LOG_DT, USER_ID FROM USER_LOG GROUP BY USER_ID) AS a ON a.USER_ID = USER.USER_ID');
$rowAllUsers = $_SESSION['DB']->queryAllResult($rs_user);
$totalRows_rs_user = $_SESSION['DB']->queryCount($rs_user);

if (isset($_GET['action']) && $_GET['action'] == 'deleteUser')
{
	$_SESSION['DB']->queryUpdate('DELETE FROM USER WHERE USER_ID = ?', array($_GET['userId']));
	header('Location: /reservations/user');
}

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
    <script src="/js/react/jsx/manager-user.jsx" type="text/jsx"></script>
    <script src="https://momentjs.com/downloads/moment.min.js" ></script>
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
        <section id="header-section"></section>        
        <section id="reservations-title-steps-section"></section>

        <section id="user-list"></section>

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
                    <Heading1 value="USERS"></Heading1>
                </div>
            </div>,
            document.getElementById('reservations-title-steps-section')
        );
        var users = <?php echo json_encode($rowAllUsers);?>;
        ReactDOM.render(
            <UserList users={users} />,
            document.getElementById('user-list')
        );
    </script>
</body>

</html>
