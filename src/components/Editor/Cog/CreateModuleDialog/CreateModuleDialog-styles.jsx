import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 24,
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.6)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.8)',
    },
  },
  dialogContent: {
    backgroundColor: '#f8fafb',
    padding: 24,
  },
  templateDivider: {
    margin: '24px 0px 14px',
    '& > p': {
      margin: 0,
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.4)',
    },
  },
  templateGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 212px)',
    gridGap: 14,
    justifyContent: 'center',
    '& > div': {
      position: 'relative',
      cursor: 'pointer',
      '&:hover': {
        '& img': {
          borderColor: '#f7c638',
        },
        '& .delete-icon': {
          opacity: 1,
        },
      },
      '& .MuiButtonBase-root': {
        display: 'grid',
      },
      '& .delete-icon': {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        right: 8,
        color: 'rgba(0, 0, 0, 0.2)',
        opacity: 0,
        '&:hover': {
          color: '#e84545',
        },
      },
      '& img': {
        backgroundColor: 'white',
        border: '1px solid #dadce0',
        borderRadius: 4,
        objectFit: 'cover',
      },
      '& p': {
        fontSize: 15,
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.74)',
        margin: '9px 0px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
}));
