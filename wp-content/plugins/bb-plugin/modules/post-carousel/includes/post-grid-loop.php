<div class="fl-post-carousel-post" itemscope="itemscope" itemtype="<?php FLPostGridModule::schema_itemtype(); ?>">

	<?php FLPostGridModule::schema_meta(); ?>

	<?php if(has_post_thumbnail() && $settings->show_image) : ?>
	<div class="fl-post-carousel-image">
		<?php $module->render_img( get_the_id() ) ?>
	</div>
	<?php endif; ?>

	<div class="fl-post-carousel-text">

		<h2 class="fl-post-carousel-title" itemprop="headline">
			<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
		</h2>

		<?php if($settings->show_author || $settings->show_date) : ?>
		<div class="fl-post-carousel-meta">
			<?php if($settings->show_author) : ?>
				<span class="fl-post-carousel-author">
				<?php

				printf(
					_x( 'by %s', '%s stands for author name.', 'fl-builder' ), '<span>' . get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) . '</span>'
				);

				?>
				</span>
			<?php endif; ?>
			<?php if($settings->show_date) : ?>
				<?php if($settings->show_author) : ?>
					<span> | </span>
				<?php endif; ?>
				<span class="fl-post-feed-date">
					<?php FLBuilderLoop::post_date($settings->date_format); ?>
				</span>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<?php if($settings->show_content || $settings->show_more_link) : ?>
		<div class="fl-post-carousel-content">
			<?php if($settings->show_content) : ?>
			<?php the_excerpt(); ?>
			<?php endif; ?>
			<?php if($settings->show_more_link) : ?>
			<a class="fl-post-carousel-more" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php echo $settings->more_link_text; ?></a>
			<?php endif; ?>
		</div>
		<?php endif; ?>

	</div>

</div>
