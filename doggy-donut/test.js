<!DOCTYPE html>
<html>

  <head>
    <title> Lessmilk Game: Flappy Bird Clone </title>
    <meta charset="utf-8" />
<link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
<link rel="stylesheet" href="/style/style.css" />
<meta name="viewport" content="initial-scale=1.0" />

<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46875337-1', 'lessmilk.com');
ga('send', 'pageview');
</script>    <meta name="viewport" content="initial-scale=1.0" />

    <script type="text/javascript" src="js/phaser.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </head>

  <body class="game">

    <!--<h1>Lessmilk Game: Flappy Bird Clone</h1>-->


    <div id="gameDiv" style="width:400px"> </div>



    <!--<p>Learn how to make this game with a tutorial <a href="/tutorial/flappy-bird-1">here</a></p>-->

  
<script src="/js/popup.js" defer></script>
<div id="popup">
	<span id="close">x</span>
	<div class="showMobile">
		<strong>Get my free ebook</strong> "How To Create and Promote Your Own Games" <br />
		By joining the newsletter: <a href="/newsletter" class="button">Join</a>
	</div>

	<div class="showDesktop">
		<strong>Get my free ebook</strong> "How To Create and Promote Your Own Games" <br />
		By joining the newsletter: <a href="/newsletter" class="button">Join</a>
	</div>
</div>


<div id="popup2">
	<div id="bg"></div>
	<div class="txt">
		<h2>Wait! Get my free ebook :-)</h2>
		<p>Want to get my free ebook <br />
			"How To Create and Promote Your Own Games" <br />
			 and be notified when I write new gamedev tutorials? </p>
		<p>Then join the newsletter below.</p>

		<form action="https://app.convertkit.com/landing_pages/63654/subscribe.html" method="post">
		<!--<input type="text" placeholder="First Name" name="first_name">-->
		<input type="email" placeholder="Your Email" name="email" required>
		<input type="submit" value="Join Newsletter">

		<p class="small">More than 12,000 people already joined. <br />
			No spam and unsubscribe at any time. </p>
		</form>
	</div>
</div>

<script>
	var x = document.referrer;

	if (x.indexOf('google') > -1)
		document.addEventListener("mouseleave", function(e){
		    if(e.clientY < 0)
		    {
		    	a = document.getElementById('popup2');
		        a.style.visibility = 'visible';
		    }
		}, false);

	b = document.getElementById('bg');
	b.addEventListener("click", function() {
		a = document.getElementById('popup2');
		a.style.visibility = 'hidden';
	});
</script>

</body>
</html>
