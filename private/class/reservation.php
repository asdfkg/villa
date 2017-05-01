<?php
// setting class
class Reservation
{
	var $step;
	var $propertyId;
	var $propertyName;
	var $propertyLocation;
	var $propertyBedrooms;
	var $additionalServices;
	var $additionalServicesTags;
	var $propertyMaxPeople;
	
	var $bedroomMin;
	var $bedroomMax;
	var $budgetMin;
	var $budgetMax;
	
	var $destIdArray;
	var $destName;
	var $destTax;
        var $cleaning;
        var $additionalPerStay; 
	var $destCurrency;
	
	var $serviceLevel;
	var $checkInDt;
	var $checkOutDt;
	var $nightTotal;
	
	var $rateNight;
	var $rateTotal;
	var $rateDiscount;
	var $rateCounterOffer;
	var $reservationId;
	var $firstName;
	var $lastName;
	var $email;
	var $phone;
        
	public function set($variable, $value)
	{
		$this->$variable = $value;
	}
	
	public function get($variable)
	{
		return $this->$variable;
	}
	public function checkPropertyAvailability($checkInDt,$checkOutDt,$propertyId){
            $query = 'select reservationEndDt from reservationProperty WHERE ((STR_TO_DATE(\''.$checkInDt.'\', \'%Y-%m-%d\') between reservationStartDt AND reservationEndDt) 
			OR (STR_TO_DATE(\''.$checkOutDt.'\', \'%Y-%m-%d\') between reservationStartDt AND reservationEndDt) 
			OR (reservationStartDt >= STR_TO_DATE(\''.$checkInDt.'\', \'%Y-%m-%d\') AND reservationEndDt <= STR_TO_DATE(\''.$checkOutDt.'\', \'%Y-%m-%d\')) 
		) AND reservationStatusId != 4 AND propertyId = '.$propertyId.' LIMIT 1';
            $rs_query = $_SESSION['DB']->querySelect($query,array());
            $result = $_SESSION['DB']->queryResult($rs_query);
            return empty($result)?true:false;
        }
	public function getProperty($destName = '', $checkInDt = '', $checkOutDt = '', $bedMin = 0, $bedMax = 0, $budgetMin = 0, $budgetMax = 0, $propertyId = 0, $keyword = '', $amenities = '', $propertyActive = 0, $servicesTotal = 0,$destinationPage=0)
	{
		$propertyArray = array();
		$sortByWhere = NULL;
		$sortByLeftJoin = NULL;
		
		$totalNights = NULL;
		
		if ($destName)
		{
			if ($sortByWhere != '') $sortByWhere .= ' AND';
			$sortByWhere .= ' destName = \''.$destName.'\'';
		}
		
		if ($checkInDt && $checkOutDt)
		{
			$totalNights = ceil((strtotime($checkOutDt) - strtotime($checkInDt)) / 86400);
			$checkInDt = date('Y-m-d', strtotime($checkInDt));
			$checkOutDt = date('Y-m-d', strtotime($checkOutDt));
	
			if ($totalNights < 7) { $propertyRateDbField = 'rateOwnerShort'; $multiplierField = 'short'; }
			else if ($totalNights >= 7 && $totalNights < 30) { $propertyRateDbField = 'rateOwnerTypical'; $multiplierField = 'typical'; }
			else if ($totalNights >= 30) { $propertyRateDbField = 'rateOwnerLong'; $multiplierField = 'long'; }
		}
		
		if ($propertyId)
		{
			if ($sortByWhere != '') $sortByWhere .= ' AND';
			$sortByWhere .= ' property.propertyId = '.$propertyId;
		}
		
		if ($bedMin && $bedMax)
		{		
			if ($sortByWhere != '') $sortByWhere .= ' AND';
			$sortByWhere .= ' (SELECT COUNT(*) FROM propertyBedroom WHERE propertyBedroom.propertyId = property.propertyId) >= '.$bedMin;
			
			if ($bedMax < 8)
			{
				if ($sortByWhere != '') $sortByWhere .= ' AND';
				$sortByWhere .= ' (SELECT COUNT(*) FROM propertyBedroom WHERE propertyBedroom.propertyId = property.propertyId) <= '.$bedMax;
			}
		}
		
		if ($keyword)
		{
			$keywordArray = explode('-', $keyword);
			
			foreach($keywordArray as $keyword)
			{
				if ($sortByWhere != '') $sortByWhere .= ' AND';
				$sortByWhere .= ' property.propertyId IN (SELECT propertyId FROM property WHERE '.(($destName)?'destName = \''.$destName.'\' AND':'').' (propertyDescTitle LIKE \'%'.$keyword.'%\' OR propertyDescLong LIKE \'%'.$keyword.'%\' OR propertyBedrDesc LIKE \'%'.$keyword.'%\' OR propertyLocationName LIKE \'%'.$keyword.'%\') OR property.propertyId IN (SELECT propertyId FROM propertyFeature LEFT JOIN feature ON feature.featureId = propertyFeature.featureId WHERE propertyActive = 1'.(($destName)?' AND destName = \''.$destName.'\'':'').' AND featureName LIKE \'%'.$keyword.'%\'))';
			}
		}
		
		if ($amenities)
		{
			$amenitiesArray = explode(',', $amenities);
			foreach ($amenitiesArray as $featureId)
			{
				if ($sortByWhere != '') $sortByWhere .= ' AND';
				$sortByWhere .= ' property.propertyId IN (SELECT propertyId FROM propertyFeature WHERE featureId = '.$featureId.' AND propFeatActive = 1)';
			}
		}
			
		if ($_SESSION['USER']->getUserGroupId() == 3)
		{
			$sortByLeftJoin .= ' LEFT JOIN propertyOwner ON propertyOwner.propertyId = property.propertyId';
			
			if ($sortByWhere != '') $sortByWhere .= ' AND';
			$sortByWhere .= ' propertyOwner.userId = '.$_SESSION['USER']->getUserId();
		}
		
		if ($sortByWhere != '') $sortByWhere .= ' AND';
        $sortByWhere .= ' property.site in ("3","'.SITE_ID.'")';
                        
		$query = 'SELECT *, property.propertyId AS myPropertyId, (select reservationEndDt from reservationProperty WHERE
		(
			(STR_TO_DATE(\''.$checkInDt.'\', \'%Y-%m-%d\') between reservationStartDt AND reservationEndDt) 
			OR 
			(STR_TO_DATE(\''.$checkOutDt.'\', \'%Y-%m-%d\') between reservationStartDt AND reservationEndDt) 
			OR 
			(reservationStartDt >= STR_TO_DATE(\''.$checkInDt.'\', \'%Y-%m-%d\') AND reservationEndDt <= STR_TO_DATE(\''.$checkOutDt.'\', \'%Y-%m-%d\')) 
		) AND reservationStatusId != 4 AND propertyId = property.propertyId LIMIT 1) AS reservationEndDt';
                
                $groupBy = '';
                if($destinationPage){
                    $sortByLeftJoin .= " Left Join propertyRate on propertyRate.propertyId = property.propertyId ";
                    $groupBy .= " group by property.propertyId ";
                    $query.= ' ,min((rateOwnerShortRent + rateOwnerShortReserve) / 1/ (1 - rateOwnerShortCom/100)) shortRate,
                                min((rateOwnerTypicalRent + rateOwnerTypicalReserve) / 7/ (1 - rateOwnerTypicalCom/100)) typicalRate,
                                min((rateOwnerLongRent + rateOwnerLongReserve) / 30/ (1 - rateOwnerLongCom/100)) longRate ';
                }
		
                
		$query .= ' FROM property LEFT JOIN destination ON destination.destId = property.destId'.$sortByLeftJoin.($sortByWhere?' WHERE'.$sortByWhere:'').' '.($propertyActive?($sortByWhere?'AND':'WHERE').' propertyActive = 1':'').' '.$groupBy.' ORDER BY propertyValue DESC';
		$rs_query = $_SESSION['DB']->querySelect($query);
		$row_rs_query = $_SESSION['DB']->queryResult($rs_query);
		$totalRows_rs_query = $_SESSION['DB']->queryCount($rs_query);
		
		if ($totalRows_rs_query)
		{
			do
			{
				$status = 1;
				$destId = $row_rs_query['destId'];
				$destName = str_replace(" ", "-", strtolower($row_rs_query['destName']));
				$propertyName = str_replace(" ", "-", strtolower($row_rs_query['propertyName']));
				$propertyTypeId = 1;
				
				$rs_propertyType = $_SESSION['DB']->querySelect('SELECT propertyTypeName, propertyTypeUrl FROM propertyType WHERE propertyTypeId = ?', array($propertyTypeId));
				$row_rs_propertyType = $_SESSION['DB']->queryResult($rs_propertyType);
				$totalRows_rs_propertyType = $_SESSION['DB']->queryCount($rs_propertyType);
				$propertyTypeName = $row_rs_propertyType['propertyTypeName'];
				
				$propertyId = $row_rs_query['myPropertyId'];
				$propertyTitle = $row_rs_query['propertyDescTitle'];
				$propertyDescShort = $row_rs_query['propertyDescShort'];
				$propertyDescLong = $row_rs_query['propertyDescLong'];
				$propertyMaxPeople = $row_rs_query['propertyMaxPeople'];
				$propertyAreaSq = $row_rs_query['propertyAreaSq'];
				$propertyAreaMt = $row_rs_query['propertyAreaMt'];
				$propertyInteriorSq = $row_rs_query['propertyIntSq'];
				$propertyInteriorMt = $row_rs_query['propertyIntMt'];
				$propertyYearBuilt = $row_rs_query['propertyYearBuilt'];
				$propertyYearRemodeled = $row_rs_query['propertyYearRemodeled'];
				$propertyValue = $row_rs_query['propertyValue'];
				$propertyLocLat = $row_rs_query['propertyMapLat'];
				$propertyLocLong = $row_rs_query['propertyMapLong'];
				$propertyLocation = $row_rs_query['propertyLocationName'];
                                $bookable = $row_rs_query['bookable'];
				$minBookDays = $row_rs_query['minBookDays'];
				/*
                                 * TODO - CS Remove
                                 * We have updated field for calculating taxes
                                 * $destTax = $row_rs_query['destTaxVillaHotel'];
                                 */
                                $destTax = (SITE_ID==1?$row_rs_query['destTaxVillaHotel']:$row_rs_query['destTaxVVilla']);
				$propertyAlreadyBookedDt = $row_rs_query['reservationEndDt'];
                                $cleaning = $row_rs_query['cleaning'];
                                $additionalPerStay = $row_rs_query['additional_perstay']; 
					
				$fullImage = '/img/destination/destination-'.str_replace('-', '_', strtolower($destName)).'_'.str_replace('-', '_', str_replace(' ', '_', strtolower($propertyName))).'.png';
				
				$propertyGalleryShowAll = $row_rs_query['propertyGalleryShowAll'];
				
				// number of bedrooms
				$rs_propertyBedrooms = $_SESSION['DB']->querySelect('SELECT propBedrId FROM propertyBedroom WHERE propertyId = ?', array($propertyId));
				$row_rs_propertyBedrooms = $_SESSION['DB']->queryResult($rs_propertyBedrooms);
				$totalBedrooms = $_SESSION['DB']->queryCount($rs_propertyBedrooms);
				
				// number of bathrooms
				$rs_propertyBathrooms = $_SESSION['DB']->querySelect('SELECT propBathId FROM propertyBathroom WHERE propertyId = ?', array($propertyId));
				$row_propertyBathrooms = $_SESSION['DB']->queryResult($rs_propertyBathrooms);
				$totalBathrooms = $_SESSION['DB']->queryCount($rs_propertyBathrooms);
				
				$propertyRateMinMaxArray = array();
				$propertyRateNightArray = array();
		
				// min & max rates
				$query = '
				SELECT 
				MIN(rateOwnerLongRent) AS rateOwnerRentMin, 
				MAX(rateOwnerShortRent) AS rateOwnerRentMax, 
				MIN(rateOwnerLongCom) AS rateOwnerComMin, 
				MAX(rateOwnerShortCom) AS rateOwnerComMax, 
				MIN(rateOwnerLongReserve) AS rateOwnerReserveMin, 
				MAX(rateOwnerShortReserve) AS rateOwnerReserveMax, 
				rateCurrency 
				FROM propertyRate WHERE propertyId = '.$propertyId.' LIMIT 1';
					
				$rs_property_rate = $_SESSION['DB']->querySelect($query);
				$row_rs_property_rate = $_SESSION['DB']->queryResult($rs_property_rate);
				
				$propertyRateMinMaxArray['owner_rent_min'] = $row_rs_property_rate['rateOwnerRentMin'];
				$propertyRateMinMaxArray['owner_rent_max'] = $row_rs_property_rate['rateOwnerRentMax'];
				$propertyRateMinMaxArray['owner_com_min'] = $row_rs_property_rate['rateOwnerComMin'];
				$propertyRateMinMaxArray['owner_com_max'] = $row_rs_property_rate['rateOwnerComMax'];
				$propertyRateMinMaxArray['owner_reserve_min'] = $row_rs_property_rate['rateOwnerReserveMin'];
				$propertyRateMinMaxArray['owner_reserve_max'] = $row_rs_property_rate['rateOwnerReserveMax'];
				$propertyRateMinMaxArray['currency'] = $row_rs_property_rate['rateCurrency'];
				
				// nightly rate
				if ($totalNights)
				{
					for ($i = 0; $i < $totalNights; $i ++)
					{				
						$query = "SELECT ".$propertyRateDbField."Rent AS ownerRent, ".$propertyRateDbField."Com AS ownerCom, ".$propertyRateDbField."Reserve AS ownerReserve, rateCurrency FROM property left join 
						(
							SELECT * FROM propertyRate WHERE STR_TO_DATE(ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) 
							BETWEEN 
							(
								IF
								( STR_TO_DATE( CONCAT( rateStartDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' ) > STR_TO_DATE( CONCAT( rateEndDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								
								AND
								STR_TO_DATE(ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) >= STR_TO_DATE( CONCAT( '01/01',  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								AND
								STR_TO_DATE(ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) <= STR_TO_DATE( CONCAT( rateEndDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								
								, STR_TO_DATE( CONCAT( rateStartDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) -1 ) ,  '%m/%d/%Y' ) 
								, STR_TO_DATE( CONCAT( rateStartDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' ) 
								)
							)
							AND 
							( 
								IF
								( STR_TO_DATE( CONCAT( rateStartDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' ) > STR_TO_DATE( CONCAT( rateEndDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								
								AND
								STR_TO_DATE(ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) >= STR_TO_DATE( CONCAT( rateStartDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								AND
								STR_TO_DATE(ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) <= STR_TO_DATE( CONCAT( '12/31',  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' )
								
								, STR_TO_DATE( CONCAT( rateEndDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) +1 ) ,  '%m/%d/%Y' ) 
								, STR_TO_DATE( CONCAT( rateEndDt,  '/', YEAR( str_to_date( ADDDATE( '".$checkInDt."', INTERVAL ".$i." DAY), '%Y-%m-%d' ) ) ) ,  '%m/%d/%Y' ) 
								)
							)
						) 
						as a on a.propertyId = property.propertyId WHERE property.propertyId = ".$propertyId;
						
						$rs_property_rate = $_SESSION['DB']->querySelect($query);
						$row_rs_property_rate = $_SESSION['DB']->queryResult($rs_property_rate);
						
						$propertyRateNightArray[] = array('owner_rent' => $row_rs_property_rate['ownerRent'], 'owner_com' => $row_rs_property_rate['ownerCom'], 'owner_reserve' => $row_rs_property_rate['ownerReserve'], 'currency' => $row_rs_property_rate['rateCurrency']);
					}
				}
							
				// apply rate calculations
				$currency = NULL;
				
				$ownerRent = 0;
				$ownerCom = 0;
				$ownerReserve = 0;
				
				$villaOnlyRateMin = 0;
				$villaOnlyRateMax = 0;
				$villaOnlyRateNight = 0;
				$villaOnlyRateArray = 0;
				
				$villaThreeStarRateMin = 0;
				$villaThreeStarRateMax = 0;
				$villaThreeStarRateNight = 0;
				$villaThreeStarRateArray = 0;
				
				$villaFourStarRateMin = 0;
				$villaFourStarRateMax = 0;
				$villaFourStarRateNight = 0;
				$villaFourStarRateArray = 0;
				
				$villaFiveStarRateMin = 0;
				$villaFiveStarRateMax = 0;
				$villaFiveStarRateNight = 0;
				$villaFiveStarRateBaseNight = 0;
				$villaFiveStarRateArray = 0;
				
				$threeStarVillaHotelManagement = 11;
				$fourStarVillaHotelManagement = 18;
				$fiveStarVillaHotelManagement = 18;
				
				// min & max rates
				if (!empty($propertyRateMinMaxArray))
				{
					$ownerRentMin = $propertyRateMinMaxArray['owner_rent_min'];
					$ownerRentMax = $propertyRateMinMaxArray['owner_rent_max'];
					$ownerComMin = $propertyRateMinMaxArray['owner_com_min'] / 100;
					$ownerComMax = $propertyRateMinMaxArray['owner_com_max'] / 100;
					$ownerReserveMin = $propertyRateMinMaxArray['owner_reserve_min'];
					$ownerReserveMax = $propertyRateMinMaxArray['owner_reserve_max'];
					$currency = $propertyRateMinMaxArray['currency'];
					
					if ($ownerRentMin && $ownerRentMax && $ownerComMin && $ownerComMax)
					{
						$villaOnlyRateMinArray = $this->serviceRate(0, $ownerRentMin, $ownerComMin, $ownerReserveMin, $totalBedrooms, 'long', 1, $servicesTotal);
						$villaOnlyRateMin = $this->formatRate($villaOnlyRateMinArray['rate']);
						$villaOnlyRateMaxArray = $this->serviceRate(0, $ownerRentMax, $ownerComMax, $ownerReserveMax, $totalBedrooms, 'short', 1, $servicesTotal);
						$villaOnlyRateMax = $this->formatRate($villaOnlyRateMaxArray['rate']);
						
						$villaThreeStarRateMinArray = $this->serviceRate(3, $ownerRentMin, $ownerComMin, $ownerReserveMin, $totalBedrooms, 'long', 1, $servicesTotal);
						$villaThreeStarRateMin = $this->formatRate($villaThreeStarRateMinArray['rate']);
						$villaThreeStarRateMaxArray = $this->serviceRate(3, $ownerRentMax, $ownerComMax, $ownerReserveMax, $totalBedrooms, 'short', 1, $servicesTotal);
						$villaThreeStarRateMax = $this->formatRate($villaThreeStarRateMaxArray['rate']);
						
						$villaFourStarRateMinArray = $this->serviceRate(4, $ownerRentMin, $ownerComMin, $ownerReserveMin, $totalBedrooms, 'long', 1, $servicesTotal);
						$villaFourStarRateMin = $this->formatRate($villaFourStarRateMinArray['rate']);
						$villaFourStarRateMaxArray = $this->serviceRate(4, $ownerRentMax, $ownerComMax, $ownerReserveMax, $totalBedrooms, 'short', 1, $servicesTotal);
						$villaFourStarRateMax = $this->formatRate($villaFourStarRateMaxArray['rate']);
						
						$villaFiveStarRateMinArray = $this->serviceRate(5, $ownerRentMin, $ownerComMin, $ownerReserveMin, $totalBedrooms, 'long', 1, $servicesTotal);
						$villaFiveStarRateMin = $this->formatRate($villaFiveStarRateMinArray['rate']);
						$villaFiveStarRateMaxArray = $this->serviceRate(5, $ownerRentMax, $ownerComMax, $ownerReserveMax, $totalBedrooms, 'short', 1, $servicesTotal);
						$villaFiveStarRateMax = $this->formatRate($villaFiveStarRateMaxArray['rate']);
					}
				}
				
				// nightly rate
				if (!empty($propertyRateNightArray))
				{
					foreach ($propertyRateNightArray as $propertyRate)
					{
						$ownerRent += $propertyRate['owner_rent'];
						$ownerCom += $propertyRate['owner_com'] / 100;
						$ownerReserve += $propertyRate['owner_reserve'];
						$currency = $propertyRate['currency'];
					}
					
					$ownerCom = $ownerCom / count($propertyRateNightArray);
					
					if ($ownerRent && $ownerCom)
					{
						$villaOnlyRateArray = $this->serviceRate(0, $ownerRent, $ownerCom, $ownerReserve, $totalBedrooms, $multiplierField, $totalNights, $servicesTotal);
						$villaThreeStarRateArray = $this->serviceRate(3, $ownerRent, $ownerCom, $ownerReserve, $totalBedrooms, $multiplierField, $totalNights, $servicesTotal);
						$villaFourStarRateArray = $this->serviceRate(4, $ownerRent, $ownerCom, $ownerReserve, $totalBedrooms, $multiplierField, $totalNights, $servicesTotal);
						$villaFiveStarRateArray = $this->serviceRate(5, $ownerRent, $ownerCom, $ownerReserve, $totalBedrooms, $multiplierField, $totalNights, $servicesTotal);
						
						$villaOnlyRateNight = $villaOnlyRateArray['rate'];
						$villaThreeStarRateNight = $villaThreeStarRateArray['rate'];
						$villaFourStarRateNight = $villaFourStarRateArray['rate'];
						
						$villaFiveStarRateBaseNight = $villaFiveStarRateArray['rate_base'];
						$villaFiveStarRateNight = $villaFiveStarRateArray['rate'];
						
						$villaOnlyRateTotal = $villaOnlyRateNight * $totalNights;
						$villaThreeStarRateTotal = $villaThreeStarRateNight * $totalNights;
						$villaFourStarRateTotal = $villaFourStarRateNight * $totalNights;
						$villaFiveStarRateTotal = $villaFiveStarRateNight * $totalNights;
					}
				}
				
				$servicesArray = array
				(
					'villa_only' => array
					(
						'villa_only' => array
						(
							'type' => 'base',
							'desc_short' => 'villa base rate',
							'desc_long' => 'villa base rate',
							'rate' => $villaOnlyRateNight
						)
					),
					'three_star' => array
					(
						'villa_only' => array
						(
							'type' => 'base',
							'desc_short' => 'villa base rate',
							'desc_long' => 'villa base rate',
							'rate' => $villaOnlyRateNight
						),
						'linen' => array
						(
							'type' => 'service',
							'desc_short' => 'Linen & Towel Service, Off-Site Professional Laundry',
							'desc_long' => 'Linen & Towel Service, Off-Site Professional Laundry<br />(139/villa + 39/bedroom)',
							'rate' => $villaThreeStarRateArray['linen_and_towel']
						),
						'product' => array
						(
							'type' => 'service',
							'desc_short' => 'VillaHotel Product Replenishment & Service',
							'desc_long' => 'VillaHotel Product Replenishment & Service<br />(149/villa + 49/bedroom)',
							'rate' => $villaThreeStarRateArray['service_and_product']
						),
						'housekeeping' => array
						(
							'type' => 'service',
							'desc_short' => 'Housekeeping',
							'desc_long' => 'Housekeeping ($29/bedroom)',
							'rate' => $villaThreeStarRateArray['housekeeping']
						),
						'management' => array
						(
							'type' => 'management',
							'desc_short' => 'VillaHotel Management & Supervision',
							'desc_long' => 'VillaHotel Management & Supervision ('.$threeStarVillaHotelManagement.'%)',
							'rate' => $villaThreeStarRateArray['management'],
							'percentage' => $threeStarVillaHotelManagement
						),
						'villa_preparation' => array
						(
							'type' => 'management',
							'desc_short' => 'VillaHotel Preparation',
							'desc_long' => 'VillaHotel Preparation',
							'rate' => $villaThreeStarRateArray['villa_preparation']
						),
						'checkout_cleaning' => array
						(
							'type' => 'management',
							'desc_short' => 'Check-out Cleaning Fee',
							'desc_long' => 'Check-out Cleaning Fee',
							'rate' => $villaThreeStarRateArray['checkout_cleaning']
						)
					),					
					'four_star' => array
					(
						'villa_only' => array
						(
							'type' => 'base',
							'desc_short' => 'villa base rate',
							'desc_long' => 'villa base rate',
							'rate' => $villaOnlyRateNight
						),
						'linen' => array
						(
							'type' => 'service',
							'desc_short' => 'Linen & Towel Service, Off-Site Professional Laundry',
							'desc_long' => 'Linen & Towel Service, Off-Site Professional Laundry<br />(139/villa + 39/bedroom)',
							'rate' => $villaFourStarRateArray['linen_and_towel']
						),
						'product' => array
						(
							'type' => 'service',
							'desc_short' => 'VillaHotel Product Replenishment & Service',
							'desc_long' => 'VillaHotel Product Replenishment & Service<br />(149/villa + 49/bedroom)',
							'rate' => $villaFourStarRateArray['service_and_product']
						),
						'housekeeping' => array
						(
							'type' => 'service',
							'desc_short' => 'Housekeeping',
							'desc_long' => 'Housekeeping ($29/bedroom)',
							'rate' => $villaFourStarRateArray['housekeeping']
						),
						'butler' => array
						(
							'type' => 'service',
							'desc_short' => 'Butler',
							'desc_long' => 'Butler (4 hrs x $49/hr)',
							'rate' => $villaFourStarRateArray['butler']
						),
						'management' => array
						(
							'type' => 'management',
							'desc_short' => 'VillaHotel Management & Supervision',
							'desc_long' => 'VillaHotel Management & Supervision ('.$fourStarVillaHotelManagement.'%)',
							'rate' => $villaFourStarRateArray['management'],
							'percentage' => $fourStarVillaHotelManagement
						)
					),
					'five_star' => array
					(
						'villa_only' => array
						(
							'type' => 'base',
							'desc_short' => 'villa base rate',
							'desc_long' => 'villa base rate',
							'rate' => $villaOnlyRateNight
						),
						'linen' => array
						(
							'type' => 'service',
							'desc_short' => 'Linen & Towel Service, Off-Site Professional Laundry',
							'desc_long' => 'Linen & Towel Service, Off-Site Professional Laundry<br />(139/villa + 39/bedroom)',
							'rate' => $villaFiveStarRateArray['linen_and_towel']
						),
						'product' => array
						(
							'type' => 'service',
							'desc_short' => 'VillaHotel Product Replenishment & Service',
							'desc_long' => 'VillaHotel Product Replenishment & Service<br />(149/villa + 49/bedroom)',
							'rate' => $villaFiveStarRateArray['service_and_product']
						),
						'housekeeping' => array
						(
							'type' => 'service',
							'desc_short' => 'Housekeeping',
							'desc_long' => 'Housekeeping ($29/bedroom)',
							'rate' => $villaFiveStarRateArray['housekeeping']
						),
						'butler' => array
						(
							'type' => 'service',
							'desc_short' => 'Butler',
							'desc_long' => 'Butler (8 hrs x $49/hr)',
							'rate' => $villaFiveStarRateArray['butler']
						),
						'chef' => array
						(
							'type' => 'service',
							'desc_short' => 'Chef',
							'desc_long' => 'Chef (8 hrs x $79/hr)',
							'rate' => $villaFiveStarRateArray['private_chef']
						),
						'driver' => array
						(
							'type' => 'service',
							'desc_short' => 'Private Driver',
							'desc_long' => 'Private Driver with Cadillac Escalade or Mercedes S-Class<br />(4 hrs)',
							'rate' => $villaFiveStarRateArray['private_driver']
						),
						'management' => array
						(
							'type' => 'management',
							'desc_short' => 'VillaHotel Management & Supervision',
							'desc_long' => 'VillaHotel Management & Supervision',
							'rate' => $villaFiveStarRateArray['management'],
							'percentage' => $fiveStarVillaHotelManagement
						),
						'checkout_cleaning' => array
						(
							'type' => 'management',
							'desc_short' => 'Check-out Cleaning Fee',
							'desc_long' => 'Check-out Cleaning Fee',
							'rate' => $villaFiveStarRateArray['checkout_cleaning']
						)
					)
				);
				
				if ($budgetMin >= 0 && $budgetMax)
				{
					if ($budgetMin && $villaThreeStarRateNight < $budgetMin) $status = 0;
					if ($budgetMax < 10000 && $villaThreeStarRateNight > $budgetMax) $status = 0;
				}
				
				if ($status) $propertyArray[] = array
				(
					'property_id' => $propertyId,
					'property_name' => $propertyName,
					'property_dest_id' => $destId,
					'property_type_id' => $propertyTypeId,
					'property_type_name' => $propertyTypeName,
					'property_bedrooms' => $totalBedrooms,
					'property_bathrooms' => $totalBathrooms,
					'property_location_name' => $propertyLocation,
					'property_location_lat' => $propertyLocLat,
					'property_location_long' => $propertyLocLong,
					'property_title' => $propertyTitle,
					'property_desc_short' => $propertyDescShort,
					'property_desc_long' => $propertyDescLong,
					'property_max_people' => $propertyMaxPeople,
					'property_area_sq' => $propertyAreaSq,
					'property_area_mt' => $propertyAreaMt,
					'property_interior_sq' => $propertyInteriorSq,
					'property_interior_mt' => $propertyInteriorMt,
					'property_year_built' => $propertyYearBuilt,
					'property_year_remodeled' => $propertyYearRemodeled,
					'property_value' => $propertyValue,
					'property_img' => $fullImage,
					'property_gallery_show_all' => $propertyGalleryShowAll,
					
					'dest_name' => $destName,
					'dest_tax' => $destTax,
                                        'cleaning'   => $cleaning,
                                        'additional_per_stay' => $additionalPerStay,
					'dest_currency' => $currency,
					'min_book_days' => $minBookDays,
					'bookable' => $bookable,
					'startingRate' => isset($row_rs_query['shortRate']) && isset($row_rs_query['typicalRate']) && isset($row_rs_query['longRate'])?
                                            min(round($row_rs_query['shortRate'],-1),round($row_rs_query['typicalRate'],-1),round($row_rs_query['longRate'],-1)):0,
					'service_levels' => array
					(
						'villa_only' => array
						(
							'name' => 'villa only',
							'level' => 0,
							'min' => $villaOnlyRateMin,
							'max' => $villaOnlyRateMax,
							'night' => $villaOnlyRateNight,
							'services' => $servicesArray['villa_only']
						),
						'three_star' => array
						(
							'name' => '3 star',
							'level' => 3,
							'min' => $villaThreeStarRateMin,
							'max' => $villaThreeStarRateMax,
							'night' => $villaThreeStarRateNight,
							'services' => $servicesArray['three_star']							
						),
						'four_star' => array
						(
							'name' => '4 star',
							'level' => 4,
							'min' => $villaFourStarRateMin,
							'max' => $villaFourStarRateMax,
							'night' => $villaFourStarRateNight,
							'services' => $servicesArray['four_star']
						),
						'five_star' => array
						(
							'name' => '5 star',
							'level' => 5,
							'min' => $villaFiveStarRateMin,
							'max' => $villaFiveStarRateMax,
							'base_night' => $villaFiveStarRateBaseNight,
							'night' => $villaFiveStarRateNight,
							'services' => $servicesArray['five_star']
						)
					),
					
					'check_in_dt' => $checkInDt,
					'check_out_dt' => $checkOutDt,
					'night_total' => $totalNights,
					
					'booked_till_dt' => ($checkInDt&&$checkOutDt?$propertyAlreadyBookedDt:null)
				);
							
			} while ($row_rs_query = $_SESSION['DB']->queryResult($rs_query));
		}
		
		return $propertyArray;
	}
	
	public function serviceRate($level, $ownerRent, $ownerCom, $ownerReserve, $totalBedrooms, $multiplierField, $totalNights = 1, $servicesTotal = 0)
	{
		$multiplierArray['typical']['3_star'] = 1;		// H25
		$multiplierArray['typical']['4_star'] = 4;		// H25
		$multiplierArray['typical']['5_star'] = 7;		// H25
		$multiplierArray['short']['3_star'] = 1;		// H25
		$multiplierArray['short']['4_star'] = 1;		// H25
		$multiplierArray['short']['5_star'] = 1;		// H25
		$multiplierArray['long']['3_star'] = 4;			// H25
		$multiplierArray['long']['4_star'] = 15;		// H25
		$multiplierArray['long']['5_star'] = 30;		// H25
		
		$threeStarVillaHotelManagement = 0.11;			// D4
		$fourStarVillaHotelManagement = 0.18; 			// D5
		$fiveStarVillaHotelManagement = 0.18; 			// D6
		
		$linenAndTowelBase = 139;						// C7
		$linenAndTowelPerBed = 39;						// D7
		$serviceAndProductBase = 149;					// C8
		$serviceAndProductPerBed = 49;					// D8
		
		$houseKeepingBase = 29;							// D9
		$butlerBase = 49;								// D10
		$privateChefBase = 499;							// D11
		$privateDriverBase = 349;						// D12
		
		$brim = 0;
		$baseRate = 0;
		$totalRate = 0;
		$managementRate = 0;
		
		$commissionVillaHotel = $_SESSION['USER']->getCommissionVillaHotel();
		if ($commissionVillaHotel > 10) $ownerCom = ($ownerCom * 100 + ($commissionVillaHotel - 10))/100;
		if(SITE_ID==1){
                    if ($totalNights >= 7 && $totalNights < 30) { $ownerRent = $ownerRent / 7; $ownerReserve = $ownerReserve / 7; }
                    else if ($totalNights >= 30) { $ownerRent = $ownerRent / 30; $ownerReserve = $ownerReserve / 30; }
                }
		// villa only
                $precision = SITE_ID==2?10:100;
		$villaOnlyRate = $this->formatRate((($ownerRent + $ownerReserve) / $multiplierArray[$multiplierField]['5_star'] / (1 - $ownerCom)) / $totalNights,$precision);
		
		// linen change
		$linenAndTowelTotal = $linenAndTowelBase + $totalBedrooms * $linenAndTowelPerBed;
		
		// service & product replacement
		$serviceAndProductTotal = $serviceAndProductBase + $totalBedrooms * $serviceAndProductPerBed;
		
		// housekeeping
		$houseKeepingTotal = $totalBedrooms * $houseKeepingBase;
		
		// butler service
		$butlerTotal = 0;
		if ($level == 4) $butlerTotal = (4 * $butlerBase);
		else if ($level == 5) $butlerTotal = (8 * $butlerBase);
		
		// private chef
		$privateChefTotal = $privateChefBase;
		
		// private driver
		$privateDriverTotal = $privateDriverBase;
		
		// villa preparation & checkout cleaning
		$villaPreparationTotal = 0;
		$checkoutCleaningTotal = 0;
		if ($level == 3) {
			$villaPreparationTotal = floor(749 / $totalNights);
			$checkoutCleaningTotal = floor(749 / $totalNights);
		}
			
		// villa only
		// (J25+K25)/H25/(1-$L25)
		if ($level == 0) $totalRate = $villaOnlyRate;
		
		// 3 star
		// (C25+(('Service Rates'!C$7+B25*'Service Rates'!D$7+'Service Rates'!C$8+B25*'Service Rates'!D$8)*D25)/H25+B25*'Service Rates'!D$9)/(1-'Service Rates'!D$4)
		if ($level == 3)
		{
			// adjust for once a week frequency
// 			if ($totalNights > 7) {
/*
// 				$linenAndTowelTotal = floor($linenAndTowelTotal / 7);
				$serviceAndProductTotal = floor($serviceAndProductTotal / 7);
				$houseKeepingTotal = floor($houseKeepingTotal / 7);
			}
			else {
				$linenAndTowelTotal = 0;
				$serviceAndProductTotal = 0;
				$houseKeepingTotal = 0;
			}				
*/
			$linenAndTowelTotal = (floor($totalNights / 7) * $linenAndTowelTotal) / $totalNights;
			$serviceAndProductTotal = (floor($totalNights / 7) * $serviceAndProductTotal) / $totalNights;
// 			$houseKeepingTotal = (floor($totalNights / 7) + 1 * $houseKeepingTotal) / $totalNights;

			$managementRate = ($villaOnlyRate + (($linenAndTowelTotal + $serviceAndProductTotal) * $multiplierArray[$multiplierField]['3_star']) / $multiplierArray[$multiplierField]['5_star'] + $houseKeepingTotal) * ($threeStarVillaHotelManagement);
			$totalRate = $villaOnlyRate + $linenAndTowelTotal + $serviceAndProductTotal + $houseKeepingTotal + $managementRate + $villaPreparationTotal + $checkoutCleaningTotal;
		}
		
		// 4 star
		// (C25+(('Service Rates'!C$7+B25*'Service Rates'!D$7+'Service Rates'!C$8+B25*'Service Rates'!D$8)*F25)/H25+B25*'Service Rates'!D$9+4*'Service Rates'!D$10)/(1-'Service Rates'!D$5)
		else if ($level == 4)
		{
			// adjust for once every other day frequency
			$linenAndTowelTotal = floor($linenAndTowelTotal / 2);
			$serviceAndProductTotal = floor($serviceAndProductTotal / 2);
			$houseKeepingTotal = floor($houseKeepingTotal / 2);
			
			$managementRate = ($villaOnlyRate + (($linenAndTowelTotal + $serviceAndProductTotal) * $multiplierArray[$multiplierField]['4_star']) / $multiplierArray[$multiplierField]['5_star'] + $houseKeepingTotal + $butlerTotal) * $fourStarVillaHotelManagement;
			$totalRate = $villaOnlyRate + $linenAndTowelTotal + $serviceAndProductTotal + $houseKeepingTotal + $butlerTotal + $fourStarVillaHotelManagement + $managementRate;
		}
		
		// 5 star
		// (C25+'Service Rates'!C$7+B25*'Service Rates'!D$7+'Service Rates'!C$8+B25*'Service Rates'!D$8+B25*'Service Rates'!D$9+8*'Service Rates'!D$10+'Service Rates'!D$11+'Service Rates'!D$12)/(1-'Service Rates'!D$6)
		else if ($level == 5)
		{
// 			$managementRate = ($villaOnlyRate + $linenAndTowelTotal + $serviceAndProductTotal + $houseKeepingTotal + $butlerTotal + $privateChefTotal + $privateDriverTotal) * $fiveStarVillaHotelManagement;
// 			$totalRate = $villaOnlyRate + $linenAndTowelTotal + $serviceAndProductTotal + $houseKeepingTotal + $butlerTotal + $privateChefTotal + $privateDriverTotal + $managementRate;
			
			$villaPreparationTotal = 749;
			$checkoutCleaningTotal = 199 + $totalBedrooms * 99;
/*
			$totalRate = ($ownerRent / $totalNights + $villaPreparationTotal + $servicesTotal * $totalNights) / (1 - ($fiveStarVillaHotelManagement + $ownerCom));
			$baseRate = $totalRate - $servicesTotal * $totalNights;
*/

/*
			1.       Base Villa Rate w/o Hotel Service or Management = Net to Owner / (1 – Total Commission of 20%)
			2.       Calculate per day services and total stay services -> this should be clear
			3.       BRIM = (Base Villa Rate w/o Hotel Service or Management + VillaHotel Transformation of $749) / (1 - Villazzo VillaHotel Management of 18%) + Total Hotel Services / (1 - Outside Agent Commission on Services) - Total Hotel Services
			4.       Total rate = BRIM + Total Hotel Services
*/
			$commissionServices = $_SESSION['USER']->getCommissionServices() / 100;
			$baseRate = ($ownerRent + $ownerReserve) / (1 - $ownerCom);
			$brim = ($baseRate + $villaPreparationTotal) / (1 - $fiveStarVillaHotelManagement) + ($servicesTotal * $totalNights) / (1 - $commissionServices) - ($servicesTotal * $totalNights);
			$totalRate = $brim + $servicesTotal * $totalNights;
		}
		
		return array
		(
			'rate' => SITE_ID==2?$totalRate:$this->formatRate($totalRate / $totalNights,$precision),
			'rate_base' => $this->formatRate($brim / $totalNights,$precision),
			'management' => $this->formatRate($managementRate,$precision),
			
			'villa_preparation' => $villaPreparationTotal,
			'checkout_cleaning' => $checkoutCleaningTotal,
			
			'linen_and_towel' => $linenAndTowelTotal,
			'service_and_product' => $serviceAndProductTotal,
			'housekeeping' => $houseKeepingTotal,
			
			'butler' => $butlerTotal,
			'private_chef' => $privateChefTotal,
			'private_driver' => $privateDriverTotal
		);
	}
	
	public function formatRate($number, $precision = 100)
	{
		$remainder = $number % $precision;
		$mRound = ($remainder < $precision / 2) ? $number - $remainder : $number + ($precision - $remainder);
		
		return floor($mRound);
	}
	
	public function formatProperty($propertyArray, $page = '')
	{
		$output = NULL;
		
		if ($_SESSION['USER']->getUserId()) $bookUrl = 'calendar';
		else $bookUrl = 'services';
		
		foreach ($propertyArray as $property)
		{
			if ($page == 'destination') $propertyRate = 'Property Value: <span class="text-grey">'.$property['dest_currency'].number_format($property['property_value']).'</span>';
			else {
/*
				if ($property['service_levels']['three_star']['night']) $propertyRate = $property['dest_currency'].number_format($property['service_levels']['three_star']['night']).'<br><span class="text-grey">per night</span>';
				else $propertyRate = $property['dest_currency'].number_format($property['service_levels']['three_star']['min']).' - '.$property['dest_currency'].number_format($property['service_levels']['three_star']['max']).'<br><span class="text-grey">per night</span>';
*/
				$propertyRate = $propertyRate = $property['dest_currency'].number_format($property['service_levels']['five_star']['night']).'<br><span class="text-grey">per night</span>';
			}
			
			// for reservation section
			if ($property['booked_till_dt']) $propertyBook = '<a class="button tiny expand" href="?dest='.$property['dest_name'].'&check_in='.date('m/d/Y', strtotime($property['booked_till_dt'].' + 1 day')).'&check_out='.date('m/d/Y', strtotime($property['booked_till_dt'].' + 4 day')).'">AVAIL. '.date('m/d/y', strtotime($property['booked_till_dt'].' + 1 day')).'</a>';
			else if ($property['check_in_dt'] && $property['check_out_dt']) $propertyBook = '<a class="button tiny expand" href="/reservations/'.$bookUrl.'?property='.$property['property_name'].'&check_in='.date('m/d/Y', strtotime($property['check_in_dt'])).'&check_out='.date('m/d/Y', strtotime($property['check_out_dt'])).'">BOOK NOW</a>';
			
			// everywhere else
			else $propertyBook = '<a class="button tiny expand" href="/reservations/?dest='.$property['dest_name'].'&property='.str_replace(' ', '-', strtolower($property['property_name'])).'&check_in='.date('m/d/Y').'&check_out='.date('m/d/Y', strtotime('+3 days')).'">BOOK NOW</a>';
					
			$output .= '
				<div class="small-12 columns property-spacer">
			        <div class="row collapse" data-equalizer>
			            <div class="medium-6 columns property-image" data-equalizer-watch>
			                <span class="img-property-title">'.$property['property_name'].'</span>
			                	<a href="/'.$property['dest_name'].'-rental-villas/villa-'.str_replace(' ', '-', strtolower($property['property_name'])).($property['check_in_dt']&&$property['check_out_dt']?'?check_in='.date('m/d/Y', strtotime($property['check_in_dt'])).'&check_out='.date('m/d/Y', strtotime($property['check_out_dt'])):'').'"><img src="'.$property['property_img'].'"></a>
			                </span>
			                <!--div id="destination-mobile-cta-buttons" class="hidden-for-large-up">
			                    <div class="row">
			                        <div class="small-4 small-push-8 columns">
			                            <a href="/'.$property['dest_name'].'-rental-villas/villa-'.str_replace(' ', '-', strtolower($property['property_name'])).'" class="button tiny expand">DETAILS</a>
			                            <br>'.$propertyBook.'
			                        </div>
			                    </div>
			                </div-->
			            </div>
			            <div class="medium-6 columns property-details" data-equalizer-watch>
			                <div class="row text-center">
			                    <div class="small-12 columns">
			                        <h2 class="text-grey">'.$property['property_desc_short'].'</h2>
			                    </div>
			                </div>
			                <div class="row text-center">
			                    <div class="small-12 columns">
			                        <h2><i class="fa fa-bed"></i> '.$property['property_bedrooms'].' bedrooms</h2>
			                    </div>
			                </div>
			                <div class="row text-center">
			                    <div class="small-12 columns">
			                        <h2>Location: <span class="text-grey">'.$property['property_location_name'].'</span>'.
			                        ($property['property_area_sq']&&$property['property_area_mt']?'<br>Total Area: <span class="text-grey">'.number_format($property['property_area_sq']).' sq ft ('.number_format($property['property_area_mt']).'m&sup2;)</span>':'').
			                        ($property['property_interior_sq']&&$property['property_interior_mt']?'<br>Interior Space: <span class="text-grey">'.number_format($property['property_interior_sq']).' sq ft ('.number_format($property['property_interior_mt']).' m&sup2;)</span>':'').
			                        '</h2>'.'
			                    </div>
			                </div>
			                <div class="row text-center">
			                    <div class="small-12 columns">
			                        <h2>'.$propertyRate.'</h2>
			                    </div>
			                </div>
			                <div class="row text-center">
			                    <div class="small-4 small-offset-2 columns">
			                        <a href="/'.$property['dest_name'].'-rental-villas/villa-'.str_replace(' ', '-', strtolower($property['property_name'])).($property['check_in_dt']&&$property['check_out_dt']?'?check_in='.date('m/d/Y', strtotime($property['check_in_dt'])).'&check_out='.date('m/d/Y', strtotime($property['check_out_dt'])):'').'" class="button tiny expand">DETAILS</a>
			                    </div>
			                    <div class="small-4 columns">'.$propertyBook.'</div>
			                    <div class="small-4 columns"></div>
			                </div>
			            </div>
			        </div>
			    </div>';
		}
		
		return $output;
	}
	
	public function getConversionRate()
	{
		$destCurrencyRate = 1;
		
		$ch = curl_init('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		$data = curl_exec($ch);
		curl_close($ch);
		$XML = new SimpleXmlElement($data, LIBXML_NOCDATA);
	
		foreach ($XML->Cube->Cube->Cube as $rate)
		{
			if ($rate['destCurrency'] == 'USD')
			{
				$destCurrencyRate = (float)$rate['rate'];
				break;
			}
		}
		
		return $destCurrencyRate;
	}
	
	// format order number
	public function formatOrderNbr($orderNbr)
	{
		return '0'.str_pad($orderNbr, 6, 0, STR_PAD_LEFT);
	}
		
	// create receipt
	public function createReceipt($id, $status = '', $fontColor = '#666666', $lineColor = '#C2C2C2', $titleColor = '#666666')
	{ 
                $rs_reservation_property = $_SESSION['DB']->querySelect('SELECT *, DATEDIFF(reservationEndDt, reservationStartDt) AS numberOfNights, AES_DECRYPT(reservationCreditCardName, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardName, AES_DECRYPT(reservationCreditCardType, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardType, AES_DECRYPT(reservationCreditCardNumber, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardNumber, AES_DECRYPT(reservationCreditCardExpMonth, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardExpMonth, AES_DECRYPT(reservationCreditCardExpYear, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardExpYear, AES_DECRYPT(reservationCreditCardCVV, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardCVV FROM reservationProperty LEFT JOIN property ON property.propertyId = reservationProperty.propertyId LEFT JOIN destination ON destination.destId = property.destId LEFT JOIN propertyType ON propertyType.propertyTypeId = property.propertyTypeId WHERE reservationId = ? LIMIT 1', array($id));
		$row_rs_reservation_property = $_SESSION['DB']->queryResult($rs_reservation_property);
		$totalRows_rs_reservation_property = $_SESSION['DB']->queryCount($rs_reservation_property);

		$rs_property_type = $_SESSION['DB']->querySelect('SELECT propertyTypeName FROM property LEFT JOIN propertyType ON propertyType.propertyTypeId = property.propertyTypeId WHERE propertyId = ? LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_type = $_SESSION['DB']->queryResult($rs_property_type);
						
		$rs_property_sleeps = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 59 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_sleeps = $_SESSION['DB']->queryResult($rs_property_sleeps);
		
		$rs_property_smoking = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 58 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_smoking = $_SESSION['DB']->queryResult($rs_property_smoking);
		
		$rs_property_pets = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 57 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_pets = $_SESSION['DB']->queryResult($rs_property_pets);
		
		$rs_property_bedrooms = $_SESSION['DB']->querySelect('SELECT propBedrId FROM propertyBedroom WHERE propertyId = ? LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_bedrooms = $_SESSION['DB']->queryResult($rs_property_bedrooms);
		$totalRows_rs_property_bedrooms = $_SESSION['DB']->queryCount($rs_property_bedrooms);
		
		$destCurrency = ($row_rs_reservation_property['reservationRateCurrency']=='&euro;'?'E':'$');
		$nightlyRate = ($row_rs_reservation_property['reservationRateValue'] - $row_rs_reservation_property['reservationRateDiscount']) / $row_rs_reservation_property['numberOfNights'];
		$nightlyTotal = $row_rs_reservation_property['reservationRateValue'] - $row_rs_reservation_property['reservationRateDiscount'];
		$taxRate = $row_rs_reservation_property['reservationRateTax'];
		$taxTotal = $nightlyTotal * $taxRate / 100;
		$cleaningRate = 0;
		$checkoutTotal = $nightlyTotal + $cleaningRate + $taxTotal;
		
		if ($totalRows_rs_reservation_property)
		{			
			$output = '
			<style type="text/css">
			    @media only screen and (max-width:480px)
			    {
			        #templateColumns {
			            width:100% !important;
			        }
			        .templateColumnContainer {
			            display:block !important;
			            width:100% !important;
			        }
			    }
			    #templateColumns, #templateColumns table {				    
				    border:none;
				    margin:0;
				}
				#templateColumns tr td {
					padding:5px;
					background-color:#fff;
				}
			</style>
			
			<table width="100%" border="0" cellpadding="0" cellspacing="0" id="templateColumns">';
						
			// status
			$output .= '
			<tr>
				<tdalign="center" valign="top" width="100%" class="templateColumnContainer">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td>';							
			if ($row_rs_reservation_property['reservationStatusId'] == 4) $output .= 'We are pleased to hold your selection for 24 hours. To complete your reservation please contact us directly to speak to a sales representative at +1 (305) 777 0146.<br /><br />Thank you for choosing '.SITE_NAME.' for your upcoming trip!<br /><br />Below is your booking confirmation with the details of your selection. You can print this receipt for future reference.';
            else $output .= 'Your reservation has been received. Thank you for choosing '.SITE_NAME.' for your upcoming trip!<br><br>Below is your booking confirmation. which has also been emailed to you. You can print this receipt for future reference.<br><br>Please note: We still require a signed registration form - it has been pre-filled with all your information and emailed to you as attachment of your confirmation. Please sign it and fax back to us at +1 (305) 777 0147 or email it to <a href="mailto:villas@'.SITE_NAME.'.com">villas@'.SITE_NAME.'.com</a>. Please return the signed reservation form within 24 hours so your booking can be confirmed.';
			$output .= '
							</td>
						</tr>
					</table>
				</td>
			</tr>';
			
			// recap
			$output .= '
			<tr>
				<td align="center" valign="top" width="50%" class="templateColumnContainer">
					<table width="100%" border="0" cellspacing="0" cellpadding="5" style="margin-top:10px;">
						<tr>
							<th align="left">RESERVATION #: '.$this->formatOrderNbr($row_rs_reservation_property['reservationId']).'</th>
							<th align="left">DATE: '.date('m/d/y', strtotime($row_rs_reservation_property['reservationCreateDt'])).'</th>
						</tr>
					</table>
				</td>
			</tr>';
			
			// contact
			$output .= '
			<tr>
				<td align="left" valign="top" width="100%" class="templateColumnContainer" style="border-top:1px solid '.$lineColor.';">
					<table width="50%" border="0" cellspacing="0" cellpadding="5">
						<tr>
							<td colspan="2" style="font-weight:bold; color:'.$titleColor.';">GUEST INFORMATION</td>
						</tr>
						<tr>
							<td>First Name</td>
							<td>'.$row_rs_reservation_property['reservationFirstname'].'</td>
						</tr>
						<tr>
							<td>Last Name</td>
							<td>'.$row_rs_reservation_property['reservationLastname'].'</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>'.$row_rs_reservation_property['reservationEmail'].'</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>'.$row_rs_reservation_property['reservationPhone'].'</td>
						</tr>';
						
						if ($row_rs_reservation_property['reservationCompany']) $output .= '
						<tr>
							<td>Company</td>
							<td>'.$row_rs_reservation_property['reservationCompany'].'</td>
						</tr>';
						
						if ($row_rs_reservation_property['reservationStreet1']) $output .= '
						<tr>
							<td>Street</td>
							<td>'.$row_rs_reservation_property['reservationStreet1'].($row_rs_reservation_property['reservationStreet2']?$row_rs_reservation_property['reservationStreet2']:'').'</td>
						</tr>
						<tr>
							<td>City</td>
							<td>'.$row_rs_reservation_property['reservationCity'].'</td>
						</tr>
						<tr>
							<td>State</td>
							<td>'.$row_rs_reservation_property['reservationState'].'</td>
						</tr>
						<tr>
							<td>Zip Code</td>
							<td>'.$row_rs_reservation_property['reservationPostcode'].'</td>
						</tr>
						<tr>
							<td>Country</td>
							<td>'.$row_rs_reservation_property['reservationCountry'].'</td>
						</tr>';
		$output .= '</table>
				</td>
			</tr>';
						
			// additional services
			if ($row_rs_reservation_property['reservationAdditionalServices']) $output .= '
			<tr>
				<td align="center" valign="top" width="100%" class="templateColumnContainer" style="border-top:1px solid '.$lineColor.';">
					<table width="100%" border="0" cellspacing="0" cellpadding="5">
						<tr>
							<td style="font-weight:bold; text-align:left; color:'.$titleColor.';">ADDITIONAL SERVICES (billed separately at check-out)</td>
						</tr>
						<tr>
							<td>
								'.$row_rs_reservation_property['reservationAdditionalServices'].'
							</td>
						</tr>
					</table>
				</td>
			</tr>';
			
			// items & totals
			$output .= '
			<tr>
				<td align="center" valign="top" width="100%" class="templateColumnContainer" style="border-top:1px solid '.$lineColor.';">
					<table width="100%" border="0" cellspacing="0" cellpadding="5">
						<tr>
							<th style="border-bottom:1px solid '.$lineColor.'; padding:5px; text-align:left; color:'.$titleColor.';">DESTINATION</th>
							<th style="border-bottom:1px solid '.$lineColor.'; padding:5px; text-align:left; color:'.$titleColor.';">DATES</th>
							<th style="border-bottom:1px solid '.$lineColor.'; padding:5px; text-align:left; color:'.$titleColor.';">NIGHTS</th>
							<th style="border-bottom:1px solid '.$lineColor.'; padding:5px; text-align:left; color:'.$titleColor.';">TOTAL</th>
						</tr>
						<tr>
							<td valign="top" style="border-bottom:1px solid '.$lineColor.'; padding:10px 0 30px 5px; text-align:left;">Villa '.$row_rs_reservation_property['propertyName'].', '.$row_rs_reservation_property['destName'].'</td>
							<td valign="top" style="border-bottom:1px solid '.$lineColor.'; padding:10px 0 30px 5px; text-align:left;">'.$_SESSION['UTILITY']->dateInvoice($row_rs_reservation_property['reservationStartDt']).' - '.$_SESSION['UTILITY']->dateInvoice($row_rs_reservation_property['reservationEndDt']).'</td>
							<td valign="top" style="border-bottom:1px solid '.$lineColor.'; padding:10px 0 30px 5px; text-align:left;">'.$row_rs_reservation_property['numberOfNights'].'</td>
							<td valign="top" style="border-bottom:1px solid '.$lineColor.'; padding:10px 0 30px 5px; text-align:left;">'.$row_rs_reservation_property['reservationRateCurrency'].number_format($row_rs_reservation_property['reservationRateValue']).'</td>
						</tr>
						<tr>
							<td colspan="2" style="background-color:#fff;">&nbsp;</td>
							<td style="background-color:#fff; padding:0 20px 0 0; text-align:right;">Subtotal</td>
							<td style="background-color:#fff; padding:0 0 0 10px; text-align:left;">'.$row_rs_reservation_property['reservationRateCurrency'].number_format($row_rs_reservation_property['reservationRateValue']).'</td>
						</tr>
						<tr>
							<td colspan="2" style="background-color:#fff;">&nbsp;</td>
							<td style="background-color:#fff; padding:0 20px 0 0; text-align:right;">Tax'.(SITE_ID==2?' ('.number_format($taxRate,2).'%)':'').'</td>
							<td style="background-color:#fff; padding:0 0 0 10px;">'.$row_rs_reservation_property['reservationRateCurrency'].number_format($row_rs_reservation_property['reservationRateTax'] * $row_rs_reservation_property['reservationRateValue'] / 100).'</td>
						</tr>'.
                                                ($row_rs_reservation_property['reservationSecurityDeposit']>0?'<tr style="font-weight:bold;">
							<td colspan="2" style="background-color:#fff;">&nbsp;</td>
							<td style="background-color:#fff; padding:0 20px 0 0; text-align:right;">Security Deposit</td>
							<td style="background-color:#fff; padding:0 0 0 10px;">'.$row_rs_reservation_property['reservationRateCurrency'].number_format($row_rs_reservation_property['reservationSecurityDeposit']).'</td>
						</tr>':'')
                                                .'<tr style="font-weight:bold;">
							<td colspan="2" style="background-color:#fff;">&nbsp;</td>
							<td style="background-color:#fff; padding:0 20px 0 0; text-align:right;">'.(SITE_ID==2?'Grand Total':'Total').'</td>
							<td style="background-color:#fff; padding:0 0 0 10px;">'.$row_rs_reservation_property['reservationRateCurrency'].number_format($row_rs_reservation_property['reservationRateTotal']+$row_rs_reservation_property['reservationSecurityDeposit']).'</td>
						</tr>
					</table>
				</td>
			</tr>';
									
			$output .= '</table>';
		}
		else $output = 'No reservation found.';
		
		return $output;
	}
	
	function createPdf($id)
	{
		$rs_reservation_property = $_SESSION['DB']->querySelect('SELECT *, DATEDIFF(reservationEndDt, reservationStartDt) AS numberOfNights, AES_DECRYPT(reservationCreditCardName, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardName, AES_DECRYPT(reservationCreditCardType, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardType, AES_DECRYPT(reservationCreditCardNumber, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardNumber, AES_DECRYPT(reservationCreditCardExpMonth, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardExpMonth, AES_DECRYPT(reservationCreditCardExpYear, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardExpYear, AES_DECRYPT(reservationCreditCardCVV, \''.$_SESSION['DB']->getEncryptKey().'\') AS creditCardCVV FROM reservationProperty  LEFT JOIN property ON property.propertyId = reservationProperty.propertyId LEFT JOIN destination ON destination.destId = property.destId LEFT JOIN propertyType ON propertyType.propertyTypeId = property.propertyTypeId WHERE reservationId = ? LIMIT 1', array($id));
		$row_rs_reservation_property = $_SESSION['DB']->queryResult($rs_reservation_property);
		$totalRows_rs_reservation_property = $_SESSION['DB']->queryCount($rs_reservation_property);
						
		$rs_property_type = $_SESSION['DB']->querySelect('SELECT propertyTypeName FROM property LEFT JOIN propertyType ON propertyType.propertyTypeId = property.propertyTypeId WHERE propertyId = ? LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_type = $_SESSION['DB']->queryResult($rs_property_type);
						
		$rs_property_sleeps = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 59 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_sleeps = $_SESSION['DB']->queryResult($rs_property_sleeps);
		
		$rs_property_smoking = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 58 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_smoking = $_SESSION['DB']->queryResult($rs_property_smoking);
		
		$rs_property_pets = $_SESSION['DB']->querySelect('SELECT propFeatValue FROM propertyFeature WHERE propertyId = ? AND featureId = 57 LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_pets = $_SESSION['DB']->queryResult($rs_property_pets);
		
		$rs_property_bedrooms = $_SESSION['DB']->querySelect('SELECT propBedrId FROM propertyBedroom WHERE propertyId = ? LIMIT 1', array($row_rs_reservation_property['propertyId']));
		$row_rs_property_bedrooms = $_SESSION['DB']->queryResult($rs_property_bedrooms);
		$totalRows_rs_property_bedrooms = $_SESSION['DB']->queryCount($rs_property_bedrooms);
		
		$destCurrency = ($row_rs_reservation_property['reservationRateCurrency']=='&euro;'?chr(128):'$');
		$nightlyRate = ($row_rs_reservation_property['reservationRateValue'] - $row_rs_reservation_property['reservationRateDiscount']) / $row_rs_reservation_property['numberOfNights'];
		$nightlyTotal = $row_rs_reservation_property['reservationRateValue'] - $row_rs_reservation_property['reservationRateDiscount'];
		$taxRate = $row_rs_reservation_property['reservationRateTax'];
		$taxTotal = $nightlyTotal * $taxRate / 100;
		$cleaningRate = 0;
		$checkoutTotal = $nightlyTotal + $cleaningRate + $taxTotal;
		
		if ($_SESSION['USER']->getUserGroupId() != 3)
		{
			$pdfName = $_SESSION['UTILITY']->datePdf($row_rs_reservation_property['reservationStartDt'], $row_rs_reservation_property['reservationEndDt']).' '.$row_rs_reservation_property['reservationFirstname'].' '.$row_rs_reservation_property['reservationLastname'].'.pdf';
			
			//$pdf =& new FPDI();
			$pdf = new FPDI();
			$pdf->AddPage();
			$pdf->setSourceFile(PDF_PATH.'/guest-registration-form-1.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx, 5, 5, 200);
			
			$pdf->SetFont('Times', 'B', 10);
			$pdf->SetTextColor(0,0,0);
			$pdf->SetXY(63, 48);
			$pdf->Write(0, $row_rs_reservation_property['reservationFirstname'].' '.$row_rs_reservation_property['reservationLastname']);
			$pdf->SetXY(63, 57.5);
			$pdf->Write(0, $row_rs_reservation_property['reservationStreet1'].' '.$row_rs_reservation_property['reservationStreet2']);
			$pdf->SetXY(63, 67);
			$pdf->Write(0, $row_rs_reservation_property['reservationPhone']);
			$pdf->SetXY(63, 77);
			$pdf->Write(0, $row_rs_reservation_property['reservationEmail']);
			$pdf->SetXY(63, 86.5);
			$pdf->Write(0, $_SESSION['UTILITY']->dateReservation($row_rs_reservation_property['reservationStartDt']));
			$pdf->SetXY(63, 96.5);
			$pdf->Write(0, $_SESSION['UTILITY']->dateReservation($row_rs_reservation_property['reservationEndDt']));
			$pdf->SetXY(50, 106);
			$pdf->Write(0, $totalRows_rs_property_bedrooms);
			$pdf->SetXY(135, 106);
			$pdf->Write(0, $row_rs_property_sleeps['propFeatValue']);
			$pdf->SetXY(52, 115.5);
			$pdf->Write(0, $row_rs_reservation_property['propertyMaxPeople']);
			$pdf->SetXY(28.5, 196);
			$pdf->Write(0, 'X');
			$pdf->SetXY(99.5, 196);
			$pdf->Write(0, 'X');
			$pdf->SetXY(134.5, 52.5);
			$pdf->Write(0, $row_rs_reservation_property['propertyName']);
			$pdf->SetXY(134.5, 62);
			$pdf->Write(0, $row_rs_reservation_property['destName']);
			if ($row_rs_reservation_property['reservationLevel'] == 0) $pdf->SetXY(136, 77);
			else if ($row_rs_reservation_property['reservationLevel'] == 3) $pdf->SetXY(136, 82);
			else if ($row_rs_reservation_property['reservationLevel'] == 4) $pdf->SetXY(136, 87);
			else if ($row_rs_reservation_property['reservationLevel'] == 5) $pdf->SetXY(136, 92);
			$pdf->Write(0, 'X');
			
			$pdf->AddPage();
			$pdf->setSourceFile(PDF_PATH.'/guest-registration-form-2.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx, 5, 5, 200);
			
			$pdf->AddPage();
			$pdf->setSourceFile(PDF_PATH.'/guest-registration-form-3.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx, 5, 5, 200);
			
			$pdf->AddPage();
			$pdf->setSourceFile(PDF_PATH.'/guest-registration-form-4.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx, 5, 5, 200);
			
			$pdf->AddPage();
			$pdf->setSourceFile(PDF_PATH.'/guest-registration-form-5.pdf');
			$tplIdx = $pdf->importPage(1);
			$pdf->useTemplate($tplIdx, 5, 5, 200);
			$pdf->SetXY(55, 53);
			$pdf->Write(0, $destCurrency.number_format($nightlyRate).' / night');
			$pdf->SetXY(116, 53);
			$pdf->Write(0, $row_rs_reservation_property['numberOfNights']);
			$pdf->SetXY(150, 53);
			$pdf->Write(0, $destCurrency.number_format($nightlyTotal));
			$pdf->SetXY(60, 59);
			$pdf->Write(0, $taxRate.'% tax');
			$pdf->SetXY(150, 59);
			$pdf->Write(0, $destCurrency.number_format($taxTotal));
			$pdf->SetXY(61.5, 65);
			$pdf->Write(0, 'Extras');
			$pdf->SetXY(150, 71.5);
			$pdf->Write(0, $destCurrency.number_format($checkoutTotal));
			$pdf->SetXY(40, 78.5);
			$pdf->Write(0, $row_rs_reservation_property['creditCardName']);
			if ($row_rs_reservation_property['creditCardNumber'])
			{
				if ($row_rs_reservation_property['creditCardType'] == 'VISA')
				{
					$pdf->SetXY(34.5, 92);
					$pdf->Write(0, 'X');
				}
				if ($row_rs_reservation_property['creditCardType'] == 'MASTERCARD')
				{
					$pdf->SetXY(49, 92);
					$pdf->Write(0, 'X');
				}
				if ($row_rs_reservation_property['creditCardType'] == 'AMEX')
				{
					$pdf->SetXY(75.5, 92);
					$pdf->Write(0, 'X');
				}
				$pdf->SetXY(60, 101);
				$pdf->Write(0, $row_rs_reservation_property['creditCardName']);
				$pdf->SetXY(70, 110);
				$pdf->Write(0, str_replace(' ', '' ,$row_rs_reservation_property['creditCardNumber']));
				$pdf->SetXY(80, 118.5);
				$pdf->Write(0, $row_rs_reservation_property['creditCardExpMonth']);
				$pdf->SetXY(108, 118.5);
				$pdf->Write(0, $row_rs_reservation_property['creditCardExpYear']);
				$pdf->SetXY(148, 118.5);
				$pdf->Write(0, $row_rs_reservation_property['creditCardCVV']);
			}
			
			if ($row_rs_reservation_property['reservationStreet1'])
			{
				$pdf->SetXY(62, 127.5);
				$pdf->Write(0, $row_rs_reservation_property['reservationStreet1'].(isset($row_rs_reservation_property['reservationStreet2'])?' '.$row_rs_reservation_property['reservationStreet2']:'').', '.' '.$row_rs_reservation_property['reservationCity'].', '.$row_rs_reservation_property['reservationState'].' '.$row_rs_reservation_property['reservationPostcode'].', '.$row_rs_reservation_property['reservationCountry']);
			}
			
			if ($row_rs_reservation_property['creditCardNumber'])
			{
				$pdf->SetXY(28.5, 146);
				$pdf->Write(0, 'X');
				$pdf->SetXY(111, 146);
				$pdf->Write(0, $destCurrency.number_format($checkoutTotal * 1.03));
				$pdf->SetXY(68, 155.5);
				$pdf->Write(0, $destCurrency.number_format($checkoutTotal));
			}
					
			if ($pdf->Output(PDF_PATH.'/guest-registration-forms/'.$pdfName, 'F') !== FALSE)
			{
				$_SESSION['DB']->queryUpdate('UPDATE reservationProperty SET reservationCreditCardType = NULL, reservationCreditCardName = NULL, reservationCreditCardNumber = NULL, reservationCreditCardExpMonth = NULL, reservationCreditCardExpYear = NULL, reservationCreditCardCVV = NULL WHERE reservationId = ? LIMIT 1', array($row_rs_reservation_property['reservationId']));
			}
			return PDF_PATH.'/guest-registration-forms/'.$pdfName;
		}
	}

        function getMenus(){
            
//            if(SITE_ID == 1){
                $dest_menu = array('label' => 'VILLAS & DESTINATIONS',
                        'href' => '/luxury-rental-property-vacation-destinations',
                        'child' => array(
                            array('href' => "/luxury-rental-property-vacation-destinations", 'label' => "All Destinations"),
                            array('href' => "/rental-villas/aspen", 'label' => "Aspen"),
                            array('href' => "/rental-villas/miami", 'label' => "Miami"),
                            array('href' => "/rental-villas/saint-tropez", 'label' => "Saint-Tropez"),
                            array('href' => "/rental-villas/st-barth", 'label' => "St-Barth"),
                            array('href' => "/rental-villas/ibiza", 'label' => "Ibiza"),                            
                        ));
//            }
//            if(SITE_ID == 2){
//                $dest_menu = array('label' => 'VILLAS & DESTINATIONS',
//                        'href' => '/luxury-rental-property-vacation-destinations',
//                        'child' => array(
//                            array('href' => "/luxury-rental-property-vacation-destinations", 'label' => "All Destinations"),
//                            array('href' => "/reservations/?dest=aspen&check_in=&check_out=", 'label' => "Aspen"),
//                            array('href' => "/reservations/?dest=miami&check_in=&check_out=", 'label' => "Miami"),
//                            array('href' => "/reservations/?dest=saint-tropez&check_in=&check_out=", 'label' => "Saint-Tropez"),
//                            array('href' => "/reservations/?dest=st-barth&check_in=&check_out=", 'label' => "St-Barth"),
//                            array('href' => "/reservations/?dest=ibiza&check_in=&check_out=", 'label' => "Ibiza"),                            
//                        ));
//            }
            $menu = array(
                    $dest_menu, 
                    array('label' => 'BOOK YOUR VILLA', 'href' => '/reservations/'),
                    array('label' => 'ABOUT US', 'href' => '/about-luxury-villa-rentals/founders-vision'),
                    array('label' => 'CONTACT', 'href' => '/about-luxury-villa-rentals/contact'),
                );
             
            if (SITE_ID == 2) {
//                array_splice($menu[0]['child'], 6, 0,array( array('href' => "/reservations/?dest=turks+%26+caicos&check_in=&check_out=", 'label' => "Turks & Caicos")));
//                array_splice($menu[0]['child'], 7, 0,array( array('href' => "/reservations/?dest=palm+beach&check_in=&check_out=", 'label' => "Palm Beach")));
                array_splice($menu[0]['child'], 6, 0,array( array('href' => "/rental-villas/turks+%26+caicos", 'label' => "Turks & Caicos")));
                array_splice($menu[0]['child'], 7, 0,array( array('href' => "/rental-villas/palm+beach", 'label' => "Palm Beach")));
            }
            if (SITE_ID == 1) {
                
                array_splice($menu, 1, 0,array( array('label'=>'SERVICES','href'=>'/about-luxury-villa-rentals/villahotel-concept')));
                array_splice($menu, 3, 0,array( array('label'=>'SPECIAL OFFERS','href'=>'/about-luxury-villa-rentals/offers')));
                array_splice($menu, 4, 1,array(
                    array('label' => 'ABOUT US',
                        'href' => '#',
                        'child' => array(
                            array('href' => "/about-luxury-villa-rentals/founders-vision", 'label' => "Founder's Vision"),
                            array('href'=>'/about-luxury-villa-rentals/villahotel-concept','label'=>'Villazzo VillaHotels'),
                            array('href'=>'/about-luxury-villa-rentals/villazzo-realty','label'=>'Villazzo Realty'),
                            array('href'=>'/about-luxury-villa-rentals/villazzo-investments','label'=>'Villazzo Investments'),
                            array('href'=>'/about-luxury-villa-rentals/press','label'=>'Press'),
                            array('href'=>'http://www.villazzo.com/blog/','label'=>'Blog'),
                            array('href'=>'/about-luxury-villa-rentals/faq','label'=>'FAQ'),
                            array('href'=>'/about-luxury-villa-rentals/how-to-book','label'=>'How to Book'),
                            array('href'=>'/about-luxury-villa-rentals/testimonials','label'=>'Testimonials')
                        ))
                    ));
                if ($_SESSION['USER']->getUserId()) {
                    $menu2 = array('label' => 'MY ACCOUNT',
                        'href' => '#',
                        'child' => array(
                            array('href' => "/reservations/", 'label' => "New Booking"),
                        )
                    );
                    if ($_SESSION['USER']->getUserGroupId() == 1) {
                        $temp = array(array('href'=>'/reservations/overview','label'=>'Booking Overview'),
                                    array('href'=>'/reservations/user','label'=>'User Management'),
                                    array('href'=>'/reservations/calendar','label'=>'Property Calendar'));
                        $menu2['child'] = array_merge($menu2['child'], $temp);
                    } else if ($_SESSION['USER']->getUserGroupId() == 2) {
                        $temp = array(array('href'=>'/reservations/calendar','label'=>'Property Calendar'),
                                    array('href'=>'/reservations/profile','label'=>'My Profile'),
                                    array('href'=>'/reservations/overview','label'=>'My History'));
                        $menu2['child'] = array_merge($menu2['child'], $temp);
                    }
                    array_push($menu2['child'], array('href' => "?logout", 'label' => "Log Out"));
                    array_splice($menu, 6, 0,array($menu2));
                }
            }
            return $menu;
        }
}
?>