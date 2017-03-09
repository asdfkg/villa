<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Hello React!</title>
		<!-- <script src="js/react-0.12.2.js"></script>
		<script src="js/JSXTransformer-0.12.2.js"></script> -->
		
		<script src="js/react-0.13.3.js"></script>
		<script src="js/JSXTransformer-0.13.3.js"></script>
		<link rel="stylesheet" href="https://www.villazzo.com/css/custom.css">
	</head>
	<body>
		<div id="app"></div>
		<script src="src/common-lib.jsx" type="text/jsx"></script>
		<script src="src/about-section.jsx"  type="text/jsx"></script>
		
		<script type="text/jsx">
			/** @jsx React.DOM */

			var data = {
				heading: "VILLAZZO REALTY GIVES YOU ACCESS TO THE FINEST PROPERTIES IN THE WORLD",
				image: "https://www.villazzo.com/img/about/lisa.png",
				imageLink: "",
				description: "Villazzo has over a decade long track record of success in the ultra-luxury vacation rental marketplace; and we successfully leveraged our expertise and  relationships with homeowners and our clients to facilitate real estate transactions as well.<br/> "+
						"<a href=\"mailto:lisa.blake@villazzo.com?Subject=Villazzo%20Realty\">Contact</a> Lisa Blake if you are interested in buying or selling a luxury villa."
				};

			React.render(
			  <AboutBox data={data}/>,
			  document.getElementById('app'),
			  function () {
				console.log('after render');
			  }
			)

		</script>
	</body>
</html>
