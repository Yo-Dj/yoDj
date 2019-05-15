import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Header from '../header'

class TippingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tipText: '',
            searchText: ''
        }
        this.tipChange = this.tipChange.bind(this)
        this.leaveEvent = this.leaveEvent.bind(this)
        this.search = this.search.bind(this)
    }

    leaveEvent() {
        console.log('Leave the event')
    }

    search(e) {
        this.setState({
            searchText: e.target.value
        })
    }

    tipChange(e) {
        this.setState({
            tipText: e.target.value
        })
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
        let tip = parseFloat(fanEvent.tipAmount).toFixed(2)
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
                <div className="TippingPage__tip-container">
                    <div className="TippingPage--amount">
                        <div className="TippingPage--subtitle">Tip<span className="TippingPage--subtitle-icon">></span></div>
                        <div className="TippingPage--input-container">
                            $
                            <div className="TippingPage--input">
                                <TextField
                                    value={this.state.tipText}
                                    margin="normal"
                                    onChange={this.tipChange}
                                    classes={{root: "TippingPage--tip-text"}}
                                    InputProps={{style: {textAlign: 'start', margin: '0 10px'}}}
                                />
                            </div>
                            <div className="TippingPage--user-icon">
                                {/* <Icon classes={{root: `TippingPage--sample-user`}}>account-box</Icon> */}
                                <svg className="TippingPage--sample-user" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M15 2H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zM9 4.75c1.24 0 2.25 1.01 2.25 2.25S10.24 9.25 9 9.25 6.75 8.24 6.75 7 7.76 4.75 9 4.75zM13.5 14h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V14z"/></svg>								
                            </div>
                        </div>
                    </div>
                    <div className="TippingPage--minimum">
                        <span className="TippingPage--tip-amount">Song Request</span>
                        minimum ${tip}
                    </div>
                    <div className="TippingPage--search-container">
                        <div className="TippingPage--music-icon" />
                        <div className="TippingPage--search-input">
                                <TextField
                                    value={this.state.searchText}
                                    margin="normal"
                                    placeholder="Search song, artist, album"
                                    onChange={this.search}
                                    classes={{root: "TippingPage--search-text"}}
                                    InputProps={{style: {textAlign: 'start', margin: '0 20px'}}}
                                />
                            </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default TippingPage
