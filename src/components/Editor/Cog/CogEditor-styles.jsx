import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  contentRoot: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 26,
    width: 640,
    margin: '0 auto',
    '& .input-label': {
      margin: 0,
      marginBottom: 10,
      fontSize: 15,
      fontWeight: 500,
    },
    '& > .grid-span': {
      gridColumn: '1 / span 2',
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
        borderColor: '#4285f4!impotant',
        border: '1px solid #4285f4!important',
      },
    },
  },
  coverPic: {
    height: 172,
    width: 307,
    '&:hover': {
      '& .bg-backdrop': {
        opacity: 1,
      },
    },
    '& .bg-image': {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    '& .bg-backdrop': {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      opacity: 0,
      color: 'white',
      fontSize: 26,
      fontWeight: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create('opacity'),
    },
  },
}));
