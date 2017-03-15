<?php
//require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php';
//require_once('/kunden/homepages/27/d309616710/htdocs/blog/wp-blog-header.php');
require_once 'private/config.php';
require_once('blog/wp-blog-header.php');
$postArray = array
(
	'https://www.villazzo.com//dev/img/home/home-blog_1.png',
	'https://www.villazzo.com//dev/img/home/home-blog_2.png',
	'https://www.villazzo.com//dev/img/home/home-blog_3.png'
);

$rs_reservation_feedback = $_SESSION['DB']->querySelect('SELECT reservationFeedbackComment FROM reservationFeedback WHERE reservationFeedbackActive = 1 AND reservationFeedbackComment IS NOT NULL ORDER BY reservationFeedbackId DESC');
$row_rs_reservation_feedback = $_SESSION['DB']->queryResult($rs_reservation_feedback);
$totalRows_rs_reservation_feedback = $_SESSION['DB']->queryCount($rs_reservation_feedback);

$testimonials = NULL;
if ($totalRows_rs_reservation_feedback)
{
    do {
             $testimonials .= '<div class="item"><p>'.$row_rs_reservation_feedback['reservationFeedbackComment'].'</p></div>';
    } while ($row_rs_reservation_feedback = $_SESSION['DB']->queryResult($rs_reservation_feedback));
}
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="Our exclusive villa properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail.">
    <title>VILLAZZO | Luxury Vacation & Villa Rentals in Miami, St Tropez and Aspen</title>
    <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
    <script data-cfasync="false">
  (function(r,e,E,m,b){E[r]=E[r]||{};E[r][b]=E[r][b]||function(){
  (E[r].q=E[r].q||[]).push(arguments)};b=m.getElementsByTagName(e)[0];m=m.createElement(e);
  m.async=1;m.src=("file:"==location.protocol?"https:":"")+"//s.reembed.com/G-nvJ3Ln.js";
  b.parentNode.insertBefore(m,b)})("reEmbed","script",window,document,"api");
</script>
<script src="/js/vendor/jquery.js"></script>
<script src="/js/vendor/jquery-ui-1.10.4.custom.min.js"></script>
<script src="/js/vendor/jquery.ui.touch-punch.min.js"></script>
<script src="/js/foundation.min.js"></script>
<script src="/js/foundation/foundation.equalizer.js"></script>
<script src="/js/owlcarousel/owl.carousel.min.js"></script>
<script src="/js/query.js"></script>
<script src="/js/helper.js"></script>
<script src="/js/modal.js"></script>
<script src="/js/google.js"></script>
</head>

<body>
	<?php require_once 'inc-header.php'; ?>
            <!-- Owl Carousel Desktop Start -->
            <section id="owl-carousel-section">
                <div class="owl-carousel-header">
                    <div>
	                    <img src="img/home/home-slider_mobile_aspen.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_aspen.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>VILLAHOTEL JANE<br /><span style="font-size:25px; color: #FFFFFF;">ASPEN</span></h1>
                        </div>
                    </div>
                    <div>
	                    <img src="img/home/home-slider_mobile_staff.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_staff.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>VILLAHOTEL STAFF</h1>
                        </div>
                    </div>
                    <div>
	                    <img src="img/home/home-slider_mobile_miami.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_miami.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>VILLAHOTEL CONTENTA<br /><span style="font-size:25px; color: #FFFFFF;">MIAMI</span></h1>
                        </div>
                    </div>
                    <div>
	                    <img src="img/home/home-slider_mobile_transformation.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_transformation.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>VILLAHOTEL TRANSFORMATION</h1>
                        </div>
                    </div>
                    <div>
	                    <img src="img/home/home-slider_mobile_saint_tropez.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_saint_tropez.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>VILLAHOTEL ANASTASIA<br /><span style="font-size:25px; color: #FFFFFF;">SAINT-TROPEZ</span></h1>
                        </div>
                    </div>
                    <div>
	                    <img src="img/home/home-slider_mobile_pamper.jpg" class="visible-for-small-only">
	                    <img src="img/home/home-slider_pamper.jpg" class="visible-for-medium-up">
                        <div class="owl-content">
                            <h1>PAMPER YOURSELF</h1>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Owl Carousel Desktop End -->
            <!-- Destinations Mobile Section Start -->
            <section id="destinations-mobile" class="visible-for-small-only">
                <div class="row text-center small-collapse">
                     <div class="small-12 columns mobile-destinations-header"><h2>Destinations</h2>
                     </div>
                     <div class="small-12 columns">
                     <h3><a href="/rental-villas/miami">Miami</a></h3>
                    </div>
                    <div class="small-12 columns">
                     <h3><a href="/rental-villas/saint-tropez">Saint-Tropez</a></h3>
                    </div>
                     <div class="small-12 columns">
                     <h3><a href="/rental-villas/aspen">Aspen</a></h3>
                    </div>
                </div>
            </section>
            <!-- Destinations Mobile Section End -->
            <div class="show-for-medium-up">
            <?php require_once 'inc-reservation.php'; ?>
            </div>
            <!-- Your Private Hotel Has Arrived Start -->
            <section id="your-private-hotel-has-arrived">
                <div class="row text-center">
                    <div class="small-12 columns">
                        <h1>Your Private Hotel Has Arrived</h1>
<!--                         <span class="subheader">EXPERIENCE THE VILLA HOTEL CONCEPT</span> -->
                    </div>
                </div>
                <div class="row">
                    <div class="small-12 columns home-round-box">
                        <div class="row text-center">
                            <div class="small-12 medium-4 columns content-box">
                                <a href="" data-reveal-id="homepageRound1Modal"><img src="img/home/home-private_hotel_spectacular.png"></a>

                                <h6>Spectacular<br>Private Villas</h6>
                                <!--<p class="visible-for-medium-up">Every villa meets Villazzo's 5-star standards for size, architectural excellence, outstanding features, quality furnishings and finishes.</p>
-->
                            </div>
                            <!-- Mobile Only Plus Start-->
                            <div class="small-12 columns show-for-small-only home-plus">
	                            <span>+</span>
                            </div>
                            <!-- Mobile Only Plus End-->
                            <div id="middle-column-pluses" class="small-12 medium-4 columns content-box">
                                <a href="" data-reveal-id="homepageRound2Modal"><img src="img/home/home-private_hotel_five_star.png"></a>

                                <h6>Five Star Hotel<br>Transformation</h6>
                                <!--<p class="visible-for-medium-up">Once the property is selected, Villazzo transforms the residence into a 5-star hotel by adding tens of thousands of dollars worth of amenities and features.</p>
-->
                            </div>
                            <!-- Mobile Only Plus Start-->
                            <div class="small-12 columns show-for-small-only home-plus">
	                            <span>+</span>
                            </div>
                            <!-- Mobile Only Plus End-->
                            <div class="small-12 medium-4 columns content-box">
                                <a href="" data-reveal-id="homepageRound3Modal"><img src="img/home/home-private_hotel_expert_staff.png"></a>

                                <h6>Expert Staff<br /></h6><br />
                                <!--<p class="visible-for-medium-up">A personal butler and concierge service, hospitality phone, guest services directory, private chef, even room service is available to make you fell welcomed and pampered.</p>
-->
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="small-12 btm-btn">
                                <a href="/about-luxury-villa-rentals/villahotel-concept" class="button">= VillaHotel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Your Private Hotel Has Arrived End -->
            <!-- Destinations Desktop Section Start -->
            <section id="destinations" class="visible-for-medium-up">
                <!-- <div class="row text-center visible-for-medium-up">
                    <div class="small-12 columns">
                        <h3>Destinations</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="medium-12 columns medium-centered">
                        <div class="owl-carousel-destinations">
		                    <div><a href="/rental-villas/aspen"><img src="img/home/home-destinations_aspen.png"></a></div>
		                    <div><a href="/rental-villas/miami"><img src="img/home/home-destinations_miami.png"></a></div>
		                    <div><a href="/rental-villas/saint-tropez"><img src="img/home/home-destinations_saint_tropez.png"></a></div>
		                </div>
                    </div>
                </div> -->
                <div class="row text-center" data-equalizer>
                    <div class="medium-12 columns" data-equalizer-watch>
                        <div class="flex-video" style="border: 0">
							<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cDIj9Oq5sak?rel=0" frameborder="0" allowfullscreen></iframe>
						</div>
                    </div>
                    
                </div>

            </section>
            <!-- Destinations Desktop Section End -->
            <!-- Client Testimonials Section Start -->
            <!-- <section id="client-testimonials" class="visible-for-medium-up">
                <div class="row text-center hvisible-for-medium-up"><h3>Client Testimonials</h3>
                        <div class="medium-12 columns">
                            <div class="owl-carousel-testimonials visible-for-medium-up">
                                <?php echo $testimonials; ?>
                            </div>
                        </div>
                    </div>
            </section> -->
            <!-- Client Testimonials Section End -->
            <!-- From The Blog Section Start -->
            <!--<section id="from-the-blog" class="visible-for-medium-up">
                <div class="row text-center">
                    <h3>From The Blog</h3>
					<?php
						if (function_exists('iinclude_page')) query_posts('showposts=3'); $postCounter = 0; while (have_posts()): the_post(); ?>
				        <div class="small-4 columns">
				            <a href="<?php the_permalink(); ?>"><img src="<?php echo $postArray[$postCounter]; ?>"></a>
				            <h6><?php the_date('M Y'); ?>:<br><?php the_title(); ?></h6>
				            <span><a href="<?php the_permalink(); ?>">View&nbsp;<i class="fa fa-angle-right"></i></a></span>
				        </div>       
					<?php $postCounter ++; endwhile; ?>
                </div>
            </section>-->
            <!-- From The Blog Section End -->
            <!-- Desktop Sub Footer Section Start -->
            <section id="sub-footer-border"></section>
            <section id="sub-footer" class="visible-for-medium-up" style="padding-bottom: 20px !important;">
                <div class="row text-center">
                    <div class="small-4 columns">
                        <h3>From The Blog</h3>
                        <?php
						if (function_exists('iinclude_page')) query_posts('showposts=1'); $postCounter = 0; while (have_posts()): the_post(); ?>
				        
				            <a href="<?php the_permalink(); ?>"><img src="<?php echo $postArray[$postCounter]; ?>"></a>
				            <h6 style="font-size: 12px;"><?php the_date('M Y'); ?>:<br><?php the_title(); ?></h6>
				            <span style="font-size: 12px;"><a href="<?php the_permalink(); ?>">View&nbsp;<i class="fa fa-angle-right"></i></a></span>
				               
					<?php $postCounter ++; endwhile; ?>
                    </div>
                    <div class="small-4 columns">
                        <h3>Client Testimonials</h3>
                        <div class="small-12 columns">
                            <div class="owl-carousel-testimonials visible-for-medium-up">
                                <?php echo $testimonials; ?>
                            </div>
                        </div>
                    </div>
                    <div class="small-4 columns">
                        <h3>Special Offers</h3>
                        
                        <div class="small-12 columns special-offer" data-equalizer-watch style="background: url(/img/home/home-special_offer.png) no-repeat bottom center; background-size: 100%">
	                    
	                    <div class="row text-center">
	                      <div class="small-12 columns" style="margin-left:0;">
	                        <div class="text">
	                          <div class="small-12 columns" style="margin-left:0;">
	                            <div style="float:right; margin-top: 100px; margin-right: 0; font-size: 12px;"><a href="/about-luxury-villa-rentals/offers" class="button tiny">SEE ALL OFFERS</a></div>
                              </div>
	                        </div>
	                      </div>
	                    </div>
                    </div>
                    <div class="title" style="font-size:12px !important; background-color: #dac172; color: #666666 !important; background-size: contain;">Mix it up!<br />Last Minute WMC offer in Miami!
</div>
                    </div>
                </div>
            </section>
            <!-- Desktop Sub Footer Section End -->
            <!-- Mobile Sub Footer Section Start -->
            <section id="sub-footer-mobile-border"></section>
            <section id="sub-footer-mobile" class="visible-for-small-only">
                <div class="row text-center small-collapsed">
                    <div class="small-6 columns">
                        <a href="/reservations/"><img src="img/home/home-subfooter_book.png"></a>
                        <h6>Book Online</h6>
                    </div>
                    <div class="small-6 columns">
                        <a href="/about-luxury-villa-rentals/villahotel-concept"><img src="img/home/home-subfooter_villa_hotel.png"></a>
                        <h6>VillaHotel</h6>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="small-6 columns">
                    <a data-reveal-id="videoModal"><img src="img/home/home-subfooter_what_is.png"></a>
                        <h6>What is Villazzo</h6>
                    </div>
                    <div class="small-6 columns">
                        <a href="/about-luxury-villa-rentals/villazzo-investments"><img src="img/home/home-subfooter_villazzo_fund.png"></a>
                        <h6>Villazzo Investments</h6>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="small-6 columns">
                    <a href="/about-luxury-villa-rentals/offers"><img src="img/home/home-subfooter_specials.png"></a>
                        <h6>Special Offers</h6>
                    </div>
                    <div class="small-6 columns">
                        <a href="/about-luxury-villa-rentals/villazzo-realty"><img src="img/home/home-subfooter_villazzo_realty.png"></a>
                        <h6>Villazzo Realty</h6>
                    </div>
                </div>
            </section>
            
			<div class="reveal-modal medium homepage-modal" id="homepageRound1Modal" data-reveal>
				<h6>Spectacular Private Villas</h6>
                <p class="visible-for-medium-up">Every villa meets Villazzo's 5-star standards for size, architectural excellence, outstanding features, quality furnishings and finishes.</p>
                <p><a href="/luxury-rental-property-vacation-destinations">Learn More</a>
			</div>
			<div class="reveal-modal medium homepage-modal" id="homepageRound2Modal" data-reveal>
				<h6>Five Star Hotel Transformation</h6>
                <p class="visible-for-medium-up">Once the property is selected, Villazzo transforms the residence into a 5-star hotel by adding tens of thousands of dollars worth of amenities and features.</p>                <p><a href="/video/transformation.mp4">Learn More</a>
			</div>
			<div class="reveal-modal medium homepage-modal" id="homepageRound3Modal" data-reveal>
				<h6>Expert Staff<br /></h6><br />
				<p class="visible-for-medium-up">At your service is your own private Hotel Manager and his expert team of hand-picked butlers, concierges, private chefs, housekeepers and chauffeurs.</p>
                <p><a href="/about-luxury-villa-rentals/villahotel-concept">Learn More</a>
			</div>

            <!--  Mobile Sub Footer Section End -->
        <?php require_once 'inc-footer.php'; ?>
        <?php require_once 'modal/video.php'; ?>
        <?php //require_once 'inc-js.php'; ?>
        
		<script>$(document).foundation();</script>
        <script>
	    <!--
        $(document).ready(function()
        {
            $('.owl-carousel-header').owlCarousel({
                items: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                loop: true,
                dots: false,
                nav: true,
                navText: ['<img src="img/home/arrow-left.png" class="show-for-large-up">', '<img src="img/home/arrow-right.png" class="show-for-large-up">']
            });
            
            $('.owl-carousel-destinations').owlCarousel({
                items: 3,
                autoplay: false,
                loop: true,
                nav: false,
                margin: 30,
                dots: false,
                navText: ['<i class="fa fa-angle-left fa-2x"></i>', '<i class="fa fa-angle-right fa-2x"></i>']
            });
            
            $('.owl-carousel-testimonials').owlCarousel({
                items: 1,
                autoplay: true,
				autoplaySpeed: 2000,
                loop: true,
                nav: false,
				dots: false
            });
            
		    $('#checkInDt').datepicker({
				defaultDate: '+1d',
				minDate: '+1d',
				onClose: function(selectedDate)
				{
					if (selectedDate)
					{
						var nextDayDate = $(this).datepicker('getDate', '+3d');
						nextDayDate.setDate(nextDayDate.getDate() + 3);
						$('#checkOutDt').datepicker('option', 'minDate', nextDayDate);
					}
				}
			});
			
			$('#checkOutDt').datepicker({
				defaultDate: '+1d',
				minDate: '+1d'
			});
		
	        $('.amenitiesBtn').click(function() {
	            $('i', this).toggleClass('a fa-angle-double-down fa-2x a fa-angle-double-up fa-2x');
	            //$('clickMe', this).toggleClass('clickText clickText2');
	            $('.amenitiesPanel').slideToggle('slow');
	
	        });
	    });
		-->
		</script>
        
</body>
</html>