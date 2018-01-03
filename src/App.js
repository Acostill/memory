import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const cardSrc = 'https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards'

const symbols = [
  'apple', 'camera', 'clover', 'coffee', 'heart',
  'key', 'paw', 'smiley', 'snowflake', 'star'
]

const cardFronts = [
  'https://vignette.wikia.nocookie.net/fantendo/images/e/e5/Super_Mario_%21.png/revision/latest?cb=20131217020548',
  'https://vignette4.wikia.nocookie.net/nintendo/images/0/0b/Toad_left_sitting.png/revision/latest?cb=20140607102647&path-prefix=en',
  'https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG',
  'https://static.giantbomb.com/uploads/original/14/149329/2267433-1000px_bowser_in_koopa_car_1_.png',
  'https://vignette.wikia.nocookie.net/mario/images/c/c8/Golden_Coin_%28New_Super_Mario_Bros.%29.png/revision/latest?cb=20110313000322',
  'https://vignette.wikia.nocookie.net/fantendo/images/2/20/Luigi_SM3DW.png/revision/latest?cb=20160717024706',
  'https://vignette.wikia.nocookie.net/egamia/images/d/d9/Rosalina.png/revision/latest/scale-to-width-down/452?cb=20140805201928',
  'https://vignette.wikia.nocookie.net/super-mario-3d-world/images/2/26/Princess_Peach_Artwork_-_Super_Mario_3D_World.png/revision/latest?cb=20131006181848',
  'https://vignette.wikia.nocookie.net/fantendo/images/2/27/Big_Boo_NSMBDIY.png/revision/latest?cb=20100407013631',
  'https://vignette.wikia.nocookie.net/fantendo/images/4/43/Toadsworth_sunrise_stroll_by_vinfreild-d7no3sq.png/revision/latest?cb=20150221192318'
]

const cardpool = []

cardFronts.forEach(el => {
  cardpool.push(el)
  cardpool.push(el)
})

const player1 = {
  name: 'Gerson',
  score: 0,
  color: '#778fcd'
}

const player2 = {
  name: 'Player 2',
  score: 0,
  color: '#ffe34d'
}
class Card extends React.Component {
  constructor() {
    super();

    this.back = 'https://ih0.redbubble.net/image.222718851.4988/flat,800x800,075,f.u2.jpg';
    this.front = cardpool.splice(Math.floor(Math.random() * cardpool.length - 1), 1).toString()
    this.state = {
      display: this.back,
      color: 'white'
    }
  }
  
  handleCardClick = e => {
    if (this.state.display === this.front) return;
    if (this.props.app.state.openCards === 2) return;

    this.setState({
      display: this.front
    })
    if (this.props.app.state.hasUnpairedCard) {
      if (this.props.app.state.unpairedCard.front === this.front) {
        this.setState({
          color: this.props.app.state.currentPlayer.color
        })
        this.props.app.state.unpairedCard.setState({
          color: this.props.app.state.currentPlayer.color
        })

        this.props.app.setState({
          hasUnpairedCard: false,
          unpairedCard: null,
          openCards: 0
        })
        this.props.app.state.currentPlayer.score++
      } else {
        this.props.app.setState({
          openCards: this.props.app.state.openCards + 1
        })
        setTimeout(() => {
          this.props.app.state.unpairedCard.setState({
            display: this.props.app.state.unpairedCard.back,
          })
          this.setState({
            display: this.back
          })
          this.props.app.setState({
            hasUnpairedCard: false,
            unpairedCard: null, 
            openCards: 0,
            currentPlayer: this.props.app.state.currentPlayer === player1 ? 
                           this.props.app.state.currentPlayer = player2 :
                           this.props.app.state.currentPlayer = player1
          })
        }, 1000)
      }
    } else {
      this.props.app.setState({
        hasUnpairedCard: true,
        unpairedCard: this,
        openCards: this.props.app.state.openCards + 1
      })
    }
    console.log(this.props.app.state)
  }
  
  render() {
    const {app, matchCard} = this.props
    return <card onClick={this.handleCardClick} style={{backgroundColor: this.state.color}}><img src={this.state.display}></img></card>
  }
}


class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      gameOver: false,
      hasUnpairedCard: false,
      unpairedCard: null,
      openCards: 0,
      player1: player1,
      player2: player2,
      currentPlayer: player1
    }
  }

  render() {
    const { currentPlayer, player1, player2 } = this.state;

    return (
      <div>
        <h1>Current Turn: {currentPlayer.name}</h1>
        <h2>{player1.name}: {player1.score} {'                                                   '}
        {player2.name}: {player2.score}</h2>
        <div id='deck'>
        <row>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
        </row>
        <row>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
        </row>
        <row>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/> 
        </row>
        <row>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
          <Card matchCard={this.matchCard} app={this}/>
        </row>
        </div>
      </div>
    );
  }
}

export default App;
