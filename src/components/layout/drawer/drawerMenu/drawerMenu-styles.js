export default theme => ({
  drawerMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  toolbar: {
    minHeight: '68px'
  },
  drawerListItem: {
    padding: '6px 26px',
    color: 'rgba(0, 0, 0, 0.6)',
    '& .MuiListItemIcon-root': {
      minWidth: '38px'
    },
    '& .MuiListItemText-primary': {
      fontSize: '14px'
    }
  },
  drawerNewBtn: {
    margin: 'auto 54px 30px',
    backgroundColor: '#1967D2',
    color: 'white',
    '& .MuiFab-label': {
      paddingRight: '8px',
      '& .MuiSvgIcon-root': {
        marginRight: '12px'
      }
    },
    '&:hover': {
      backgroundColor: '#0C5AC5'
    }
  }
});
