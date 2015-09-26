/**
 * Example of a WP-AppKit custom transition library.
 * Implements a very basic (and ugly!) "left/right sliding" transition example.
 */
define( function ( require ) {

	"use strict";

	var $ = require( 'jquery' );

	var transitions = { };

	var config = {
		delay: 600
	};

	/**
	 * Defines what to do with DOM when a "left" transition direction is triggered.
	 * The "left" transition is triggered when we can imagine that we would have slid our 
	 * finger to the left to make the transition.
	 * See theme-app.js::getTransitionDirection() to see on what conditions this happens.
	 * And http://uncategorized-creations.com/wp-appkit/doc/#359-page-transitions for doc.
	 * 
	 * @param {jQuery DOM element} $wrapper : wrapper DOM element ("#app-content-wrapper")
	 * @param {jQuery DOM element} $current : DOM element for the screen we're leaving.
	 * @param {jQuery DOM element} $next : DOM element for the screen that is (going to be) displayed after transition.
	 * @param {jQuery deffered Object} $deferred : must be resolved at the end of the transition.
	 */
	transitions.slideLeft = function ( $wrapper, $current, $next, $deferred ) {
		
		//Set $next DOM element to the right of the screen (invisible) :
		$next.css( {
			position: 'absolute',
			top: 0,
			left: '100%',
			height: '100%',
			width: '100%'
		} );

		//Add $next to the end of the wrapper (still invisible)
		$wrapper.append( $next );

		//Animate $wrapper to make $next appear from left to right
		$wrapper.animate(
				{ left: '-100%' },
				config.delay,
				'swing',
				function () {
					// remove the screen that has been transitioned out
					$current.remove();

					// remove the CSS transition
					$wrapper.attr( 'style', '' );

					// remove the position absoluteness
					$next.css( {
						top: '',
						left: '',
						position: ''
					} );

					$deferred.resolve();
				} );
	}

	/**
	 * Defines what to do with DOM when a "right" transition direction is triggered.
	 * The "right" transition is triggered when we can imagine that we would have slid our 
	 * finger to the right to make the transition.
	 * See theme-app.js::getTransitionDirection() to see on what conditions this happens.
	 * And http://uncategorized-creations.com/wp-appkit/doc/#359-page-transitions for doc.
	 * 
	 * @param {jQuery DOM element} $wrapper : wrapper DOM element ("#app-content-wrapper")
	 * @param {jQuery DOM element} $current : DOM element for the screen we're leaving.
	 * @param {jQuery DOM element} $next : DOM element for the screen that is (going to be) displayed after transition.
	 * @param {jQuery deffered Object} $deferred : must be resolved at the end of the transition.
	 */
	transitions.slideRight = function ( $wrapper, $current, $next, $deferred ) {
		
		//Set $next DOM element to the left of the screen (invisible) :
		$next.css( {
			position: 'absolute',
			top: 0,
			left: '-100%',
			height: '100%',
			width: '100%'
		} );

		//Add $next to the right of the wrapper (still invisible)
		$wrapper.prepend( $next );

		//Animate $wrapper to make $next appear from left to right
		$wrapper.animate(
				{ left: '100%' },
				config.delay,
				'swing',
				function () {
					// remove the screen that has been transitioned out
					$current.remove();

					// remove the CSS transition
					$wrapper.attr( 'style', '' );

					// remove the position absoluteness
					$next.css( {
						top: '',
						left: '',
						position: ''
					} );

					$deferred.resolve();
				} );
	};
	
	/**
	 * Defines what to do with DOM when a "replace" transition direction is triggered.
	 * The "replace" transition is triggered when no other transition type could be identified.
	 * See theme-app.js::getTransitionDirection() to see on what conditions this happens.
	 * And http://uncategorized-creations.com/wp-appkit/doc/#359-page-transitions for doc.
	 * 
	 * @param {jQuery DOM element} $wrapper : wrapper DOM element ("#app-content-wrapper")
	 * @param {jQuery DOM element} $current : DOM element for the screen we're leaving.
	 * @param {jQuery DOM element} $next : DOM element for the screen that is (going to be) displayed after transition.
	 * @param {jQuery deffered Object} $deferred : must be resolved at the end of the transition.
	 */
	transitions.replace = function ( $wrapper, $current, $next, $deferred ) {
		$current.remove();
		$wrapper.empty().append( $next );
		$deferred.resolve();
	};

	return transitions;
} );