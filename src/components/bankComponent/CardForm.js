import React from 'react'
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import {createOptions} from './BankComponent'
import './bankComponent.less'

class CardFormComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log('STRIPE ---> ', props)
    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    })

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    })

    paymentRequest.canMakePayment().then((result) => {
      console.log('RESULT ---> ', result)
      this.setState({canMakePayment: !!result});
    })
    this.state = {
      canMakePayment: false,
      paymentRequest
    }
    this.elementRef = React.createRef()
    this.submitCard = this.submitCard.bind(this)
  }

  async submitCard(e) {
    let {userInfo: {username}, onSubmit} = this.props
    let {token} = await this.props.stripe.createToken({name: username})
    onSubmit(token)
  }

  render() {
    let {canMakePayment, payment} = this.state
    let {update} = this.props
    return (
      <form id="stripe-card">
        <div className="BankComponent--card-form">
          <CardElement
            ref={ref => this.elementRef=ref}
            {...createOptions(18)}
          />
        </div>
        <div className="BankComponent--add-button">
          <Button variant="contained" color="primary" classes={{root: 'BankComponent--save'}} onClick={this.submitCard}>{update ? 'Add Card' : 'Reset Card'}</Button>
        </div>
        <div>
          {
            canMakePayment
            ? (
              <PaymentRequestButtonElement
                paymentRequest={paymentRequest}
                className="PaymentRequestButton"
                style={{
                  paymentRequestButton: {
                    theme: 'light',
                    height: '64px',
                  }
                }}
              />
            )
            : null
          }
        </div>
      </form>
    )
  }
}

export default injectStripe(CardFormComponent)
