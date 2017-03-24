<?php
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
if ($totalRows_rs_reservation_feedback) {
    do {
        $testimonials .= '<div class="item"><p>' . $row_rs_reservation_feedback['reservationFeedbackComment'] . '</p></div>';
    } while ($row_rs_reservation_feedback = $_SESSION['DB']->queryResult($rs_reservation_feedback));
}
?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Our exclusive villa properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail.">
        <title><?php echo SITE_ID == 1 ? 'VILLAZZO' : 'GREATVILLADEALS'; ?> | Luxury Vacation & Villa Rentals in Miami, St Tropez and Aspen</title>
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once 'js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/home-slider.jsx" type="text/jsx"></script>
        <script src="/js/react/jsx/villazzo-search.jsx"  type="text/jsx"></script>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/home-page.jsx" type="text/jsx"></script>
        <script data-cfasync="false">
            (function (r, e, E, m, b) {
                E[r] = E[r] || {};
                E[r][b] = E[r][b] || function () {
                    (E[r].q = E[r].q || []).push(arguments)
                };
                b = m.getElementsByTagName(e)[0];
                m = m.createElement(e);
                m.async = 1;
                m.src = ("file:" == location.protocol ? "https:" : "") + "//s.reembed.com/G-nvJ3Ln.js";
                b.parentNode.insertBefore(m, b)
            })("reEmbed", "script", window, document, "api");
        </script>
<?php require_once 'inc-js.php'; ?>
    </head>

    <body>
<?php require_once 'inc-header.php'; ?>
        <!-- Owl Carousel Desktop Start -->
        <?php if(SITE_ID == 1){ ?> 
            <section id="owl-carousel-section"></section>
            <div class="show-for-medium-up" id="searchBoxForm"></div>
             <!-- Destinations Mobile Section Start -->
            <section id="destinations-mobile" class="visible-for-small-only"></section>
            <!-- Your Private Hotel Has Arrived Start -->
            <section id="your-private-hotel-has-arrived"></section>
            <!-- Destinations Desktop Section Start -->
            <section id="destinations" class="visible-for-medium-up"></section>
            <!-- Desktop Blog, SpecialOffer & Testimonials Section Start -->
            <section id="sub-footer-border"></section>
            <section id="sub-footer" class="visible-for-medium-up home-blog" >
                <div class="row text-center">
                    <div id="home-blog"></div>
                    <div id="home-testimonial"></div>
                    <div id="home-specialoffer"></div>
                </div>
            </section>
            <!-- Desktop Sub Footer Section End -->
            <!-- Mobile Sub Footer Section Start -->
            <section id="sub-footer-mobile-border"></section>
            <section id="sub-footer-mobile" class="visible-for-small-only"></section>
            <section id="sub-footer-round-mobile" class="visible-for-small-only"></section>
            <!--  Mobile Sub Footer Section End -->
            <?php require_once 'inc-footer.php'; ?>
            <?php require_once 'modal/video.php'; ?>
        <?php } if(SITE_ID == 2){ ?>    
            <div class="container-fluid" id="homeSlider"></div>
            <div class="show-for-medium-up  new-form-bg" id="searchBoxForm"></div>
            <div class="container-fluid1" id="hasDiscount"></div>
            <div class="container-fluid1" id="hasTestimonial"></div>
            <div class="container-fluid1" id="hasGoNext"></div>
            <div class="container-fluid" id="footer-home-img"></div>
            <div class="container-fluid"><?php require_once 'inc-footer.php'; ?></div>
        <?php }  ?>
        <!-- Owl Carousel Desktop End -->
       
        <?php require_once 'reservations/inc-reservation.php'; ?>
        
        


    <!-- React Script -->
    <script type="text/jsx">
        /** @jsx React.DOM */
        <?php if(SITE_ID == 1){ ?>
            var testimonial = <?php echo json_encode(array('data'=>$testimonials)); ?> ;
            <?php
            if (function_exists('iinclude_page'))
                query_posts('showposts=1');
                $postCounter = 0;
                if (have_posts()): the_post();
                     ?>
                     var blogdata = <?php echo json_encode(array('blogImgLink'=>get_the_permalink(), 'blogImgSrc'=>$postArray[$postCounter],
                        'blogDate'=> get_the_date('M Y'),
                        'blogTitle'=> get_the_title(),
                        'blogViewUrl'=> get_permalink(),
                        ));  ?> ;
                    
            <?php    endif; ?>
            
            var sliders = [
                 {sliderImage1:"img/home/home-slider_mobile_aspen.jpg",sliderImage2:"img/home/home-slider_aspen.jpg",sliderHeading:"VILLAHOTEL JANE",sliderText:"ASPEN"},
                 {sliderImage1:"img/home/home-slider_mobile_staff.jpg",sliderImage2:"img/home/home-slider_staff.jpg",sliderHeading:"VILLAHOTEL STAFF",sliderText:""},
                 {sliderImage1:"img/home/home-slider_mobile_miami.jpg",sliderImage2:"img/home/home-slider_miami.jpg",sliderHeading:"VILLAHOTEL CONTENTA",sliderText:"MIAMI"},
                 {sliderImage1:"img/home/home-slider_mobile_transformation.jpg",sliderImage2:"img/home/home-slider_transformation.jpg",sliderHeading:"VILLAHOTEL TRANSFORMATION",sliderText:""},
                 {sliderImage1:"img/home/home-slider_mobile_saint_tropez.jpg",sliderImage2:"img/home/home-slider_saint_tropez.jpg",sliderHeading:"VILLAHOTEL ANASTASIA",sliderText:"SAINT-TROPEZ"},
                 {sliderImage1:"img/home/home-slider_mobile_pamper.jpg",sliderImage2:"img/home/home-slider_pamper.jpg",sliderHeading:"PAMPER YOURSELF",sliderText:""}];
            var homeArrivingImage1 = "img/home/home-private_hotel_spectacular.png";
            var homeArrivingImage2 = "img/home/home-private_hotel_five_star.png";
            var homeArrivingImage3 = "img/home/home-private_hotel_expert_staff.png"; 
            var iframeHeight="100%"; var iframeWidth="100%"; var iframeUrl="https://www.youtube.com/embed/cDIj9Oq5sak?rel=0";
            ReactDOM.render(
                 <HomeSlider sliders={sliders}/>,
                 document.getElementById('owl-carousel-section')
            );
            ReactDOM.render(
                 <HomeMobileDestination />,
                 document.getElementById('destinations-mobile')
            );
            ReactDOM.render(
                 <HomePrivateSection homeArrivingImage1={homeArrivingImage1} homeArrivingImage2={homeArrivingImage2} homeArrivingImage3={homeArrivingImage3} />,
                 document.getElementById('your-private-hotel-has-arrived')
            );
            ReactDOM.render(
                 <HomeDesktopDestination iframeHeight={iframeHeight} iframeWidth={iframeWidth} iframeUrl={iframeUrl} />,
                 document.getElementById('destinations')
            );
            ReactDOM.render(
                 <HomeDesktopSpecialOffer />,
                 document.getElementById('home-specialoffer')
            );
            ReactDOM.render(
                 <HomeDesktopTestimonial testimonial={testimonial} />,
                 document.getElementById('home-testimonial')
            );
            ReactDOM.render(
                 <HomeDesktopBlog blogdata={blogdata} />,
                 document.getElementById('home-blog')
            );
            ReactDOM.render(
                 <HomeMobileSubFooter  />,
                 document.getElementById('sub-footer-mobile')
            );
             ReactDOM.render(
                 <HomeMobileRoundSubFooter  />,
                 document.getElementById('sub-footer-round-mobile')
            );
       <?php } if(SITE_ID == 2){ ?>
            var sliders = [
                {sliderImage1:"img/home/bnr1.png",sliderImage2:"img/home/bnr1.png",sliderHeading:"VILLAHOTEL JANE",sliderText:"ASPEN"},
                {sliderImage1:"img/home/bnr2.png",sliderImage2:"img/home/bnr2.png",sliderHeading:"VILLAHOTEL JANE",sliderText:"ASPEN"},
                {sliderImage1:"img/home/bnr3.png",sliderImage2:"img/home/bnr3.png",sliderHeading:"VILLAHOTEL JANE",sliderText:"ASPEN"}];
            ReactDOM.render(
                <HomeSlider sliders={sliders}/>,
                document.getElementById('homeSlider')
            );
            ReactDOM.render(
               <HomeDiscount/>,
               document.getElementById('hasDiscount')
            );
            ReactDOM.render(
                    <HomeTestimonial/>,
                    document.getElementById('hasTestimonial')
            );
            ReactDOM.render(
                    <HomeGoNext/>,
                    document.getElementById('hasGoNext')
            );

                 var data = {
                    destination: "<?php echo ($_GET['dest']) ?>",
                    checkin: "<?php echo ($_GET['check_in']?date('m/d/Y', strtotime($_GET['check_in'])):date('m/d/Y', strtotime('+7 days'))); ?>",
                    checkout: "<?php echo ($_GET['check_out']?date('m/d/Y', strtotime($_GET['check_out'])):date('m/d/Y', strtotime('+14 days'))); ?>",
            };
             ReactDOM.render(
                <Image1 src="img/footer.jpg" />,
                document.getElementById('footer-home-img')
             );
       <?php }  ?>

      
    </script>
    <!-- End React Script -->        
        
    </body>
</html>