<?php
require_once '../private/config.php';

// restrict user access
$_SESSION['USER']->restrict('1,2,4');

$rs_reservationProperty = $_SESSION['DB']->querySelect('SELECT reservationId, reservationTitle, reservationFirstname, reservationLastname, reservationEmail FROM reservationProperty WHERE reservationId = ? LIMIT 1', array($_GET['id']));
$row_rs_reservationProperty = $_SESSION['DB']->queryResult($rs_reservationProperty);
$totalRows_rs_reservationProperty = $_SESSION['DB']->queryCount($rs_reservationProperty);
if (!$totalRows_rs_reservationProperty)
    header('Location: /reservations/overview');

if (isset($row_rs_reservationProperty['reservationTitle']))
    $client = $row_rs_reservationProperty['reservationTitle'] . ' ' . ucwords($row_rs_reservationProperty['reservationLastname']);
else
    $client = ucwords($row_rs_reservationProperty['reservationFirstname'] . ' ' . $row_rs_reservationProperty['reservationLastname']);
?>
<!doctype html>
<html class="no-js" lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Reservations - <?php echo SITE_NAME;?></title>
        <link rel="stylesheet" href="/css/<?php echo SITE_ID; ?>/custom.css">
        <script src="/js/vendor/modernizr.js"></script>
        <?php include_once '../js/reactLibrary.php'; ?>
        <script src="/js/react/jsx/<?php echo SITE_ID; ?>/feedback.jsx" type="text/jsx"></script>
        <script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
        <script type="text/javascript">
            <!--
        tinymce.init({
                selector: 'textarea',
                height: 500,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                content_css: [
                    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
                    '//www.tinymce.com/css/codepen.min.css'
                ]
            });
-->
        </script>
    </head>

    <body>
<?php require_once '../inc-header.php'; ?>

        <section id="header-section"></section>
        <section id="reservations-title-steps-section"></section>
        <?php
            $body = '
                <div style="text-align:center;">
                <table width="800" cellpadding="0" style="padding-left: 10px; padding-right: 10px;">
                        <tr>
                            <td width="800"><img src="http://www.villazzo.com/img/reservations/feedback/staff.jpg" width="800" /></td>
                        </tr>
                        <tr>
                            <td width="800" style="border-bottom: solid 1px #dac172;"></td>
                        </tr>
                        <tr>
                                <td width="800"><p style="font-family:\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif; font-size:12px; text-align: justify;">

                Dear ' . $client . ',<br /><br />

                On behalf of the entire Villazzo team, I wish to thank you for choosing to stay with us during your most recent vacation.  Villazzo prides itself on creating an exquisitely tailored hotel experience for all of our guests; providing attention to detail, personalized service and luxury amenities in your own private luxury villa, far away from the hustle and bustle of tourists.<br /><br />

                We are constantly striving to improve our client satisfaction, so in order to help us assure the best experience possible, please take a brief moment to tell us how you felt about your stay with us, all the replies will be viewed by our CEO Christian Jagodzinski and his team. Your opinion really matters to us, please click the button to fill out our quick survey, it will only take one minute: <br /><br />
                <div align="center"><a style="color:#ae843b;" href="http://www.villazzo.com/reservations/feedback/' . str_replace('=', '', strtr(base64_encode($row_rs_reservationProperty['reservationId']), '+/', '-_')) . '/"><img src="http://www.villazzo.com/img/reservations/feedback/feedback.png" width="200" /></a></div><br />

                Guest recommendations are a very important source of new clients for us, the highest compliment our customers can give us is to recommend us to a friend.  If you know of anyone that is planning an upcoming visit to Miami Beach, Aspen or St. Tropez, please do let us know.<br /><br />

                Thank you, and I look forward to welcoming you again soon to yet another VillaHotel.<br /><br /><br />

                <img src="http://www.villazzo.com/img/reservations/feedback/christian.jpg" width="150" /><br /><br />

                President<br />
                <img src="http://www.villazzo.com/img/reservations/feedback/logo.png" width="150" style="text-align:center; padding-top: 10px;" /><br />
                <span style="color:#dac172;">Miami Beach - Saint-Tropez - Aspen</span><br />
                81 Washington Ave, Miami Beach, FL 33139<br />
                +1-877-VILLAZZO<br />
                cell US +1 (305) 491-9221<br />
                cell EU +33 (6) 82 67 53 85<br />
                Skype: villazzo.christian.jagodzinski<br />
                <a href="mailto:christian.jagodzinski@villazzo.com" style="color:#dac172;">christian.jagodzinski@villazzo.com</a><br />
                <a href="http://www.villazzo.com" style="color:#dac172;">www.villazzo.com</a>
                </p></td>
                </tr>
                    <tr>
                        <td style="background-color: #ffffff !important; padding-top: 10px;"><div align="center">
                            <table width="300" bgcolor="#FFFFFF" style="background-color: #ffffff !important; width: 300px;">
                                <tr>
                                    <td><a href="https://www.google.com/search?q=Villazzo&ludocid=11581789610050397671#lrd=0x88d9b4f112b3453f:0xa0bac849925d25e7,3,"><img src="http://www.villazzo.com/img/reservations/feedback/google-review-web.png" width="80" style="text-align:center; padding-top: 10px;" /></a></td>
                                    <td><a href="https://www.facebook.com/Villazzo/"><img src="http://www.villazzo.com/img/reservations/feedback/fb-like-web.png" width="80" style="text-align:center; padding-top: 10px;" /></a></td>
                                    <td><a href="https://www.linkedin.com/company/3626085?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A3626085%2Cidx%3A2-1-2%2CtarId%3A1481236585772%2Ctas%3Avillazz"><img src="http://www.villazzo.com/img/reservations/feedback/linkedin-follow-web.png" width="80" style="text-align:center; padding-top: 10px;" /></a></td>
                                </tr>
                            </table>
                            </div>
                        </td>
                    </tr>
                </table>
                </div>';
            //echo $body;
        
            $reservationName =  $row_rs_reservationProperty['reservationFirstname'] . ' ' . $row_rs_reservationProperty['reservationLastname'];
            $modifiedReservationId = str_replace('=', '', strtr(base64_encode($row_rs_reservationProperty['reservationId']), '+/', '-_'));
            $feedbackData = [];
            $feedbackData[] = array('reservationId'=>$row_rs_reservationProperty['reservationId'], 'reservationName' => $reservationName, 'reservationEmail' => $row_rs_reservationProperty['reservationEmail'], '$modifiedReservationId'=> $modifiedReservationId, 'body' => $body);
        ?>

   
        <section id="feedback-content"></section>
        
        <?php require_once '../inc-footer.php'; ?>
        <?php require_once '../inc-js.php'; ?>
        
        <script type="text/jsx" >
            /** @jsx React.DOM */
            var headerImage = '/img/destination-header_all.png';
            var feedbackData = <?php echo json_encode($feedbackData); ?>;
            ReactDOM.render(
                <Image1 src={headerImage} alt="" className="" />,
                document.getElementById('header-section')
            ); 
            ReactDOM.render(
                <FeedbackHeading  />,
                document.getElementById('reservations-title-steps-section')
            );
            ReactDOM.render(
                <FeedbackContent feedbackData={feedbackData} />,
                document.getElementById('feedback-content')
            );
        </script>
    </body>

</html>
