var internalSteps = internalSteps || {};
var currentStep = currentStep || 0;

// Passa da home para as internas
var callInternalSteps = function(func) {

	hWidth = $('.home-steps').width();
	hHeight = $('.home-steps').height();
	iWidth = $('.internal-steps').width();
	iHeight = $('.internal-steps').height();
	slidesHome = $('.md-content').children('.home-steps');
	slidesInternal = $('.md-content').children('.internal-steps');

	slidesHome.css({
		left : '0'
	}).stop().animate({
		left : -hWidth / 2,
		opacity : 0
	}, 300, function() {
		slidesHome.removeClass('active').hide();
		slidesHome.addClass('active');
		slidesInternal.css({
			left : iWidth / 2,
			opacity : 0,
			height : hHeight,
		}).show().animate({
			left : '0',
			opacity : 1,
			height : iHeight
		}, 300, function() {
			if ( typeof func === 'function') {
				func();
			}
		});
	});
}
/* código refatorado do movimento da animação do cabeçalho - passos 1, 2 e 3 */
var moveTrail = function(src, dst, callback) {
	var trailWidth = "303px";
	var current = src;
	if (dst < src) {
		trailWidth = "0px";
		current = dst;
	}
	$('#step-hd-' + current + ' .color').stop().animate({
		width : trailWidth
	}, 900, callback);
}
var pinTitleFadeOut = function(pin, callback) {
	$('#step-hd-' + pin + ' span').stop().animate({
		opacity : 0
	}, 300, callback);
}
var pinTitleFadeIn = function(pin, callback) {
	$('#step-hd-' + pin + ' span').fadeIn(300, callback);
}
var pinTitleUp = function(pin, callback) {
	pins = [{
		background : "transparent",
		'text-indent' : '10px'
	}, {
		background : "transparent",
		'text-indent' : '0px'
	}, {
		background : "transparent",
		'text-indent' : '0px'
	}];
	currentPin = pins[pin - 1];
	pinTitleFadeOut(pin, function() {
		$('#step-hd-' + pin + ' span').css(currentPin).stop().animate({
			opacity : 1
		}, 300, function() {
			if ( typeof callback === 'function') {
				callback();
			}
		});
	});
}
var pinTitleDown = function(pin) {
	var left;
	switch (pin) {
		case 1:
			left = '10px';
			break;
		case 2:
			left = '0px';
			break;
		case 3:
			left = '45px';
			break;
	}
	pinTitleFadeOut(pin, function() {
		$('#step-hd-' + pin + ' span').css({
			background : "url(images/step" + pin + "-tit.png) left bottom no-repeat",
			'text-indent' : '-999999px',
			marginLeft : left
		}).stop().animate({
			opacity : 1
		});
	})
}
var pinDown = function(pin) {
	pins = [{
		height : '42px',
		left : '-19px',
		top : '50px'
	}, {
		height : '42px',
		left : '-20px',
		bottom : '-36px'
	}, {/*
		 left: '0px',
		 top: '0px',*/
		height : '42px',
		bottom : '5px'
	}];

	currentPin = pins[pin - 1];
	$('#step-hd-' + pin + ' .pin').attr("src", "images/step" + pin + "-small.png").stop().animate(currentPin, 300);
}
var pinUp = function(pin) {
	pins = [{
		height : '92px',
		left : '-35px',
		/*position : 'absolute',*/
		top : '0'
	}, {
		height : '92px',
		left : '-34px',
		bottom : '13px'
	}, {
		/*position : 'absolute',*/
		height : '92px',
		left : '-9px',
		bottom : '2px'
	}];
	currentPin = pins[pin - 1];
	$('#step-hd-' + pin + ' .pin').attr("src", "images/step" + pin + ".png").stop().animate(currentPin, 300);
}
var doStep = function(src, dst, callback) {

	pinTitleDown(src);
	pinDown(src);
	if (src + 1 < dst) {
		moveTrail(src + 1, dst);
	} else if (src - 1 > dst) {
		moveTrail(src, dst + 1);
	}
	moveTrail(src, dst, function() {
		pinUp(dst);
		pinTitleUp(dst);
		if ( typeof callback === 'function') {
			callback();
		}
	});
}
/* fim da animação do cabeçalho */

var stepAfter = function(step, callback) {
	if (step > 3 || step < 0) {
		return false;
	} else {
		internalSteps.eq(step - 1).addClass('display').show();

		sWidth = internalSteps.eq(step - 1).width();
		sHeight = internalSteps.eq(step - 1).height();

		internalSteps.eq(step - 1).css({
			left : '0'
		}).stop().animate({
			left : -sWidth / 2,
			opacity : 0
		}, 300, function() {
			internalSteps.eq(step - 1).removeClass('display').hide();
			proximo = step;
			internalSteps.eq(proximo).addClass('display');
			internalSteps.eq(proximo).show().css({
				left : sWidth / 2,
				opacity : 0
			}).animate({
				left : '0',
				opacity : 1,
			}, 300, function() {
				if ( typeof callback === 'function') {
					callback();
				}
			});
		});
	}
}
var stepBefore = function(step, callback) {
	if (step > 3 || step < 0) {
		return false;
	} else {
		internalSteps.eq(step - 1).addClass('display').show();

		sWidth = internalSteps.eq(step - 1).width();
		sHeight = internalSteps.eq(step - 1).height();

		internalSteps.eq(step - 1).css({
			left : '0'
		}).stop().animate({
			left : sWidth / 2,
			opacity : 0
		}, 300, function() {
			internalSteps.eq(step - 1).removeClass('display').hide();
			proximo = step - 2;
			internalSteps.eq(proximo).addClass('display');
			internalSteps.eq(proximo).show().css({
				left : -sWidth / 2,
				opacity : 0
			}).animate({
				left : '0',
				opacity : 1,
			}, 300, function() {
				if ( typeof callback === 'function') {
					callback();
				}
			});
		});
	}
}
var animateMainSearch = function(callback) {
	var obj = $('.frm-search');
	btWidth = $('#bt-search').width();

	if (btWidth > 150) {

		$('#bt-search').stop().animate({
			width : '140px',
			height : '72px',
			fontSize : '15px',
			padding : '12px',
			top : '120px',
			right : '30px'
		}, 300, function() {
			$('#bt-search').css({
				'background-image' : 'url(images/btsb-chamartaxi2.png)',
				'letter-spacing': '1px'
			}).val('nova pesquisa').animate({
				top : '33px',
				right : '12px'
			}, 400);

			obj.find('[placeholder]').stop().animate({
				fontSize : '15px',
				height : '24px'
			}, 300);

		});
	}

	obj.find('.ttips').fadeOut(100);

	obj.find('.frm-boxlf, .frm-boxrt').stop().animate({
		width : '395px',
		marginLeft: '13px'
	}, 300);

	obj.find('form').delay(400).animate({
		height : '98px'		
	}, 400, function() {
		callInternalSteps(function() {
			if ( typeof callback === 'function') {
				callback();
			}
		});
	});

}
var callTaxiOnlySrc = function() {

	if (currentStep == 0) {
		animateMainSearch(function() {
			doStep(1, 2);
			stepAfter(1, function() {
				footerAfter(1);
				initialize();
				setMapCenter(map2, $(TaxiSimples.Options.inputSrcAddr).val());
			});
		});
		clearInterval(interval);
		Recaptcha.reload();		
		currentStep = 2;
	} else if (currentStep == 1) {
		doStep(1, 2);
		stepAfter(currentStep, function() {
			initialize();
			setMapCenter(map2, $(TaxiSimples.Options.inputSrcAddr).val());
		});
		footerAfter(1);
		clearInterval(interval);
		Recaptcha.reload();		
		currentStep = 2;
	} else if (currentStep == 2) {
		initialize();
		setMapCenter(map2, $(TaxiSimples.Options.inputSrcAddr).val());
		clearInterval(interval);
		Recaptcha.reload();		
	} else if (currentStep == 3) {
		clearInterval(interval);
		doStep(3, 2);
		stepBefore(currentStep, function() {
			initialize();
			setMapCenter(map2, $(TaxiSimples.Options.inputSrcAddr).val());
		});
		//moveFooterOneTwo();
		footerBefore(3);
		currentStep = 2;
		clearInterval(interval);
		Recaptcha.reload();
	}

	//log google analytics
	_gaq.push(['_trackPageview', "/request_form.html"]);

}
var callTaxiSrcAndDst = function() {
	if (currentStep == 0) {
		animateMainSearch(function() {
			initialize();
			dirDisplay.setMap(map);
			calcRoute($(TaxiSimples.Options.inputSrcAddr).val(), $(TaxiSimples.Options.inputDstAddr).val());
		});
		stepAfter(0);
		currentStep = 1;
	} else if (currentStep == 1) {
		initialize();
		dirDisplay.setMap(map);
		calcRoute($(TaxiSimples.Options.inputSrcAddr).val(), $(TaxiSimples.Options.inputDstAddr).val());
	} else if (currentStep == 2) {
		doStep(2, 1);
		stepBefore(currentStep, function() {
			initialize();
			dirDisplay.setMap(map2);
			calcRoute($(TaxiSimples.Options.inputSrcAddr).val(), $(TaxiSimples.Options.inputDstAddr).val());
		});
		footerBefore(2);
		clearInterval(interval);
		Recaptcha.reload();		
		currentStep = 1;
	} else if (currentStep == 3) {
		clearInterval(interval);
		doStep(3, 1);
		stepBefore(currentStep, function() {
			footerBefore(3);
		});
		currentStep--;
		stepBefore(currentStep, function() {
			footerBefore(2);
			initialize();
			dirDisplay.setMap(map3);
			calcRoute($(TaxiSimples.Options.inputSrcAddr).val(), $(TaxiSimples.Options.inputDstAddr).val());
		});
		currentStep = 1;
		clearInterval(interval);
		Recaptcha.reload();
	}

	//log google analytics
	_gaq.push(['_trackPageview', "/request_form.html"]);

}
var footerAfter = function(footer) {

	switch (footer) {
		case 1:
			$('#step-ft-' + footer).stop().animate({
				width : '33%',
				opacity : 1
			}, 300, function() {
				next = (footer + 1);
				$('#step-ft-' + next).stop().animate({
					width : '0%',
					opacity : 0
				}, 300, function() {

					next = (footer + 2)
					$('#step-ft-' + next).stop().animate({
						width : '33%',
						opacity : 1
					}, 300);

					next = (footer + 1);
					$('#step-ft-' + next + '1').stop().animate({
						width : '33%',
						opacity : 1
					}, 300);
				});
			});
			break;
		case 2:
			$('#step-ft-' + (footer + 1)).stop().animate({
				width : '0%',
				opacity : 0
			}, 300, function() {
				$('#step-ft-' + (footer + 1) + '1').stop().animate({
					width : '33%',
					opacity : 1
				}, 300);
			});
			break;
	}

}
var footerBefore = function(footer) {
	switch (footer) {
		case 2:
			$('#step-ft-' + footer + '1').stop().animate({
				width : '0%',
				opacity : 0
			}, 300, function() {
				$('#step-ft-' + footer + '1').stop().animate({
					width : '0%',
					opacity : 0
				}, 300, function() {
					$('#step-ft-' + (footer + 1)).stop().animate({
						width : '0%',
						opacity : 0
					}, 300, function() {
						$('#step-ft-' + (footer - 1)).stop().animate({
							width : '50%',
							opacity : 1
						}, 300, function() {
							$('#step-ft-' + footer).stop().animate({
								width : '50%',
								opacity : 1
							}, 300);
						});

					});
				});
			});
			break;
		case 3:
			$('#step-ft-' + (footer) + '1').stop().animate({
				width : '0%',
				opacity : 0
			}, 300, function() {
				$('#step-ft-' + (footer)).stop().animate({
					width : '33%',
					opacity : 1
				}, 300);
			});
			break;
	}

}
var isSourceAndDestiny = function() {
	if ( typeof TaxiSimplesRequest.sourceAddress.name !== 'undefined' && typeof TaxiSimplesRequest.destinyAddress.name !== 'undefined') {
		return true;
	} else {
		return false;
	}
}

$(document).ready(function() {

	//Movimenta os Steps

	internalSteps = $('.internal-steps .step-content ').children('li');
	internalSteps.hide();
	internalSteps.eq(0).addClass('display').show();


  $(".internal-steps").show();
  $("div#fieldNumber, div#fieldComplement").show();

	// toda a busca
	

	$('.end-or').focus(function() {
		$(this).attr('placeholder', ' ');
	}).blur(function() {
		$(this).attr('placeholder', 'Ex: Av. Beira-Mar, 3030, Fortaleza - Ceará, Brasil');
	});
	$('.end-des').focus(function() {
		$(this).attr('placeholder', ' ');
	}).blur(function() {
		$(this).attr('placeholder', 'Ex: Av. Dom Luiz, 2323, Fortaleza - Ceará, Brasil');
	});

	$('#bt-search').bind('click', function() {
		//$('ul.step-footer').find('li').show();
		if ($(TaxiSimples.Options.inputSrcAddr).val() === '') {
			alert('Preencha o endereço onde o taxista irá lhe encontrar!');
			return false;
		} else if ($(TaxiSimples.Options.inputSrcAddr).val() !== '' && $(TaxiSimples.Options.inputDstAddr).val() === '') {
			updateRequest('sourceAddress', $('#endereco-or').val(), function() {
				if (locate(validCities, TaxiSimplesRequest.sourceAddress.city)) {
					callTaxiOnlySrc();
				} else {
					alert('Desculpe-nos, mas ainda não operamos em sua cidade.');
					return false;
				}
			});
		} else {
			updateRequest('sourceAddress', $('#endereco-or').val(), function() {
			});
			updateRequest('destinyAddress', $('#endereco-des').val(), function() {
				if (locate(validCities, TaxiSimplesRequest.sourceAddress.city)) {
					callTaxiSrcAndDst();
				} else {
					alert('Desculpe-nos, ainda não operamos em sua cidade.');
					return false;
				}
			});
		}
	});
	// slides

	var slides = $('.md-content').children('div');
	slides.hide();
	s = 0;
	slides.eq(s).addClass('active').show();

	$('a#step-ft-2').click(function() {
		pinUp(2);
		pinDown(2);
		doStep(currentStep, currentStep + 1);
		stepAfter(currentStep, function() {
			initialize();
			switch (currentStep) {
				case 2:
					dirDisplay.setMap(map2);
					break;
				case 3:
					dirDisplay.setMap(map3);
					break;
			}
		});
		footerAfter(currentStep);
		currentStep = currentStep + 1;
		//log google analytics
		_gaq.push(['_trackPageview', "/request_form.html"]);
	})
	$('#step-ft-3').click(function() {
		if (checkUserFormFields()) {
			$(TaxiSimples.Options.dialogForm).dialog("open");
		}
	})
	/* pequeno bug do css */	
	pinDown(3);
});
