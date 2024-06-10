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

$author        = $attributes['author'] ?? '';
$publication   = $attributes['publication'] ?? '';
$quote         = $attributes['quote'] ?? '';
$reaction_link = $attributes['link'] ?? '';
?>
<li <?php echo get_block_wrapper_attributes( array( 'class' => 'reactions-block__reaction' ) ); ?>>
	<figure>
		<?php if ( ! empty( $reaction_link ) ) { ?>
		<a target="_blank" href="<?php echo esc_url( $reaction_link['url'] ); ?>">
		<?php } else { ?>
		<div>
		<?php } ?>
			<blockquote cite="
				<?php
				if ( ! empty( $reaction_link ) ) {
					echo esc_url( $reaction_link['url'] );
				}
				?>
			">
				<p><?php echo wp_kses_post( $quote ); ?></p>
			</blockquote>
			<figcaption>
				&mdash; <span><?php echo wp_kses_post( $author ); ?></span>, 
				<cite><?php echo wp_kses_post( $publication ); ?></cite><span class="link-arrow"><?php echo ( isset( $link['url'] ) ? '&#8599;' : '' ); ?></span>
			</figcaption>
		<?php if ( ! empty( $reaction_link ) ) { ?>
		</a>
		<?php } else { ?>
		</div>
		<?php } ?>
	</figure>
</li>
