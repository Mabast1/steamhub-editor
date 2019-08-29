export default theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'white',
    borderTop: '1px solid #EAEAEA',
    boxShadow: 'none',
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      top: 0,
      bottom: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: 'none',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
      height: 62,
    },
    '& .mobile-menu': {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0 17px',
      '& svg': {
        fill: 'rgba(0, 0, 0, 0.2)',
        fontSize: '1.75rem',
        '&.selected': {
          fill: '#4285f4',
        },
      },
    },
    '& .desktop-menu': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '0 30px',
      // Search bar
      '& .search-bar': {
        display: 'flex',
        backgroundColor: '#f1f3f4',
        borderRadius: 4,
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
        '& .search-icon': {
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#4285f4',
          color: 'white',
          padding: '0 8px',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer',
        },
        '& input': {
          width: '200px',
          padding: '10px 12px',
          fontSize: '14px',
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('lg')]: {
            width: '320px',
          },
        },
        '& .Mui-focused input': {
          width: '280px',
          [theme.breakpoints.up('lg')]: {
            width: '440px',
          },
        },
      },
      // Page navigation
      '& ul': {
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        margin: '0 24px 0 auto',
        height: '100%',
        '& li': {
          position: 'relative',
          padding: '0 4px',
          marginLeft: 14,
          '&.selected': {
            '& a': {
              fontWeight: 600,
            },
            '&::after': {
              backgroundColor: '#4285f4',
              borderRadius: '10px 10px 0 0',
              bottom: 0,
              content: "''",
              height: '3px',
              left: 0,
              position: 'absolute',
              width: '100%',
            },
          },
          '& a': {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            fontSize: '14px',
            color: '#3c4043',
            textDecoration: 'none',
          },
        },
      },
      '& .profile-icon': {
        fill: '#4285f4',
      },
    },
  },
  mainRoot: {
    padding: '24px 17px calc(53px + 24px)',
    [theme.breakpoints.up('sm')]: {
      padding: 'calc(62px + 40px) 0 40px',
    },
  },
});
