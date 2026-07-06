
document.addEventListener('DOMContentLoaded', function(){
	const links = document.querySelectorAll('.topnav a[href^="#"]');
	const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

	
	links.forEach(link =>{
		link.addEventListener('click', function(e){
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if(target){
				target.scrollIntoView({behavior:'smooth',block:'start'});
				history.replaceState(null,'',this.getAttribute('href'));
			}
			
			const ul = document.getElementById('topnav-list');
			if(ul.classList.contains('open')) ul.classList.remove('open');
			const btn = document.querySelector('.nav-toggle');
			if(btn) btn.setAttribute('aria-expanded','false');
		});
	});

	
	function onScroll(){
		const scrollPos = window.scrollY + 80; 
		let current = sections[0];
		for(const sec of sections){
			if(sec.offsetTop <= scrollPos) current = sec;
		}
		links.forEach(a=> a.classList.remove('active'));
		const activeLink = Array.from(links).find(l=> l.getAttribute('href') === ('#'+current.id));
		if(activeLink) activeLink.classList.add('active');
	}
	window.addEventListener('scroll', onScroll, {passive:true});
	onScroll();

	
	const toggle = document.querySelector('.nav-toggle');
	const list = document.getElementById('topnav-list');
	if(toggle && list){
		toggle.addEventListener('click', ()=>{
			const open = list.classList.toggle('open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}

	const slides = document.querySelectorAll('.slide');
	const dots = document.querySelectorAll('.dot');
	const prevBtn = document.querySelector('.carousel-nav.prev');
	const nextBtn = document.querySelector('.carousel-nav.next');
	let currentIndex = 0;

	function updateCarousel(index) {
		slides.forEach((slide, idx) => {
			slide.classList.toggle('active', idx === index);
		});
		dots.forEach((dot, idx) => {
			dot.classList.toggle('active', idx === index);
		});
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % slides.length;
		updateCarousel(currentIndex);
	}

	function showPrev() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		updateCarousel(currentIndex);
	}

	if (nextBtn) nextBtn.addEventListener('click', showNext);
	if (prevBtn) prevBtn.addEventListener('click', showPrev);

dots.forEach(dot => {
		dot.addEventListener('click', () => {
			currentIndex = Number(dot.dataset.index);
			updateCarousel(currentIndex);
		});
	});

	setInterval(showNext, 5500);
});
