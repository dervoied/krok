/* Единственный $(document).ready(); */
$(function() {
	if ($.fn.selectFix) {
		$('select').selectFix({'container-max-height': 200, 'arrow': true, 'type': 'vertical'})
		$('.scrollpane-container-global.scrollpane-arrow.scroll-y').removeClass('scroll-y');
	}
	/* Для разукраски input[type="file"]*/
	$('input[type="file"].uploadpicker').each(function() {
		var field = $(this);
		var required = field.is('[required]');
		var disabled = field.is('[disabled]');
		field
			.addClass('upload-field-overlay')
			.removeAttr('required')
			.css({
				cursor: 'pointer',
				fontSize: '200px',
				height: 'auto',
				opacity: 0,
				position: 'absolute',
				right: 0,
				top: '-0.5em',
				width: 'auto'
			})
			.wrap('<span class="widget-upload-field"/>')
		
		var wrapper = field.parent();
		wrapper
			.css({
				backgroundColor: 'transparent',
				display: 'block',
				overflow: 'hidden',
				position: 'relative'
			})
			.prepend('<input class="upload-field-value form-control" type="text"'+(required ? ' required="required"' : '')+(disabled ? ' disabled="disabled"' : '')+' placeholder="Файл не выбран" />');
		
		field.bind('change', function() {
			var values = [this.value.split(/[\/\\]/).pop()];
			if (this.files) {
				values = [];
				for (var i = 0; i < this.files.length; i++) {
					values.push(this.files[i].name);
				}
			}
			var parts = $(this).val();
			wrapper.find('.upload-field-value').val(values.join(', '));
		});
	});
	var mobileNot = $();
	$('html').on('click', '*', function(event){
		var mobile = $('.js-mobile.opened');
		if($(this).closest('.js-mobile').length) {
			mobileNot = mobileNot.add($(this).closest('.js-mobile'));
//			event.stopPropagation();
		}
		mobile = mobile.not(mobileNot);
		mobile.removeClass('opened');
		setTimeout(function(){
			mobileNot = $();
		},500);
	});

	var navSelector = $('.nav-tabs li');

	if (navSelector.length != 0) {

		var num = navSelector.length;
		var width = 100 / num;
		navSelector.css('width', width + '%');

	}
});