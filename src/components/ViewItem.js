import React from "react";
import { Link } from 'react-router-dom';
import firebase from '../firebase.js';

export default class ViewItem extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      isActive: false,
      id: ""
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddActive = this.handleAddActive.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('foods');
    itemsRef.on('value', (snapshot) => {
      let foods = snapshot.val();
      let newState = [];
      for (let item in foods) {
        newState.push({
          id: item,
          title: foods[item].title,
          image:  foods[item].image,
          content: foods[item].content,
          status: foods[item].status
        });
      }
      this.setState({
        foods: newState
      });
    });
  }

  handleDelete(itemId) {
    const itemRef = firebase.database().ref(`/foods/${itemId}`);
    itemRef.remove();
    
    this.setState({
      isActive: !this.state.isActive
    });
  }

  handleAddActive(itemId) {
    this.setState({
      isActive: !this.state.isActive,
      id: itemId
    });
  }

  render() {
    let isActiveClass = (this.state.isActive ? 'is-active': '');

    return (
      <div id="container">
        <div className={`modal-confirm ${isActiveClass}`}><div>Ban co muon xoa khong</div><span onClick={() => this.handleAddActive(this.state.id)} >Cancel</span><span  onClick={() => this.handleDelete(this.state.id)}>Delete</span></div>
        <div className="our_menu">
          <ul className="menu">

            {this.state.foods.map((item) => {

              let status= '';

              if(item.status === true) {
                status = <strong className='new'>{item.status}</strong>;
              }

              return (
                <li className="item" key={item.id}>
                  {status}
                  <img src={item.image} alt="Alternate" width="283" height="164" />
                  <div className="item_detail">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <div className="text-center">
                      <Link to={"/update/" + item.id} ><span className="info">Update</span></Link>
                      <span className="info" onClick={() => this.handleAddActive(item.id)} >Delete</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
