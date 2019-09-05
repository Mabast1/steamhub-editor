import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  signinContainer: {
    display: 'flex',
    padding: '0 17px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  signinForm: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
  signinInput: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #EAEAEA',
    padding: '10px',
    marginBottom: '16px',
    color: '#D5D5D5',
    '& .MuiDivider-root': {
      width: 1,
      height: 28,
      margin: '0 16px 0 10px',
    },
    '& .MuiInputBase-root': {
      color: 'rgba(0, 0, 0, 0.6)',
      flex: 1,
      '& input': {
        height: '1.2em',
        padding: '6px 0',
      },
    },
  },
  inputEyeIcon: {
    marginLeft: 10,
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.4)',
    },
  },
  signinAction: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '12px',
    '& p': {
      margin: 0,
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.6)',
      cursor: 'pointer',
      '&:hover': {
        color: '#3BB88E',
      },
    },
  },
  signinBtn: {
    marginLeft: 'auto',
    boxShadow: 'none',
    backgroundColor: '#57C5A0',
    color: 'white',
    padding: '10px 32px',
    '&:hover': {
      backgroundColor: '#3BB88E',
    },
  },
  signinError: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    '& p': {
      fontSize: '12px',
      marginLeft: '5px',
    },
  },
}));
