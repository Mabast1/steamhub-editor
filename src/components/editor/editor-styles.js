export default theme => ({
  root: {
    display: 'flex',
    padding: '0 17px'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      minWidth: '560px',
      margin: '0 auto'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '670px'
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '980px'
    }
  }
});
