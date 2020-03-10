import React from 'react'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import PaymentIcon from 'react-payment-icons'
import { throws } from 'assert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar'

class PaymentModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultSave: false,
      selectedCard: null
    }
    this.onApplePayClick = this.onApplePayClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onSave = this.onSave.bind(this)
    this.makePayment = this.makePayment.bind(this)
    this.onCreditCard = this.onCreditCard.bind(this)
  }

  closeModal() {
    console.log('Close is clicked')
    this.props.onCloseModal()
  }

  onApplePayClick() {
    console.log('Apple Pay Click')
    this.setState({
      selectedCard: 'applePay'
    })
  }

  onSave(event) {
    this.setState({
      defaultSave: event.target.checked
    })
  }

  onCreditCard() {
    this.setState({
      selectedCard: 'creditCard'
    })
  }

  makePayment() {
    let {selectedCard} = this.state
    let {onPay} = this.props
    if (selectedCard === null) {
      // TO DO show snackbar error message
    } else if (selectedCard === 'creditCard') {
      onPay('creditCard')
    } else if (selectedCard === 'applePay') {

    }
    this.props.onCloseModal()
  }

  render() {
    let {isVisible, userCard} = this.props
    let cardExist = (userCard.sources.data) !== undefined
    let card = {}
    if (cardExist) {
      card.type = userCard.sources.data[0].brand.toLowerCase()
      card.last4 = userCard.sources.data[0].last4
      card.exp_year = userCard.sources.data[0].exp_year
      card.exp_month = userCard.sources.data[0].exp_month
      card.name = userCard.sources.data[0].name
    }
    return (
      <div className={`PaymentModal${isVisible ? ' PaymentModal--visible' : ''}`}>
        <div className="PaymentModal--close-icon" onClick={this.closeModal}>
            <Icon onClick ={this.closeModal}>close</Icon>
        </div>
        <div className="PaymentModal__container">
          <div className="PaymentModal--title">Pay With</div>
          <div className="PaymentModal__options">
            <div className={`PaymentModal--applepay${this.state.selectedCard === 'applePay' ? ' PaymentModal--selected-card' : ''}`} onClick={this.onApplePayClick} />
            <div className={`PaymentModal__creditcard`} onClick={this.onCreditCard}>
                <PaymentIcon
                    id={card.type}
                    style={{ width: 100, height: 80 }}
                    className={this.state.selectedCard === 'creditCard' ? 'PaymentModal--selected-card' : ''}
                />
                <div className="PaymentModal--last-digits">
                  {card.last4}
                </div>
            </div>
          </div>
            <div className="PaymentModal--save">
              <Switch
                checked={this.state.defaultSave}
                onChange={this.onSave}
                value="defaultSave"
                color="primary"
              />
              <div className="PaymentModal--label">Save as a default payment!</div>
            </div>
            <div className="PaymentModal--pay">
              <Button variant="contained" color="primary" classes={{root: 'TippingPage--button', label: 'TippingPage--button-label'}} onClick={this.makePayment}>
                Pay
              </Button>
            </div>
        </div>
      </div>
    )
  }
}

export default PaymentModal