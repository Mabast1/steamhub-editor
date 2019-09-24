import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  tab: {
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 15,
    '&:hover': {
      '& > svg': {
        opacity: 1,
      },
    },
    '&.new-tab': {
      color: '#4285f4',
      '&:hover': {
        backgroundColor: 'rgba(143, 210, 255, 0.14)',
      },
    },
    '& > .move-handle': {
      display: 'flex',
      padding: 4,
      marginRight: 8,
      '& > svg': {
        fill: 'rgba(0, 0, 0, 0.4)',
      },
    },
    '& .no-handle': {
      height: 32,
      width: 32,
      marginRight: 8,
    },
    '& > svg': {
      marginLeft: 'auto',
      opacity: 0,
      color: 'rgba(0, 0, 0, 0.14)',
      cursor: 'pointer',
      '&:hover': {
        color: '#e84545',
      },
    },
  },
}));
