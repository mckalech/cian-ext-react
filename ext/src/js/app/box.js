
var Storage = require('./storage'),
	$ = require('jQuery'),
	_ = require('underscore'),
	React = require('React'),
	Flat = require('./flatview');

var Box = React.createClass({
	getInitialState: function(){
		return {
			flats : []
		};
	},
	componentDidMount: function(){
		var flats = Storage.get('flats') || []
		that = this;
		if(flats.length){
			this.setState({
				flats: flats
			});
		};
			
		$('.objects_items_list').on('click','.cian-ext__star', function(){
			var id = $(this).closest('tr').attr('id');
			id = parseInt(id.replace('offer_', ''));
			that.addFlat(id);
		});
	},
	addFlat:function(id){
		var flats = this.state.flats;
		var containsFlat = this.findById(flats, id);
		if(containsFlat<0){
			flats = flats.concat({
				id:id,
				name: 'ff'+id,
				cached: false,
				adress: 'no data',
				editing: false,
				price:0
			});
			this.setState({flats: flats});
			Storage.set('flats', flats);
		}else{
			alert('This flat is already in the list');
		}
	},
	findById:function(flats, id){
		return flats.map(function(flat) { return flat.id; }).indexOf(id);
	},
	removeFlat:function(id){
		var flats = this.state.flats,
		ind = this.findById(flats, id);
		flats.splice(ind, 1);
		this.setState({flats: flats});
		Storage.set('flats', flats);
	},
	updateFlat:function(id, opts){
		var flats = this.state.flats,
		ind = this.findById(flats, id);
		$.extend(flats[ind], opts);
		this.setState({flats: flats});
		Storage.set('flats', flats);
	},
	updateFlatName:function(id, name){
		var flats = this.state.flats,
		ind = this.findById(flats, id);
		flats[ind].name = name;
		this.setState({flats: flats});
		Storage.set('flats', flats);
	},
	render : function(){
		var that = this;
		var flats = this.state.flats.map(function(item, i){
			return(
				<Flat 
					id={item.id} 
					cached={item.cached} 
					name={item.name} 
					price={item.price} 
					adress={item.adress}
					updateFlat={that.updateFlat} 
					updateFlatName={that.updateFlatName} />
			);
		});
		return (
			<div className="cian-ext__list">
				<h1>Избранное</h1>
				{flats}
			</div>
		);
	}
});
module.exports = Box;