import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

export default makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      ...theme.mixins.toolbar,
    },
  },
  // Drawer style
  tab: {
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    '&:hover': {
      '& > svg': {
        opacity: 1,
      },
    },
    '&.new-tab': {
      backgroundColor: 'rgba(143, 210, 255, 0.14)',
      color: '#4285f4',
      '&:hover': {
        backgroundColor: 'rgba(118, 185, 230, 0.16)',
        color: '#296CDB',
      },
    },
    '& > .move-handle': {
      display: 'flex',
      padding: 4,
      marginRight: 6,
      '& > svg': {
        fill: 'rgba(0, 0, 0, 0.2)',
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
  // Tab content style
  contentRoot: {
    display: 'grid',
    gridGap: 28,
    width: 600,
    marginBottom: 32,
    padding: 20,
    borderRadius: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.up('lg')]: {
      width: 760,
    },
    '& .input-label': {
      margin: 0,
      marginBottom: 10,
      fontSize: 17,
      fontWeight: 400,
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
        minHeight: '180px',
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
  newSectionButton: {
    display: 'grid',
    height: 52,
    placeItems: 'center',
    border: '1px dashed #4285f4',
    color: '#4285f4',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(143, 210, 255, 0.06)',
    },
  },
  newSectionDialog: {
    minWidth: 480,
    '& .dialog-title': {
      margin: 0,
      marginBottom: 16,
      fontWeight: 500,
    },
  },
  publishButton: {
    margin: 'auto auto 40px',
    backgroundColor: '#4285f4',
    color: 'white',
    height: 48,
    width: 200,
    borderRadius: 24,
    '&:hover': {
      backgroundColor: '#296CDB',
    },
  },
}));
