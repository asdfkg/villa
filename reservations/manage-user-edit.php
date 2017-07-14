<?php
require_once '../private/config.php';

// restrict user access
$_SESSION['USER']->restrict('1,2,4');

if (isset($_POST['action']) && $_POST['action'] == 'update' && $_POST['userGroup'] != '' && $_POST['firstName'] != '' && $_POST['lastName'] != '' && $_POST['userEmail'] != '' && $_POST['userPassword'] != '') {
    if (strpos($_POST['userPassword'], '*') === false) {
        $_SESSION['DB']->queryUpdate('UPDATE USER SET USER_PASSWORD = AES_ENCRYPT(?, \'' . $_SESSION['DB']->getEncryptKey() . '\') WHERE USER_ID = ? LIMIT 1', array($_POST['userPassword'], $_POST['userId']));
    }

    $_SESSION['DB']->queryUpdate('UPDATE USER SET USERGROUP_ID = ?, USER_FIRSTNAME = ?, USER_LASTNAME = ?, USER_EMAIL = ?, USER_COMPANY = ?, USER_COMMISSION_VH = ?, USER_COMMISSION_BL = ? WHERE USER_ID = ? LIMIT 1', array(
        $_POST['userGroup'],
        $_POST['firstName'],
        $_POST['lastName'],
        $_POST['userEmail'],
        $_POST['userCompany'],
        $_POST['userCommissionVillaHotel'],
        $_POST['userCommissionBasicLinen'],
        $_POST['userId']
    ));
    header('Location: /reservations/user');
}

$colname_rs_user = "-1";
if (isset($_GET['id'])) {
    $colname_rs_user = $_GET['id'];
}
$rs_user = $_SESSION['DB']->querySelect('SELECT USER_ID, USERGROUP_ID, USER_EMAIL, USER_FIRSTNAME, USER_LASTNAME, AES_DECRYPT(USER_PASSWORD, \'' . $_SESSION['DB']->getEncryptKey() . '\') AS unencrypted, USER_COMPANY, USER_COMMISSION_VH, USER_COMMISSION_BL FROM USER WHERE USER_ID = ? LIMIT 1', array($colname_rs_user));
$row_rs_user = $_SESSION['DB']->queryResult($rs_user);
$totalRows_rs_user = $_SESSION['DB']->queryCount($rs_user);

$rs_usergroup = $_SESSION['DB']->querySelect('SELECT * FROM USERGROUP');
$usergroups = $_SESSION['DB']->queryAllResult($rs_usergroup);

$rs_property = $_SESSION['DB']->querySelect('SELECT propertyOwner.propertyId, propertyName FROM propertyOwner LEFT JOIN property ON property.propertyId = propertyOwner.propertyId WHERE userId = ? AND property.site in ("3","' . SITE_ID . '") ORDER BY propertyName ASC', array($colname_rs_user));
$row_rs_property = $_SESSION['DB']->queryResult($rs_property);
$totalRows_rs_property = $_SESSION['DB']->queryCount($rs_property);
?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Reservations - <?php echo SITE_NAME; ?></title>
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <?php if(SITE_ID == 1){ include_once '../js/chatScript.php'; } ?>
        <script src="/js/react/jsx/manager-user.jsx" type="text/jsx"></script>
    </head>

    <body>
        <?php require_once '../inc-header.php'; ?>
        <section id="header-section"></section>
        <section id="reservations-title-steps-section"></section>
        <?php 
        $userData = [];
        $userData = array('firstName'=>$row_rs_user['USER_FIRSTNAME'], 'lastName'=>$row_rs_user['USER_LASTNAME'],
                    'userCompany'=>$row_rs_user['USER_COMPANY'],'userEmail'=>$row_rs_user['USER_EMAIL'],
                    'userPassword'=>$row_rs_user['unencrypted'],
                    'userCommissionVillaHotel'=>$row_rs_user['USER_COMMISSION_VH'],
                    'userCommissionBasicLinen'=>$row_rs_user['USER_COMMISSION_BL'],
                    'userUserGroupId'=>$row_rs_user['USERGROUP_ID'],
                    'userId'=>$row_rs_user['USER_ID'],
                );
        $userGroup = [];
        if ($row_rs_user['USERGROUP_ID'] == 3) {
            $propertyName = [];
            do {
              $propertyName[] = $row_rs_property['propertyName'];
            } while ($row_rs_property = $_SESSION['DB']->queryResult($rs_property));
            $userData['propertyName'] = implode(" | ",$propertyName);
        }
        ?>
        
        <section id="edit-user-form"></section>
        <?php require_once '../inc-footer.php'; ?>

        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var bannerImage = "<?php echo SITE_ID == 1 ? "/img/destination-header_all.png" : "/img/inner-bg1.png" ?>";
            var UserData = <?php echo json_encode($userData); ?>;
            var UserGroup = <?php echo json_encode($usergroups); ?>;
            ReactDOM.render(
                <Image1 src={bannerImage}/>,
                document.getElementById('header-section')
            );             
            ReactDOM.render(
                <div className="row">
                    <div className="columns">
                        <Heading1 value="USER EDIT"></Heading1>
                    </div>
                </div>,
                document.getElementById('reservations-title-steps-section')
            );
            ReactDOM.render(
                <EditUser UserData={UserData} UserGroup={UserGroup} />,
                document.getElementById('edit-user-form')
            );
        </script>
    </body>

</html>
