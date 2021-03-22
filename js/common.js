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
    mousewheel: false,
		spaceBetween: 0,
		freeMode: true,
		speed: 600
	}

	var fullpage = new Swiper('#container', pageSet_1);

	console.log("mobile : " + mobile + "\nwinW : " + winW + "\nwinH : " + winH);

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

		console.log("section_fin : " + section);

		if(winH <= section){
			fullpage.destroy();
			fullpage = new Swiper('#container', pageSet_2);

			console.log("pageSet1");
		}else{
			fullpage.destroy();
			fullpage = new Swiper('#container', pageSet_1);

			console.log("pageSet2");
		}
	}
	contentCheck();

	$("#wrap").addClass("pos1");
	fullpage.on("transitionEnd", function(){
		var target = fullpage.realIndex+1;

		console.log("111")

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

	

	// 브라우저 사이즈 체크
	$(window).resize(function(){
		winW = $(window).outerWidth();
		winH = $(window).outerHeight();
		console.log("winW : " + winW + "\nwinH : " + winH);

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
