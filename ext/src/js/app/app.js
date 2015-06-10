var $ = require('jQuery'),
Box = require('./box'),
React = require('React');
var $container = $('<div />').addClass('cian-sidebar');
$('body').append($container);
React.render(<Box />, $('.cian-sidebar').get(0));


window.React = React;  
var $table = $('.objects_items_list');
$table.find('.objects_item_td_pos').each(function(ind, el) {
	var $star = $('<div />').addClass('cian-ext-site__star'); 
	$(this).prepend($star);
})