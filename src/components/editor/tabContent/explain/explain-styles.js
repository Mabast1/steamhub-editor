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
  textbox: {
    margin: 0,
    '& .Mui-focused fieldset': {
      border: '1px solid #1967D2!important'
    },
    '& .MuiInputBase-input': {
      minHeight: '280px'
    }
  },
  mediaUrl: {
    display: 'flex',
    marginTop: '24px',
    '& .MuiTextField-root': {
      margin: 0,
      '& .Mui-focused fieldset': {
        border: '1px solid #1967D2!important'
      }
    },
    '& .MuiButtonBase-root': {
      marginLeft: '18px',
      minWidth: '110px',
      '&.Mui-disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '& .MuiCircularProgress-root': {
        color: 'rgba(0, 0, 0, 0.6)'
      }
    }
  },
  attachments: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 180px)',
    gridGap: '10px',
    marginTop: '24px',
    marginBottom: '40px',
    '& > div': {
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 0',
      color: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        borderColor: '#1967D2',
        color: '#1967D2'
      },
      '& p': {
        margin: 0,
        marginTop: '12px'
      }
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 210px)',
      gridGap: '20px'
    }
  },
  mediaTypeActive: {
    backgroundColor: '#1967D2',
    color: 'white!important',
    borderColor: '#1967D2!important'
  }
});
