'use strict';

const { log } = console;

class Alert {
	static list = [];
	static frame = null;
	static init = true
	
	constructor({message, title, close}) {
		const [FRAME, DIV, TITLE, TITLEDIV, CONTENT, CONTENTDIV, DONE] = [this.ce('div'), this.ce('div'), this.ce('h3'), this.ce('div'), this.ce('p'), this.ce('div'), this.ce('button')];
		
		this.ssa(FRAME, `position: absolute;
		left: 10%;
		right: 10%;`);
		this.ssa(DIV, `height: 230px;
		background-color: rgba(232, 221, 203, 255);
		text-align: center;
		border-radius: 8px;`);
		this.ssa(TITLEDIV, `margin-top: 4.5px;
		margin-left: 5px;
		margin-right: 5px;
		border: 1px solid #000;
		border-radius: 5px;`);
		this.ssa(TITLE, `margin: 4.3px 4.3px;`);
		this.ssa(CONTENTDIV, `height: 150px;
		text-align: center;
		overflow: scroll;
		margin-top: 3px;
		margin-left: 5px;
		margin-right: 5px;
		border:1px solid #000;
		border-radius: 5px;`)
		this.ssa(CONTENT, `margin-top: 8px;`);
		this.ssa(DONE, `width: 95%;
		height: 28px;
		margin-top: 5.5px;
		border-radius: 5px;`);
		TITLE.innerText = title? title: window.location.toString().concat(' Say:');
		CONTENT.innerHTML = message;
		DONE.innerText = close? close: 'Close';
		DONE.addEventListener('click', event => {
			DIV.remove();
			this.de();
		});
		this.ac(TITLEDIV, TITLE);
		this.ac(DIV, TITLEDIV);
		this.ac(CONTENTDIV, CONTENT);
		this.ac(DIV, CONTENTDIV);
		this.ac(DIV, DONE);
		this.ac(FRAME, DIV)
		Alert.list.push(FRAME);
		Alert.frame = FRAME;
		if(Alert.init) {
			this.de();
			Alert.init = false;
		}
	}
	ce(type) {
		return document.createElement(type);
	}
	ssa(ele, value) {
		ele.setAttribute('style', value);
	}
	ac(ele, doc) {
		ele.appendChild(doc);
	}
	de() {
		if(Alert.list.length)
		this.ac(document.body, Alert.list.shift());
	}
	addEventListener(event, callback) {
		Alert.frame.addEventListener(event, callback, false);
	}
	setConfig(callback) {
		callback(Alert.frame);
	}
}

export default Alert;