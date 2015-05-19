
var Storage = require('./storage'),
	$ = require('jQuery'),
	_ = require('underscore'),
	React = require('React'),
	Flat = require('./flatview'),
	ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
			
		$('.objects_items_list').on('click','.cian-ext-site__star', function(){
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
				comment: '',
				cached: false,
				adress: 'no data',
				editing: false,
				price:0
			});
			this.setState({flats: flats});
			Storage.set('flats', flats);
			$(".cian-sidebar").animate({ scrollTop: $(".cian-sidebar__list").height() }, 1000);// ------------------FIX THIS TO REACT--------------------------
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
	updateFlatComment:function(id, comment){
		var flats = this.state.flats,
		ind = this.findById(flats, id);
		flats[ind].comment = comment;
		this.setState({flats: flats});
		Storage.set('flats', flats);
	},
	render : function(){
		var that = this;
		var flats = this.state.flats.map(function(item, i){
			return(
				<Flat 
					key={item.id}
					id={item.id} 
					cached={item.cached} 
					comment={item.comment} 
					price={item.price} 
					adress={item.adress}
					updateFlat={that.updateFlat} 
					updateFlatComment={that.updateFlatComment} 
					deleteFlat={that.removeFlat} />
			);
		});
		return (
			<div className="cian-sidebar__list">
				<h1 className="cian-sidebar__heading">Избранное</h1>
				<div className="cian-sidebar__flats">
					<ReactCSSTransitionGroup transitionName="flat">
						{flats}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
});
module.exports = Box;