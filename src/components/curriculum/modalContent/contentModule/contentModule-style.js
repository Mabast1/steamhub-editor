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
  errorMsg: {
    margin: 0,
    fontSize: '12px',
    color: 'red'
  }
});
