<?php
/*
   Plugin Name: Slick Write
   Plugin URI:  http://www.slickwrite.com/
   Description: This extension makes it easier to proof your writing with the Slick Write web service. Analyze your work's flow, check for the passive voice, eliminate unnecessary adverbs, and much more. It works with Wordpress, Google Docs, selections, and most text boxes.
   Author:      RussTek LLC
   Version:     1.0.2
   Author URI:  http://www.slickwrite.com/
*/

function slickwrite_addButton() {
	if(!current_user_can('edit_posts') && !current_user_can('edit_pages')) return;
	add_filter('mce_external_plugins', 'slickwrite_loadPlugin');
	add_filter('mce_buttons', 'slickwrite_registerButton');
}

function slickwrite_loadPlugin($arrPlugins) {
	$arrPlugins['slickwrite'] = WP_PLUGIN_URL . '/slick-write/tinymce/editor_plugin.js';
	
	return $arrPlugins;
}

function slickwrite_registerButton($arrButtons) {
	array_push($arrButtons, 'separator', 'slickwrite');
	
	return $arrButtons;
}

add_action('init', 'slickwrite_addButton');