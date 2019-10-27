import React from 'react'
import Icon from '@material-ui/core/Icon'
import {withRouter} from 'react-router-dom'
import Header from '../header'

class FanHomepage extends React.Component {
    constructor(props) {
        super(props)
        this.openProfile =this.openProfile.bind(this)
        this.gotoSelect = this.gotoSelect.bind(this)
        this.selectEvent = this.selectEvent.bind(this)
    }

    gotoSelect() {
        this.props.history.push('/dj-page')
    }

    openProfile() {
        this.props.onLogout()
    }

    selectEvent(fanEvent, online) {
        if (online) {
            this.props.onFanSelect(fanEvent)
        }
    }

    render() {
        let {userInfo, event, djs, allEvents} = this.props
        let onlineDjs = djs.reduce((acc, el) => {
            if (el.event && allEvents[el.event.requestId] && allEvents[el.event.requestId].tipAmount) {
                acc[el.userId] = el 
            }
            return acc
        }, {})
        let performingDJs = Object.values(onlineDjs)
        return (
            <div className="FanHomepage">
                <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={false}/>
                <div className="FanHomepage__main-container">
                    <div className='FanHomepage--subtitle'>
                        <div className="FanHomepage--text" onClick={this.gotoSelect}>Select a DJ <span className={'FanHomepage--online-arrow'}>></span></div>
                        <div className="FanHomepage--online"> {Object.keys(onlineDjs).length} online</div>
                    </div>
                    <div className="FanHomepage--djs-container">
                        {
                            performingDJs.map((dj, index) => (
                                <div className="FanHomepage--dj" key={index} onClick={() => this.selectEvent(dj,onlineDjs[dj.userId])}>
                                    <div className="FanHomepage--icon-container">
                                        <div className="FanHomepage--headset">
                                            <Icon classes={{root: `FanHomepage--headset-icon ${onlineDjs[dj.userId] ? 'FanHomepage--headset-online' : 'FanHomepage--headset-offline'}`}}>headset</Icon>
                                        </div>
                                        <div className="FanHomepage--dj-icon" style={{backgroundImage: `url(${dj.imageUrl})`}}/>
                                    </div>
                                    <div className="FanHomepage--dj-name">{dj.username}</div>
                                    <div className="FanHomepage--dj-club">{onlineDjs[dj.userId] ? dj.event.placeName : 'Club Z'}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FanHomepage)
