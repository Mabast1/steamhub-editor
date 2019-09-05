import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
    // Main content (card)
    '& .content': {
      display: 'grid',
      border: '1px solid #eaeaea',
      borderRadius: 4,
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      [theme.breakpoints.up('md')]: {
        border: 0,
        gridTemplateColumns: '246px 1fr',
        gridTemplateRows: 138,
        width: 850,
      },
      '&:hover': {
        boxShadow: '0 2px 14px rgba(0, 0, 0, 0.06)',
        [theme.breakpoints.up('md')]: {
          boxShadow: 'none',
        },
        '& img': {
          transform: 'scale(1.04)',
        },
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
        padding: 18,
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
            marginBottom: 8,
            fontWeight: 600,
            [theme.breakpoints.up('md')]: {
              marginBottom: 4,
            },
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
}));
