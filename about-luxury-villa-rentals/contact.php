<?php require_once '/kunden/homepages/27/d309616710/htdocs/private/config.php'; ?>
<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <?php //getMeta('contact_form'); ?>
    <title>Luxury Villa Rentals - Contact Villazzo | Villazzo</title>
	<meta name="Description" content="Villazzo VillaHotel properties are spectacular private homes in Miami, Aspen and St Tropez that are converted into 5-star hotels with the finest attention to detail. Contact Villazzo.com for more information." />
	<meta name="Keywords" content="contact villazzo, villahotel, v villa, private luxury villa, luxury villa rentals, luxury villa, villa rental" />
	<link rel="stylesheet" href="/css/custom.css">
    <script src="/js/vendor/modernizr.js"></script>
</head>

<body>
	<?php require_once '../inc-header.php'; ?>
            <!-- Header Image Section Start -->
            <section id="header-section">
                <img src="/img/about/banner-contact.png">
            </section>
            <!-- Header Image Section End -->
            <section id="about-section">
                <div class="row">
                    <div class="medium-8 medium-centered columns contact-form-panel">
                        <form id="contactForm" onsubmit="return false;">
                            <div class="row">
                                <div class="medium-5 columns">
                                    <select name="title" id="title">
                                        <option value="Title">Title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Miss">Miss</option>
                                    </select>
                                    <input type="text" name="firstName" id="firstName" placeholder="First name*" class="required" />
                                    <input type="text" name="lastName" id="lastName" placeholder="Last name*" class="required" />
                                    <input type="text" name="email" id="email" placeholder="Email*" class="required" />
                                    <input type="text" name="phone" id="phone" placeholder="Phone*" class="required" />
                                </div>
                                <div class="medium-5 columns text-right">
                                    <input type="text" name="address" id="address" placeholder="Address*" class="required" />
                                    <input type="text" name="city" id="city" placeholder="City*" class="required" />
                                    <input type="text" name="state" id="state" placeholder="State*" class="required" />
                                    <input type="text" name="zipCode" id="zipCode" placeholder="Zip Code*" class="required" />
                                    <input type="text" name="country" id="country" placeholder="Country*" class="required" />
                                </div>
                            </div>
                            <div class="row">
                            <div class="medium-12 medium-centered columns">
                                    <textarea name="message" id="message" rows="10" placeholder="Comments" style="resize: none;"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="medium-7 medium-centered columns">
                                    <div class="row">
                                        <div class="small-12 columns">
                                            <input id="brochure" name="brochure" type="checkbox" value="1">
                                            <label for="brochure">Send me your VillaHotel brochure</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="medium-7 medium-centered columns">
                                    <div class="row">
                                        <div class="small-12 columns">
                                            <input id="newsletter" name="newsletter" type="checkbox" value="1">
                                            <label for="newsletter">Please email me your monthly newsletter</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="medium-7 medium-centered columns">
                                    <div class="row">
                                        <div class="small-12 columns">
                                            <label>Please answer the following security code:
                                                <input type="text" id="code" name="code" placeholder="What is 2 + 2?" class="required" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row collapse feedback"></div>
                            <div class="row">
                                <div class="medium-7 medium-centered columns">
                                    <div class="row text-center">
                                        <div class="small-6 columns">
                                            <span class="button small expand" onclick="$('#contactForm').trigger('reset');">RESET</span>
                                        </div>
                                        <div class="small-6 columns">
                                            <button class="button small expand submit" id="contactFormBtn" onclick="query(this.form.id, id, 'contact');"><span>SUBMIT</span><i class="fa fa-circle-o-notch fa-spin"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
             <!-- Subfooter Section Start -->
            <section id="contact-subfooter-section">
                <div class="row">
                    <div class="medium-7 medium-centered columns">
                        <div class="row">
                        <div class="medium-6 columns">
                        <h6 class="text-center">MIAMI</h6>
                        <p class="text-center">
                            81 Washington Ave - Suite 300<br>
                            Miami Beach, FL 33139<br>
                            Tel: +1 (305) 777 0146<br>
                            Fax: +1 (305) 777 0147
                        </p>
                    </div>
                    <div class="medium-6 columns">
                        <h6 class="text-center">SAINT-TROPEZ</h6>
                        <p class="text-center">
                            16 Avenue Paul Roussel<br>
                            83990 Saint-Tropez<br>
                            Tel: +33 (4) 94 49 32 54
                    </div>
                    </div>
                    </div>
                </div>
            </section>
            <!-- SubFooter Section End -->
        <?php require_once '../inc-footer.php'; ?>
		
		<?php require_once '../inc-js.php'; ?>
    
</body>

</html>
