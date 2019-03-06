import React from 'react'
import fire from 'src/config/Fire'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      // console.log('User ---> ', user)
      if (user) {
        // console.log User Signed In
      } else {
        // console.log('User is NOT Logged I
      }
    })
  }

  render() {
    return (
      <div className="Homepage">
        Homepage 2
      </div>
    )
  }
}

export default Homepage
