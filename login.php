<?php
require_once 'private/config.php';

if ($_SESSION['USER']->getUserId())
    header('Location: /reservations/');
?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Login - <?php echo SITE_NAME;?></title>
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once 'js/reactLibrary.php'; ?>
        <?php include_once 'js/chatScript.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/login.jsx" type="text/jsx"></script>
    </head>

    
    <body>
        <?php require_once 'inc-header.php'; ?>
        <section id="header-section"></section>
        <section id="reservations-title-steps-section"></section>
        <section id="destination-results"></section>       
        <?php require_once 'inc-footer.php'; ?>
        <div class="reveal-modal medium" id="recoverPasswordModal" data-reveal></div>
        <div class="reveal-modal medium" id="recoverPasswordModalFeedback" data-reveal></div>
        <?php require_once 'inc-js.php'; ?>
        
        <script type="text/jsx">
            /** @jsx React.DOM */
            var loginBannerImage = "<?php echo SITE_ID == 1 ? "/img/destination-header_all.png" : "/img/inner-bg1.png" ?>";
            ReactDOM.render(
                <Image1 src={loginBannerImage}/>,
                document.getElementById('header-section')
            );             
            ReactDOM.render(
                <LoginFormHeading />,
                document.getElementById('reservations-title-steps-section')
            );
            ReactDOM.render(
                <LoginForm />,
                document.getElementById('destination-results')
            );
            ReactDOM.render(
                <RecoverPasswordModal />,
                document.getElementById('recoverPasswordModal')
            );
            ReactDOM.render(
                <RecoverPasswordModalFeedback />,
                document.getElementById('recoverPasswordModalFeedback')
            );
        </script>
    </body>
</html>