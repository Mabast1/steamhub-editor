import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    maxWidth: '960px',
    margin: '0 auto',
    '& .flex-2': {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
    },
    '& h2': {
      marginTop: '0'
    }
  },
  section: {
    margin: '60px 0',
    padding: '60px 0',
    backgroundColor: '#F8F8F8'
  },
  selectRoot: {
    width: '300px',
    '&:after': {
      borderBottom: '2px solid #EE6128'
    }
  },
  browseBtnRoot: {
    width: '120px'
  }
}));

export default useStyles;
