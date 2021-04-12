$(function(){
	var mobile = false;
	var winW = $(window).outerWidth();
	var winH = $(window).outerHeight();
	var section = 0;

	if(winW <= 750){
		mobile = true;
	}

	var pageSet_1 = {
		slidesPerView: "auto",
		direction: "vertical",
		grabCursor: true,
    mousewheel: true,
		spaceBetween: 0,
		speed: 600
	}

	var pageSet_2 = {
		slidesPerView: "auto",
		direction: "vertical",
		grabCursor: true,
    mousewheel: true,
		spaceBetween: 0,
		freeMode: true,
		speed: 600
	}

	var fullpage = new Swiper('#container', pageSet_1);

	var mainVisual = new Swiper("#mainVisual", {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
    effect: 'fade',
		autoplay:{
			delay: 3000
		},
		pagination: {
			el: '#mainVisual .swiper-pagination',
			type: '#mainVisual progressbar',
		},
	});

	mainVisual.on("slideChange", function(){
		var current = mainVisual.realIndex+1;
		var total = $('#mainVisual .swiper-slide:not(.swiper-slide-duplicate)').length;

		$("#mainVisual .pagingNum").html("<strong>"+current+"</strong>/"+total);
	});

	// 콘텐츠 체크
	function contentCheck(){
		section = 0;
		$(".section").removeClass("section_height");
		$(".section").each(function(){
			var contH = $(this).children(".inner").outerHeight();
	
			if($(this).attr("id") != "section1" && $(this).attr("id") != "section10"){
				if(section < contH) section = contH;
				if(winH < contH) $(this).addClass("section_height");
			}
		});

		if(winH <= section){
			fullpage.destroy();
			fullpage = new Swiper('#container', pageSet_2);
		}else{
			fullpage.destroy();
			fullpage = new Swiper('#container', pageSet_1);
		}
	}
	contentCheck();

	$("#wrap").addClass("pos1");
	fullpage.on("transitionEnd", function(){
		var target = fullpage.realIndex+1;

		$("#wrap").removeAttr("class");
		$("#wrap").addClass("pos"+target);

		if(2 <= target && target < 4){
			$("#gnb li").removeClass("on");
			$("#gnb li:eq(0)").addClass("on");
		}else if(target == 4){
			$("#gnb li").removeClass("on");
			$("#gnb li:eq(1)").addClass("on");
		}else if(5 <= target && target < 9){
			$("#gnb li").removeClass("on");
			$("#gnb li:eq(2)").addClass("on");
		}else if(target == 9){
			$("#gnb li").removeClass("on");
			$("#gnb li:eq(3)").addClass("on");
		}else if(target == 10){
			$("#gnb li").removeClass("on");
			$("#gnb li:eq(4)").addClass("on");
		}else{
			$("#gnb li").removeClass("on");
		}
	});

	

	var swiper = new Swiper('#section10 .swiper-container', {
		loop: true,
		slidesPerView: 'auto',
    centeredSlides: true,
		spaceBetween: 0,
		pagination: {
				el: '#section10 .swiper-pagination',
				clickable: true,
		}
	});

	// 탭 콘텐츠
	$(".contTab a").click(function(){
		var target = $(this).attr("data-tab");

		$(this).addClass("active").siblings().removeClass("active");
		$("#"+target).addClass("active").siblings(".tabCont").removeClass("active");
	});

	// 맨 위로
	$("#btnTop").click(function(){
		fullpage.slideTo(0);
	});

	// 메뉴
	$("#gnb li a").click(function(e){
		e.preventDefault();
		var target = $(this).attr("data-page");
		fullpage.slideTo(target);

		if(mobile == true){
			gnbClose();
		}
	});

	window.addEventListener('mousewheel',handleMouseWheel);
	function handleMouseWheel(e){
  	const translate = Math.abs(fullpage.translate);
		var section1 = $("#section1").height();

		if(section1 <= translate){
			$("#btnTop").addClass("on");
		}else{
			$("#btnTop").removeClass("on");
		}
	}

	// 브라우저 사이즈 체크
	$(window).resize(function(){
		winW = $(window).outerWidth();
		winH = $(window).outerHeight();

		if(winW <= 750){
			mobile = true;
		}else{
			gnbClose();	
		}

		contentCheck();
	});

	// 모바일 메뉴 열기
	var _menu = $("#header .menu");
	$("#btnGnb").click(function(){
		_menu.addClass("active");
		$("#dim").fadeIn(300);
	});

	// 모바일 메뉴 닫기
	$("#header .menu .close").click(function(){
		gnbClose();
	});

	$("#dim").click(function(){
		gnbClose();
	});

	function gnbClose(){
		_menu.removeClass("active");
		$("#dim").fadeOut(300);
	}
});
