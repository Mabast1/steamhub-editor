import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  moduleList: {
    '& > .card': {
      display: 'flex',
      marginTop: 12,
      paddingRight: 16,
      border: '1px solid rgba(0, 0, 0, 0.06)',
      borderRadius: 4,
      alignItems: 'center',
      color: 'rgba(0, 0, 0, 0.8)',
      backgroundColor: 'white',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
      '&:hover': {
        '& > svg': {
          opacity: 1,
        },
      },
      '& .move-handle': {
        padding: '12px 16px',
        color: 'rgba(0, 0, 0, 0.2)',
      },
      '& > svg': {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
      },
      '& .editIcon': {
        margin: '0 8px 0 auto',
        '&:hover': {
          color: '#4285f4',
        },
      },
      '& .deleteIcon': {
        '&:hover': {
          color: '#e84545',
        },
      },
    },
  },
}));
