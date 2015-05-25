var FlatDataService = require('./flatdataservice'),
$ = require('jQuery'),
React = require('React/addons'),
classNames = require('classNames');

var Flat = React.createClass({
	getInitialState: function(){
		return {
			editing:false,
			photoShown: false,
			comment: this.props.item.comment
		}
	},
	componentDidMount:function(){
		var that = this;
		if(!that.props.item.cached){
			FlatDataService.get(that.props.item.id, function(data){
				that.props.updateFlat(that.props.item.id, data);
			});
		}
	},
	editComment:function(){
		var that = this,
		input = React.findDOMNode(that.refs.commentInput);
		this.setState({editing:true});
		setTimeout(function(){
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);   
		}, 0);
	},
	handleChange: function(event) {
		this.setState({comment: event.target.value});
	},
	inputBlur:function(e){
		this.setState({editing:false});
		this.props.updateFlatComment(this.props.item.id, this.state.comment);
		e.preventDefault();
	},
	handleDelete: function(event) {
		var that = this,
		$el = $(React.findDOMNode(that.refs.container));
		that.props.deleteFlat(that.props.item.id);
	},
	togglePhoto: function(){
		this.setState({
			photoShown: !this.state.photoShown
		});
	},
	render : function(){
		var html,
		commentClasses = classNames({
			'ext-hidden': this.state.editing,
			'cian-sidebar__comment': true
		}),
		photoClasses = classNames({
			'cian-sidebar__photo_shown': this.state.photoShown,
			'cian-sidebar__photo': true
		}),
		photo = this.props.item.photo ? (
			<div className="cian-sidebar__photo-wrapper">
				<span className="cian-sidebar__photo-toggle" onClick={this.togglePhoto}>{this.state.photoShown ? 'Скрыть фото' : 'Показать фото'}</span>
				<div className={photoClasses}>
					<img src={this.props.item.photo} />
				</div>
			</div>
		) : '',
		rooms = this.props.item.rooms ? (
			<div className="cian-sidebar__rooms">{this.props.item.rooms} комн. кв.</div>
		) : '';

		if(this.props.item.cached){
			html = (
				<div className="cian-sidebar__flat" ref="container">
					<div className="cian-sidebar__info">
						<div className="cian-sidebar__adress">{this.props.item.adress}</div>
						<div className="cian-sidebar__metro">Метро: {this.props.item.metro}</div>
						<div className="cian-sidebar__price">{this.props.item.price}</div>
						{rooms}
						<form onSubmit={this.inputBlur} >
							<input ref="commentInput" 
								onChange={this.handleChange} 
								onBlur={this.inputBlur} 
								value={this.state.comment}
								className={this.state.editing ? "ext-shown" : "ext-hidden" } />
						</form>
						<div className={commentClasses} >	
							<span>{this.state.comment}</span> 
						</div> 
						{photo}
					</div>
					<div className="cian-sidebar__actions">
						<span onClick={this.handleDelete} className="cian-sidebar__icon cian-sidebar__icon_remove"></span>
						<span onClick={this.editComment} className="cian-sidebar__icon cian-sidebar__icon_edit"></span>
					</div>
				</div>
			);
		}else{
			html = (
				<div className="cian-sidebar__flat">
					Caching
				</div>
			)
		}
		return html;
	}
});
module.exports = Flat;