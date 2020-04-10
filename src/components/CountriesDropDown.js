import '../style/dropdown.css';

import { Dropdown } from 'react-bootstrap';
import React from 'react';
import StatsPerCountry from './StatsPerCountry';
import apiConstants from '../constants/general';

class CountriesDropDown extends React.Component {
  getStatsByCountry(country) {
        fetch(apiConstants.apiEndpoint)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                lastFetched: Date.now(),
                currentCountryStats: result.filter(c => c.country === country)[0]
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
      if (!this.state.currentCountry || country && this.state.currentCountry !== country) {
        this.setState({ currentCountry: country });
        this.getStatsByCountry(country)
      }
    }

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        countries: [],
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
              countries: result.map(c => c.country).sort()
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
      const { error, isLoaded, countries } = this.state;
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
                        {countries.map(country => (
                            <Dropdown.Item key={country} onClick={() => this.changeCountry(country)}>
                                {country}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                  <br/>
                <StatsPerCountry stats={this.state.currentCountryStats} />
            </div>
        );
      }
    }
  }

  export default CountriesDropDown;