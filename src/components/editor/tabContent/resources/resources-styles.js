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
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '12px',
    '& .MuiTextField-root': {
      margin: 0,
      '& .Mui-focused fieldset': {
        border: '1px solid #1967D2'
      }
    },
    '&:hover > .MuiSvgIcon-root': {
      opacity: 1
    },
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      marginRight: '12px',
      marginTop: '8px',
      color: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        color: '#1967D2'
      }
    },
    '& > div:first-of-type': {
      marginRight: '16px',
      flexGrow: 1
    },
    '& > div:last-of-type': {
      width: '70%'
    }
  },
  removeBtn: {
    opacity: 0,
    '&:hover': {
      color: '#cb2431!important'
    },
    '&:hover ~ .MuiTextField-root fieldset': {
      borderColor: 'red'
    }
  },
  textbox: {
    margin: 0,
    marginBottom: '40px',
    '& .Mui-focused fieldset': {
      border: '1px solid #1967D2!important'
    },
    '& .MuiInputBase-input': {
      minHeight: '280px'
    }
  }
});