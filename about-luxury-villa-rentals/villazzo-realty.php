<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php //getMeta('villazzo_living'); ?>
        <title>Experience Villazzo Living - Luxury Villa Rentals | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="Villazzo Living is an exclusive lifestyle solution designed to take the worries off you as we skilfully take care of everything in your home." />
        <meta name="Keywords" content="luxury lifestyle solutions, private luxury villa, luxury villa rentals, luxury villa, villa rental, Villazzo Living, lifestyle solution" />
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <?php if(SITE_ID == 1){ include_once '../js/chatScript.php'; } ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/about-us.jsx" type="text/jsx"></script>
    </head>  
    <body>
        <?php require_once '../inc-header.php'; ?>
        <!-- Header Image Section Start -->
        <section id="header-section"></section>
        <!-- SubFooter Section End -->
        <section id="about-section"></section>
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var villazzoRealityBannerImage = "<?php echo SITE_ID==1?"/img/about/banner-villazzo_realty.png": "/img/inner-bg1.png"?>";
            var villazzoRealityContentImage = "/img/about/thumb-villazzo-realty.png";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={villazzoRealityBannerImage}/>,
                document.getElementById('header-section')
            );  
            ReactDOM.render(
                <RealityDescritionContent villazzoRealityContentImage={villazzoRealityContentImage} />,
                document.getElementById('about-section')
            ); 
        </script>
    </body>
</html>