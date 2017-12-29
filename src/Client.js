import { Component } from 'react';

class Client extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            url: this.props.baseUrl
        };
    }

    fetch(){
        fetch(this.state.url)
            .then(response => response.json())
            .then(result => this.props.onSuccess(result))
            .catch((error) => this.props.onFailure(error));
    }

    /* We dont render anything */
    render(){
        return false;
    }
}

export default Client;