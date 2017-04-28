<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Luxury Villa Rentals - Offers | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Villazzo VillaHotel properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail." />
        <meta name="Keywords" content="contact villazzo, villahotel, v villa, private luxury villa, luxury villa rentals, luxury villa, villa rental" />
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
                line-height: 1.5;
            }
            ul {
                line-height: 50%;
            }
            p {
                text-align:justify
            }
        </style>
    </head>

    <body>
        <?php require_once '../inc-header.php'; ?>
        <!-- Header Image Section Start -->
        <section id="header-section"></section>
        <!-- Header Image Section End -->
        <section id="special-offers-section"></section>
        <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var specialOfferBannerImage = "<?php echo SITE_ID == 1 ? "/img/about/banner-offers.png" : "/img/inner-bg1.png" ?>";
            var specialOfferContentImage = "/img/about/offer-thumb1.png";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={specialOfferBannerImage}/>,
                document.getElementById('header-section')
            );  
            ReactDOM.render(
                <SpecialOfferDescritionContent specialOfferContentImage={specialOfferContentImage} />,
                document.getElementById('special-offers-section')
            ); 
        </script>
    </body>
</html>
