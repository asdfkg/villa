<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Luxury Villa Rentals - Booking | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="If you need help finding the perfect VillaHotel or V Villa for your vacation, our sales team is standing by to answer your inquiries. " />
        <meta name="Keywords" content="how to book, villazzo, villahotel, v villa, luxury villa rentals, luxury villa" />
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/about-us.jsx" type="text/jsx"></script>
    </head>
    <body>
        <?php require_once '../inc-header.php'; ?>
        <!-- Header Image Section Start -->
        <section id="header-section"></section>
        <section id="about-section"></section>
        <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var specialOfferBannerImage = "<?php echo SITE_ID == 1 ? "/img/about/banner-booking.png" : "/img/inner-bg1.png" ?>";
            var bookComputerImage = "/img/about/book-icon_computer.png";
            var bookPhoneImage    = "/img/about/book-icon_phone.png";
            var bookEmailImage    = "/img/about/book-icon_email.png";
            
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={specialOfferBannerImage}/>,
                document.getElementById('header-section')
            );    
            ReactDOM.render(
                <HtbDescritionContent bookComputerImage={bookComputerImage} bookPhoneImage={bookPhoneImage} bookEmailImage={bookEmailImage} siteid="<?php echo SITE_ID;?>" />,
                document.getElementById('about-section')
            );
        </script>
    </body>
</html>
