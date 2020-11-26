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
      score: 0 //이렇게 주면 될까? 
    })
    console.log('점수계산')
    console.log(this.state.score)
    console.log(s)
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
    //this.setState({ data: data, } () => { setState 이후 실행됨. 이렇게 하면 동기식 처리 가능 (동기: 로직 끝내고 제어 반납 <-> 비동기)})
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
