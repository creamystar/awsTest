import React from 'react';
import SwipeItem from './SwipeItem';
import Score from './Score';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageConv: false,
      title: '동물 상식',
      score: 0,
    }
  }
  checkScore = (s) => {
    this.setState({
      score: s * 10,
      pageConv: true,
    })
  }

  goAgain = () => {
    this.setState({
      score: 0,
      pageConv: false,
    })
    console.log(this.state.score)
  }
  render(){
    return (
      <div className="App">
        {
          this.state.pageConv? <Score title={this.state.title} score={this.state.score} goAgain = {this.goAgain}/> : <SwipeItem checkScore={this.checkScore}/>
        }
        
      </div>
    );
  }
}

export default App;
