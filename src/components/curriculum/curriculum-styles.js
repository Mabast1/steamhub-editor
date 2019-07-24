export default theme => ({
  cGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '17px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'
    }
  },
  cCard: {
    display: 'flex',
    border: '1px solid #EAEAEA',
    borderRadius: '4px',
    cursor: 'pointer',
    '& .cCardContent': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minHeight: '100px',
      padding: '13px',
      alignItems: 'center',
      fontSize: '13px',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.6)',
      '& .MuiSvgIcon-root': {
        fontSize: '4rem'
      },
      [theme.breakpoints.up('sm')]: {
        padding: '24px'
      }
    }
  },
  cText: {
    margin: 'auto',
    '& p': {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      margin: 0,
      marginTop: '4px',
      userSelect: 'none'
    }
  },
  fab: {
    position: 'absolute',
    right: '30px',
    bottom: '30px',
    backgroundColor: '#EE6128',
    color: 'white',
    '&:hover': {
      backgroundColor: '#E1541B'
    }
  },
  cModal: {
    width: '400px'
  }
});
