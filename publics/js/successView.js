'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

class App extends React.Component {
	constructor(configs) {
		super(configs);
		this.value = 2;
		this.defaults = 2;
	}

	add() {
		if(this.value < 0) {
			this.value = this.defaults;
		};
		this.value += Math.floor(this.value <= 1000? Math.random() * this.value: -Math.sqrt(this.value * new Date().getTime().toString().substring(0, new Array(1, 2, 3, 4, 5, 6, 7)[Math.random() * 6])));
		document.getElementById('display').innerText = this.value;
	}
	
	render() {
		return(
			<div>
				<h2 id="display">{this.value}</h2>
				<p onClick={this.add.bind(this)}>Click me of add up number value</p>
				<br />
				<a href="/">gotoback</a>
				<br />
				<a href="/api">Watch the html-json-highlight</a>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));