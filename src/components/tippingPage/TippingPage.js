import React from 'react'
import Tidal from 'tidal-api-wrapper'
import NumberFormat from 'react-number-format';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Header from '../header'
import 'react-widgets/dist/css/react-widgets.css'
import ScrollToBottom, {useScrollToBottom, useSticky} from 'react-scroll-to-bottom';
import AsyncSelect from 'react-select/async';

const tidal = new Tidal({
    countryCode: 'US',
    limit: 1000
  })

class TippingPage extends React.Component {
    constructor(props) {
        super(props)
        this.inputWrapper = React.createRef()
        this.tippingWrapper = React.createRef()
        this.state = {
            tipText: '',
            searchText: '',
            isError: false,
            errorMessage: '',
            busySpinner: false,
            options: [],
            search: '',
            numberSubtracted: false,
            searchDropdown: null
        }
        this.tipChange = this.tipChange.bind(this)
        this.leaveEvent = this.leaveEvent.bind(this)
        this.search = this.search.bind(this)
        this.submit = this.submit.bind(this)
        this.closeError = this.closeError.bind(this)
        this.openProfile = this.openProfile.bind(this)
        this.searchSong = this.searchSong.bind(this)
        this.setCursor = this.setCursor.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.songSelected = this.songSelected.bind(this)
        this.loadOptions = this.loadOptions.bind(this)
    }

    leaveEvent() {
        this.props.onLeave()
    }

    search(e) {
        this.setState({
            search: e
        })
    }

    tipChange(e) {
        let {value} = e.target
        // let tipText
        // let {numberSubtracted} = this.state
        // if (value.length > this.state.tipText.toString().length && !numberSubtracted) {
        //     let tip = parseFloat(value)
        //     tip = tip * 10
        //     tipText = tip.toFixed(2).toString()
        // } else if (numberSubtracted) {
        //     let tip = parseFloat(value)
        //     tipText = tip.toFixed(2).toString()
        //     numberSubtracted = false
        // } else if (!numberSubtracted){
        //     tipText = value
        //     numberSubtracted = true
        // }
        console.log('Tip change e ---> ', value)
        this.setState({
            // numberSubtracted,
            tipText: value
        })
    }

    setCursor(e) {
        let {value, selectionEnd} = e.target
        e.target.setSelectionRange(value.length, value.length);        
    }

    submit() {
        let {fanEvent, onSubmit} = this.props
        let tipAmount = parseFloat(this.state.tipText)
        let eventTip = parseFloat(fanEvent.tipAmount)
        let errorMessage = ''
        let isError = false
        if (!tipAmount && tipAmount !== 0) {
            errorMessage = 'Tip Container should not be empty'
            isError = true
        }
        if (this.state.tipText === '') {
            errorMessage = 'Tip Container should not be empty'
            isError = true
        }
        if (eventTip > tipAmount) {
            errorMessage = 'Tip Amount is below Minimum'
            isError = true
        }
        if (this.state.searchText === '') {
            errorMessage = 'Enter music or an album!'
            isError = true
        }

        this.setState({
            isError,
            errorMessage
        })
        if (isError) return
        onSubmit({tipAmount, music: this.state.searchText})
        this.setState({
            isError: true,
            errorMessage: 'Your request successfully submitted',
            tipText: '',
            search: '',
            searchText: '',
            options: [],
            searchDropdown: null
        })
    }

    openProfile() {
        this.props.onLogout()
    }

    closeError() {
        this.setState({
            isError: false,
            errorMessage: ''
        })
    }

    async searchSong(searchText) {
        const artists = await tidal.search(searchText, 'tracks', 5)
        let data = artists.map(song => {
            return `${song.title} by ${song.artist.name}`
        })
        return data.map(song => ({value: song, label: song}))
    }

     inputChange(e) {
        return e
    }

    scrollToBottom() {
        this.tippingWrapper.scrollIntoView({ behavior: "smooth" });
    }

    songSelected(e) {
        let {searchText} = this.state
        if (Object.keys(e).length > 0) {
            searchText = e.value
        }
        this.setState({
            searchDropdown: e,
            searchText
        })
    }
    
     async loadOptions (inputValue, callback) {
        let data = await this.searchSong(inputValue)
        callback(data);
    }

    render() {
        let {fanEvent, userInfo, allDjs} = this.props
        let eventDj = allDjs.reduce((acc, dj) => {
            if (dj.userId === fanEvent.dj) {
                acc = {...dj}
            }
            return acc
        }, {})
        let tip = parseFloat(fanEvent.tipAmount).toFixed(2)
        let completed = fanEvent.completed ? Object.keys(fanEvent.completed).length : 0

        const customInput = (<input 
            type="text"
            inputMode="decimanl"
            value={this.state.tipText}
            onChange={this.tipChange}
            className="TippingPage--tip-text"
            pattern="\d*"
            onClick={this.setCursor}
            placeholder="0.00" />)
        return (
            <div className="TippingPage" ref={el => this.tippingWrapper = el}>
                <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={true}/>
                <ScrollToBottom>
                <div className="TippingPage__fan-container">
                    <div className="TippingPage--icon-container">
                        <div className="TippingPage--headset">
                            <Icon classes={{root: `TippingPage--headset-icon`}}>headset</Icon>
                        </div>
                        <div className="TippingPage--dj-icon" style={{backgroundImage: `url(${eventDj.imageUrl})`}}/>
                        <div className="TippingPage--dj-name">{eventDj.username}</div>
                    </div>
                    <div className="TippingPage--place">{fanEvent.placeName}</div>
                    <div className="TippingPage--requests">{completed} Requests Completed</div>
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
                                <input
                                    type="text" inputmode="decimal" 
                                    // type="text"
                                    // inputMode="decimal"
                                    value={this.state.tipText}
                                    onChange={this.tipChange}
                                    className="TippingPage--tip-text"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="TippingPage--user-icon">
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
                            <AsyncSelect
                                className="TippingPage--dropdown"
                                value={this.state.searchDropdown}
                                isSearchable
                                onChange={this.songSelected}
                                cacheOptions
                                onInputChange={this.inputChange}
                                autoFocus={true}
                                loadOptions={this.loadOptions}
                                styles={{option: (provided, state) => ({
                                    ...provided,
                                    color: 'black',
                                    fontWeight: 'bold'
                                })
                                }
                                }
                                placeholder="Choose the song"
                                // onChange={e => this.setState({searchDropdown: e})}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </div>
                    </div>
                    <div className="TippingPage--submit-button">
                        <Button variant="contained" color="primary" classes={{root: 'TippingPage-submit'}} onClick={this.submit}>
                            Submit
                        </Button>
                    </div>
                </div>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  open={this.state.isError}
                  autoHideDuration={3000}
                  onClose={this.closeError}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                variant="error"

                  message={<span id="message-id">{this.state.errorMessage}</span>}
                  action={[
                      <IconButton
                        key="close"
                        arial-label="Close"
                        color="inherit"
                        onClick={this.closeError}
                      >
                        <CloseIcon />
                      </IconButton>
                  ]} />
                </ScrollToBottom>
            </div>
        )
    }
}

export default TippingPage
