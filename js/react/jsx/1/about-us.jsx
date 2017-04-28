var AboutUsBannerImage = React.createClass({
    render: function(){
        return (
            <Image1 src={this.props.aboutUsBannerImage} alt="" className="" />
        );
    }
});

var AboutDescritionContent = React.createClass({
    render:function(){
    const styles = {
        align: 'left', margin: '0px 20px 0px 0px'
    };
        return (
            <div className="row">
                    <div className="large-centered columns">
                        Valued Villazzo Client,<br /><br />
                        <p>Allow me to share with you Villazzo's vision &ndash; and why I started Villazzo. After selling my Internet company back in the "dot com" boom, I decided to follow my passion for luxury travel.</p>
                        <p>While vacationing in very expensive villa rentals, I recognized that there was a missing "management" element in the luxury villa sector: Whereas in the hotel world, the chain is "building owner &ndash; hotel operator &ndash; agent &ndash; guest," in the villa world, the chain is only "villa owner &ndash; agent &ndash; guest". The "operator" is conspicuously absent.</p>
                        <p>Realtors or "villa agents" are paid to "close the deal". They have hundreds of villas in their portfolio, most of which they have never seen from the inside. They are neither paid nor prepared to create a luxury vacation experience. They have no hotel experience or training; no dedicated operations staff; nor any of the myriad of products you need to create a five star experience.</p>
                        <p>In the traditional villa rental world, once you have booked, the follow-up disappears. At best you'll get some "concierge" service by the realtor himself &ndash; who has no time at all between all the bookings he/she is handling. So you'll find yourself arriving in a dirty house, with an empty fridge, and a home theater that nobody knows to operate. The villa housekeeper is only available at certain hours, doesn't speak English, and has an attitude. If you want to dine at home and haven't brought your own chef, you'll have to cook yourself.</p>
                        <p>In short, there was no reliable "brand name" company out there that I could count on to pre-qualify and manage rental properties as being truly 5-star, and at the same time offer consistent hospitality services for my stay.</p>
                        <p>That is precisely why I created Villazzo.</p>
                        <p>Villazzo is a "five star hotel operator" for private luxury residences.</p>
                        <p>Villazzo picks the top 10 rental residences in destinations where we have a local office; where we have our own stock of linen and hotel products, and a "Hotel Manager" with his staff; all of which are essential for providing our unmatched 5-star service. In our "VillaHotels" you will be welcomed to your new home by the local manager and your full personal staff with welcome Champagne and hors-d'oeuvres. You will have everything set up for you like in a 5-star hotel: The bathrobes, the luxury bath products, fine linen, fruit baskets, liquor bar, mini bars, snacks, an exclusive wine selection, cigars, an in-villa gift shop, a "business center" with laptop and fax. It's all there waiting for you already. And you don't even have to think about it before.</p>
                        <p>Join us and experience first hand what a Villazzo VillaHotel is all about. I promise you will not be disappointed.</p>
                        <p>&nbsp;</p>
                        <p>My warmest regards,</p>
                        <Image1 style={styles} src="/img/about/signature-christian.jpg" width="160" />
                        <p>Christian Jagodzinski<br /> President and Founder<br /> Villazzo LLC</p>

                    </div>
                </div>          		                    
        );
    }
});

var VillaHotelConcept = React.createClass({
    render:function(){
        return (
             <div className="row">
                      <div className="large-centered columns">
                          <div style={{textAlign: 'justify'}}>
                              <table width="100%" border="0" cellpadding="5" cellspacing="0">
                                  <tbody>
                                      <tr>
                                        <td>
                                              <p className="inherit-initial"><br/>Our signature 5-Star VillaHotel Experience includes a lifestyle organized by your own private Hotel Manager and his expert team of hand-picked and uniformed staff whom we train in-house to pamper you. Your personal in-villa butler/concierge, private chef, on-call Villazzo limousine service are all included.</p>
                                        </td>
                                      </tr>
                                  </tbody>
                              </table>

                              <h2 style={{textAlign:'center', color: '#dac172'}}>5-Star VillaHotel Service</h2><br />
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                      <tr>
                                          <td width="40%" style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/VillaHotel-Staff-01.jpg" className="service-img" /></td>
                                          <td width="60%" style={{verticalAlign:'top',textAlign:'left'}}>
                                              <strong>EXPERIENCED LUXURY HOTEL MANAGEMENT</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Expertly trained Butler to create a bespoke experience</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Personal welcome at check-in with Villazzo President</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Professional Hotel Director with local expertise</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Prompt and responsive Villa Technician on standby</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Pre-arrival equipment check, property maintenance and emergency repairs</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Daily Breakfast & Newspaper service.</p></li>
                                              </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/07-Housekeeping.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>COURTEOUS AND EFFICIENT HOUSEKEEPING</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Discreet and reliable daily housekeeping by uniformed and trained Villazzo Housekeeping Team</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Daily linen change</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Nightly turndown service.</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Concierge-02.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR OWN PERSONAL BUTLER TO PAMPER YOU</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Dedicated full-time in-villa butler and On-Site Property Manager</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Bespoke personal shopping service</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Dining recommendations and reservations</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Daily newspaper service</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Breakfast service</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Cocktail service</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Master-Bedroom-Villazzo-Setup.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>THE ULTIMATE BEDROOM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Luxurious bedding with 600 thread count FRETTE linens and plush mattress pads</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Non-allergenic pillow assortment </p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>VOSS water bottles</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Villazzo  porcelain tissue boxes</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>GODIVA bedside chocolate treats</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Contenta-Bathroom-Villazzo-Setup.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR BATHROOM, A SANCTUARY OF CALM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>BVLGARI bath and body products elegantly displayed on Villazzo Porcelain Collection</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Professional Hair Dryers</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Plush Villazzo embroidered FRETTE bath set including bath towel, hand towel, wash cloth, bath mat</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Plush Villazzo embroidered FRETTE bathrobe and slippers</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Fresh white rose arrangement</p></li>
                                               </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/03-Closet.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>CLOSET RETREAT</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Amenities such as wooden Villazzo hangers and shoe horns</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Garment pressing and laundering</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Shoe polishing</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>High quality ELSAFE in-room safe</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/01-Chef.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>FINE WINE &amp; DINING</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Arrive to a pre-stocked fridge</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Fresh Fruit Baskets</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Fresh Flower arrangements</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Mini Bars throughout the villa</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Temperature Controlled Wine Storage & Selection</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Cigar Humidor with finest Havana cigars</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Convenient Room Service</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Contenta-Kitchen-Villazzo-Setup.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>COFFEE &amp; TEA</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Villazzo Loose Leaf Tea Selection with Kettle</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Villazzo Nespresso Coffee Station complete with Villazzo sugars</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/05-Concierge.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>OUTDOOR  OASIS</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Gift shop with must-have essentials such as Aspirin, Sunscreen, Mosquito repellent…</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Thick cotton pool towels</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Refreshing Evian mineral water spray</p></li>
                                              </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/06-Office.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR OFFICE AWAY FROM HOME</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Free high speed wi-fi and access iPad, printer</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Complete Stationery set with letterhead</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Convenient Villazzo VillaHotel one-touch phone with direct link to Villazzo Operations</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Villazzo DVD selection</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Quick Start Guides for all technical equipment</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>In-villa Newspaper & Magazine selection.</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/kids-program.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>TAILOR-MADE KIDS PROGRAM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Full range of bath products for children and babies</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Slumber party set up with play tent, flashlight + Villazzo lantern</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Villazzo Stuffed animal Teddy Bear for our little guests</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Kids Sized Slippers and Bathrobes</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Party Celebration (full service with entertainers, inflatable toys, food, beverage)</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Nightly turndown service (cookies and milk)</p></li>
                                                  <li className="stars"><p style={{margin:'0px', padding:'0px'}}>Family Fun Cooking Class with Chef</p></li>
                                              </ul></td>
                                      </tr>
                                  </tbody>
                              </table>
                              <div style={{textAlign:"center"}}>
                                  <div style={{textAlign:"justify"}}>
                                      <p>We have built our company on our signature 5-Star service level – if you book a 5-star property, you should have the amenities and services that go with it and we recommend our guests reserve this premier service level to enjoy the ultimate luxury vacation experience. However, since we understand that every guest has specific preferences, we will customize our services to match your exact taste and requirements.  At Villazzo you have the flexibility to customize every last detail to create your own bespoke experience.</p>
                                  </div>
                                  <p style={{fontSize:'24px'}}><a href="http://www.villazzo.com/reservations" style={{fontSize:'24px'}}>Customize Your Villa Stay</a></p>
                              </div>

                          </div>
                      </div>
                  </div>		                    
        );
    }
});

var RealityDescritionContent = React.createClass({
    render:function(){
        const styles = {
            align: 'left', margin: '0px 20px 0px 0px',float:"left"
        };
        return (
            <div className="row">
                <div className="large-centered columns realityImage">
                    <Heading5 value="VILLAZZO REALTY GIVES YOU ACCESS TO THE FINEST PROPERTIES IN THE WORLD" />
                    <a href="http://www.villazzorealty.com">
                        <Image1 src={villazzoRealityContentImage} width="400" align="left" styles={styles} />
                    </a>
                    <p className="reality-para">
                        Villazzo has over a decade long track record of success in the ultra-luxury vacation rental marketplace; and we successfully leveraged our 
                        expertise and relationships with homeowners and our clients to also facilitate real estate transactions.<br /><br />
                        <Anchor href="mailto:lisa.blake@villazzo.com?Subject=Villazzo%20Realty" value="Contact" />&nbsp;Lisa Blake, Villazzo's leading Real Estate Agent, if you are interested in buying or selling a luxury villa. You may also&nbsp; 
                        <Anchor href="http://www.villazzorealty.com" value="Visit" /> our website for more information, to view the Top Luxury Deals in Miami or 
                        to conduct your own property search using our MLS integrated search engines.
                    </p>
                </div>
            </div>
     		                    
        );
    }
});


var InvestmentDescritionContent = React.createClass({
    render:function(){
        const styles = {
           margin: '0px 20px 0px 0px',float:"left"
        };
        return (
            <div className="row">
                <div className="large-centered columns">
                    <Heading4 value='VILLAZZO INVESTMENTS' />
                    <a href="http://www.villazzo.com/investments/fact-sheet.pdf">
                        <Image1 src={villazzoInvestmentsContentImage} width="200" align="left" styles={styles} />
                    </a>
                    <p className="reality-para">Villazzo Investments is a partnership of elite investors that have taken advantage of the safe asset class of exclusive luxury residential real estate – the most lucrative way of investing money that Christian has attained over 15 years as an investor himself. 
                        &nbsp; <Anchor href="mailto:investments@villazzo.com?Subject=Villazzo%20Investments" value="Contact" /> Christian if you are interested to learn more about this opportunity.
                    </p>
                    <p className="reality-para"><Anchor href="http://www.villazzo.com/video/villazzo-investments.php" value="View our Villazzo Investments video to find out more about our investment opportunities." /></p>
                </div>
            </div>
        );
    }
});

var PressDescritionContent = React.createClass({
    render:function(){
        var options = this.props.PressData.map(function(pdata,i) {
            return (
                <span>
                    <h6 key={i+"t"} dangerouslySetInnerHTML={{__html:pdata.title}}></h6>
                    <div key={i+"c"} dangerouslySetInnerHTML={{__html:pdata.content}}></div>
                </span>
            )
        });
        return (
            <div className="row">
                <div className="large-centered columns">
                    {options}
                </div>
            </div>         		                    
        );
    }
});


var SpecialOfferDescritionContent = React.createClass({
    render:function(){
        return (
            <div className="row">
                <h1 className="text-center">SPECIAL OFFERS</h1>
                <div className="row text-center">
                    <hr className="visible-for-medium-up" />
                    <div className="medium-12 columns so-content1" >
                        <div className="row collapse" data-equalizer>
                            <div className="medium-6 columns property-image" data-equalizer-watch>
                                <Image1 src={specialOfferContentImage} />
                            </div>
                            <div className="medium-6 columns property-details" data-equalizer-watch>
                                <div className="row text-left">
                                    <div className="small-12 columns">
                                        <Heading6 value='JetSet to Europe this summer in style!  Enjoy a 10 % discount on your first WiJet flight' /><br />
                                    </div>
                                </div>
                                <div className="row text-left">
                                    <div className="small-12 columns so-content2" >
                                        <p> Villazzo has partnered with WiJet to provide a special offer so you can travel to our villa destinations in Ibiza and St Tropez in your own private on-demand jet.
 <br /><br />
As a Villazzo guest, you can enjoy a 10 % discount on your first WiJet flight and  5 % on subsequent flights between May 2017 – October 2017.
<br /><br />
Hop on board the latest generation of jet, the four seater Cessna Citation Mustang.<br /><br />
Wijet is a certified airline with hubs in Cannes and Nice and is one of only 3 private jets airlines certified to operate in Saint Tropez La Môle. Wijet’s philosophy is to offer maximum flexibility and they can take last minute bookings. They serve more than 1200 airports in Europe with a fleet that consists of 15 Cessna Citation Mustangs and they are the exclusive partner of Air France La Première flight.  The experience begins on board where you  can kick back, relax and enjoy exclusive snacks created for Wijet by French Chef Patissier Christophe Michalak and Ruinart champagne.<br /><br />
Book your minimum 7 night stay in St Tropez or Ibiza during the months of May 2017 – October 2017 to take advantage of this exclusive offer.
                                        </p>
                                        {/* <ul>
                                            <li className="stars">4 hours Mixologist and Private Chef</li>
                                            <li className="stars">Cocktail selection complete with appetizer pairings</li>
                                            <li className="stars">Complimentary Value of $1500</li>
                                        </ul> */}
                                    </div>
                                </div>
                                <div className="row text-left">
                                    <div className="small-12 columns so-content3">
                                        <Anchor classes="button tiny" href="mailto:villas@villazzo.com?subject=JetSet%20to%20Europe%20this%20summer%20in%20style!%20Enjoy%20a%2010% discount%20on%20your%20first%20WiJet%20flight" value="BOOK NOW"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="visible-for-medium-up" />
                </div>
            </div>         		                    
        );
    }
});


var FaqDescritionContent = React.createClass({
    render:function(){
        return (
            <div className="row">
                <div className="large-centered columns">
                    <Heading4 value="requently Asked Questions about Villazzo’s VillaHotels product lines" />
                    <p>&nbsp;</p>
                    <Heading4 value='What is a “VillaHotel”?' />

                    <ul>
                        <li className="stars"><p>Villazzo’s VillaHotel Concept is unlike any other in the industry; it is much more than just an off-site concierge service which is commonplace in the industry.</p></li>
                        <li className="stars"><p>VillaHotel Concept literally transforms a luxury villa into a private, 5-star hotel experience. The transformation process enhances every fine detail of your villa vacation experience, ensuring that you receive only the finest services and amenities while enjoying your vacation.</p></li>
                        <li className="stars"><p>VillaHotel offers a full team of service personnel, including a full-time butler, and luxury hotel amenities.</p></li>
                    </ul>

                    <Heading4 value='What is the difference between Villazzo and a traditional “Villa Rental”?' />
                    <ul>
                        <li className="stars"><p>What is missing in the traditional villa market is a “hotel manager/operator” that elevates a villa rental beyond a “real estate” experience to a “luxury hotel” experience. </p></li>
                        <li className="stars"><p>To operate like a true hotel, a substantial investment is required to employ a team of industry professionals and products.  Villazzo is a hotel operator and has made this type of investment feasible by spreading the overhead cost across a number of properties.</p></li>
                    </ul>

                    <Heading4 value="Why are Villazzo VillaHotel rental rates higher than other rental rates like Homeaway and Airbnb?" />
                    <ul>
                        <li className="stars"><p>VillaHotel rates are consistent with world-class, 5-star hotels, with the added benefit that Villazzo offers privacy and a personalized touch of your very own exclusive villa.</p></li>
                        <li className="stars"><p>Unlike other home rentals, with Villazzo your house will be well kept, the amenities will be replenished, the linens will be luxurious, the cooking utensils will be complete, electronics and appliances will be in good working order. This is a rarity in traditional rentals!</p></li>
                        <li className="stars"><p>With Villazzo, you truly get what you pay for, whereas other online websites may charge less, but mostly fail to offer a product that is worth the rental investment.</p></li>
                    </ul>

                    <Heading4 value='Villazzo a “Destination Club?”' />
                    <ul>
                        <li className="stars"><p>Villazzo in not a Destination club, there are no annual membership fees – you only pay for the days you stay at Villazzo.</p></li>
                        <li className="stars"><p>While a Destination Club may offer a wider range of destinations and properties, VillaHotels offer private ultra-luxury homes, estates, and villas with complete privacy.</p></li>
                        <li className="stars"><p>Destination clubs promise up to 60 days of vacationing, however, the reality is that 15 to 20 club members share each property, making it virtually impossible to stay more than one or two weeks in a destination club property per year.</p></li>
                    </ul>

                    <Heading4 value="When renting a VillaHotel, do I rent the entire villa, or just as many rooms as I need?" />
                    <ul>
                        <li className="stars"><p>VillaHotels are your own personal hotel – you do not share them with other guests. Therefore, you must rent the entire VillaHotel and not on a per-room basis.</p></li>
                        <li className="stars"><p>You can, however, rent VillaHotels per night – unlike other rental villas, which are only available by the week.</p></li>
                    </ul>

                    <Heading4 value="How many guests can stay at a VillaHotel?" />
                    <ul>
                        <li className="stars"><p>Villazzo properties range in size from 3 to 8 bedrooms.</p></li>
                        <li className="stars"><p>As a rule, no more than 20 people may stay on the grounds during the day.</p></li>
                    </ul>

                    <Heading4 value="How many destinations are available for guests?" />
                    <ul>
                        <li className="stars"><p>Villazzo vacation experts begin by selecting only the most exclusive destinations throughout the world, that can be serviced and maintained at the high levels of the VillaHotel Standard.</p></li>
                        <li className="stars"><p>VillaHotels are currently available in Miami Beach, St. Tropez and Aspen.</p></li>
                    </ul>

                    <Heading4 value="How many Properties does Villazzo have in each destination?" />
                    <ul>
                        <li className="stars"><p>To meet the highest standards of our discerning clientele, we hand-select only the finest ultra-luxury homes.</p></li>
                        <li className="stars"><p>Villazzo only appoints the 10 most luxurious properties per destination as “VillaHotels”.  Villazzo offers a diverse range of properties that vary in size, amenities and architectural styles.</p></li>
                        <li className="stars"><p>Properties are all centrally managed by a local office with full hotel staff. The staff is shared among the VillaHotels in that destination city</p></li>
                        <li className="stars"><p>Villazzo consistently upgrades the portfolio of properties to include the newest, most beautiful villas, assuring our guests the absolute best properties per destination.</p></li>
                    </ul>

                    <Heading4 value="Can I view the Properties before I stay in them (pictures, Location, Video, Floor plans, etc.)?" />
                    <ul>
                        <li className="stars"><p>Visit the destinations page of this web site, and click on a location to view the VillaHotels for your choosing.</p></li>
                    </ul>
                    <Heading4 value="What are the Property Value and Rental Rates of a typical VillaHotel?" />
                    <ul>
                        <li className="stars"><p>VillaHotel property values range from 2.5 to 30 million USD, and have a daily rental rate between $1,200 and $26,000.</p></li>
                        <li className="stars"><p>Rates vary by season, duration, destination, and service level.</p></li>
                    </ul>

                    <Heading4 value="What services can I expect from a VillaHotel?" />
                    <ul>
                        <li className="stars"><p>VillaHotels provide guests with the following services (all of which are included in the nightly rate): full-time dedicated personal butler/concierge, daily housekeeping and linen change, off-site laundry of linen and towels, in-suite dining menus, daily international newspapers, flower service, daily supply of fresh fruits and juices, fully stocked bar, humidor with choice of personally selected cigars, and well-stocked refrigerators and mini-bars.<br />
                                <a href={"/pdf/"+this.props.siteid+"/services.pdf"} target="_blank">Download a list of all VillaHotel Services here.</a></p></li>
                        <li className="stars"><p>VillaHotel guests have access to: exotic car rental, chauffeured limousines, “Restaurant at Home” services; a nanny; personal massage and spa treatments either on-site or at nearby, top-rated facility; personal trainers; helicopter and aircraft charter, yachts and watercraft rental; shopping and delivery services.</p></li>
                    </ul>

                    <Heading4 value="What technologies are VillaHotels equipped with?" />
                    <ul>
                        <li className="stars"><p>All VillaHotels come with the latest entertainment and business technology. This includes business-class hotel phone systems, teleconferencing capabilities; wireless network; pre-configured Villazzo laptops with network printer; ipads and extensive music selection linked to the home entertainment center.</p></li>
                        <li className="stars"><p>All VillaHotels also feature flat screen TVs in large viewing rooms or home theatres; Dolby 5.1 home theater systems; and state-of-the-art security systems.</p></li>
                    </ul>

                    <Heading4 value="How do I reserve a VillaHotel?" />
                    <ul>
                        <li className="stars"><p>Call +1 305 777-0146 (1-877-VILLAZZO) or email <a href="mailto:villas@villazzo.com?Subject=Website%20Inquiry">villas@villazzo.com</a>. Or book through any one of our many authorized agents.</p></li>
                        <li className="stars"><p>No cash payment accepted, credit card fees are non-refundable.</p></li>
                        <li className="stars"><p>Applicable local VAT taxes will be assessed based on location of villa destination (Miami 13%, St Tropez 10%, Aspen 11.5%).</p></li>
                        <li className="stars"><p>Cancellation of a booking may result in the partial loss of payments.</p></li>
                        <li className="stars"><p>A security/damage deposit will be collected with the last portion of the payment.</p></li>
                    </ul>
                </div>
            </div>
        );
    }
});

var HtbDescritionContent = React.createClass({
    render:function(){
        return (
            <div className="row">
                <div className="medium-8 medium-centered columns text-center">
                    <Heading4 value="BOOK ONLINE" className="text-gold" />
                    <Image1 src={bookComputerImage} />
                    <p>Visit our <a href="/reservations/">Reservation</a> page on the website.<br /><br /></p>
                    <Heading4 value="BOOK BY PHONE" className="text-gold" />
                    <Image1 src={bookPhoneImage} />
                    <p>Call us at +1 (305) 777 0146 <br />
                        (from within the US also 1-877-VILLAZZO)<br /><br /></p>
                    <Heading4 value="BOOK BY EMAIL" className="text-gold" />
                    <Image1 src={bookEmailImage} />
                    <p>Email us at <a href="mailto:villas@villazzo.com">villas@villazzo.com</a><br />
                        Our sales team is standing by to answer your inquiries, which may include: <br />
                        • Which property suits your party <br />
                        • Special rates <br />
                        • Number of guests <br />
                        • Any special requirements you might have.<br /><br /></p>
                    <Heading4 value="RESERVATION FORM" className="text-gold" />
                    <p>Once you have selected your property, download our <a href={"/pdf/"+this.props.siteid+"/guest-registration-form.pdf"} target="_blank">Reservation Form</a>, read it carefully, sign it, and fax it to us at +1 (305) 777 0147. <br />
                        The signed Reservation Form should be sent together with: <br />
                        • A copy of your passport or national ID <br />
                        • A copy of your credit card (showing both sides) </p>
                    <p>A 25 percent deposit will be required if you’re booking more than eight weeks before arrival. Full payment is required if booking within eight weeks of arrival.<br /><br /></p>
                    <Heading4 value="CONFIRMATION" className="text-gold" />
                    <p>Upon receipt of the signed contract, copies of your ID and credit card, and the necessary payment, we will issue a confirmation invoice. Check the invoice and inform us within 10 days of receipt should any change need to be made.<br /><br /></p>
                    <Heading4 value="PAYMENT" className="text-gold" />
                    <p>Payment before check-in is accepted by bank check, bank transfer (net of charges) or credit card. We accept Visa, MasterCard, and American Express. All credit card payments incur a surcharge of 3 percent. Make cheques payable to Villazzo. Payment for incidental charges after check-out is accepted by credit card only. </p>
                </div>
            </div>
        );
    }
});


var TestimonialDescritionContent = React.createClass({
    render:function(){
        return(
            <div className="row">
                <div className="large-centered columns text-center testimonials">
                    <h4><strong>Villazzo offers the most exclusive, private, and one-of-a-kind vacation experiences for the world's more famous, successful, and high-profile clientele.</strong></h4>                    <p>&nbsp;</p>
                    <p>Satisfied Villazzo Clients include:</p>
                    <p>Queen Latifah</p>
                    <p>Beyonce,</p>
                    <p>Jay-Z,</p>
                    <p>Ernesto Bertarelli,</p>
                    <p>Madonna,</p>
                    <p>Wiz Khalifa (Rapper)</p>
                    <p>Esquire Magazine</p>
                    <p>Chris Samba (Pro Soccer player)</p>
                    <p>Al-Saud family (Royal Family of Saudi-Arabia),</p>
                    <p>Oscar-winner Jamie Foxx,</p>
                    <p>Cisneros family,</p>
                    <p>Manchester United Soccer Player Cristiano Ronaldo,</p>
                    <p>Mittal family,</p>
                    <p>MLB top player Derek Jeter from the New York Yankees,</p>
                    <p>NFL top player Jamal Lewis from the Baltimore Ravens,</p>
                    <p>World Cycling Champion Mario Cipollini,</p>
                    <p>Family of the president of the Republic of the Congo,</p>
                    <p>successful entrepreneurs</p>
                    <p>... and many more.</p>
                    <p>&nbsp;</p>
                    <p>"Thanks Imane - everyone had a wonderful time&hellip;.<br />Thanks for everything - look forward to working with you again."</p><hr />
                    <p>"Our stay was wonderful as usual.<br /> Thank you for asking."</p><hr />
                    <p>"I'm very happy to see all of this <br />communication Sonia. I appreciate your level of professionalism and your company offers a top-notch service!"</p><hr />
                    <p>"We really enjoyed our stay at villa helena and the perfect weather of miami.<br /> All the facilities were great, including the pool which was clean and beautiful.<br /> With the gorgeous interiors inside the villa, we could stay comfortable and pleasurable.<br /> I hope there's no problem after your property check."</p><hr />
                    <p>"Everything was first class. I don't really have any  constructive feedback :)<br />I'll reach it to you in a few days to discuss Saint  Tropez."</p><hr />
                    <p>"All was super at the villa. Hanna was great and Paul took wonderful care of us. <br />Will hopefully try your VillaHotels in St Tropez soon!"</p><hr />
                    <p>"Everything was fantastic. As we are used to at Villazzo. We'll come back again later this year."</p><hr />
                    <p>"The Villazzo chef was the best I have ever had in a vacation home.<br /> Thank you for all you did to make our stay so warm, comfortable, and happy!"</p><hr />
                    <p>"I don't have words to express my gratitude.  Everything was beyond my wildest expectations! <br />Thank you again for all of your help, suggestions, attention to detail....you truly made our experience unforgettable.<br />Your kindness was above and beyond anything that I have ever experienced."</p><hr />
                    <p>"The organization is second to none...<br /> I wished all the staff could go back with me to England.<br /> Perfection has a name "Villazzo"."</p><hr />
                    <p>"I was personally very pleased with the experience.<br /> I thought the service and physical asset were both great... <br /> Everything was perfect."</p><hr />
                    <p>"Everything was really great. The villa was spotless...<br /> the staff was very competent and professional.<br /> I would definitely do this again. Thanks to all the Villazzo staff."</p><hr />
                    <p>"Everything was great. The staff was excellent and very helpful.<br /> The house was also excellent and we enjoyed ourselves very much.<br /> We look forward to staying in Villazzo homes again in the near future."</p><hr />
                    <p>"My Sunset Island residence has been listed with Villazzo for over a year.<br /> I am extremely happy with every aspect of Villazzo <br /> from the way my home is managed, marketed and most importantly,<br /> the quality of guests my home is rented to. <br /> As far as I'm concerned Villazzo has a very big future and<br /> can become a brand as well known as Four Seasons that caters to luxury homes."</p><hr />
                    <p>"I would like to thank for this fantastic vacation.<br /> I have very much appreciated your services.<br /> I can ensure you, that I will actively recommend Villazzo to everybody I know."</p><hr />
                    <p>"The hotel service in the villa worked to a very high standard. <br /> The greeting when we arrived and the unpacking service was <br /> what one dreams of at the start of a holiday. <br /> Newspapers every morning, fruit and flowers, <br /> beautiful quality towels and dressing gowns, <br /> a phone button to press for a free concierge service, <br /> someone arriving within minutes if there was a problem <br /> - these were all unique and highly valued."</p><hr />
                    <p>"Our experience was wonderful and Villazzo did a great job."</p><hr />
                    <p>"I just wanted to thank you all for the wonderful assistance I received in preparation<br /> for the family dinner held at VillaHotel Gabrielle. We were extremely pleased.<br /> Everything ran very smoothly, was beautifully displayed and the food was wonderful.<br /> I appreciate all your hard work and I thank you all for<br /> putting up with all the calls and &ldquo;rush requests&rdquo;."</p><hr />
                    <p>"You are an amazing help!!!<br /> I can not believe everything you are doing!!!<br /> Thank you soooooooooooooooo very much!!"</p><hr />
                    <p>"I have spent a wonderful week in VillaHotel Village.<br /> I will definitely come back next year. Thanks a lot."</p>
                </div>
            </div>
        );
    }
});