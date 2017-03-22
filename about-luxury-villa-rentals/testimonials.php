<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php //getMeta('testimonials'); ?>
        <title>Testimonials & Clients: Jay-Z, Madonna, Jamie Foxx, and Derek Jeter! | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="Villazzo offers the most exclusive, private, and one-of-a-kind vacation experiences for the world's more famous, successful, and high-profile clientele, such as Jay-Z, Madonna, Jamie Foxx, & Derek Jeter." />
        <meta name="Keywords" content="private luxury villa, luxury villa rentals, luxury villa, villa rental, Villazzo, testimonials, Jay-Z, Madonna, Jamie Foxx, Derek Jeter" />
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
            var specialOfferBannerImage = "<?php echo SITE_ID == 1 ? "/img/about/banner-testimonial.png" : "/img/inner-bg1.png" ?>";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={specialOfferBannerImage}/>,
                document.getElementById('header-section')
            );      
            ReactDOM.render(
                <TestimonialDescritionContent />,
                document.getElementById('about-section')
            );
        </script>
    </body>
</html>
