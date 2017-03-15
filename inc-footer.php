<?php if(SITE_ID == 1){ ?>
            <!-- Contact Form -->
            <section id="footer" class="visible-for-medium-up"></section>
            <section id="footer-mobile" class="visible-for-small-only"></section>
            <a class="exit-off-canvas"></a>	
            <script type="text/jsx">
                ReactDOM.render(<DesktopFooter/>,document.getElementById('footer'));            
                ReactDOM.render(<MobileFooter/>,document.getElementById('footer-mobile'));            
            </script> 
        <?php } if(SITE_ID == 2){ ?>
            <section id="footer">
                <div id="footerFirst"></div>
                <div id="footerSecond"></div>
            </section>
            <script type="text/jsx">
                var contactBannerImage = "/img/about/banner-contact.png"  ;
                var contactBannerImage = "/img/inner-bg1.png";
                ReactDOM.render(<FooterFirst/>,document.getElementById('footerFirst'));
                ReactDOM.render(<FooterSecond/>,document.getElementById('footerSecond'));
            </script> 
        <?php } ?>  
