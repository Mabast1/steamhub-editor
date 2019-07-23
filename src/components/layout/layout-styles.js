export default theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    // ...theme.mixins.toolbar,
    minHeight: '68px'
  },
  content: {
    flexGrow: 1
  }
});
