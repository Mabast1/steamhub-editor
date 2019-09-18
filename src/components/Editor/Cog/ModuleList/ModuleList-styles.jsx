import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  moduleList: {
    '& > .card': {
      display: 'flex',
      marginTop: 10,
      paddingRight: 16,
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: 4,
      alignItems: 'center',
      color: 'rgba(0, 0, 0, 0.8)',
      backgroundColor: 'white',
      '& .move-handle': {
        padding: '12px 16px',
        color: 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
}));
