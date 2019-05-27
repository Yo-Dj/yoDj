import React from 'react'
import moment from 'moment'

class ActivityContainer extends React.Component {
  render() {
    let {request} = this.props
    let date = new Date(request.time)
    let eventTime = moment(date).format('h:mm a')

    return (
      <div className="ActivityContainer">
        <div className="ActivityContainer__profile-cont">
          <div className="ActivityContainer--icon" style={{backgroundImage: `url(${request.img})`}}/>
          <div className="ActivityContainer--name">{request.name}</div>
        </div>
        <div className="ActivityContainer__main">
          <div className="AcitivityContainer--message">{request.message}</div>
          <div className="ActivityContainer--time">{eventTime}</div>
        </div>
      </div>
    )
  }
}

export default ActivityContainer
