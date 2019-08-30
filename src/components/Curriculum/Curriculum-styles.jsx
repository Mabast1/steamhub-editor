export default theme => ({
  contentRoot: {
    display: 'grid',
    placeItems: 'center',
    [theme.breakpoints.up('md')]: {
      gridGap: 18,
    },
    // Content loader
    '& .content-loader': {
      display: 'inline-block',
      [theme.breakpoints.up('md')]: {
        height: 138,
        width: 850,
      },
    },
  },
});
