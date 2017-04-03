<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php //getMeta('the_villahotel_concept'); ?>
        <title>VillaHotel Concept: Luxury Villa Rentals with the Best of Both Worlds | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="The Villazzo VillaHotel experience includes a lifestyle organized by your own private Hotel manager and his expert team of hand-picked and uniformed staff whom we train in-house to pamper you. " />
        <meta name="Keywords" content="VillaHotel, private luxury villa, luxury villa rentals, luxury villa, villa rental, villahotel, villahotel concept" />
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
                line-height: 0.5;
            }
            ul {
                line-height: 50%;
                list-style-position: inside;
                padding-left: 0;
            }
        </style>
    </head>

    <body>
        <?php require_once '../inc-header.php'; ?>
        <!-- Header Image Section Start -->
        <section id="header-section"></section>
        <!-- Header Image Section End -->
        <section id="about-section"></section>
        <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var founderVisionBannerImage = "<?php echo SITE_ID == 1 ? "/img/about/banner-villa_hotel_concept.png" : "/img/inner-bg1.png" ?>";
            ReactDOM.render(
            <AboutUsBannerImage aboutUsBannerImage={founderVisionBannerImage}/>,
            document.getElementById('header-section')
            );  
            ReactDOM.render(
            <VillaHotelConcept />,
            document.getElementById('about-section')
            );
        </script>
    </div>
</div>
</section>
</div>
</div>
<?php require_once '../inc-js.php'; ?>

</body>

</html>
