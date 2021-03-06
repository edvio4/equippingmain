<?php
/**
 * Theme Hook Alliance hook stub list.
 *
 * @package        themehookalliance
 * @version        1.0-draft
 * @since        1.0-draft
 * @license        http://www.gnu.org/licenses/old-licenses/gpl-2.0.html GNU General Public License, v2 (or newer)
 */

define( 'THA_HOOKS_VERSION', '1.0-draft' );
add_theme_support( 'tha_hooks', array( 'all' ) );

/*
 *
 * @param bool $bool true
 * @param array $args The hook type being checked
 * @param array $registered All registered hook types
 *
 * @return bool
 */
function tha_current_theme_supports( $bool, $args, $registered ) {
	return in_array( $args[0], $registered[0] ) || in_array( 'all', $registered[0] );
}

add_filter( 'current_theme_supports-tha_hooks', 'tha_current_theme_supports', 10, 3 );

/**
 * HTML <html> hook
 * Special case, useful for <DOCTYPE>, etc.
 * $tha_supports[] = 'html;
 */
function tha_html_before() {
	do_action( 'tha_html_before' );
}

/**
 * HTML <body> hooks
 * $tha_supports[] = 'body';
 */
function tha_body_top() {
	do_action( 'tha_body_top' );
}

function tha_body_bottom() {
	do_action( 'tha_body_bottom' );
}

/**
 * HTML <head> hooks
 *
 * $tha_supports[] = 'head';
 */
function tha_head_top() {
	do_action( 'tha_head_top' );
}

function tha_head_bottom() {
	do_action( 'tha_head_bottom' );
}

/**
 * Semantic <header> hooks
 *
 * $tha_supports[] = 'header';
 */
function tha_header_before() {
	do_action( 'tha_header_before' );
}

function tha_header_after() {
	do_action( 'tha_header_after' );
}

function tha_header_top() {
	do_action( 'tha_header_top' );
}

function tha_header_bottom() {
	do_action( 'tha_header_bottom' );
}

/**
 * Semantic <content> hooks
 *
 * $tha_supports[] = 'content';
 *
 * @param $options array to be passed along
 */
function tha_content_before( $options = array() ) {
	do_action( 'tha_content_before', $options );
}

function tha_content_after() {
	do_action( 'tha_content_after' );
}

function tha_content_top() {
	do_action( 'tha_content_top' );
}

function tha_content_bottom() {
	do_action( 'tha_content_bottom' );
}

/**
 * Semantic <entry> hooks
 *
 * $tha_supports[] = 'entry';
 */
function tha_entry_before() {
	do_action( 'tha_entry_before' );
}

function tha_entry_after() {
	do_action( 'tha_entry_after' );
}

function tha_entry_top() {
	do_action( 'tha_entry_top' );
}

function tha_entry_bottom() {
	do_action( 'tha_entry_bottom' );
}

/**
 * Comments block hooks
 *
 * $tha_supports[] = 'comments';
 */
function tha_comments_before() {
	do_action( 'tha_comments_before' );
}

function tha_comments_after() {
	do_action( 'tha_comments_after' );
}

/**
 * Semantic <sidebar> hooks
 *
 * $tha_supports[] = 'sidebar';
 */
function tha_sidebars_before() {
	do_action( 'tha_sidebars_before' );
}

function tha_sidebars_after() {
	do_action( 'tha_sidebars_after' );
}

function tha_sidebar_top() {
	do_action( 'tha_sidebar_top' );
}

function tha_sidebar_bottom() {
	do_action( 'tha_sidebar_bottom' );
}

/**
 * Semantic <footer> hooks
 *
 * $tha_supports[] = 'footer';
 */
function tha_footer_before() {
	do_action( 'tha_footer_before' );
}

function tha_footer_after() {
	do_action( 'tha_footer_after' );
}

function tha_footer_top() {
	do_action( 'tha_footer_top' );
}

function tha_footer_bottom() {
	do_action( 'tha_footer_bottom' );
}