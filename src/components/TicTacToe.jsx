import React from 'react';
import Grid from './Grid';
import o from '../Assets/imgs/o.png';






class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: ['1', '2', '3', '4', '5', '6', '7', '8','9'],
      turn: true,
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
      let options = possibilities[i];
      for(let e = 0; e < 3; e++) {
        let instance = this.state.blocks[options[e]];
        if(instance == true) {
          trueCount = trueCount + 1;
        }
      }
      if(trueCount == 3) {
        console.log("Game Over");
        let option = possibilities[i];
        for(let e = 0; e < 3; e++) {
          document.getElementById(option[e]).style.backgroundColor = 'Black';
          console.log("Color is black");
          this.setState({gameOver: true});
        }
      }
      if(trueCount == 2 && placed == false && this.state.gameOver != true) {
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
    if(placed == false && this.state.gameOver != true) {
      console.log(this.state.blocks);
      let allBlocks = this.state.blocks;
      if(allBlocks[1] == 'false' || allBlocks[3] == 'false' || allBlocks[7] == 'false' || allBlocks[9] == 'false' || allBlocks[2] == 'false' || allBlocks[4] == 'false' || allBlocks[5] == 'false' || allBlocks[6] == 'false' || allBlocks[8] == 'false') {
        if(allBlocks[5] != false) {
          if(allBlocks[1] == true ) {
            this.playTurn(this.state.turn, 5);
          } else if(allBlocks[3] == true){
            this.playTurn(this.state.turn, 5);
          } else if(allBlocks[7] == true) {
            this.playTurn(this.state.turn, 5);
          } else if(allBlocks[9] == true) {
            this.playTurn(this.state.turn, 5)
          }
        } else if(allBlocks[5] == false) {
          console.log('is running')
          let option = [2, 4, 6, 8];
          for(let e = 0; e < option.length; e++) {
            const random = Math.floor(Math.random() * 4);
            if(allBlocks[option[random]] == 'false') {
              this.playTurn(this.state.turn, option[random]);
              break;
            }
          }
        } else if(allBlocks[5] == true) {
          console.log('is running')
          const options = [1, 3, 7, 9];
          for(let e = 0; e < options.length; e++) {
            const random = Math.floor(Math.random() * 4);
            if(allBlocks[options[random]] == 'false') {
              console.log('is running');
              this.playTurn(this.state.turn, options[random]);
              break;
            }
          }
        } else if(allBlocks[2] == 'false' || allBlocks[4] == 'false' || allBlocks[6] == 'false' || allBlocks[8] == 'false') {
          let option = [1, 3, 7, 9];
          for(let e = 0; e < option.length; e++) {
            const random = Math.floor(Math.random() * 4);
            if(allBlocks[option[random]] == 'false') {
              this.playTurn(this.state.turn, option[random]);
              break;
            }
          }
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
