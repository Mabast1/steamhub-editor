import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBarRoot:{
    backgroundColor: '#fff',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)'
  },
  indicator: {
    backgroundColor: '#EE6128'
  },
  tabRoot:{
    '&.Mui-selected': {
      color: '#EE6128'
    }
  }
}));

export default useStyles;
