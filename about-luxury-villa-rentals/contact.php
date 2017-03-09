<?php //require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php';  ?>
<?php require_once '../private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">
     <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php if(SITE_ID == 1){ ?>
            <title>Luxury Villa Rentals - Contact Villazzo | Villazzo</title>
            <meta name="Description" content="Villazzo VillaHotel properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail. Contact Villazzo.com for more information." />
            <meta name="Keywords" content="contact villazzo, villahotel, v villa, private luxury villa, luxury villa rentals, luxury villa, villa rental" />
            <link rel="stylesheet" href="/css/villazzo/custom.css">
            <script src="/js/vendor/modernizr.js"></script>
            <!-- Load React Library -->
            <?php include_once '../js/villazzoReactLibrary.js'; ?>
            <script src="/js/react/villazzo/jsx/contact.jsx" type="text/jsx"></script>
            <!-- End Load React Library -->
        <?php } if(SITE_ID == 2){ ?>
            <title>Luxury Villa Rentals - Contact GreatVillaDeals | GreatVillaDeals</title>
            <meta name="Description" content="GreatVillaDeals VillaHotel properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail. Contact GreatVillaDeals.com for more information." />
            <meta name="Keywords" content="contact GreatVillaDeals, villahotel, v villa, private luxury villa, luxury villa rentals, luxury villa, villa rental" />
            <link rel="stylesheet" href="/css/gvd/custom.css">
            <script src="/js/vendor/modernizr.js"></script>
            <!-- Load React Library -->
            <?php include_once '../js/gvdReactLibrary.js'; ?>
            <script src="/js/react/gvd/jsx/contact.jsx" type="text/jsx"></script>
            <!-- End Load React Library -->
        <?php }  ?>
    </head>
    <body>
        <?php if(SITE_ID == 1){ ?>
            <?php require_once '../inc-header.php'; ?>
            <!-- Header Image Section Start -->
            <section id="header-section"></section>
            <!-- Contact Form -->
            <section id="about-section"></section>
            <!-- Subfooter Section Start -->
            <section id="contact-subfooter-section"></section>
            <!-- Commonfooter Section Start -->
            <section id="footer" class="visible-for-medium-up"></section>
            <section id="footer-mobile" class="visible-for-small-only"></section>

            <?php //require_once '../inc-footer.php'; ?>
            <?php require_once '../inc-js.php'; ?>
            <script type="text/jsx">
                /** @jsx React.DOM */
                var contactBannerImage = "/img/about/banner-contact.png"  ;
                var contactDetails = [
                   {propertyName:"MIAMI",address1:"81 Washington Ave - Suite 300",address2:"Miami Beach, FL 33139",telephone:"+1 (305) 777 0146", fax:"+1 (305) 777 0147"},
                   {propertyName:"SAINT-TROPEZ",address1:"16 Avenue Paul Roussel",address2:"83990 Saint-Tropez",telephone:"+33 (4) 94 49 32 54", fax:""},
                ];
                ReactDOM.render(
                    <ContactFormImage contactBannerImage={contactBannerImage}/>,
                    document.getElementById('header-section')
                );
                ReactDOM.render(
                    <ContactFormFields />,
                    document.getElementById('about-section')
                ); 
                ReactDOM.render(
                    <ContactAddress contactDetails={contactDetails}/>,
                    document.getElementById('contact-subfooter-section')
                ); 
                ReactDOM.render(<DesktopFooter/>,document.getElementById('footer'));            
                ReactDOM.render(<MobileFooter/>,document.getElementById('footer-mobile'));            
            </script> 
        <?php } if(SITE_ID == 2){ ?>
            <?php require_once '../inc-header.php'; ?>
            <!-- Header Image Section Start -->
            <section id="header-section" class="inner-bg"></section>
            <!-- Header Image Section End -->
            <!-- Subfooter Section Start -->
            <div id="footerFirst"></div>
            <?php //<section id="contact-subfooter-section"></section> ?>
            <section id="about-section"></section>
            <div id="footerSecond"></div>
            <!-- SubFooter Section End -->
        <?php //require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>    
            
        <script type="text/jsx">
            /** @jsx React.DOM */
            var contactBannerImage = "/img/about/banner-contact.png"  ;
            var contactBannerImage = "/img/inner-bg1.png";
            ReactDOM.render(
                <ContactFormImage contactBannerImage={contactBannerImage}/>,
                document.getElementById('header-section')
            );
            ReactDOM.render(
                <ContactFormFields />,
                document.getElementById('about-section')
            );
            ReactDOM.render(<FooterFirst/>,document.getElementById('footerFirst'));
            ReactDOM.render(<FooterSecond/>,document.getElementById('footerSecond'));
        </script> 
        <?php } ?>    
    </body>
</html>
