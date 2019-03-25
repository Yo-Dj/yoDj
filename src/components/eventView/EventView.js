import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Header from '../header'

class EventView extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.history.push('/home')
  }

  render() {
    let {userInfo, event} = this.props
    console.log('Event --> ', event)
    return (
      <div className="EventView">
        <Header imageUrl={userInfo.imageUrl} iconClick={this.profileImgClicked} isActive={true} onClick={() => {}}/>
        <div className="EventView__subheader">
          <Icon onClick ={this.handleClose}>close</Icon>
          <div className="EventView--subtitle">{event.placeName}</div>
       </div>
       <div className="EventView__main-container">
         <div className="EventView--headset">
            <Icon classes={{root: 'EventView--headset-icon'}}>headset</Icon>
         </div>
        <div className="EventView--time-container">
          <div>Elapsed Time</div>
          <div className="EventView--time">time</div>
          <div className="EventView--info"> Started at 10pm</div>
        </div>
        <div className="EventView--icon" />
       </div>
      </div>
    )
  }
}

export default EventView

