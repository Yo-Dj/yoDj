import React from 'react'
import Icon from '@material-ui/core/Icon'

class DeliverPage extends React.Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.onGoBack()
  }

  render() {
    let {request} = this.props
    let tip = parseFloat(request.tip).toFixed(2)
    return (
    <div className="DeliverPage">
       <div className="DeliverPage__subheader">
          <Icon onClick ={this.goBack}>close</Icon>
          <div className="DeliverPage--subtitle">Request Delivery</div>
       </div>
       <div className="DeliverPage__song-container">
          <div className="DeliverPage--song-icon" />
          <div className="DeliverPage--song-name">{request.song}</div>
       </div>
       <div className="DeliverPage--song-info">
          <div className="DeliverPage--clock-container">
            <div className="DeliverPage--clock-out"/>
          </div>
          Tap start to begin recording
          <div className="DeliverPage--deliver-time">
            Deliver by <span className="DeliverPage--time">11:19 PM</span>
          </div>
       </div>
      <div className="DeliverPage__request-info">
        <div className="DeliverPage--tip">Tip <span className="DeliverPage--time">$ {tip}</span></div>
        <div className="DeliverPage--user">
          <div className="DeliverPage--user-icon" />
          <div className="DeliverPage--user-name">{request.name}</div>
        </div>
      </div>
    </div>
    )
  }
}

export default DeliverPage
