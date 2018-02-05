import React from "react";
import firebase from '../firebase.js';

export default class Form extends React.Component {
  constructor(props) {

    super();
    this.state = {
      title: "",
      image: "",
      content: "",
      status: "",
      id: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const item = {
      title: this.state.title,
      image: this.state.image,
      content: this.state.content,
      status: this.state.status
    }
    const foodsId = this.props.match.params.id;
    firebase.database().ref().child('/foods/' + foodsId).update(item);
    this.props.history.push("/");
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('foods');
    itemsRef.on('value', (snapshot) => {
      let foods = snapshot.val();
      let foodsId = this.props.match.params.id;
      this.setFoods(foods, foodsId);
    });
  }

  setFoods(foods, foodsId) {
    this.setState({
      title: foods[foodsId].title,
      image:  foods[foodsId].image,
      content: foods[foodsId].content,
      status: foods[foodsId].status
    });
  }

  render() {
    return (
      <div id="container">
        <div className="inner-padding">
          <form onSubmit={this.handleSubmit}>
            <label>Enter title:</label>
            <input name="title" type="text" placeholder="Enter title ..."  onChange={this.handleChange} value={this.state.title} />
            <label>Enter link image</label>
            <input name="image" type="url" placeholder="Enter link image ..."  onChange={this.handleChange} value={this.state.image} />
            <label>Enter description: </label>
            <textarea name="content" rows="4" ls="30" placeholder="Enter description ..."  onChange={this.handleChange} value={this.state.content} ></textarea>
            <div className="checkBox-group">
              <input id="status" type="checkbox" name="status"  onChange = {this.handleChange} />
              <label className="checkbox-lable" htmlFor="status">Is new products?:</label>
            </div>
            <input className="btn btn-blue" type="submit" value="Update product" />
          </form>
        </div>
      </div>
    );
  }
}
