import '../style/dropdown.css'

import {Dropdown} from 'react-bootstrap'
import React from 'react';
import StatsPerCountry from './StatsPerCountry'
import apiConstants from '../constants/general'

class CountriesDropDown extends React.Component {
    getStatsByCountry() {
        if (!this.state.currentCountry) return;

        fetch(apiConstants.apiEndpoint)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                lastFetched: Date.now(),
                currentCountryStats: result.filter(c => c.country === this.state.currentCountry)[0]
            });
        },
          (error) => {
              this.setState({
                  isLoaded: false,
                  error
                });
            }
        )
    }

    changeCountry(country) {
        if (country && this.state.currentCountry !== country) {
            this.setState({ currentCountry: country });
            this.getStatsByCountry()
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
            <div>
                <Dropdown style={{ maxHeight: "28px" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {!this.state.currentCountry ? 'Choose a country...' : this.state.currentCountry}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {items.map(item => (
                            <Dropdown.Item key={item} onClick={() => this.changeCountry(item)}>
                                {item}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                  <br />
                  <br/>
                <StatsPerCountry stats={this.state.currentCountryStats} />
            </div>
        );
      }
    }
  }

  export default CountriesDropDown;