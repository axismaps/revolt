<?php get_header(); ?>
	<div id="content">
		<div id="main-content">
			<?php if (have_posts()) : ?>
			 <?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
	<?php /* If this is a category archive */ if (is_category()) { ?>
			<p class="string"><?php _e('Archive of articles classified as','vostok'); ?>' "<strong><?php echo single_cat_title(); ?></strong>"</p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
	 	  <?php /* If this is a daily archive */ } elseif (is_day()) { ?>
			<p class="string"><?php _e('Archive of published articles on','vostok'); ?> <?php the_time('F jS, Y'); ?></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
		 <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
			<p class="string"><?php _e('Archive of published articles on','vostok'); ?> <strong><?php the_time('F, Y'); ?></strong></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
			<p class="string"><?php _e('Archive of published articles on','vostok'); ?> <strong><?php the_time('Y'); ?></strong></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
		  <?php /* If this is an author archive */ } elseif (is_author()) { ?>
			<p class="string"><?php _e('Archive of published articles by ','vostok'); ?></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
			<p class="string"><?php _e('Blog Archives','vostok'); ?></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
			<?php } ?>
			<?php while (have_posts()) : the_post(); ?>
			<div class="post"  id="post-<?php the_ID(); ?>">
				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
				<span class="date"><?php the_time('F j, Y') ?></span>
				<div class="entry">
					<?php the_content(__('Read the rest of this article','vostok').' &raquo;'); ?>
				</div>
				<span class="number-of-comments"><a href="<?php the_permalink() ?>#comments" title="title"><?php comments_number(__('No Comments','vostok'), __('1 Comment','vostok'), __('% Comments','vostok'));?></a></span>
			</div>
			<?php endwhile; ?>
			<div class="pagination clearfix">
				<div class="prev"><?php next_posts_link('&laquo; '.__('Previous articles','vostok')) ?></div>
				<div class="next"><?php previous_posts_link(__('More recent articles','vostok').' &raquo;') ?></div>
			</div>
		<?php else : ?>
			<h2>Not found</h2>
			<?php include (TEMPLATEPATH . '/searchform.php'); ?>
		<?php endif; ?>
		</div><!-- close:main-content -->
	<?php get_sidebar(); ?>
	</div><!-- close:content -->
<?php get_footer(); ?>