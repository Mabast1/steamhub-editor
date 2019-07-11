import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inputName: {
    marginLeft: '12px',
    width: '40%'
  },
  inputQuantity: {
    marginLeft: '18px',
    width: '20%'
  },
  inputNotes: {
    marginLeft: '18px',
    width: '40%'
  }
}));

export default useStyles;
