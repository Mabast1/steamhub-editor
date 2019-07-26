const drawerWidth = 240;

export default theme => ({
  appBar: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.6)',
    [theme.breakpoints.up('sm')]: {
      borderBottom: '1px solid #EAEAEA',
      zIndex: theme.zIndex.drawer + 1
    }
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 17px',
    border: '1px solid #EAEAEA',
    borderRadius: '4px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth + 17,
      maxWidth: '520px'
    }
  },
  menuButton: {
    margin: '4px 10px',
    padding: '5px'
  },
  searchInput: {
    flexGrow: 1
  }
});
