import React from 'react'

class ActivityContainer extends React.Component {
  render() {
    let {request} = this.props
    return (
      <div className="ActivityContainer">
        <div className="ActivityContainer__profile-cont">
          <div className="ActivityContainer--icon" />
          <div className="ActivityContainer--name">{request.name}</div>
        </div>
        <div className="ActivityContainer__main">
          <div className="AcitivityContainer--message">{request.message}</div>
          <div className="ActivityContainer--time">11 : 11 PM</div>
        </div>
      </div>
    )
  }
}

export default ActivityContainer
