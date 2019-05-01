import React from 'react';
import Grid from './Grid';
import o from '../Assets/imgs/o.png';






class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: ['1', '2', '3', '4', '5', '6', '7', '8','9'],
      turn: true,
      blocks: {
        1: ["false"],
        2: ["false"],
        3: ["false"],
        4: ["false"],
        5: ["false"],
        6: ["false"],
        7: ["false"],
        8: ["false"],
        9: ["false"]
      }
    }
    this.handleChangeTurn = this.handleChangeTurn.bind(this);
    this.playTurn = this.playTurn.bind(this);
  }
  async handleChangeTurn(){
    if (this.state.turn == true) {
    await  this.setState({turn: false});
      let that = this;
      that.aiTurn();

    } else {
      await this.setState({turn: true})
    }
  }

 aiTurn() {
    const array = this.state.blocks;
    const possibilities = [[1,2,3], [4,5,6], [7,8,9], [1,4,7],[2,5,8],[3,6,9], [1,5,9], [3,5,7]];
    const length = possibilities.length;
    let that = this;
    let placed = false;
    for(let i = 0; i < length; i++) {
      let trueCount = 0;
      let options = possibilities[i];
      for(let e = 0; e < 3; e++) {
        let instance = this.state.blocks[options[e]];
        if(instance == true) {
          trueCount = trueCount + 1;
        }
      }
      if(trueCount == 3 && placed == false) {
        console.log("Game Over");
      } else if(trueCount == 2 && placed == false) {
        console.log("There are two trues in a row");
        for(let e = 0; e < 3; e++) {
          const spot = this.state.blocks[options[e]];
          if(spot == "false") {
            let instance = possibilities[i][e];
            this.playTurn(this.state.turn, instance);
            placed = true;
            break;
          }
        }

      }
    }
    if(placed == false) {
      for(let i = 0; i < 9; i++) {
        if(array[i + 1] == 'false') {
          this.playTurn(this.state.turn, i + 1)
          break;
        }
      }
    }
    this.handleChangeTurn();

  }

  playTurn(turn, item) {
    if(turn == false) {
      let currentImage = document.getElementById(item).style.backgroundImage;
      document.getElementById(item).style.backgroundImage = `url(${o})`;

    }
    const array = this.state.blocks;
    let newArray = {};
    const length = 9;
    for(let i = 1; i < length + 1; i++) {
      if(item == i) {
        newArray[i] = turn;
      } else {
        newArray[i] = array[i];
      }
    }
    this.setState({blocks: newArray})

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
