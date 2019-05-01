import React from 'react';
import Grid from './Grid';






class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: ['1', '2', '3', '4', '5', '6', '7', '8','9'],
      turn: true,
      blocks: {
        1: [null],
        2: [null],
        3: [null],
        4: [null],
        5: [null],
        6: [null],
        7: [null],
        8: [null],
        9: [null]
      }
    }
    this.handleChangeTurn = this.handleChangeTurn.bind(this);
    this.playTurn = this.playTurn.bind(this);
  }
  handleChangeTurn(){
    if (this.state.turn) {
      this.setState({turn: false})
    } else {
      this.setState({turn: true})
    }
  }

  playTurn(turn, item) {
    console.log(turn, item);
    const array = this.state.blocks;
    let newArray = {};
    const length = 9;
    console.log(length);
    for(let i = 0; i < length; i++) {
      console.log(newArray);
      if(i = item) {
        newArray[i] = turn
        console.log("new array" + newArray[i]);
      } else {
        newArray[i] = array[i];
      }
    }
    this.setState({blocks: newArray});
    console.log(array);

  }

  render() {
    let that = this;
    let board = {
      width: '900px',
      height: '900px',
      border: '1px solid black',
      display: 'flex',
      margin: '0 auto',
      marginTop: '150px',
      flexWrap: 'wrap'
    };


    return (
      <div style={board}>
        {this.state.total.map(function(item, i) {
          return <Grid key={i} item={item} turn={that.state.turn} onChangeTurn={that.handleChangeTurn} playTurn={that.playTurn} />
        })}
      </div>
    );
  }
}


export default TicTacToe;
