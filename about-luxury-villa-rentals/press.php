<?php
require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php';
require_once '/kunden/homepages/27/d309616710/htdocs/blog/wp-blog-header.php';
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<?php //getMeta('press'); ?>
	<title>Luxury Villa Rentals - Press | <?php echo SITE_ID==1?"Villazzo":"Great Villa Deals";?></title>
	<meta name="Description" content="Click here to read articles and press releases related to Villazzo's revolutionary luxury villa rental services. " />
	<meta name="Keywords" content="Villazzo, private luxury villa, luxury villa rentals, luxury villa, luxury villa rental, " />
	<link rel="stylesheet" href="/css/custom.css">
    <link rel="stylesheet" href="/css/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
            <!-- Header Image Section Start -->
            <section id="header-section">
                <img src="/img/about/banner-press.png">
            </section>
            <!-- Header Image Section End -->
            <section id="about-section">
                <div class="row">
                    <div class="large-centered columns">
	                    <?php if(function_exists('iinclude_page')) query_posts('cat=35&showposts=0'); while (have_posts()): the_post(); ?>
							<h6><?php the_title(); ?></h6>
							<div style="padding-bottom: 50px;"><?php the_content(); ?></div>
						<?php endwhile; ?>
                    </div>
                </div>
            </section>
            <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
		
		<?php require_once '../inc-js.php'; ?>
    
</body>

</html>
