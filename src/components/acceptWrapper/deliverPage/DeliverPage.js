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
       </div>
    </div>
    )
  }
}

export default DeliverPage
