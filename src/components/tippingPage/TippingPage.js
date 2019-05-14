import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Header from '../header'

class TippingPage extends React.Component {
    constructor(props) {
        super(props)
        this.leaveEvent = this.leaveEvent.bind(this)
    }

    leaveEvent() {
        console.log('Leave the event')
    }

    render() {
        let {fanEvent, userInfo, allDjs} = this.props
        console.log('DJ ---> ', allDjs)
        let eventDj = allDjs.reduce((acc, dj) => {
            if (dj.userId === fanEvent.dj) {
                acc ={...dj}
            }
            return acc
        }, {})

        console.log('Dj ---> ', eventDj)
        return (
            <div className="TippingPage">
                <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true}/>
                <div className="TippingPage__fan-container">
                    <div className="TippingPage--icon-container">
                        <div className="TippingPage--headset">
                            <Icon classes={{root: `TippingPage--headset-icon`}}>headset</Icon>
                        </div>
                        <div className="TippingPage--dj-icon" style={{backgroundImage: `url(${eventDj.imageUrl})`}}/>
                        <div className="TippingPage--dj-name">{eventDj.username}</div>
                    </div>
                    <div className="TippingPage--place">{fanEvent.placeName}</div>
                    <div className="TippingPage--requests">9 Requests Completed</div>
                    <div className="TippingPage--leave-event">
                        <Button variant="contained" color="primary" classes={{root: 'TippingPage--button', label: 'TippingPage--button-label'}} onClick={this.leaveEvent}>
                            Leave Event
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TippingPage
