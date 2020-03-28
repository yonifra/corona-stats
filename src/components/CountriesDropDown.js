import {Dropdown} from 'react-bootstrap'
import React from 'react';
import apiConstants from '../constants/api'
class CountriesDropDown extends React.Component {
    getCountries = () => {
        return ['Italy', 'China', 'Israel']
    }

    getByCountry = countryCode => {
        return countryCode;
    }

    changeCountry = (event) => {
        const country = event.target.value
        console.log('Got country code: ', country);
        if (this.state.currentCountry !== country) {
            this.setState({currentCountry: country});
        }
    }

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        currentCountry: null
      };
    }

    componentDidMount() {
      fetch(apiConstants.apiEndpoint)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.map(c => c.country)
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {!this.state.currentCountry ? 'Choose a country...' : this.state.currentCountry}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {items.map(item => (
                        <Dropdown.Item key={item} onChange={this.changeCountry}>{item}</Dropdown.Item>
                        // <a className="dropdown-item" href="#" onSelect={this.changeCountry}>{item}</a>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
      }
    }
  }

  export default CountriesDropDown;