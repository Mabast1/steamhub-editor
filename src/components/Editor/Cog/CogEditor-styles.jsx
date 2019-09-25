import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  contentRoot: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 28,
    width: 640,
    margin: '0 auto',
    '& .input-label': {
      margin: 0,
      marginBottom: 10,
      fontSize: 17,
      fontWeight: 400,
    },
    '& > .grid-span': {
      gridColumn: '1 / span 2',
    },
    '& .helper-txt': {
      margin: 0,
      marginTop: 5,
      color: 'rgba(0, 0, 0, 0.4)',
      fontSize: 12,
    },
  },
  input: {
    width: '100%',
    backgroundColor: '#fbfcfd',
    '& .MuiOutlinedInput-root': {
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
    },
    '& input, .MuiInputBase-multiline, .MuiSelect-root': {
      padding: '14px 16px',
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 15,
    },
    '& .MuiInputBase-multiline': {
      '& textarea:first-child': {
        minHeight: '160px',
        lineHeight: 'normal',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    '&.select-empty .MuiSelect-root': {
      color: '#b2b2b2',
    },
    '&.Mui-focused, .Mui-focused': {
      backgroundColor: '#fff',
      '& fieldset': {
        border: '1px solid #4285f4!important',
      },
    },
  },
  coverPic: {
    height: 172,
    width: 306,
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
  chip: {
    color: '#4285f4',
    border: '1px solid #4285f4',
    margin: '6px 6px 0px 0px',
    '& > svg': {
      color: '#4285f4',
      '&:hover': {
        color: '#296CDB',
      },
    },
  },
  newModule: {
    display: 'grid',
    height: 52,
    placeItems: 'center',
    marginTop: 14,
    border: '1px dashed #4285f4',
    color: '#4285f4',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(143, 210, 255, 0.06)',
    },
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#4285f4',
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#296CDB',
    },
  },
}));
