import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import {createOptions} from './BankComponent'
import './bankComponent.less'

class CardFormComponent extends React.Component {
  constructor(props) {
    super(props)  
    this.submitCard = this.submitCard.bind(this)
  }

  async submitCard(e) {
    let {userInfo: {username}, onSubmit} = this.props
    let {token} = await this.props.stripe.createToken({name: username})
    onSubmit(token)
  }

  render() {
    let {update} = this.props
    return (
      <form>
        <div className="BankComponent--card-form">
          <CardElement
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