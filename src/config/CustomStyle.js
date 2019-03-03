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
        color: 'white',
        fontSize: '20px'
      }
    },
    MuiInput: {
      input: {
        textAlign: 'center',
        fontWeight: 'normal',
        color: 'white',
        fontFamily: ['Times New Roman', 'Times', 'serif'],
        fontSize: '20px',

        '&::placeholder': {
          opacity: 1,
          color: 'white'
        }
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
