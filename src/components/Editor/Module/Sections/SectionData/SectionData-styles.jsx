import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  entryRoot: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 16,
    '&:hover': {
      '& .delete-icon': {
        opacity: 1,
      },
    },
    '& > .MuiTextField-root': {
      margin: '0px 12px 0px 0px',
      '& label': {
        color: 'rgba(0, 0, 0, 0.2)',
        transform: 'translate(14px, 15px) scale(1)',
        '&.MuiInputLabel-shrink': {
          color: 'rgba(0, 0, 0, 0.4)',
          transform: 'translate(14px, -6px) scale(0.75)',
        },
      },
      '& .MuiInputBase-root': {
        backgroundColor: '#fbfcfd',
        '&:hover': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.4)',
          },
        },
        '&.Mui-focused': {
          backgroundColor: 'white',
          '& fieldset': {
            border: '1px solid #4285f4!important',
          },
        },
        '& input': {
          padding: '14px 16px',
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: 15,
        },
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    '& .add-icon': {
      color: 'rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      '&:hover': {
        color: '#4285f4',
      },
    },
    '& .delete-icon': {
      color: 'rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      opacity: 0,
      '&:hover': {
        color: '#e84545',
      },
    },
    '& > .move-handle': {
      display: 'flex',
      marginRight: 12,
      color: 'rgba(0, 0, 0, 0.2)',
    },
  },
}));
