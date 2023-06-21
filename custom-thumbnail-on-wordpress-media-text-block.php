<?php
/**
 * Plugin Name: Custom Thumbnail on Wordpress Media Text Block
 * Plugin URI: https://genero.fi/
 * Description: Adds custom thumbnail field to core/media-text block.
 * Version: 1.0.0
 * Author: Shayan Abbas
 * Author URI: https://github.com/shayanabbas/
 * License: GPL 3.0 License
 */


add_action( 'admin_enqueue_scripts', function () {
    wp_enqueue_script(
        'custom-thumbnail-on-wordpress-media-text-block',
        plugins_url( 'custom-thumbnail-on-wordpress-media-text-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );
});

add_filter('render_block', function ($block_content, $block) {
    if ($block['blockName'] !== 'core/media-text' || !isset($block['attrs']['thumbnailUrl'])) {
        return $block_content;
    }

    $thumbnailUrl = esc_attr($block['attrs']['thumbnailUrl']);
    $block_content = str_replace('<video ', '<video poster="'.$thumbnailUrl.'" ', $block_content);

    return $block_content;
}, 10, 2);

