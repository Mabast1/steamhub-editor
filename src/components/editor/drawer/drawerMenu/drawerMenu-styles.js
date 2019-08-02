export default theme => ({
  drawerMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  drawerListItem: {
    padding: '6px 26px',
    color: 'rgba(0, 0, 0, 0.6)',
    '& .MuiListItemText-primary': {
      fontSize: '14px'
    }
  },
  drawerMenuIcon: {
    minWidth: 'unset',
    color: '#ffa000'
  }
});
