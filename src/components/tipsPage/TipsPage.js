import React from 'react'
import Header from '../header'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'


class TipsPage extends React.Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.handlePay = this.handlePay.bind(this)
  }

  goBack() {
    this.props.history.push('/profile')
  }

  handlePay() {
    console.log('Handle Pay is clicked')
  }

  render() {
    let {userInfo} = this.props
    let amount = userInfo.tip ? userInfo.tip : 0
    return (
      <div className="BankComponent">
        <Header imageUrl={userInfo.imageUrl} iconClick={() => {}} isActive={false} onClick={() => {}}/>
        <div className="BankComponent__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="BankComponent--subtitle">Tips</div>
       </div>
       <div className="BankComponent--tip">
        ${amount}
       </div>
       <div className="BankComponent--cash-button">
         <Button
            variant="contained"
            color="primary"
            onClick={this.handlePay}
            classes={{root: 'BankComponent--cash-out'}}
          >Cash Out</Button>
       </div>
      </div>
    )
  }
}

export default withRouter(TipsPage)
