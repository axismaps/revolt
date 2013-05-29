<?php get_header(); ?>
	<div id="content">
		<div id="main-content">
		<?php if (have_posts()) : ?>
			<?php while (have_posts()) : the_post(); ?>
				<div class="post" id="post-<?php the_ID(); ?>">
					<h1><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h1>
					<span class="date">by <?php the_author(); ?> on <?php the_time(__('F j, Y','vostok')) ?></span>
					<div class="entry">
						<?php the_content(__('Read the rest of this article','vostok').' &raquo;'); ?>
					</div>
					<span class="number-of-comments"><a href="<?php the_permalink() ?>#comments" title="title"><?php comments_number(__('No Comments','vostok'), __('1 Comment','vostok'), __('% Comments','vostok'));?></a></span>
				</div><!-- close:post -->
			<?php endwhile; ?>
			<div class="pagination clearfix">
				<div class="prev"><?php next_posts_link('&laquo; '.__('Previous articles','vostok')) ?></div>
				<div class="next"><?php previous_posts_link(__('More recent articles','vostok').' &raquo;') ?></div>
			</div>
		<?php else : ?>
			<p class="string"><?php _e('The page you are looking for doesn\'t exist. Sorry.','vostok'); ?></p>
			<a href="<?php echo get_option('home'); ?>/" class="back"><?php _e('Back home','vostok'); ?></a>
		<?php endif; ?>
		</div><!-- close:main-content -->
		<?php get_sidebar(); ?>
	</div><!-- close:content -->
<?php get_footer(); ?>