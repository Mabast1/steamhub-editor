import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  selectRoot: {
    width: '300px',
    '&:after': {
      borderBottom: '2px solid #EE6128'
    }
  }
}));

export default useStyles;
