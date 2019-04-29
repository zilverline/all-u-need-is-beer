import React, { Component } from "react";
import BeerItem from "./components/BeerItem";
import Axios from "axios";
import { List } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      countries: null,
    };
  }

  componentDidMount() {
    Axios
      .get("https://api.punkapi.com/v2/beers")
      .then(response => {
        const Data = response.data;
        this.setState({ data: Data });
      })
    
    Axios
    .get("https://restcountries.eu/rest/v2/region/europe")
    .then(response => {
      const Countries = response.data;
      this.setState({ countries: Countries });
    })
  }

  getRandom() {
    return Math.floor((Math.random() * 25) + 1);
  }

  render() {
    return (
        <List horizontal>
          {this.state.countries && this.state.data && this.state.data.map(element => (
            <List.Item>
              <List.Content>
                  <BeerItem 
                    name={element.name}   
                    image={element.image_url}
                    rating={Math.floor((Math.random() * 5) + 1)}
                    price={Math.floor(Math.random() * (1000 - 100) + 500) / (100)}
                    country={this.state.countries[this.getRandom()]}
                    onClick={(() => console.log(element.description))}
                  />
              </List.Content>
            </List.Item>
          ))}
        </List>
    );
  }
}

export default App;
