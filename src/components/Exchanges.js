import React from 'react'
import ExchangeService from '../services/ExchangeService'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/exchanges.css';


class Exchanges extends React.Component {

    state = {
        myExchanges: [],
    }

    service = new ExchangeService()

    componentDidMount = () => {
        this.service.viewExchanges(this.props.isLogged._id)
            .then((result) => {
                return result.myExchanges
            })
            .then((exchanges) => {
                this.setState({ myExchanges: exchanges })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderExchanges() {
        return this.state.myExchanges.map((exchange, index) => {
            return (
                <div key={index}>
                    
                    
                    {exchange.borrowed.map((borrowed, index) => {
                        return (
                            <div key={index}>
                                <h3>Borrowed:</h3>
                                <p>{exchange.userPartner}</p>
                                <p>{borrowed.title}</p>
                                <img src={borrowed.imageUrl} alt={borrowed.title} />
                            </div>
                        )
                    })}
                    {exchange.acquired.map((acquired, index) => {
                        return (
                            <div key={index}>
                                <h3>Acquired:</h3>
                                <p>{exchange.userPartner}</p>
                                <p>{acquired.title}</p>
                                <img src={acquired.imageUrl} alt={acquired.title} />
                            </div>
                        )
                    })}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="exchange-container">
                <h2>Exchanges</h2>
                {this.state.myExchanges.length === 0
                    ? ''
                    : this.renderExchanges()
                }
            </div>
        )
    }
}

export default Exchanges