import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  slateRoot: {
    position: 'relative',
    flexGrow: 1,
    '& .toolbar': {
      display: 'flex',
      position: 'absolute',
      top: -38,
      backgroundColor: '#ebeced',
      color: 'rgba(0, 0, 0, 0.6)',
      border: '1px solid rgba(0, 0, 0, 0.14)',
      borderBottom: 0,
      '& > svg': {
        padding: 8,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f4f5f6',
        },
        '&.selected': {
          backgroundColor: '#4285f4',
          color: 'white',
        },
      },
    },
    '& .slate-input': {
      marginRight: 8,
      padding: '14px 16px',
      flexGrow: 1,
      backgroundColor: '#fbfcfd',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: 4,
      color: 'rgba(0, 0, 0, 0.6)',
      transition: theme.transitions.create('border-color'),
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.4)',
      },
      '&:focus': {
        borderColor: '#4285f4',
        backgroundColor: 'white',
      },
      '& p': {
        margin: 0,
        fontSize: 15,
      },
      '& .vocab-popup': {
        color: 'rgba(0, 0, 0, 0.7)',
        borderBottom: '1px dotted black',
        fontWeight: 500,
      },
    },
  },
  popupDialog: {
    width: 640,
  },
}));
