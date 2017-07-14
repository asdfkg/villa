<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Experience Villazzo Investments - Luxury Villa Rentals | <?php echo SITE_ID == 1 ? "Villazzo" : "Great Villa Deals"; ?></title>
        <meta name="Description" content="Villazzo Investments is a partnership of elite investors that have taken advantage of the safe asset class of exclusive luxury residential real estate." />
        <meta name="Keywords" content="luxury lifestyle solutions, private luxury villa, luxury villa rentals, luxury villa, villa rental, Villazzo Investments, lifestyle solution" />
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
            var villazzoInvestmentsBannerImage = "<?php echo SITE_ID==1?"/img/about/banner-villazzo_fund.png": "/img/inner-bg1.png"?>";
            var villazzoInvestmentsContentImage = "/img/about/villazzo-fund-thumb.png";
            ReactDOM.render(
                <AboutUsBannerImage aboutUsBannerImage={villazzoInvestmentsBannerImage}/>,
                document.getElementById('header-section')
            );  
            ReactDOM.render(
                <InvestmentDescritionContent villazzoInvestmentsContentImage={villazzoInvestmentsContentImage} />,
                document.getElementById('about-section')
            ); 
        </script>
    </body>
</html>
