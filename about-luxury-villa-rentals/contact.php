<?php //require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php';  ?>
<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">
     <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Luxury Villa Rentals - Contact <?php echo SITE_NAME ?> | <?php echo SITE_NAME ?></title>
        <meta name="Description" content="<?php echo SITE_NAME ?> VillaHotel properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail. Contact <?php echo SITE_NAME ?>.com for more information." />
        <meta name="Keywords" content="contact <?php echo SITE_NAME ?>, villahotel, v villa, private luxury villa, luxury villa rentals, luxury villa, villa rental" />
        <script src="/js/vendor/modernizr.js"></script>
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <?php include_once '../js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/contact.jsx" type="text/jsx"></script>
    </head>
    <body>
        <?php require_once '../inc-header.php'; ?>
        <section id="header-section" class="inner-bg"></section>
        <?php require_once '../inc-js.php'; ?>
        <?php if(SITE_ID == 1){ ?>
            <!-- Contact Form -->
            <section id="about-section"></section>
            <section id="contact-subfooter-section"></section>
            <section id="footer" class="visible-for-medium-up"></section>
            <section id="footer-mobile" class="visible-for-small-only"></section>
            
            <script type="text/jsx">
                var contactBannerImage = "/img/about/banner-contact.png"  ;
                var contactDetails = [
                   {propertyName:"MIAMI",address1:"81 Washington Ave - Suite 300",address2:"Miami Beach, FL 33139",telephone:"+1 (305) 777 0146", fax:"+1 (305) 777 0147"},
                   {propertyName:"SAINT-TROPEZ",address1:"16 Avenue Paul Roussel",address2:"83990 Saint-Tropez",telephone:"+33 (4) 94 49 32 54", fax:""},
                ];
                ReactDOM.render(
                    <ContactAddress contactDetails={contactDetails}/>,
                    document.getElementById('contact-subfooter-section')
                ); 
                ReactDOM.render(<DesktopFooter/>,document.getElementById('footer'));            
                ReactDOM.render(<MobileFooter/>,document.getElementById('footer-mobile'));            
            </script> 
        <?php } if(SITE_ID == 2){ ?>
            <div id="footerFirst"></div>
            <section id="about-section"></section>
            <div id="footerSecond"></div>
            <script type="text/jsx">
                var contactBannerImage = "/img/about/banner-contact.png"  ;
                var contactBannerImage = "/img/inner-bg1.png";
                ReactDOM.render(<FooterFirst/>,document.getElementById('footerFirst'));
                ReactDOM.render(<FooterSecond/>,document.getElementById('footerSecond'));
            </script> 
        <?php } ?>  
        <script type="text/jsx">
            ReactDOM.render(
                <ContactFormFields siteid="<?php echo SITE_ID;?>" />,
                document.getElementById('about-section')
            );
            ReactDOM.render(
                <ContactFormImage contactBannerImage={contactBannerImage}/>,
                document.getElementById('header-section')
            );
        </script>
    </body>
</html>
