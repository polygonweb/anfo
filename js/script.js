// глобальные переменные
var body,
	sidebar,
	content




// вспомогательная функция для анимирования выдвижения сайдбара
function animateSideBar() {

	var time = 300;

	if(body.hasClass('page-closed-sidebar')) {
		sidebar.animate({
			left: -220 + 'px'
		}, time);
		content.animate({
			'padding-left': 52
		}, time);
	} else {
		sidebar.animate({
			left: 0 + 'px'
		}, time);
		content.animate({
			'padding-left': 300
		}, time);
	}
}




// основной функцилонал меню
function menu() {

	var $nav = $('.sb-nav');

	$nav.find('li').removeClass('active');
	$nav.find('.level-1 ul').hide();

	// отмена выделения
	$nav.on('mousedown selectstart', function() {
		return false;
	});

	$nav.find('a').click(function(e) {

		e.preventDefault();

		// находим ближейший род. пункт нажатой ссылки
		var $item = $(this).closest('li');

		// если меню схлопнуто, то выдвигаем его
		if(body.hasClass('page-closed-sidebar')) {
			body.removeClass('page-closed-sidebar');
			animateSideBar();
		}

		if(!($item.hasClass('active'))) {
			$item
				.addClass('active')
				.find('> ul')
				.slideDown()
				.end()
				.siblings()
				.removeClass('active')
				.find('> ul')
				.slideUp();
		} else {
			$item
				.removeClass('active')
				.find('> ul')
				.slideUp();
		}
	});
}




// выезжание панели off-canvas при клике на "лапке"
function toggleSideBar() {

	$('.sb-toggle').click(function(e) {
		e.preventDefault();
		body.toggleClass('page-closed-sidebar');
		animateSideBar();
	})
}


// стилизация выпадающих  списков
function styleSelect() {
	var el = $('.chosen-select');
	if(el) {
		el.each(function() {
			var self = $(this);
			self
				// .prepend('<option></option>')
				.chosen({
					// width: self.data('width'),
					placeholder_text_single: self.data('placeholder'),
					disable_search_threshold: 0,
					disable_search: true,
					inherit_select_classes: false,
					allow_single_deselect: false
				});
		})
		
	}
}



// события при загрузке DOM

$(function() {
	body = $('body');
	sidebar = $('.sidebar');
	content = $('.content');

	menu();
	toggleSideBar();
	styleSelect();
});




// события при загрузке всех ресурсов

$(window).load(function() {

});




// события при изменении размеров окна

$(window).resize(function() {

});







//Доработка 04.03.2015 г., Пучкин
$(function()
{
	
	//Стилизация скроллов
	//=================================================================
	if($('.style_scroll').length > 0)
	{
		$('.style_scroll').jScrollPane({
			autoReinitialise: true
		});
	}

	
	//Хинты справа
	//=================================================================
	if($('.RH_item').length > 0)
	{
		var	$items = $('.RH_item'),
			$hints = $items.children('.RHI_hint');
		
		$items.each(function()
		{
			var	$e = $(this),
				$icon = $e.children('.RHI_icon'),
				$hint = $e.children('.RHI_hint');
				
			if(!$e.hasClass('active'))
			{
				$hint.hide();
			}
			
			$icon.click(function()
			{
				if(!$e.hasClass('active'))
				{
					$items.removeClass('active');
					$hints.fadeOut();
					$e.addClass('active');
					$hint.fadeIn();
				}
				else
				{
					$e.removeClass('active');
					$hint.fadeOut();
				}
			});
		});
	}
	
	
	//Закрытие хинтов и окон
	//=================================================================
	if($('.modal').length > 0)
	{
		$('.modal').each(function()
		{
			var	$e = $(this),
				$cross = $e.find('.modal-close'),
				$parent = $e.parent(),
				$container,
				$another_closer = $e.find('[data-action="close"]');
				
			$cross.click(function()
			{
				$container = $e.closest('.active');
				$parent.fadeOut();
				$container.removeClass('active');
				return false;
			});
			
			$another_closer.click(function()
			{
				$container = $e.closest('.active');
				$parent.fadeOut();
				$container.removeClass('active');
				return false;
			});
		});
	}
	
	
	//Выбор КО
	//=================================================================
	if($('[data-type="select"]').length > 0)
	{
		$('[data-type="select"]').each(function()
		{
			var	$e = $(this),
				$text = $e.children('[data-role="text"]'),
				$hint = $e.children('[data-role="hint"]');
				
			if(!$e.hasClass('active'))
			{
				$hint.hide();
			}
			
			$text.click(function()
			{
				if(!$e.hasClass('active'))
				{
					$e.addClass('active');
					$hint.fadeIn();
				}
				else
				{
					$e.removeClass('active');
					$hint.fadeOut();
				}
			});
		});
	}
	
	
	//Показ и скрытие фильтра в поиске
	//=================================================================
	if($('.filter_container').length > 0)
	{
		$('.filter_container').each(function()
		{
			var	$e = $(this),
				$expander = $e.children('.FC_expander'),
				$content = $e.children('.FC_content');
				
			if(!$e.hasClass('open'))
			{
				$content.hide();
			}
			
			$expander.click(function()
			{
				if(!$e.hasClass('open'))
				{
					$e.addClass('open');
					$content.slideDown();
				}
				else
				{
					$e.removeClass('open');
					$content.slideUp();
				}
			});
		});
	}
	
	
	//Дерево в выборе региона или группы банков
	//=================================================================
	if($('.tree_select').length > 0)
	{
		$('.TSB_group').each(function()
		{
			var	$e = $(this),
				$main = $e.children('.TSBG_main'),
					$toggle = $main.children('span'),
				$sub = $e.children('.TSBG_sub');
				
			if(!$e.hasClass('open'))
			{
				$sub.hide();
			}
			
			$toggle.click(function()
			{
				if(!$e.hasClass('open'))
				{
					$sub.slideDown();
					$e.addClass('open');
				}
				else
				{
					$sub.slideUp();
					$e.removeClass('open');
				}
			});
		});
	}
	
	
	//Закрытие уведомлений
	//=================================================================
	if($('.BRM_item').length > 0)
	{
		$('.BRM_item').each(function()
		{
			var	$e = $(this),
				$cross = $e.children('.BRMI_cross');
				
			$cross.click(function()
			{
				$e.slideUp();
			});
		});
	}
	
	
	//Скрытие длинных текстов в сообщениях и их раскрытие
	//=================================================================
	if($('.MC_item').length > 0)
	{
		$('.MC_item').each(function()
		{
			var	$e = $(this),
				$text = $e.children('p');
				
			if($text.text().length > 110)
			{
				$e.addClass('MC_item_arrow');
				$e.append('<div class="MCI_arrow"></div>');
				var	$arrow = $e.children('.MCI_arrow');
				
				$arrow.click(function()
				{
					if(!$e.hasClass('open'))
					{
						$e.addClass('open');
					}
					else
					{
						$e.removeClass('open');
					}
				});
			}
		});
	}
	
	
	//Вкладки
	//=================================================================
	if($('.tab').length > 0)
	{
		$('.tab').each(function()
		{
			var	$e = $(this),//Эта вкладка
				$tabs_container = $e.parent('.tabs'),//Контейнер с вкладками
				$tabs = $tabs_container.find('.tab'),//Все вкладки в контейнере
				$contents_container = $tabs_container.next('.tab_contents'),//Контейнер с содержимым
				$contents = $contents_container.children('.tab_content'),//Всё содержимое
				$e_content = $contents.eq($e.index());//Содержимое этой вкладки
				
			//Дополнительный блок для переключения (в контенте, где карта)
			if($('.tab_addit_contents').length > 0)
			{
				var	$addit_contents_container = $('.tab_addit_contents'),
					$addit_contents = $addit_contents_container.find('.tab_addit_content'),
					$e_addit_content = $addit_contents.eq($e.index());
			}
				
			//Скрывает содержимое у неактивных вкладок
			if(!$e.hasClass('active'))
			{
				$e_content.hide();
				if($('.tab_addit_contents').length > 0)
				{
					$e_addit_content.hide();
				}
			}
			
			//При клике на вкладку
			$e.click(function()
			{
				$tabs.removeClass('active');//Убираем выделение со всех вкладок
				$e.addClass('active');//Выделяем ту, по которой кликнули
				
				$contents.hide();//Скрывает всё содержимое
				$e_content.fadeIn();//Показывает содержимое этой вкладки
				
				if($('.tab_addit_contents').length > 0)
				{
					$addit_contents.hide();//Скрывает всё содержимое
					$e_addit_content.fadeIn();//Показывает содержимое этой вкладки
				}
			});
		});
	}
	
	
	//Открытие на весь экран
	//=================================================================
	if($('.ico_full').length > 0)
	{
		var prfx = ["webkit", "moz", "ms", "o", ""];
		function RunPrefixMethod(obj, method)
		{
			var p = 0, m, t;
			while (p < prfx.length && !obj[m])
			{
				m = method;
				if (prfx[p] == "")
				{
					m = m.substr(0,1).toLowerCase() + m.substr(1);
				}
				m = prfx[p] + m;
				t = typeof obj[m];
				if (t != "undefined")
				{
					prfx = [prfx[p]];
					return (t == "function" ? obj[m]() : obj[m]);
				}
				p++;
			}
		}
			
		var elm = document.getElementById('body'),
			$i = $('.ico_full');
		
		$(document).click(function(event)
		{
			if($(event.target).closest('.ico_full').length == 1)
			{
				if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen"))
				{
					RunPrefixMethod(document, "CancelFullScreen");
					$i.removeClass('reverse');
				}
				else
				{
					RunPrefixMethod(elm, "RequestFullScreen");
					$i.addClass('reverse');
				}
			}
		});
	}
	
	
	//Таблица с деревом
	//=================================================================
	if($('.tree_table').length > 0)
	{
		$('.TT_body_main').each(function()
		{
			var	$e = $(this),
					$expander = $e.find('.TT_expander'),
				$sub = $e.next('.TT_body_sub');
				
			if(!$e.hasClass('open'))
			{
				$sub.hide();
			}
			
			$expander.click(function()
			{
				if(!$e.hasClass('open'))
				{
					$sub.show();
					$e.addClass('open');
				}
				else
				{
					$sub.hide();
					$e.removeClass('open');
				}
			});
		});
	}


});