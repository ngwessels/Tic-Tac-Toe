import React from 'react';
import Grid from './Grid';
import o from '../Assets/imgs/o.png';






class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: ['1', '2', '3', '4', '5', '6', '7', '8','9'],
      turn: true,
      totalLeft: 9,
      gameOver: false,
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
      let falseCount = 0;
      let options = possibilities[i];
      for(let e = 0; e < 3; e++) {
        let instance = this.state.blocks[options[e]];
        if(instance == true) {
          trueCount = trueCount + 1;
        }
        if(instance == false) {
          falseCount = falseCount + 1;
        }
      }
      if(falseCount == 2 && placed == false) {
        for(let a = 0; a < options.length; a++) {
          if(this.state.blocks[options[a]] == 'false') {
            this.playTurn(this.state.turn, options[a]);
            falseCount = 3;
            break;
          }
        }
      }
      if(trueCount == 3 || falseCount == 3) {
        console.log("Game Over");
        if(falseCount == 3) {
          console.log("You lost to the AI Player")
        } else {
          console.log("You won");
        }
        this.clearBoard(0);
        let option = possibilities[i];
        for(let e = 0; e < 3; e++) {
          document.getElementById(option[e]).style.backgroundColor = 'Black';
          this.setState({gameOver: true});
        }
      }
      if(trueCount == 2 && placed == false && this.state.gameOver != true) {
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
    if(placed == false && this.state.gameOver != true) {
      let allBlocks = this.state.blocks;
      let corners = [1, 3, 7, 9];
      let cornerOpposite = [9, 7, 3, 1];
      let center = [5];
      let sides = [2, 4, 6, 8];
      let sideOpposite = [8, 4, 6, 2];
      let sideLeft = [4, 6, 8, 2];
      const allSides = [2,6,4,9,7,1,5,3,8];
      for(let e = 1; e < 5; e++) {
        if(placed == false) {
          const random = Math.floor(Math.random() * 4);
          if(allBlocks[corners[e - 1]] == true && allBlocks[5] == "false") {
            this.playTurn(this.state.turn, 5);
            console.log('1');
            break;
            placed = true;
          } else if(allBlocks[corners[e - 1]] == true && allBlocks[sides[e - 1]] == "false" && allBlocks[sideOpposite[e - 1]] == true && allBlocks[sideLeft[e - 1]] == 'false' && placed == false) {
            this.playTurn(this.state.turn, sideLeft[e - 1]);
            console.log('2');
            placed = true;
            break;
          } else if(allBlocks[sides[e - 1]] == true && allBlocks[corners[e - 1]] == 'false' && allBlocks[cornerOpposite[e - 1]] == 'false' && placed == false) {
            console.log('3');
            if(placed == false) {
              console.log(placed);
              this.playTurn(this.state.turn, cornerOpposite[e - 1]);
              placed = true;
              break;
            }
            break;
          } else if(allBlocks[5] == false && placed == false) {
            for(let a = 1; a < allSides.length + 1; a++) {
              if(allBlocks[allSides[a]] == 'false' && placed == false) {
                console.log('4');
                this.playTurn(this.state.turn, allSides[a]);
                placed = true;
                break;
              }
            }
          } else if(allBlocks[5] == true && placed == false) {
            for(let e = 0; e < 4; e++) {
              if(allBlocks[corners[e]] == 'false') {
                this.playTurn(this.state.turn, corners[e]);
                placed = true;
                break;
              }
            }
          }
        }
      }
    }

    this.handleChangeTurn();

  }
  clearBoard(left) {

    if(left == 0 || this.state.gameOver == true) {
      let that = this;
      setTimeout(function() {
        for(let i = 1; i < 10; i++) {
          document.getElementById(i).style.backgroundImage = '';
          document.getElementById(i).style.backgroundColor = '';
        }
        that.setState({ blocks: {1: ["false"],
          2: ["false"],
          3: ["false"],
          4: ["false"],
          5: ["false"],
          6: ["false"],
          7: ["false"],
          8: ["false"],
          9: ["false"]}})
      }, 2000)
    }
  }

  playTurn(turn, item) {
    const left = this.state.totalLeft - 1;
    this.clearBoard(left);
    this.setState({totalLeft: left});
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
    this.setState({blocks: newArray});
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
