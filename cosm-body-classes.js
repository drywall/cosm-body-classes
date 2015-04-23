/*!
 * Cosm Body Classes v1.0.0
 * https://github.com/drywall/cosm-body-classes
 *
 * Copyright 2015 Cornershop Creative, LLC
 * Released under the MIT license
 */
jQuery(document).ready(function() {

	function addBodyClass() {
		var
			page = window.location.pathname,
			addedClass = null,
			classes = {
				'getLocal'              : 'lookup',
				'supporter/unsubscribe' : 'unsubscribe',
				'profile'               : 'profile',
				'blastContent'          : 'blasts',
				'/letter'               : 'letter-to-editor',
				'/event/'               : 'event',
				'/my/'                  : 'my-salsa',
				'/shop'                 : 'shop',
				'/signup'               : 'signup',
				'/tellafriend'          : 'tellafriend',
				'/thank_you_page'       : 'thankyou',
				'/questionnaire/'       : 'questionnaire',
				'/action3'              : 'action',
				'/viewCart.jsp'         : 'shop-cart',
				'/item.jsp'             : 'shop-item'
			};

		// allow globals to change defaults
		if ( typeof window.salsaClasses === 'object' ) {
			jQuery.extend( classes, window.salsaClasses );
		}

		// loop thru and add to body
		// stop once we've hit one, as a page shouldn't be multiple
		jQuery.each( classes, function( test, className ){
			if ( page.indexOf(test) > 1 ) {
				jQuery('body').addClass(className);
				addedClass = className;
				return false;
			}
		});

		// if we're on an action page, let's try to figure out the action type
		if ( addedClass == 'action' ) {
			// blind targeted actions have a different form action
			$form = jQuery('form[onsubmit]');
			if ( $form.length && $form.attr('action').indexOf('blind_submit') > 1 ) {
				jQuery('body').addClass('action-blind');
			}
			// petitions have a petitionContent element
			// but it doesn't exist until after retrieveAllData has completed
			// which we can test with #sign-page's visibility
			else if ( jQuery('#sign-page').is(':visible') ) {
				if ( jQuery('.petitionContent').length ) {
					jQuery('body').addClass('action-petition');
				} else {
					jQuery('body').addClass('action-targeted-or-multi');
				}
			}
			// if #sign-page is still hidden, the XHR hasn't finished
			// let's listen in and then react!
			else {
				jQuery(document).ajaxSuccess(function(event,xhr,settings) {
					// need to listen to the call that fetches the ajax
					if ( settings.url.indexOf('actionJSON.sjs') !=  -1 ) {
						// let's look for "Style":"Targeted","Petition" or "Multi-Content"
						if ( xhr.response.indexOf('"Style":"Targeted"') > 1 ) {
							jQuery('body').addClass('action-targeted');
						} else if ( xhr.response.indexOf('"Style":"Petition"') > 1 ) {
							jQuery('body').addClass('action-petition');
						} else if ( xhr.response.indexOf('"Style":"Multi-Content"') > 1 ) {
							jQuery('body').addClass('action-multi');
						} else {
							jQuery('body').addClass('action-unknown');
						}
					}
				});
			}
		} // end action special cases

	}

	addBodyClass();

});