export default theme => ({
  modalUpload: {
    display: 'flex',
    marginTop: '8px',
    alignItems: 'center',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.4)',
    '& .MuiButton-root': {
      marginRight: '12px'
    },
    '& p': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginRight: '12px'
    },
    '& .success-msg': {
      color: 'green'
    }
  },
  modalDivider: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.6)',
    margin: '24px 0 6px',
    '& .MuiDivider-root': {
      marginLeft: '17px',
      flexGrow: 1
    }
  },
  dropDown: {
    margin: '8px 0 4px',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiSelect-icon': {
      marginRight: '8px'
    }
  },
  skills: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.6)',
      marginRight: '8px',
      '&:hover': {
        color: '#1967D2'
      }
    }
  },
  removeBtn: {
    '&:hover': {
      color: '#cb2431!important'
    },
    '&:hover + .MuiTextField-root fieldset': {
      borderColor: 'red'
    }
  }
});
