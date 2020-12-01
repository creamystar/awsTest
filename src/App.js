import React from 'react';
import Score from './Score';
import Ranking from './Ranking';
import Start from './Start';
import Message from './Message';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={(props) => <Start history={this.props.history} />} />
          <Route path="/score" exact render={(props) => <Score history={this.props.history} />} />
          <Route path="/message" exact render={(props) => <Message history={this.props.history} />}/>
          <Route path="/ranking" exact render={(props) => <Ranking history={this.props.history} />}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
