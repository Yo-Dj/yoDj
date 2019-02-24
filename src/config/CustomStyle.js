import {createMuiTheme} from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white'
      }
    },
    MuiInput: {
      input: {
        textAlign: 'center',
        color: 'white'
      },
      underline: {
        borderBottom: '1px solid white',
        '&:before': {
          borderBottom: '1px solid white',
        }
      },
    }
  }
})

export default theme
