var $ = require('jQuery');

module.exports = {
	get:function(id, callback) {
		//setTimeout(function(){
			$.ajax({
				url:'http://www.cian.ru/rent/flat/'+id+'/',
				success:function(response){
					var $html = $("<div>").html(response),
					data={
						adress : $html.find('.object_descr_addr').text(),
						price : $html.find('.object_descr_price').text(),
						cached : true
					}
					callback(data);
				}
			});	
		//},3000)
		
	}
}