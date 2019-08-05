export default theme => ({
  inputDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0 26px',
    '& .input-title': {
      margin: 0,
      fontWeight: 300
    },
    '& .MuiDivider-root': {
      marginLeft: '24px',
      flexGrow: 1
    }
  },
  multiInputGroup: {
    '& .MuiTextField-root': {
      margin: 0
    },
    '&:hover': {
      '& .MuiSvgIcon-root': {
        opacity: 1
      }
    }
  },
  questionInput: {
    display: 'flex',
    marginBottom: '20px',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      marginRight: '12px',
      marginTop: '8px',
      color: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        color: '#1967D2'
      }
    }
  },
  optionInput: {
    display: 'flex',
    marginLeft: '36px',
    marginBottom: '8px',
    '&:last-of-type': {
      marginBottom: '40px'
    },
    '& .MuiRadio-root': {
      height: '24px',
      width: '24px',
      marginRight: '8px'
    }
  },
  removeBtn: {
    opacity: 0,
    '&:hover': {
      color: '#cb2431!important'
    }
  },
  publishModule: {
    margin: '40px 0',
    width: '100%',
    backgroundColor: '#1967D2',
    '&:hover': {
      backgroundColor: '#0C5AC5'
    }
  }
});
