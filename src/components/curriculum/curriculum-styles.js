export default theme => ({
  breadcrumbs: {
    display: 'flex',
    padding: '16px 0',
    color: 'rgba(0, 0, 0, 0.6)',
    userSelect: 'none',
    '& .MuiBreadcrumbs-separator': {
      margin: 0
    },
    '& .MuiTypography-root': {
      padding: '6px 8px',
      fontWeight: 300
    },
    '& .MuiButton-root': {
      lineHeight: 'normal',
      fontWeight: 400
    },
    '& a': {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.00938em',
      textTransform: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  cGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
    gridGap: '17px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(172px, 1fr))'
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
        color: 'rgb(146, 206, 255)',
        fontSize: '4rem'
      }
    },
    [theme.breakpoints.up('sm')]: {
      cursor: 'default',
      '& .cCardContent': {
        padding: '20px',
        minHeight: '106px',
        [theme.breakpoints.up('md')]: {
          fontSize: '14px',
          lineHeight: '1.15rem',
          padding: '26px'
        }
      },
      '&:hover': {
        backgroundColor: '#E8F0FE',
        borderColor: '#E8F0FE'
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
      userSelect: 'none',
      [theme.breakpoints.up('md')]: {
        marginTop: '14px'
      }
    }
  },
  fab: {
    position: 'absolute',
    right: '30px',
    bottom: '30px',
    backgroundColor: '#1967D2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0C5AC5'
    }
  },
  cModal: {
    width: '640px'
  }
});
