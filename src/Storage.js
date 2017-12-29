import { Component } from 'react';

class Storage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      context: props.context
    };
  }
  
  /* Finds an object inside the current context; otherwise return null */
  get(id){
    const hit = localStorage.getItem(`${this.state.context}-${id}`);
    if (hit) {
      return JSON.parse(hit)
    }
    return null;
  }
  
  /* Store JSON object into the current context with a given id  */
  set(id, object){
    localStorage.setItem(`${this.state.context}-${id}`, JSON.stringify(object));
  }

  /* We dont render anything */
  render(){
    return false;
  }
}

export default Storage;