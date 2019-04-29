import React from 'react'
import Header from '../header'

class FanHomepage extends React.Component {
    constructor(props) {
        super(props)
        this.openProfile =this.openProfile.bind(this)
    }

    openProfile() {
        console.log('LogOut ---> ')
    }

    render() {
        let {userInfo, event} = this.props
        return (
            <div className="FanHomepage">
                <Header imageUrl={userInfo.imageUrl} iconClick={this.openProfile} isActive={false}/>
                <div className="FanHomepage__main-container">
                    <div className='FanHomepage--subtitle'>
                        <div className="FanHomepage--text">Select a DJ <span className={'FanHomepage--online-arrow'}>></span></div>
                        <div className="FanHomepage--online"> 18 online</div>
                    </div>
                    <div className="FanHomepage--djs-container">
                        <div className="FanHomepage--dj">
                            <div className="FanHomepage--dj-icon" />
                            <div className="FanHomepage--dj-name">@Nvd</div>
                            <div className="FanHomepage--dj-club">The Mid</div>
                        </div>

                        <div className="FanHomepage--dj">
                            <div className="FanHomepage--dj-icon" />
                            <div className="FanHomepage--dj-name">@Nvd</div>
                            <div className="FanHomepage--dj-club">The Mid</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FanHomepage
