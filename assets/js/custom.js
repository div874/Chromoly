/* Global jQuery */

/* Contents
// ------------------------------------------------>
     1. wow animation
     2. Menu Mobile
     3. Cart
     4. Search
     5. Owl Slider
     6. Light Box
     7. Fixed Header
*/

(function ($) {
	"use strict";





	/* ------------------  2. Menu Mobile ------------------ */
	var $menu_show = $('.mobile-toggle'),
		$menu = $('header #menu-main'),
		$list = $("ul.nav-menu li a"),
		$menu_list = $('header li.has-dropdown'),
		$menu_ul = $('ul.sub-menu'),
		$cart_model = $('.cart-model'),
		$cart_link = $('#cart-link'),
		$search_bar = $('#search_bar'),
		$search_close = $('.close-search'),
		$search_bot = $('#search-header'),
		$fixed_header = $('#fixed-header'),
		$fixed_header_dark = $('#fixed-header-dark'),
		$sticky_content = $('.sticky-content'),
		$sticky_sidebar = $('.sticky-sidebar');

	$menu_show.on("click", function (e) {
		$menu.slideToggle();
	});
	$list.on("click", function (e) {
		var submenu = this.parentNode.getElementsByTagName("ul").item(0);
		if (submenu != null) {
			event.preventDefault();
			$(submenu).slideToggle();
		}
	});



	/* ------------------  3. Cart ------------------ */
	$cart_link.on("click", function (e) {
		$cart_model.slideToggle("fast");
	});

	$(window).on("click", function (e) {
		$cart_model.hide("fast");
	});
	$cart_link.on("click", function (e) {
		event.stopPropagation();
	});





	/* ------------------  4. Search ------------------ */
	$search_bot.on("click", function (e) {
		$search_bar.slideToggle("fast");
	});
	$search_close.on("click", function (e) {
		$search_bar.hide("fast");
	});




	/* ------------------  5.Owl Slider ------------------ */
	var owl2 = $(".slider-1");
	var owl3 = $('.travelers-say-3');
	var owl = $(".testimonial-carousel");
	owl.owlCarousel({
		items: 3, //10 items above 1000px browser width
		itemsDesktop: [1000, 3], //5 items between 1000px and 901px
		itemsDesktopSmall: [900, 3], // betweem 900px and 601px
		itemsTablet: [600, 1], //2 items between 600 and 0
		slideSpeed: 1000,
		autoPlay: true,
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});
	owl2.owlCarousel({
		items: 1, //10 items above 1000px browser width
		itemsDesktop: [1000, 1], //5 items between 1000px and 901px
		itemsDesktopSmall: [900, 1], // betweem 900px and 601px
		itemsTablet: [600, 1], //2 items between 600 and 0
		slideSpeed: 1000,
		autoPlay: true,
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});
	owl3.owlCarousel({
		dotsContainer: '#carousel-custom-dots',
		items: 3, //10 items above 1000px browser width
		itemsDesktop: [1000, 3], //5 items between 1000px and 901px
		itemsDesktopSmall: [900, 3], // betweem 900px and 601px
		itemsTablet: [600, 1], //2 items between 600 and 0
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});




	/* ------------------  6. Light Box ------------------ */
	$(document).on('click', '[data-toggle="lightbox"]', function (event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});




	/* ------------------  7. Fixed Header ------------------ */
	$(window).on("scroll", function () {
		if ($(window).scrollTop() >= 50) {
			$fixed_header.addClass('fixed-header');
			$fixed_header_dark.addClass('fixed-header-dark');
		} else {
			$fixed_header.removeClass('fixed-header');
			$fixed_header_dark.removeClass('fixed-header-dark');
		}
	});

	$('a[href="#search"]').on("click", function (event) {
		event.preventDefault();
		$("#search").addClass("open");
		$('#search > form > input[type="search"]').focus();
	});

	$("#search, #search button.close").on("click keyup", function (event) {
		if (
			event.target == this ||
			event.target.className == "close" ||
			event.keyCode == 27
		) {
			$(this).removeClass("open");
		}
	});

	$(document).on("submit", ".js-email-form", function (event) {
		event.preventDefault();

		var $form = $(this);
		var formNode = $form.get(0);
		var $submitButton = $form.find('button[type="submit"]');
		var $status = $form.find('.form-status');
		var formData = new FormData(formNode);
		var pageUrl = window.location.href;

		formData.set('page_url', pageUrl);
		$submitButton.prop('disabled', true);
		$status.text('Sending enquiry...');

		fetch($form.attr('action'), {
			method: 'POST',
			body: formData,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
			.then(function (response) {
				return response.json().catch(function () {
					return {
						success: false,
						message: 'Unexpected server response.'
					};
				}).then(function (data) {
					return {
						ok: response.ok,
						data: data
					};
				});
			})
			.then(function (result) {
				$status.text(result.data.message || 'Unable to send enquiry.');

				if (result.ok && result.data.success) {
					formNode.reset();
				}
			})
			.catch(function () {
				$status.text('Unable to send enquiry right now. Please call or email us directly.');
			})
			.finally(function () {
				$submitButton.prop('disabled', false);
			});
	});


}(jQuery));
