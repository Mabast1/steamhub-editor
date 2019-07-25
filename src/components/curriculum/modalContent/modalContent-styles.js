export default theme => ({
  modalTitle: {
    paddingBottom: 0
  },
  modalContent: {
    paddingBottom: '16px'
  },
  modalActions: {
    padding: '16px 24px',
    '& .MuiButton-root': {
      fontSize: '13px'
    },
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#1967D2',
      color: 'white',
      '&:hover': {
        backgroundColor: '#0C5AC5'
      }
    }
  }
});
