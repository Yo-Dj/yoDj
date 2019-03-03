import React from 'react'

class SocialMedia extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SocialMedia">
         <div className="SocialMedia__icon" />
         One more step!
         <div className="SocialMedia__description">
          To verify your DJ status connect a social network
         </div>
      </div>
    )
  }
}

export default SocialMedia
