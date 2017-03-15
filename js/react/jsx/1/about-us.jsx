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
                        <p>Allow me to share with you Villazzo's vision &ndash; and why I started <VillLink />. After selling my Internet company back in the "dot com" boom, I decided to follow my passion for luxury travel.</p>
                        <p>While vacationing in very expensive villa rentals, I recognized that there was a missing "management" element in the luxury villa sector: Whereas in the hotel world, the chain is "building owner &ndash; hotel operator &ndash; agent &ndash; guest," in the villa world, the chain is only "villa owner &ndash; agent &ndash; guest". The "operator" is conspicuously absent.</p>
                        <p>Realtors or "villa agents" are paid to "close the deal". They have hundreds of villas in their portfolio, most of which they have never seen from the inside. They are neither paid nor prepared to create a luxury vacation experience. They have no hotel experience or training; no dedicated operations staff; nor any of the myriad of products you need to create a five star experience.</p>
                        <p>In the traditional villa rental world, once you have booked, the follow-up disappears. At best you'll get some "concierge" service by the realtor himself &ndash; who has no time at all between all the bookings he/she is handling. So you'll find yourself arriving in a dirty house, with an empty fridge, and a home theater that nobody knows to operate. The villa housekeeper is only available at certain hours, doesn't speak English, and has an attitude. If you want to dine at home and haven't brought your own chef, you'll have to cook yourself.</p>
                        <p>In short, there was no reliable "brand name" company out there that I could count on to pre-qualify and manage rental properties as being truly 5-star, and at the same time offer consistent hospitality services for my stay.</p>
                        <p>That is precisely why I created <VillLink />.</p>
                        <p><VillLink /> is a "five star hotel operator" for private luxury residences.</p>
                        <p><VillLink /> picks the top 10 rental residences in destinations where we have a local office; where we have our own stock of linen and hotel products, and a "Hotel Manager" with his staff; all of which are essential for providing our unmatched 5-star service. In our "VillaHotels" you will be welcomed to your new home by the local manager and your full personal staff with welcome Champagne and hors-d'oeuvres. You will have everything set up for you like in a 5-star hotel: The bathrobes, the luxury bath products, fine linen, fruit baskets, liquor bar, mini bars, snacks, an exclusive wine selection, cigars, an in-villa gift shop, a "business center" with laptop and fax. It's all there waiting for you already. And you don't even have to think about it before.</p>
                        <p>Join us and experience first hand what a <VillLink /> VillaHotel is all about. I promise you will not be disappointed.</p>
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
                                              <p align="justify"><br/>


                                                  Our signature 5-Star VillaHotel Experience includes a lifestyle organized by your own private Hotel Manager and his expert team of hand-picked and uniformed staff whom we train in-house to pamper you. Your personal in-villa butler/concierge, private chef, on-call Villazzo limousine service are all included.
                                              </p></td>
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
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Expertly trained Butler to create a bespoke experience</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Personal welcome at check-in with Villazzo President</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Professional Hotel Director with local expertise</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Prompt and responsive Villa Technician on standby</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Pre-arrival equipment check, property maintenance and emergency repairs</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Daily Breakfast & Newspaper service.</p></li>
                                              </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/07-Housekeeping.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>COURTEOUS AND EFFICIENT HOUSEKEEPING</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Discreet and reliable daily housekeeping by uniformed and trained Villazzo Housekeeping Team</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Daily linen change</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Nightly turndown service.</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Concierge-02.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR OWN PERSONAL BUTLER TO PAMPER YOU</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Dedicated full-time in-villa butler and On-Site Property Manager</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Bespoke personal shopping service</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Dining recommendations and reservations</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Daily newspaper service</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Breakfast service</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Cocktail service</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Master-Bedroom-Villazzo-Setup.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>THE ULTIMATE BEDROOM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Luxurious bedding with 600 thread count FRETTE linens and plush mattress pads</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Non-allergenic pillow assortment </p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>VOSS water bottles</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Villazzo  porcelain tissue boxes</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>GODIVA bedside chocolate treats</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Contenta-Bathroom-Villazzo-Setup.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR BATHROOM, A SANCTUARY OF CALM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>BVLGARI bath and body products elegantly displayed on Villazzo Porcelain Collection</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Professional Hair Dryers</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Plush Villazzo embroidered FRETTE bath set including bath towel, hand towel, wash cloth, bath mat</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Plush Villazzo embroidered FRETTE bathrobe and slippers</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Fresh white rose arrangement</p></li>
                                               </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/03-Closet.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>CLOSET RETREAT</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Amenities such as wooden Villazzo hangers and shoe horns</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Garment pressing and laundering</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Shoe polishing</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>High quality ELSAFE in-room safe</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/01-Chef.jpg" alt="" className="service-img" /></td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>FINE WINE &amp; DINING</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Arrive to a pre-stocked fridge</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Fresh Fruit Baskets</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Fresh Flower arrangements</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Mini Bars throughout the villa</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Temperature Controlled Wine Storage & Selection</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Cigar Humidor with finest Havana cigars</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Convenient Room Service</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/Contenta-Kitchen-Villazzo-Setup.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>COFFEE &amp; TEA</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Villazzo Loose Leaf Tea Selection with Kettle</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Villazzo Nespresso Coffee Station complete with Villazzo sugars</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/05-Concierge.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>OUTDOOR  OASIS</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Gift shop with must-have essentials such as Aspirin, Sunscreen, Mosquito repellent…</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Thick cotton pool towels</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Refreshing Evian mineral water spray</p></li>
                                              </ul>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/06-Office.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>YOUR OFFICE AWAY FROM HOME</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Free high speed wi-fi and access iPad, printer</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Complete Stationery set with letterhead</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Convenient Villazzo VillaHotel one-touch phone with direct link to Villazzo Operations</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Villazzo DVD selection</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Quick Start Guides for all technical equipment</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>In-villa Newspaper & Magazine selection.</p></li>
                                              </ul></td>
                                      </tr>
                                      <tr>
                                          <td style={{verticalAlign:'top',textAlign:"center"}}><img src="/img/about/services/kids-program.jpg" alt="" className="service-img" />
                                          </td>
                                          <td style={{verticalAlign:'top'}}>
                                              <strong>TAILOR-MADE KIDS PROGRAM</strong><br /><br />
                                              <ul>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Full range of bath products for children and babies</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Slumber party set up with play tent, flashlight + Villazzo lantern</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Villazzo Stuffed animal Teddy Bear for our little guests</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Kids Sized Slippers and Bathrobes</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Party Celebration (full service with entertainers, inflatable toys, food, beverage)</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Nightly turndown service (cookies and milk)</p></li>
                                                  <li className="stars"><p style={{margin:'0', padding:'0'}}>Family Fun Cooking Class with Chef</p></li>
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
})

