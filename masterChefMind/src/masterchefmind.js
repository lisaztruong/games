// setup :)
import React from 'react';
import classNames from 'classNames';

// lets us loop through n times quickly without having to use
// for var n (might need closures to fix scoping problems of var)
let times = (n)=>{
  return (f)=>{
    Array(n).fill().map((_,i)=>f(i));
  }
};

// stateful component "parent" to pass state to
// children: Rules, Board, CodePegs, EndGame
class Masterchefmind extends React.Component{

  constructor(props){
    super(props);
    // set the initial state!!
    this.state = {
      // combination to be guessed by user
      code: this.getCode(),
      // automatically selects first color in choices
      selectedPeg: this.props.colors.get(0),
      currentRow: 0,
      // map object to hold the user's guesses
      currentGuess: new Map(),
      // location and value match
      valuePositionMatchesNum: 0,
      // just value/ color match
      valueMatchesNum: 0,
      // combination pegs
      pegsInRow: 4,
      // number of tries by user (max is 10)
      attempts: 10,
      // boolean for game instructions
      rules: false,
      // boolean for if user has won game
      success: false,
      // boolean for if user has lost game
      endGame: false
    }
  };

  // reset the initial state variables :)
  // do it separately because setState works on objects?
  reloadGame(){
    this.setState({
      code: this.getCode()
    });
    this.setState({
      selectedPeg: this.props.colors.get(0)
    });
    this.setState({
      currentRow: 0
    });
    this.setState({
      currentGuess: new Map()
    });
    this.setState({
      valuePositionMatchesNum: 0
    });
    this.setState({
      valueMatchesNum: 0
    });
    // this.setState({
    //   rules: false
    // });
    this.setState({
      success: false
    });
    this.setState({
      endGame: false
    });
    // don't need these two because they're constant!
    // this.setState({
    //   pegsInRow: 4
    // });
    // this.setState({
    //   attempts: 10
    // });
  }

  // to show or not show the game instructions
  toggleRules() {
    // set state to force a rerender
    this.setState(
      {
        rules: !this.state.rules
      });
  }

  // helper function to generate the combo to be guessed by user
  // change min and max if you have more color options
  // here we have 6
  getRandomInt(min=0, max=5) {
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

  // generate combo to be guessed by user
  getCode(){
    // looks like this ([[ "A", 1 ],[ "B", 2 ]])
    const code = new Map();
    // takes in i and returns new code that sets i to a randomInt
    // thus filling in code with a random mapping of colors!
    let generateCode = (i) => {
      code.set(i, this.props.colors.get(this.getRandomInt()))
    };
    // loop through codeLength number of times to generate code
    // loops through 4 times
    times(this.props.codeLength)(generateCode);
    return code;
  }

  // user selects a peg
  activatePeg(event){
    // if one of the color options on the right is chosen
    if (event.target.name.startsWith('peg')){
      this.setState({
        // selectedPeg becomes the color chosen by click event
        selectedPeg: event.target.value
      })
    // if one of the options on the decoding board on left is chosen
    // ie user wants to place a color option onto the board
    } else {
      if (this.state.selectedPeg){
        this.setState({
          // set one of the pieces in currentGuess to the location/ color chosen
          currentGuess: this.state.currentGuess.set(event.target.value-1, this.state.selectedPeg)
        })
      }
    }
  }

  // helper function that returns the key given the value argument
  // returns -1 if the value is not found
  // helps us to check if the guess is correct
  keyOf(map, valueUserInputs){
    // how we loop through a map object
    // loop through each [key,value]
    for (let [key, value] of map){
      // if there's a value match, return corresponding key
      if (valueUserInputs === value){
        return key;
      }
    }
    // finished loop and nothing found/ returned
    return -1;
  }

  // user makes a guess... they may only submit once they have chosen 4 pieces
  submitPegs(){
    // -------variables-------
    // create a new map using code generated from getCode
    // create a copy because we will be popping things off as we traverse
    const code = new Map(this.state.code);
    // the currentGuess on the board
    const pegs = this.state.currentGuess;
    // declare a var which will later be the key of the value match
    // used in our second traversal to count value matches
    let valueMatchKey = 0;
    // declare counter for matches of value and position (red dot)
    let valuePositionMatchesNum = 0;
    // declare counter for matches of value only (black dot)
    let valueMatchesNum = 0;
    // -------1st traversal to check for value and position matches-------
    for (let [key, value] of pegs) {
      // if the value matches the value in the code's location/key
      if (value === code.get(key)){
        // increment to know how many red dots in hints to show
        valuePositionMatchesNum++;
        // delete from pegs and code so as to not count again during
        // 2nd traversal
        code.delete(key);
        pegs.delete(key);
      }
    }
    // -------2nd traversal to check for value only matches-------
    for (let [key, value] of pegs){
      // use helper function to get key of a value match
      valueMatchKey = this.keyOf(code, value);
      // if a key has been found
      if (valueMatchKey !== -1){
        // then increment
        valueMatchesNum++;
        // delete ... maybe I don't need to delete though?
        code.delete(valueMatchKey);
        pegs.delete(valueMatchKey);
      }
    }
    // -------after traversals to check, must update game states!-------
    // time to check if you've won
    // YAY you've won the game :) if 4 === 4
    if (valuePositionMatchesNum === this.state.pegsInRow){
      this.setState({
        endGame: true
      });
      this.setState({
        success: true
      });
    // time to check if you've lost
    // YIKES you've lost the game if 10 === 10
  } else if (this.state.attempts === this.state.currentRow + 1){
      this.setState({
        endGame: true
      });
    }
    // you haven't won nor lost and so you'll continue the game
    // update the state
    // onto the next row!
    this.setState({
      currentRow: this.state.currentRow +1
    });
    // give it the newly incremented value
    this.setState({
      currentGuess: new Map()
    });
    // give it the newly incremented value
    this.setState({
      valuePositionMatchesNum: valuePositionMatchesNum
    });
    // initialize a new map for the next guess
    this.setState({
      valueMatchesNum: valueMatchesNum
    })
  }

  render() {
    return (
      <div>
        <Rules state={this.state} toggleRules={this.toggleRules}/>

        <div className="clearfix">
          <DecodingBoard state={this.state} activatePeg={this.activatePeg} submitPegs={this.submitPegs}/>
          <CodePegs state={this.state} colors={this.props.colors} activatePeg={this.activatePeg}/>
        </div>

        <EndGame state={this.state} reloadGame={this.reloadGame.bind(this)}/>
      </div>
    );
  }
}

// above       <h1><span className="M">M</span><span className="A">A</span><span className="S">S</span><span className="T">T</span><span className="E">E</span><span className="R">R</span><span className="MIND">MIND</span></h1>


class Rules extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // instead of a ternary, use className!!
    const className = classNames({
      'info': true,
      'hidden': !this.props.rules
    });
    // toggles between showing and hiding rules
    const infoText = !this.props.rules ? 'Show rules' : 'Hide rules';
    return(
      <div className='rules'>
        <span className='rules-toggle' onClick={this.props.toggleRules.bind(this)}>
          {infoText}
        </span>
          <p className={className}>
            yup james
          </p>
      </div>
    );
  }
}

class DecodingBoard extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let rows = [];
    let rowName = '';
    let generateRow = (i) => {
      rowName = 'decodeRow-' + i + 1;
      rows.push(<Row name={rowName} key={i + 1} rowId={i} state={this.props.state} activatePeg={this.props.activatePeg} submitPegs={this.props.submitPegs}/>);
    }
    times(this.props.state.attempts)(generateRow);
    return(
      <div className="decoding-board left">
        {rows}
      </div>
    )
  }
}

// ROW RETURN FUNCTION NOTES
// // each row
// <div className={rowClassName}>
//   // first and on the far left if the decoderow where users will make a guess
//   // this is where we check if it's the current row
//   // also has key/ rowId because we have multiple of these and want the DOM to update in a minimal way
//   // lastly has activatepeg
//   <div className='left'>
//     <DecodeRow name={rowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state} isCurrentRow={isCurrentRow} activatePeg={this.props.activatePeg}/>
//   </div>
//   // second and in the middle is the submit button which appears only when the decoderow is full
//   // only shows up when decoderow is full and so we don't need to know if it's the currentrow here nor
//   // do we need to know it's key/rowId
//   <div className='left'>
//     <SubmitButton rowId={this.props.rowId} state={this.props.state} submitPegs={this.props.submitPegs}/>
//   </div>
//   // finally is the hintsrow which changes based on the decoderow
//   <div className='right'>
//     <HintsRow name={hintsRowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state}/>
//   </div>
// </div>

class Row extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // if currentRow and rowId match, then the row we are on is the current row!!
    const isCurrentRow = this.props.state.currentRow === this.props.rowId;
    const rowClassName = classNames({
      'row': true,
      'clearfix': true,
      'current': isCurrentRow
    });
    // create new variables to identify the hintrow and decoderow
    const hintsRowName = 'hintsRow-' + this.props.rowId;
    const rowName = 'decodeRow-' + this.props.rowId;
    return(

      <div className={rowClassName}>

				<div className='left'>
					<DecodeRow name={rowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state} isCurrentRow={isCurrentRow} activatePeg={this.props.activatePeg}/>
				</div>

        <div className='left'>
					<SubmitButton rowId={this.props.rowId} state={this.props.state} submitPegs={this.props.submitPegs.bind(this)}/>
				</div>

				<div className='right'>
					<HintsRow name={hintsRowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state}/>
				</div>
			</div>
    )
  }
}

class DecodeRow  extends React.Component{
  constructor(props){
    super(props);
  }
  // if the row has been submitted before, we will not update/ rerender it
  shouldComponentUpdate(nextProps){
    // if truthy, will update; if falsey, will NOT update
    return nextProps.state.currentRow <= nextProps.rowId;
  }
  render(){
    let pegs = [];
    // let idVal = 0;
    let idVal;
    let pegClass = '';
    let generatePeg = (i) => {
      idVal = this.props.name + '-' + i + 1;
      if (this.props.state.currentRow === this.props.rowId){
        pegClass = this.props.state.currentGuess.get(i) ? 'peg ' + this.props.state.currentGuess.get(i) : 'peg';
      } else {
        pegClass = 'peg';
      }
      pegs.push(<Peg idVal={idVal} name={this.props.name} value={i + 1} key={idVal} pegCLass={pegClass} isCurrentRow={this.props.isCurrentRow} activatePeg={this.props.activatePeg}/>)
    }
    times(this.props.state.pegsInRow)(generatePeg);
    return(
      <div className='decode-row'>
        {pegs}
      </div>
    );
  }
}

class SubmitButton extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const className = classNames({
      'submit': true,
      // only show the submit button if the user has inputted a guess ( 4 >= 4) and if we are on the current row
      'hidden': !(this.props.state.currentGuess.size >= this.props.state.pegsInRow && this.props.state.currentRow === this.props.rowId)
    });
    return(
      <button className={className} onClick={this.props.submitPegs.bind(this)}></button>
    )
  }
}

class Hint extends React.Component{
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps) {
		return nextProps.state.currentRow - 1 <= nextProps.rowId;
	}
	render() {
		return (
			<span className={this.props.hintClass}>
			</span>
		);
	}
}

class HintsRow extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // array to hold the hints
    const hints = [];
    // delcare the identifier
    let idVal;
    // initialize the hintclass
    let hintClass = '';
    // get the number of valuePositionMatches from the state (updated in submitPegs)
    let valuePositionMatchesNum = this.props.state.valuePositionMatchesNum;
    // get the number of the valueMatchesNum from the state (updated in submitPegs)
    let valueMatchesNum = this.props.state.valueMatchesNum;
    // time to make the hint!!!
    let generateHint = (i) => {
			hintClass = 'hint';
      // identifier based on row number
			idVal = this.props.name + '-' + i + 1;
			//update current row (currentRow is a number that started at 1 whereas rowId began at 0)
			if (this.props.state.currentRow - 1 === this.props.rowId) {
        // if value/position match, update to know how many black pegs
				if (valuePositionMatchesNum > 0) {
					hintClass = hintClass + ' valuePosition-matches';
					valuePositionMatchesNum--;
        // if value match, update to know how many white pegs
				} else if (valueMatchesNum > 0) {
					hintClass = hintClass + ' value-matches';
					valueMatchesNum--;
        // if no matches, update to know how many crosses
				} else {
					hintClass = hintClass + ' no-matches';
				}
			}
      // place into the hints array
      // need rowId and key here
			hints.push(<Hint key={idVal} hintClass={hintClass} rowId={this.props.rowId} state={this.props.state}/>);
		};
    // loop through pegsinrow times to generateHint
    times(this.props.state.pegsInRow)(generateHint);
    return (
      <div className="hints-row">
        {hints}
      </div>
    );
  }
}

// this is the 6 color/value options the user may choose from on the right
class CodePegs extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // create the pegs array
    const pegs = [];
    // create the variables
    let idVal = 0;
    let pegClass = "";
    // loop through the map!!
    for (let [key, value] of this.props.colors){
      idVal = 'peg-' + key;
      pegClass = 'peg' + value;
      // if the value was selected
      if (value === this.props.selectedPeg){
        pegClass = pegClass + ' selected';
      }
      // push into the array the html we want!
      pegs.push(<Peg idVal={idVal} name='peg' value={value} key={idVal} pegClass={pegClass} isCurrentRow={true} activatePeg={this.props.activatePeg}/>);
    }
    return (
			<div className='codepegs right'>
				{pegs}
			</div>
		);
  }
}

// PEG RETURN NOTES
// return (
//   <span className={this.props.pegClass}>
//     <input type='radio' name={this.props.name} value={this.props.value} id={this.props.idVal} onClick={this.props.isCurrentRow ? this.props.activatePeg : null}/>
//     // this is where we put the color
//     <label htmlFor={this.props.idVal}></label>
//   </span>
// )
class Peg extends React.Component{
  constructor(props){
    super(props);
  }
  // so stateless... we just render :)
  // get css from codePegs
  render(){
    return (
      <span className={this.props.pegClass}>
        <input type='radio' name={this.props.name} value={this.props.value} id={this.props.idVal} onClick={this.props.isCurrentRow ? this.props.activatePeg : null}/>
        <label htmlFor={this.props.idVal}></label>
      </span>
    )
  }
}

class EndGame extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const endGameInfoClass = classNames({
    				'endgame': true,
    				'hidden': !this.props.endGame
    			});
		const endGameStatusClass = classNames({
				'endgame-relative': true,
				'success': this.props.success,
				'failure': !this.props.success
			});
		const infoText = this.props.success ? 'YOU WIN <3' : 'Try again :D';
    return (
			<div className={endGameInfoClass}>
				<div className={endGameStatusClass}>
					<h2 className="endgame-header">{infoText}</h2>
					<button className="endgame-btn" onClick={this.props.reloadGame.bind(this)}>PLAY AGAIN</button>
				</div>
				<div className="endgame-relative endgame-overlay"></div>
			</div>
		);
}
}

export default Masterchefmind
