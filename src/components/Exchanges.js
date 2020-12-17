
// React
import React from 'react'

// Styles
import '../styles/exchanges.css';

// Services
import ExchangeService from '../services/ExchangeService'


class Exchanges extends React.Component {

    state = {
        myExchanges: [],
        searchedByUser: ''
    }

    exchangeService = new ExchangeService()

    componentDidMount = () => {
        this.exchangeService.viewExchanges(this.props.isLogged._id)
            .then((result) => result.myExchanges)
            .then((exchanges) => this.setState({ myExchanges: exchanges }))
            .catch((err) => console.log(err))
    }

    rerender = () => {
        this.exchangeService.viewExchanges(this.props.isLogged._id)
            .then((result) => result.myExchanges)
            .then((exchanges) => this.setState({ myExchanges: exchanges }))
            .catch((err) => console.log(err))
    }

    removeExchange(exchange) {
        this.exchangeService.deleteExchange(exchange)
            .then(() => this.rerender())
            .catch((err) => console.log(err))
    }

    renderBorrowed() {
        return this.state.myExchanges.map((exchange, index) => {
            return exchange.borrowed.map((borrowed, index) => {
                return (
                    <div key={index} class="col card-container">
                        <div class="card">
                            <img src={borrowed.imageUrl} alt={borrowed.title} class="card-img-top" />
                            <div class="card-body">
                                {/* <h3 class="card-title">Borrowed:</h3> */}
                                <h3 class="card-title">{borrowed.title}</h3>
                                <p class="card-text">Lent to: {exchange.userPartner}</p>
                            </div>
                            <div class="card-footer">
                                <button onClick={() => this.removeExchange(exchange)} class="btn btn-delete">Remove</button>
                            </div>
                        </div>
                    </div>
                )
            })
        })
    }

    renderAcquired() {
        return this.state.myExchanges.map((exchange, index) => {
            return exchange.acquired.map((acquired, index) => {
                return (
                    <div key={index} class="col card-container">
                        <div class="card">
                            <img src={acquired.imageUrl} alt={acquired.title} class="card-img-top" />
                            <div class="card-body">
                                {/* <h3 class="card-title">Acquired:</h3> */}
                                <h3 class="card-title">{acquired.title}</h3>

                                <p class="card-text">Owner: {exchange.userPartner}</p>
                            </div>
                            <div class="card-footer">
                                <button onClick={() => this.removeExchange(exchange)} class="btn btn-delete">Remove</button>
                            </div>
                        </div>
                    </div>
                )
            })
        })
    }

    changeSearchExchange = (_eventTarget) => {
        this.setState({ searchedByUser: { ...this.state.searchedByUser, [_eventTarget.name]: _eventTarget.value } });
    }

    searchBookExchange = (event) => {
        event.preventDefault();
        this.exchangeService.searchExchange(this.state.searchedByUser.userPartner, this.props.isLogged._id)
          .then((result) => result)
          .then((searched) => this.setState({ myExchanges: searched }))
          .catch((err) => console.log(err));
      }

    render() {
        return (
            <div className="exchange-container">

                <form class="container search-bar text-left" onSubmit={this.searchBookExchange}>
                    <div class="row align-items-center">
                        <div class="col-sm-4 col-md-10">
                            <label htmlFor="userPartner">User:</label>
                            <input class="form-control me-2" type="search" name="userPartner" onChange={(event) => this.changeSearchExchange(event.target)} />
                        </div>
                        <div class="col-sm-4 col-md-2 align-self-end search-div">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </div>
                    </div>

                </form>

                {this.state.myExchanges.length === 0
                    ? <p></p>
                    :
                    <div>
                        <div class="container ">
                            <h4 class="type-exchange">Borrowed</h4>
                            <div class="row row-cols-2 row-cols-md-5 g-4  divInterest">

                                {this.renderBorrowed()}
                            </div></div>

                        <div class="container ">
                            <h4 class="type-exchange">Acquired</h4>
                            <div class="row row-cols-2 row-cols-md-5 g-4 divInterest">

                                {this.renderAcquired()}
                            </div></div>
                    </div>
                }
            </div>
        )
    }
}

export default Exchanges