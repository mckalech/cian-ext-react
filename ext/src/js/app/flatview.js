var FlatDataService = require('./flatdataservice'),
React = require('React');

var Flat = React.createClass({
	getInitialState: function(){
		return {
			editing:false,
			name: this.props.name
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
	editName:function(){
		var that = this;
		this.setState({editing:true});
		setTimeout(function(){
			React.findDOMNode(that.refs.nameInput).focus()
		}, 0);
	},
	handleChange: function(event) {
		this.setState({name: event.target.value});
	},
	inputBlur:function(){
		this.setState({editing:false});
		this.props.updateFlatName(this.props.id, this.state.name);

	},
	render : function(){
		return (
			<div className="flatitem">
				<input ref="nameInput" 
					onChange={this.handleChange} 
					onBlur={this.inputBlur} 
					value={this.state.name}
					className={this.state.editing ? "shown" : "hidden" } />
				<h4 className={this.state.editing ? "hidden" :"shown" } >	
					<span>{this.state.name}</span> 
					<span onClick={this.editName}>edit</span>
				</h4>
				<div>id: {this.props.id}</div>
				<div>{this.props.adress}</div>
				<div>{this.props.price}</div>
				cached:{this.props.cached? 'cached':'non-cached'}
			</div>
		);
	}
});
module.exports = Flat;