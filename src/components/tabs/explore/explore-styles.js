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
  }
}));

export default useStyles;
