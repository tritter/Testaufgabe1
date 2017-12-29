import React, { Component } from 'react';
import './App.css';
import ProductRow from './ProductRow';
import Client from './Client';
import Storage from './Storage';

class App extends Component {
  
  constructor(props) {
    super(props);
    /* Set to our Storage component */
    this.storage = null;
    /* Set to our Client component */
    this.client = null;
    this.state = { 
      results: [],
      message: `No products fetched`
    };
  }
  
  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      this.setState({ message: 'Searched for an invalid ID', results: [] });
      return;
    }

    const cachedHit = this.storage.get(value);
    if (cachedHit) {
      this.setState({ message: `Found 1 product`, results: [cachedHit] });
    }else{
      this.setState({ message: `No products found with ID: ${value}`, results: [] });
    }
  }

  onFetchProducts = (e) => {
    this.setState({ message: 'Fetching products...' });
    this.client.fetch();
  }

  onSuccess = (result) => {
    const products = result.data.products
    const numberOfProducts = products.length 
    //Store each product into the storage
    products.forEach((product) => {
      this.storage.set(product.ID, product);
    })
    this.setState({ message: `${numberOfProducts} products fetched` });
  }

  onFailure = (error) => {
    this.setState({ message: error });
  }
  
  render() {
    //Create the ProductRows out of the results we got
    const results = this.state.results.map((product) =>
        <ProductRow value={product} key={product.ID} />
      );
    return (
          <div className="App">
          <Storage ref={instance => { this.storage = instance; }} context="products"/>
          <Client ref={instance => { this.client = instance; }} baseUrl="http://api.cewe-community.com/v2/products" onSuccess={this.onSuccess} onFailure={this.onFailure}/>
        <header className="App-header">
          <h1 className="App-title">Products</h1>
          <button onClick={this.onFetchProducts}>
            Fetch products
          </button>
          <form type="submit" onSubmit={this.onSearch}>
            <input type="text" ref={node => this.input = node} />
            <button type="text">Search</button>
          </form>
          <div className="Search-Info">
          { this.state.message }
          </div>
        </header>
        <div className="App-content">
          { results }
        </div>
      </div>
    );
 }
}

export default App;
