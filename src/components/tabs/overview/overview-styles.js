import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '960px',
    margin: '0 auto',
    '& .flex-2': {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
    },
    '& h2': {
      marginTop: '60px'
    }
  },
  section: {
    marginTop: '60px',
    paddingBottom: '60px',
    backgroundColor: '#F8F8F8'
  },
  selectRoot: {
    width: '300px',
    '&:after': {
      borderBottom: '2px solid #EE6128'
    }
  },
  moduleName: {
    fontSize: '46px'
  }
}));

export default useStyles;
