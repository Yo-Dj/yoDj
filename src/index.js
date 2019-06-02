import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import LoginWrapper from 'src/components/loginWrapper'
import MainPage from 'src/components/mainPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)
window.screen.lockOrientation('portrait-primary')
ReactDOM.render((
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
), document.getElementById('root'))
