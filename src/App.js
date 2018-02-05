import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from "./layout/Header";
import ViewItem from "./components/ViewItem";
import FormAdd from "./components/FormAdd";
import FormUpdate from "./components/FormUpdate";
import './App.css';
import './css/base.css';
import './css/reset.css';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path='/' render={() => (<ViewItem />)}/>
            <Route path='/add' component={FormAdd} />
            <Route path='/update/:id' component={FormUpdate} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
