var $ = require('jQuery'),
Box = require('./box'),
React = require('React');
var $container = $('<div />').addClass('cian-ext');
$('body').append($container);
React.render(<Box />, $('.cian-ext').get(0));

var $table = $('.objects_items_list');
$table.find('.objects_item_td_pos').each(function(ind, el) {
	var $star = $('<div />').addClass('cian-ext__star'); 
	$(this).prepend($star);
})