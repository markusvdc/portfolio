// banner
const swiper = new Swiper('.banner', {
	loop: true,
	speed: 1200,
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
	},
	navigation: {
		nextEl: '.banner__arrow.next',
		prevEl: '.banner__arrow.prev',
	},
});

// questions
const questionItems = document.querySelectorAll(".questions__item");

questionItems.forEach(questionItem => {
	const questionButton = questionItem.querySelector(".questions__question");
	const questionAnswer = questionItem.querySelector(".questions__answer");

	questionButton.addEventListener("click", () => {
		const isOpen = questionItem.classList.contains("open");

		// fecha todos
		questionItems.forEach(item => {
			item.classList.remove("open");
			item.classList.add("closed");
			item.querySelector(".questions__answer").style.maxHeight = null;
			item.querySelector(".questions__question").setAttribute("aria-expanded", "false");
		});

		// abre o clicado (se não tava aberto)
		if (!isOpen) {
			questionItem.classList.add("open");
			questionItem.classList.remove("closed");
			questionAnswer.style.maxHeight = questionAnswer.scrollHeight + "px";
			questionButton.setAttribute("aria-expanded", "true");
		}
	});
});

// scroll header
window.addEventListener('scroll', () => {
	const header = document.querySelector('.header');

	if (window.scrollY >= 200) {
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
});

// modal
const modal = document.getElementById('modal');
const modalOpen = document.querySelectorAll('.modal__open');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');

modalOpen.forEach(button => {
	button.addEventListener('click', () => {
		modal.classList.add('active');
		document.body.classList.add('scroll-inactive');
	});
});

function closeModal() {
	modal.classList.remove('active');
	document.body.classList.remove('scroll-inactive');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// menu hamburger
const headerHamburger = document.querySelector('.header__hamburger');
const menu = document.querySelector('.menu');

headerHamburger.addEventListener('click', () => {
	headerHamburger.classList.toggle('active');
	document.body.classList.toggle('scroll-inactive');
	menu.classList.toggle('active');
});

// menu links
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		headerHamburger.classList.remove('active');
		document.body.classList.remove('scroll-inactive');
		menu.classList.remove('active');
	});
});