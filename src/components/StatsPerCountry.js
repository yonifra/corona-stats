import React, { Component } from 'react'

import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

export default class StatsPerCountry extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidUpdate() {
    //     console.log('stats', this.props.stats)

    // }
    // const [show, setShow] = useState(true);
    render() {
        const stats = this.props.stats;

        if (stats) {
            return (<Card style={{ width: '38rem' }}>
                <Card.Header>Stats for {stats.country}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Total cases: {stats.cases}</ListGroup.Item>
                    <ListGroup.Item>Total deaths: {stats.deaths}</ListGroup.Item>
                    <ListGroup.Item>New cases today: {stats.todayCases}</ListGroup.Item>
                    <ListGroup.Item>New deaths today: {stats.todayDeaths}</ListGroup.Item>
                    <ListGroup.Item>Total recovered: {stats.recovered}</ListGroup.Item>
                    <ListGroup.Item>Active cases: {stats.active}</ListGroup.Item>
                    <ListGroup.Item>Critical condition: {stats.critical}</ListGroup.Item>
                    <ListGroup.Item>Cases per million: {stats.casesPerOneMillion}</ListGroup.Item>
                    <ListGroup.Item>Deaths per million: {stats.deathsPerOneMillion}</ListGroup.Item>
                </ListGroup>
            </Card>)
        }

        return (
            <Alert variant="danger"  style={{ width: '38rem' }}>
                <Alert.Heading>Oh snap!</Alert.Heading>
                <p>
                    We couldn't find statistics for the selected country :/<br/>
                    Please try re-selecting the country
                </p>
            </Alert>
        )
    }
}
