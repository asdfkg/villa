<?php
require_once '../private/config.php';
require_once '../blog/wp-blog-header.php';
?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php //getMeta('press'); ?>
        <title>Luxury Villa Rentals - Press | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="Click here to read articles and press releases related to Villazzo's revolutionary luxury villa rental services. " />
        <meta name="Keywords" content="Villazzo, private luxury villa, luxury villa rentals, luxury villa, luxury villa rental, " />
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
       
        
       <?php /* <section id="about-section">
            <div class="row">
                <div class="large-centered columns">
                    <?php if (function_exists('iinclude_page')) query_posts('cat=35&showposts=0');
                    while (have_posts()): the_post(); ?>
                        <h6><?php the_title(); ?></h6>
                        <div style="padding-bottom: 50px;"><?php the_content(); ?></div>
                    <?php endwhile; ?>
                </div>
            </div>
        </section> */ ?>
        

        <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        <script type="text/jsx">
            /** @jsx React.DOM */
            var pressBannerImage = "<?php echo SITE_ID==1?"/img/about/banner-press.png": "/img/inner-bg1.png"?>";
            <?php if (function_exists('iinclude_page')) query_posts('cat=35&showposts=0');
                $pressData = [];
                while (have_posts()): the_post(); 
                    $pressData[] = array('title'=>get_the_title(),'content'=>get_the_content());
            endwhile; ?>
            var PressData = <?php echo json_encode($pressData); ?>;
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={pressBannerImage} />,
                document.getElementById('header-section')
            );  
            ReactDOM.render(
                <PressDescritionContent PressData={PressData} />,
                document.getElementById('about-section')
            );
        </script>
    </body>
</html>
