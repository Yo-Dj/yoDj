import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import {createOptions} from './BankComponent'
import './bankComponent.less'

class CardFormComponent extends React.Component {
  constructor(props) {
    super(props)  
    this.elementRef = React.createRef()
    this.submitCard = this.submitCard.bind(this)
  }

  async submitCard(e) {
    let {userInfo: {username}, onSubmit} = this.props
    let {token} = await this.props.stripe.createToken({name: username})
    onSubmit(token)
    // document.getElementById("stripe-card").reset();
    // console.log('ELEMENT -----> ', this.elementRef)
    // this.elementRef.clear()
  }

  render() {
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
      </form>
    )
  }
}

export default injectStripe(CardFormComponent)