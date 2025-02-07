document.addEventListener('DOMContentLoaded', () => {
	// Инициализация GSAP и ScrollTrigger
	gsap.registerPlugin(ScrollTrigger);

	const showElementYX = document.querySelectorAll('.js-light-show');

	showElementYX.forEach((element) => {
		const delay = parseFloat(element.dataset.delay) || 0;
		const duration = parseFloat(element.dataset.duration) || 0.8;
		const x = element.dataset.showX ? parseFloat(element.dataset.showX) || 0 : null;
		const y = element.dataset.showY ? parseFloat(element.dataset.showY) || 0 : null;
		const z = element.dataset.showZ ? parseFloat(element.dataset.showZ) || 0.9 : null; // Добавлен z
		const start = element.dataset.start || 'top 100%';
		const end = element.dataset.end || 'top 50%';

		const from = { opacity: 0 };
		if (x !== null) from.x = x; // Если указан data-show-x
		if (y !== null) from.y = y; // Если указан data-show-y
		if (z !== null) from.scale = z; // Если указан data-show-z

		// Финальное состояние
		const to = { opacity: 1, x: 0, y: 0, scale: 1, duration: duration, delay: delay };

		gsap.fromTo(
			element,
			from,
			{
				...to,
				scrollTrigger: {
					trigger: element,
					start: start,
					end: end,
					toggleActions: "play none none none",
				},
			}
		);
	});

	const getElement = (context, selector) => {
		if (!context && !selector) {
			return null;
		}
		return context.querySelector(selector);
	};

	// list slider

	const wildSlider = document.querySelectorAll('[data-slider="wild-slider"]');

	if(wildSlider !== null) {

		wildSlider.forEach((el) => {
			const wildSwiper = new Swiper(el.querySelector('.swiper-container'), {
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				simulateTouch: true,
				speed: 700,
				lazy: {
					loadOnTransitionStart: true,
					loadPrevNextAmount: 2,
					loadPrevNext: true
				},
				loop: false,
				followFinger: true,
				spaceBetween: 4,
				navigation: {
					nextEl: getElement(el.closest('[data-slider="wild-slider"]'), '.js-next-swiper'),
					prevEl: getElement(el.closest('[data-slider="wild-slider"]'), '.js-prev-swiper'),
					disabledClass: 'swiper-lock'
				},
				breakpoints: {
					0: {
						slidesPerView: 2,
						slidesPerGroup: 1,
						spaceBetween: 10
					},
					1200: {
						slidesPerView: 3,
						slidesPerGroup: 1,
						spaceBetween: 10
					}
				},
			});

		})

	}

	// card slider

	const cardSlider = document.querySelector('[data-slider="card-slider"]');

	if(cardSlider !== null) {
		const thumbsSwiper = new Swiper(document.querySelector('.js-card-slider .js-thumb-slider'), {
			slidesPerView: 3,
			spaceBetween: 10,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
		});

		const cardSwiper = new Swiper(cardSlider.querySelector('.js-swiper-container'), {
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			simulateTouch: true,
			speed: 500,
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			lazy: {
				loadOnTransitionStart: true,
				loadPrevNextAmount: 2,
				loadPrevNext: true
			},
			slidesPerView: 1,
			slidesPerGroup: 1,
			loop: false,
			followFinger: true,
			spaceBetween: 4,
			navigation: {
				nextEl: getElement(cardSlider.closest('[data-slider="card-slider"]'), '.js-next-swiper'),
				prevEl: getElement(cardSlider.closest('[data-slider="card-slider"]'), '.js-prev-swiper'),
				disabledClass: 'swiper-lock'
			},
			thumbs: {
				swiper: thumbsSwiper
			},
		});
	}

	// burger-menu
	const openMenu = document.querySelector('.js-open-menu');
	const closeMenu = document.querySelector('.js-close-menu');
	const mobMenu = document.querySelector('.js-mob-menu');

	openMenu.addEventListener('click', () => {
		mobMenu.classList.add('show')
		document.body.classList.add('overflow-hidden');
	})

	closeMenu.addEventListener('click', () => {
		mobMenu.classList.remove('show');
		document.body.classList.remove('overflow-hidden');
	})

	// Открыть поиск
	const openSearch = document.querySelector('.js-open-search');
	const mobSearch = document.querySelector('.js-block-search');

	// Открытие блока поиска при клике на кнопку
	openSearch.addEventListener('click', (e) => {
		e.stopPropagation(); // Чтобы клик не срабатывал на document
		mobSearch.classList.add('show');
	});

	// Закрытие блока при клике вне его
	document.addEventListener('click', (e) => {
		if (!mobSearch.contains(e.target) && !openSearch.contains(e.target)) {
			mobSearch.classList.remove('show');
		}
	});

	window.addEventListener('scroll', () => {
		const header = document.querySelector('header');

		if (window.scrollY > 5) {
			header.classList.add('sticky-header');
		} else {
			header.classList.remove('sticky-header');
		}
	});

	// padding top body
	function adjustBodyPadding() {
		const header = document.querySelector('header');
		const body = document.body;

		if (header) {
			const headerHeight = header.offsetHeight;
			body.style.paddingTop = `${headerHeight}px`;
		}
	}

	window.addEventListener('load', adjustBodyPadding);

	window.addEventListener('resize', adjustBodyPadding);
});
