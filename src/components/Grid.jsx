import React from 'react';
import o from '../Assets/imgs/o.png';
import x from '../Assets/imgs/x.png';

function Grid(props) {

  let grid = {
    minWidth: '300px',
    height: '300px',
    border: '1px solid black',
    boxSizing: 'border-box',
    backgroundRepeat: 'no-repeat',
  }

  let pressed = function() {
    if(props.turn) {
      let currentImage = document.getElementById(props.item).style.backgroundImage;
      let image;
      if (props.turn) {
        image = x;
      } else {
        image = o;
      }
      if (currentImage === '') {
        document.getElementById(props.item).style.backgroundImage = `url(${image})`;
        props.playTurn(props.turn, props.item);
        props.onChangeTurn();
      }
    } else {
      console.log("Currently Player 2's turn");
    }
  }

return (
  <div id={props.item} style={grid} onClick={() => {pressed()}}> {props.item} </div>
  );
}


export default Grid;
