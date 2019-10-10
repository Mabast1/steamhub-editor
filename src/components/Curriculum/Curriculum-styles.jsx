import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  // Filter tab
  filterTab: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 12,
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto 20px',
    },
    [theme.breakpoints.up('md')]: {
      width: 850,
    },
    '& > span': {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      marginLeft: 0,
      marginRight: 6,
    },
  },
  // Content grid
  contentRoot: {
    display: 'grid',
    placeItems: 'center',
    gridGap: 24,
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gridAutoRows: 261,
    [theme.breakpoints.up('md')]: {
      gridGap: 18,
      gridTemplateColumns: '1fr',
      gridAutoRows: 'auto',
    },
    '& > div': {
      position: 'relative',
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('md')]: {
        width: 850,
        '&:hover': {
          '& > button': {
            display: 'inline-flex',
          },
          '& .content': {
            boxShadow: '0 2px 14px rgba(0, 0, 0, 0.06)',
            [theme.breakpoints.up('md')]: {
              boxShadow: 'none',
            },
            '& img': {
              transform: 'scale(1.04)',
            },
            '& .title': {
              color: '#4285f4',
            },
          },
        },
      },
      // More option button
      '& > button': {
        position: 'absolute',
        padding: 8,
        right: 8,
        top: 8,
        zIndex: 101,
        [theme.breakpoints.up('md')]: {
          display: 'none',
          padding: 4,
          right: 4,
          top: 4,
        },
      },
    },
    // Card main content
    '& .content': {
      display: 'grid',
      border: '1px solid #eaeaea',
      borderRadius: 4,
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        border: 0,
        gridTemplateColumns: '246px 1fr',
        gridTemplateRows: 138,
        width: 850,
      },
      // Card cover image
      '& > .cover': {
        height: '180px',
        width: '100%',
        overflow: 'hidden',
        [theme.breakpoints.up('md')]: {
          height: '100%',
        },
        '& img': {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '4px 4px 0 0',
          transition: 'transform 0.2s ease-out',
          [theme.breakpoints.up('md')]: {
            borderRadius: 0,
          },
        },
      },
      // Card detail info
      '& > .details': {
        padding: '16px 18px',
        overflow: 'hidden',
        [theme.breakpoints.up('md')]: {
          padding: '4px 24px',
        },
        '& p': {
          margin: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          '&.title': {
            marginBottom: 4,
            fontWeight: 500,
          },
          '&.author': {
            marginTop: 0,
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.45)',
          },
          '&.overview': {
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'normal',
              marginTop: 16,
              color: 'rgba(0, 0, 0, 0.45)',
              fontSize: '14px',
            },
          },
        },
      },
    },
    // Content loader
    '& .content-loader': {
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('md')]: {
        height: 138,
        width: 850,
      },
      '& > svg': {
        height: '100%',
        width: '100%',
      },
    },
  },
  // Card menu button
  cardMenu: {
    '& ul': {
      padding: '6px 0',
    },
    '& li': {
      padding: '4px 14px 4px 12px',
      minHeight: 'unset',
      fontSize: 14,
      color: '#e84545',
      '& > svg': {
        marginRight: 6,
      },
    },
  },
  // Add new class button
  newClass: {
    display: 'none',
    marginLeft: 'auto',
    padding: 0,
    paddingBottom: 3,
    color: '#4285f4',
    transition: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    '&:hover': {
      color: '#296CDB',
      backgroundColor: 'transparent',
      '&::after': {
        backgroundColor: '#4285f4',
        borderRadius: '2px 2px 0 0',
        bottom: 0,
        content: "''",
        height: '2px',
        left: 0,
        position: 'absolute',
        width: '100%',
      },
    },
    '& svg': {
      marginRight: 6,
    },
    '& > span': {
      textTransform: 'none',
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(4),
    color: 'white',
    backgroundColor: '#4285f4',
    '&:hover': {
      backgroundColor: '#3578E7',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
