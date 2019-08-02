export default theme => ({
  appBar: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.6)',
    borderBottom: '1px solid #EAEAEA',
    zIndex: theme.zIndex.drawer + 1
  },
  moduleName: {
    fontSize: '23px',
    fontWeight: 300,
    margin: 0,
    marginLeft: '6px',
    [theme.breakpoints.up('md')]: {
      marginLeft: 0
    }
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});
