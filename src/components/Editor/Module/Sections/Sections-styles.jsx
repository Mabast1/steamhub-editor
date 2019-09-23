import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  contentRoot: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 28,
    minWidth: 640,
    marginBottom: 32,
    padding: 20,
    borderRadius: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    '&:hover': {
      '& .move-handle, .delete-icon': {
        opacity: 1,
      },
    },
    '& > .grid-span': {
      gridColumn: '1 / span 2',
    },
    '& .move-handle': {
      position: 'absolute',
      left: -48,
      top: 16,
      opacity: 0,
      color: 'rgba(0, 0, 0, 0.2)',
    },
    '& .delete-icon': {
      position: 'absolute',
      left: -48,
      top: 56,
      color: 'rgba(0, 0, 0, 0.2)',
      opacity: 0,
      cursor: 'pointer',
      '&:hover': {
        color: '#e84545',
      },
    },
  },
  input: {
    width: '100%',
    backgroundColor: '#fbfcfd',
    '& input, .MuiInputBase-multiline, .MuiSelect-root': {
      padding: '14px 16px',
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '&.select-empty .MuiSelect-root': {
      color: '#b2b2b2',
    },
    '& .MuiInputBase-multiline': {
      '& textarea:first-child': {
        minHeight: '160px',
      },
    },
    '&.Mui-focused, .Mui-focused': {
      backgroundColor: '#fff',
      '& fieldset': {
        border: '1px solid #4285f4!important',
      },
    },
  },
  inputTitle: {
    width: '100%',
    fontWeight: 300,
    fontSize: 18,
    border: '1px solid transparent',
    padding: '6px 16px',
    borderRadius: 4,
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused': {
      borderColor: '#4285f4!important',
    },
  },
}));
