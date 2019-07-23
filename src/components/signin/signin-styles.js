export default theme => ({
  signinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  signinForm: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '400px'
    }
  },
  signinInput: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #EAEAEA',
    padding: '10px',
    marginBottom: '15px',
    color: '#D5D5D5',
    '& .MuiDivider-root': {
      width: 1,
      height: 28,
      margin: '0 16px 0 10px'
    },
    '& .MuiInputBase-root': {
      color: 'rgba(0, 0, 0, 0.6)',
      flex: 1,
      '& .MuiInputBase-input': {
        height: '1.2em',
        padding: '6px 0'
      }
    }
  },
  inputEyeIcon: {
    marginLeft: 10,
    cursor: 'pointer'
  },
  signinAction: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
    '& p': {
      margin: 0,
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.6)',
      cursor: 'pointer'
    }
  },
  signinBtn: {
    marginLeft: 'auto',
    boxShadow: 'none',
    backgroundColor: '#57C5A0',
    color: 'white',
    padding: '10px 32px',
    '&:hover': {
      backgroundColor: '#3BB88E'
    }
  },
  signinError: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    '& p': {
      fontSize: '12px',
      marginLeft: '5px'
    }
  }
});
