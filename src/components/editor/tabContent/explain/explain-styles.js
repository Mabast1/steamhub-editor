export default theme => ({
  inputDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0 26px',
    '& .input-title': {
      margin: 0,
      fontWeight: 300,
    },
    '& .MuiDivider-root': {
      marginLeft: '24px',
      flexGrow: 1,
    },
  },
  inputGroup: {
    display: 'flex',
    marginBottom: '40px',
    '&:hover > .MuiSvgIcon-root': {
      opacity: 1,
    },
    '& > .MuiSvgIcon-root': {
      marginTop: '8px',
      marginRight: '14px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        color: '#1967D2',
      },
    },
    '& > div': {
      flexGrow: 1,
    },
  },
  removeBtn: {
    opacity: 0,
    '&:hover': {
      color: '#cb2431!important',
    },
  },
  textbox: {
    margin: 0,
    '& .Mui-focused fieldset': {
      border: '1px solid #1967D2!important',
    },
  },
  mediaUrl: {
    display: 'flex',
    marginTop: '18px',
    '& .MuiTextField-root': {
      margin: 0,
      '& .Mui-focused fieldset': {
        border: '1px solid #1967D2!important',
      },
    },
    '& .MuiButtonBase-root': {
      marginLeft: '18px',
      minWidth: '110px',
      '&.Mui-disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
      '& .MuiCircularProgress-root': {
        color: 'rgba(0, 0, 0, 0.6)',
      },
    },
  },
  attachments: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 52px)',
    gridGap: '12px',
    marginTop: '18px',
    '& > div': {
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 0',
      color: 'rgba(0, 0, 0, 0.4)',
      '&:hover': {
        borderColor: '#1967D2',
        color: '#1967D2',
      },
    },
  },
  mediaTypeActive: {
    backgroundColor: '#1967D2',
    color: 'white!important',
    borderColor: '#1967D2!important',
  },
});
