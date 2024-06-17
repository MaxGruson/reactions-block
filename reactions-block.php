<?php
/**
 * Plugin Name:       Reactions Block
 * Description:       A block to display reactions and reviews by members of the audience and press. A reaction includes the author, publication, quote and link.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.4
 * Author:            <a href="https://max.gruson.studio" target="_blank">Max Gruson</a>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       reactions-block
 *
 * @package           maxgruson/reactions-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function reactions_block_init() {
	register_block_type( __DIR__ . '/build/reactions' );
	register_block_type( __DIR__ . '/build/reaction' );
}
add_action( 'init', 'reactions_block_init' );
