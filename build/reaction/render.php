<?php
/**
 * Reaction block template.
 *
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 *
 * @package maxgruson/reactions-block
 */

$author      = $attributes['author'] ?? '';
$publication = $attributes['publication'] ?? '';
$quote       = $attributes['quote'] ?? '';
$link        = $attributes['link'] ?? '';
?>
<li <?php echo get_block_wrapper_attributes( array( 'class' => 'reactions-block__reaction' ) ); ?>>
	<figure>
		<?php if ( ! empty( $link ) ) { ?>
		<a target="_blank" href="<?php echo esc_url( $link['url'] ); ?>">
		<?php } else { ?>
		<div>
		<?php } ?>
			<blockquote cite="<?php echo esc_url( $link['url'] ); ?>">
				<p><?php echo wp_kses_post( $quote ); ?></p>
			</blockquote>
			<figcaption>
				&mdash; <span><?php echo wp_kses_post( $author ); ?></span>, 
				<cite><?php echo wp_kses_post( $publication ); ?></cite> <?php echo ( isset( $link['url'] ) ? '&#8599;' : '' ); ?>
			</figcaption>
		<?php if ( ! empty( $link ) ) { ?>
		</a>
		<?php } else { ?>
		</div>
		<?php } ?>
	</figure>
</li>
