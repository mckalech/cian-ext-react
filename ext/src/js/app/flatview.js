var FlatDataService = require('./flatdataservice'),
$ = require('jQuery'),
React = require('React'),
classNames = require('classNames');

var Flat = React.createClass({
	getInitialState: function(){
		return {
			editing:false,
			comment: this.props.comment
		}
	},
	componentDidMount:function(){
		var that = this;
		if(!that.props.cached){
			FlatDataService.get(that.props.id, function(data){
				that.props.updateFlat(that.props.id, data);
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
		this.props.updateFlatComment(this.props.id, this.state.comment);
		e.preventDefault();
	},
	handleDelete: function(event) {
		var that = this;
		//$(React.findDOMNode(that.refs.container)).slideUp(function(){// ------------------FIX THIS TO REACT--------------------------
			that.props.deleteFlat(that.props.id);
		//});
	},
	render : function(){
		var html,
		commentClasses = classNames({
			'ext-hidden': this.state.editing,
			'cian-sidebar__comment': true
		});
		if(this.props.cached){
			html = (
				<div className="cian-sidebar__flat" ref="container">
					<div className="cian-sidebar__info">
						<div className="cian-sidebar__adress">{this.props.adress}</div>
						<div className="cian-sidebar__price">{this.props.price}</div>
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