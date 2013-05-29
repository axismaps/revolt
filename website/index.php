<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta charset="utf8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<link href='http://fonts.googleapis.com/css?family=IM+Fell+DW+Pica:400,400italic|PT+Sans:400,700,400italic,700italic|PT+Serif' rel='stylesheet' type='text/css' />
		<link href="main.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div id="header">
			<div class="banner full"></div>
			<div class="title">The Coromantee Wars</div>
			<div class="title sub">An Archipelago of Insurrection</div>
			<div id="nav">
				<div class="item active">Home</div>
				<div class="item"><a href="project.html">Project</a></div>
				<div class="item"><a href="/blog/">Blog</a></div>
				<div class="item"><a href="/map/">Map</a></div>
			</div>
		</div>
		<div id="content">
			<div id="intro">
				<div id="contact">
					<img src="images/v_brown.jpg" alt="Vincent Brown" />
					<b>Creator, Producer, Editor-in-Cheif</b>
					<br /><br />
					<h3>Vincent Brown</h3>
					<p>Professor of History and of African and African American Studies</p>
					<p>Harvard University<br /><a href="mailto:brown8@fas.harvard.edu">brown8@fas.harvard.edu</a></p>
				</div>
				<p>This animated thematic map narrates the spatial history of the greatest slave insurrection in the eighteenth century British Empire. &nbsp;To teachers and researchers, the presentation offers a carefully curated archive of key documentary evidence. &nbsp;To all viewers, the map suggests an argument about the strategies of the rebels and the tactics of counterinsurgency, about the importance of the landscape to the course of the uprising, and about the difficulty of representing such events cartographically with available sources. &nbsp;Although this cartographic narration cannot be taken as an exhaustive database—for instance, it does not examine major themes such as belonging and affiliation among the insurgents or the larger imperial context and interconnected Atlantic world— the map offers an illuminating interpretation of the military campaign’s spatial dynamics.</p>
			</div>
			<div class="section">
				<a href="project.html"><img src="images/project.jpg" /></a>
				<h1><a href="project.html"><img src="images/arrow.png" />Project Description</a></h1>
				<p>In 1760, some fifteen hundred enslaved black men and women— perhaps fewer but probably many more— took advantage of Britain’s Seven Year&rsquo;s War against France and Spain, to stage a massive uprising in Jamaica, which began on April 7 in the windward parish of St. Mary’s and continued in the leeward parishes until October of the next year...</p>
			</div>
			<div style="clear:both"></div>
			<div class="section">
				<a href="/map/"><img src="images/map.jpg" /></a>
				<h1><a href="/map"><img src="images/arrow.png" />Multi-layered Interactive Map</a></h1>
				<p>Mapping the great Jamaican insurrection of 1760-61 allows us to see how the island’s topography shaped the course of the revolt, how the rebellion included at least three major uprisings, and how its suppression required the sequenced collaboration of several distinct elements of British military power...</p>
			</div>
			<div style="clear:both"></div>
			<div class="section">
				<a href="/blog/"><img src="images/blog.jpg" /></a>
				<h1><a href="/blog/"><img src="images/arrow.png" />Recent Blog Posts</a></h1>
				<p>
				<?php require('blog/wp-blog-header.php');?>
				<?php query_posts('showposts=3'); ?>
				<?php while (have_posts()) : the_post(); ?>
				<a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a><br />
				<?php endwhile;?>
				</p>
			</div>
			<div style="clear:both"></div>
		</div>
		<div id="footer">&copy; 2012 Vincent Brown. All rights reserved. <br />The material on this site may not be reproduced, distributed, transmitted, or otherwise used, except with the prior permission of Vincent Brown.</div>
		<div id="search">
			<div id="cse-search-form" style="width: 100%;">Loading</div>
			<script src="http://www.google.com/jsapi" type="text/javascript"></script>
			<script type="text/javascript"> 
				google.load('search', '1', {language : 'en', style : google.loader.themes.ESPRESSO});
				google.setOnLoadCallback(function() {
					var customSearchOptions = {};
					var customSearchControl = new google.search.CustomSearchControl(
						'017592292597633553207:cevcvmtmivk', customSearchOptions);
					customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
				    var options = new google.search.DrawOptions();
					options.enableSearchboxOnly("http://revolt.axismaps.com/search.html");
			    	customSearchControl.draw('cse-search-form', options);
			  	}, true);
			</script>
		</div>
	</body>
</html>