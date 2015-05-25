var $ = require('jQuery');

module.exports = {
	get:function(id, callback) {
		setTimeout(function(){
			$.ajax({
				url:'http://www.cian.ru/rent/flat/'+id+'/',
				success:function(response){
					var $html = $("<div>").html(response),
					data = {
						adress : $html.find('.object_descr_addr').text(),
						price : $html.find('.object_descr_price').text(),
						photo : $html.find('.object_descr_images_w').length ? $html.find('.object_descr_images_w img').first().attr('src') : null,
						rooms: parseInt($html.find('.object_descr_title').text()),
						metro: $html.find('.object_descr_metro').find('.object_descr_metro_comment').remove().end().text(),
						cached : true
					}
					callback(data);
				}
			});	
		},1500)
		
	}
}