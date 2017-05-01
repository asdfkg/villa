<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php //getMeta('faq'); ?>
        <title>Luxury Villa Rentals - Frequently Asked Questions | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="FREQUENTLY ASKED QUESTIONS ABOUT VILLAZZO'S VILLAHOTELS  AND "V" VILLAS PRODUCT LINES. Click here." />
        <meta name="Keywords" content="private luxury villa, luxury villa rentals, luxury villa, villa rental, st. tropez villa, beach Miami villa, luxury villa definition, villahotel, villahotels, villahotel concept" />
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/about-us.jsx" type="text/jsx"></script>
        <style>
            .stars {
                background: url(/img/about/star.png) no-repeat 7px 0px transparent;
                list-style-type: none;
                margin: 0;
                padding: 0px 0px 0px 50px;
                vertical-align: middle;
            }
        </style>
    </head>
    <body>
        <?php require_once '../inc-header.php'; ?>
        <!-- Header Image Section Start -->
        <section id="header-section"></section>
        <section id="about-section"></section>
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var specialOfferBannerImage = "<?php echo SITE_ID == 1 ? "/img/about/banner-faq.png" : "/img/inner-bg1.png" ?>";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={specialOfferBannerImage}/>,
                document.getElementById('header-section')
            );    
            ReactDOM.render(
                <FaqDescritionContent siteid="<?php echo SITE_ID;?>" />,
                document.getElementById('about-section')
            );
        </script>
    </body>
</html>
