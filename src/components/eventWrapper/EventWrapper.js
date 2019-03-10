import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'


class EventWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.createNewEvent = this.createNewEvent.bind(this)
  }

  createNewEvent(e) {
    e.preventDefault()
    this.props.onCreate()
  }

  render() {
    let {active} = this.props
    return (
      <div className="EventWrapper">
        <div className={`EventWrapper__address-container${!active ? ' EventWrapper--disable' : ''}`}>
          <div className="EventWrapper--address">Address</div>
          <div className="EventWrapper--city">
            City, State
          </div>
          <div className="EventWrapper--tip">
            min: $0.00
          </div>
        </div>
        <div className="EventWrapper__icon-container">
          <div className={`EventWrapper--headset${!active ? ' EventWrapper--disable' : ''}`}>
            <Icon classes={{root: 'EventWrapper--headset-icon'}}>headset</Icon>
          </div>
          <h3 className={!active ? 'EventWrapper--disable' : ''}>Duration</h3>
          <Button variant="contained" color="primary" classes={{root: 'EventWrapper--action'}} onClick={this.createNewEvent}>
            Create
          </Button>
        </div>
        <div className={`EventWrapper__event${!active ? ' EventWrapper--disable' : ''}`}>
          <h3>Event</h3>
          <div className="EventWrapper--icon" />
          <div className="EventWrapper--requests">
            0 Requests Completed
          </div>
        </div>
      </div>
    )
  }
}

export default EventWrapper
