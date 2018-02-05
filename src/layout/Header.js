import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import '../css/header.css';
// The Header creates links that can be used to navigate
// between routes.
export default class Header extends React.Component {
  render() {
    return(
      <div>
        <div className="freshdesignweb-top"><h1><Link to='/'>React Demo</Link></h1></div>
        <header>
          <div id="container">
            <div className="inner-padding">
              <h1 className="left text-left"><strong> Restaurant Menus</strong></h1>
              <div className="text-right">
                <Switch>
                  <Route exact path='/' render={() => (<Link className="btn btn-blue no-margin" to='/add'>Add New</Link>)}/>
                  <Route exact path='/add' render={() => (<Link className="btn btn-blue no-margin" to='/'>Back To Home</Link>)}/>
                  <Route exact path='/update/:id' render={() => (<Link className="btn btn-blue no-margin" to='/'>Back To Home</Link>)}/>
                </Switch>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
