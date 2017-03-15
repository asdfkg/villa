<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<?php //getMeta('founders_vision'); ?>
	<title>Luxury Villa Rentals with Private Hotel Service, Founder's Vision | <?php echo SITE_ID==1?"Villazzo":"Great Villa Deals";?></title>
	<meta name="Description" content="Villazzo is a five star hotel operator for private luxury residences. Read about Villazzo Founder and CEO Christian Jagodzinski's vision for Villazzo & the VillaHotel concept." />
	<meta name="Keywords" content="Christian Jagodzinski, Villazzo, VillaHotel, luxury villa rentals, luxury villa, villa rental, luxury worldwide travel" />
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/about-us.jsx" type="text/jsx"></script>
    <!-- End Load React Library -->
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
            <!-- Header Image Section Start -->
            <section id="header-section"></section>
            <!-- Header Image Section End -->
            <section id="about-section">
            </section>
            <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
		<?php require_once '../inc-js.php'; ?>
    
        <script type="text/jsx">
            /** @jsx React.DOM */
            var founderVisionBannerImage = "<?php echo SITE_ID==1?"/img/about/banner-founders_vision.png": "/img/inner-bg1.png"?>";
            var founderVisionSignatureImage = "/img/about/signature-christian.jpg";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={founderVisionBannerImage}/>,
                document.getElementById('header-section')
            );  
            ReactDOM.render(
                <AboutDescritionContent founderVisionSignatureImage={founderVisionSignatureImage} />,
                document.getElementById('about-section')
            );
        </script>
    
</body>

</html>
