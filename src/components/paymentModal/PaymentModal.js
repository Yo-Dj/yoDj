import React from 'react'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import PaymentIcon from 'react-payment-icons'
import { throws } from 'assert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// const customSwitchColors = withStyles(theme => ({
//   root: {
//     width: 50,
//     height: 20
//   },
//   switchBase: {
//     padding: 1,
//     '&$checked': {
//       transform: 'translateX(16px)',
//       color: theme.palette.common.white,
//       '& + $track': {
//         backgroundColor: '#52d869',
//         opacity: 1,
//         border: 'none',
//       },
//     }
//   },
//   track: {
//     backgroundColor: theme.palette.grey[50],
//     opacity: 1,
//     transition: theme.transitions.create(['background-color', 'border']),
//   },
//   checked: {},
//   label: {
//     color: theme.palette.common.white,
//   }
// }))

// const AntSwitch = withStyles(theme => ({
//   root: {
//     width: 28,
//     height: 16,
//     padding: 0,
//     display: 'flex',
//   },
//   switchBase: {
//     padding: 2,
//     color: theme.palette.grey[500],
//     '&$checked': {
//       transform: 'translateX(12px)',
//       color: theme.palette.common.white,
//       '& + $track': {
//         opacity: 1,
//         backgroundColor: theme.palette.primary.main,
//         borderColor: theme.palette.primary.main,
//       },
//     },
//   },
//   thumb: {
//     width: 12,
//     height: 12,
//     boxShadow: 'none',
//   },
//   track: {
//     border: `1px solid ${theme.palette.grey[500]}`,
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor: theme.palette.common.white,
//   },
//   checked: {},
// }))(Switch);

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

  }

  render() {
    let {isVisible} = this.props
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
                    id='visa'
                    style={{ width: 100, height: 80 }}
                    className={this.state.selectedCard === 'creditCard' ? 'PaymentModal--selected-card' : ''}
                />
                <div className="PaymentModal--last-digits">
                  4242
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