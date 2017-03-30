<?php
// setting class
class Setting
{	
	// get company name
	public function getCompanyName()
	{ 
		//return 'Villazzo';
		return SITE_NAME;
	}
	
	// get company phone
	public function getCompanyPhone()
	{ 
		return '1 (877) VILLAZZO';
	}
	
	// get company email
	public function getCompanyEmail()
	{ 
            if(SITE_ID==1)
		return array('villas@villazzo.com', $this->getCompanyName());
            else
                return array('villas@greatvilladeals.com', $this->getCompanyName());
	}
	
	// get company address
	public function getCompanyAddress()
	{
		return '';
	}
	
	// get tax rate
	public function getTaxState()
	{ 
		return 'FL';
	}
	
	// get tax rate
	public function getTaxRate()
	{ 
		return 7;
	}
}
?>