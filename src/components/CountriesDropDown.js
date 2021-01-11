import '../style/dropdown.css';

import { Dropdown } from 'react-bootstrap';
import React from 'react';
import StatsPerCountry from './StatsPerCountry';
import apiConstants from '../constants/general';

class CountriesDropDown extends React.Component {
    getStatsByCountry() {
        if (!this.state.currentCountry) return;

        console.log('time passed', Date.now() - this.state.lastFetched)
        if (Date.now() - this.state.lastFetched > 10000) {
          fetch(apiConstants.apiEndpoint)
          .then(res => res.json())
          .then(
              (result) => {
                  this.setState({
                      lastFetched: Date.now(),
                      allCountriesStats: result,
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
        else {
          this.setState({
            currentCountryStats: this.state.allCountriesStats.filter(c => c.country === this.state.currentCountry)[0]
          })
        }
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
        items: [],
        currentCountry: null,
        lastFetched: null,
        allCountriesStats: null,
      };
    }

    componentDidMount() {
      fetch(apiConstants.apiEndpoint)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              lastFetched: Date.now(),
              allCountriesStats: result,
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
        return (<div>Error: {error.message}</div>)
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