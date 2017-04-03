<?php require_once 'private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <?php getMeta('destinations'); ?>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID;?>/custom.css">
    <link rel="stylesheet" href="/css/map.css">
    <script src="/js/vendor/modernizr.js"></script>
    <?php require_once './js/reactLibrary.php'; ?>
    <script src="/js/react/jsx/contact.jsx" type="text/jsx"></script>
</head>

<body>
	<?php require_once 'inc-header.php'; ?>
            <!-- Choose Your Destination Start -->
            <section id="header-section" class="inner-bg"></section>
            <?php /*
            <section id="choose-your-destination">
                <div class="row text-center hide-for-medium-up">
                    <h1>CHOOSE YOUR DESTINATION</h1>
                </div>
                <div class="row large-collapse">
                    <div class="medium-3 columns extend-it-all">
                        <a href="/rental-villas/saint-tropez"><img src="img/destination-header_saint_tropez_all.png"></a>
                    </div>
                    <div class="medium-3 columns extend-it-all">
                        <a href="/rental-villas/miami"><img src="img/destination-header_miami_all.png"></a>
                    </div>
                    <div class="medium-3 columns extend-it-all">
                        <a href="/rental-villas/aspen"><img src="img/destination-header_aspen_all.png"></a>
                    </div>
                    <div class="medium-3 columns extend-it-all">
                        <a href="/rental-villas/st-barth"><img src="img/destination-header_st_barth_all.png"></a>
                    </div>
            </section>
                  */  ?>
            <!-- Choose Your Destination Map Start-->
            <section id="choose-your-destination-map">
                <div class="row">
                    <div class="small-12 columns">
                         <div id="destinations-map-container">
                        	  <div id="destinations-map" class="map"></div>
                        	  <a href="" class="btn-refresh"><img src="img/destinations/back.png" /></a>
                        	  <a href="" class="btn-dest-properties">View All %destination% Properties</a>
                          </div>
                    </div>
                </div>
                <div class="row visible-for-medium-up" id="destinationText"></div>
            </section>
            <!-- Choose Your Destination Map End-->
        <?php require_once 'inc-footer.php'; ?>
		
		<?php require_once 'inc-js.php'; ?>
		
        <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYpd2VEIF_n_fdZkFA3uYKRYKoYkiQIko&sensor=false"></script>
    	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>-->
    	<script src="/js/vendor/jquery.ui.map.full.min.js" type="text/javascript"></script>
        <script src="/js/map/markerclusterer_plus.js"></script>
        <script src="/js/map/infobox_packed.js"></script>
    	<script src="/js/map/map-<?php echo SITE_ID;?>.js"></script>
        <script type="text/jsx">
            /** @jsx React.DOM */
           var destinationImage = "/img/about/banner-contact.png"  ;
           var destinationImage = "/img/inner-bg1.png";
           <?php if(SITE_ID==1):?>
               ReactDOM.render(<section id="choose-your-destination">
                        <div className="row text-center hide-for-medium-up">
                            <h1>CHOOSE YOUR DESTINATION</h1>
                        </div>
                        <div className="row large-collapse">
                            <div className="medium-3 columns extend-it-all">
                                <a href="/reservations/?dest=saint-tropez&check_in=&check_out="><Image1 src="img/destination-header_saint_tropez_all.png" /></a>
                            </div>
                            <div className="medium-3 columns extend-it-all">
                                <a href="/reservations/?dest=miami&check_in=&check_out="><Image1 src="img/destination-header_miami_all.png" /></a>
                            </div>
                            <div className="medium-3 columns extend-it-all">
                                <a href="/reservations/?dest=aspen&check_in=&check_out="><Image1 src="img/destination-header_aspen_all.png" /></a>
                            </div>
                            <div className="medium-3 columns extend-it-all">
                                <a href="/reservations/?dest=st-barth&check_in=&check_out="><Image1 src="img/destination-header_st_barth_all.png" /></a>
                            </div>
                        </div>
                    </section>,
                document.getElementById('header-section')
            );
           <?php else: ?>
                ReactDOM.render(
                    <ContactFormImage contactBannerImage={destinationImage}/>,
                    document.getElementById('header-section')
                );
            <?php endif; ?>
            ReactDOM.render(<DestinationText />,document.getElementById('destinationText'))
        </script> 

</body>

</html>
