import React from 'react';
import shortid from 'shortid';

import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

// #region icon selections
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CodeIcon from '@material-ui/icons/Code';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import PanToolIcon from '@material-ui/icons/PanTool';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';
import StarsIcon from '@material-ui/icons/Stars';
// #endregion icon selections

import { withFirebase } from '../../../Firebase';

const useStyles = makeStyles(() => ({
  dialogRoot: {
    '& .MuiDialogContent-root > div': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 24,
      '&:first-child': {
        marginTop: 0,
      },
      '& .input-label': {
        margin: '6px 0px 12px',
      },
      '& .MuiTextField-root': {
        flexGrow: 1,
        '& .MuiInputBase-root': {
          padding: '14px 16px',
        },
      },
      '& .MuiInputBase-root': {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 15,
        '&:hover': {
          '& > fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.4)',
          },
        },
        '&.Mui-focused': {
          '& > fieldset': {
            border: '1px solid #4285f4!important',
          },
        },
        '& > input': {
          padding: 0,
        },
        '& > textarea:first-child': {
          minHeight: 140,
        },
        '& > fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
      '& .MuiSelect-root': {
        display: 'flex',
        padding: '14px 32px 14px 16px',
      },
    },
  },
}));

const PopupDialog = ({
  firebase,
  storageUrl,
  sectionIndex,
  entryIndex,
  data,
  entry,
  handleSectionChange,
  closePopupDialog,
}) => {
  const classes = useStyles();
  const fileBrowser = React.useRef(null);
  const [state, setState] = React.useState({ ...entry });
  const isInvalid = Boolean(
    !state.popupColor ||
      !state.popupIcon ||
      (!state.popupText && !state.popupMedia) ||
      (state.popupMedia && !state.popupMediaType)
  );

  const handleInputChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    const newData = data.slice();
    const { popupMediaFile, ...newState } = state;

    if (popupMediaFile) {
      const storageRef = firebase.storageRef().child(`${storageUrl}/${shortid.generate()}`);

      storageRef
        .put(popupMediaFile)
        .then(() => {
          storageRef.getDownloadURL().then(url => {
            newData[entryIndex] = { ...newState, popupMedia: url };
            handleSectionChange(sectionIndex, 'data', newData);
          });
        })
        .catch(err => console.error(err));
    } else {
      newData[entryIndex] = { ...newState };
      handleSectionChange(sectionIndex, 'data', newData);
    }

    closePopupDialog();
  };

  const handleReset = () => {
    if (window.confirm('Do you want to reset this popup?')) {
      const newData = data.slice();
      newData[entryIndex] = {
        ...state,
        popupColor: '',
        popupIcon: '',
        popupMedia: '',
        popupMediaType: '',
        popupText: '',
      };

      handleSectionChange(sectionIndex, 'data', newData);
      closePopupDialog();
    }
  };

  return (
    <div className={classes.dialogRoot}>
      <CloseIcon
        style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
        onClick={closePopupDialog}
      />
      <DialogTitle>Insert Popup</DialogTitle>
      <DialogContent>
        {/* Popup Media */}
        <div>
          <p className="input-label">Popup Media</p>
          <Select
            value={state.popupMediaType ? state.popupMediaType : ''}
            onChange={e => handleInputChange('popupMediaType', e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem disabled value="">
              Select media type
            </MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>

          <div style={{ display: 'flex', marginTop: 8 }}>
            <Button
              onClick={() => fileBrowser.current.click()}
              variant="contained"
              style={{ marginRight: 8, height: 45, boxShadow: 'none' }}
            >
              Browse
              <input
                onChange={e => {
                  const file = e.target.files[0];

                  handleInputChange('popupMedia', URL.createObjectURL(file));
                  handleInputChange('popupMediaFile', file);
                }}
                accept="image/*"
                type="file"
                ref={fileBrowser}
                style={{ display: 'none' }}
              />
            </Button>
            <TextField
              className={classes.input}
              value={state.popupMedia ? state.popupMedia : ''}
              onChange={e => handleInputChange('popupMedia', e.target.value)}
              placeholder="Browse from computer or paste url here"
              variant="outlined"
              inputProps={{
                'aria-label': 'Media URL',
              }}
            />
          </div>
        </div>

        {/* Popup Text */}
        <div>
          <p className="input-label">Popup Text</p>
          <TextField
            className={classes.input}
            value={state.popupText ? state.popupText : ''}
            onChange={e => handleInputChange('popupText', e.target.value)}
            placeholder="Popup text"
            variant="outlined"
            multiline
            inputProps={{
              'aria-label': 'Popup Text',
            }}
          />
        </div>

        <div style={{ flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="input-label">Popup Icon</p>
            <Select
              value={state.popupIcon ? state.popupIcon : ''}
              onChange={e => handleInputChange('popupIcon', e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem disabled value="">
                None
              </MenuItem>
              <MenuItem value="image">
                <ImageIcon />
              </MenuItem>
              <MenuItem value="movie">
                <MovieIcon />
              </MenuItem>
              <MenuItem value="help">
                <HelpIcon />
              </MenuItem>
              <MenuItem value="assignment">
                <AssignmentIcon />
              </MenuItem>
              <MenuItem value="check_circle">
                <CheckCircleIcon />
              </MenuItem>
              <MenuItem value="code">
                <CodeIcon />
              </MenuItem>
              <MenuItem value="favorite">
                <FavoriteIcon />
              </MenuItem>
              <MenuItem value="info">
                <InfoIcon />
              </MenuItem>
              <MenuItem value="build">
                <BuildIcon />
              </MenuItem>
              <MenuItem value="pan_tool">
                <PanToolIcon />
              </MenuItem>
              <MenuItem value="record_voice_over">
                <RecordVoiceOverIcon />
              </MenuItem>
              <MenuItem value="question_answer">
                <QuestionAnswerIcon />
              </MenuItem>
              <MenuItem value="restore">
                <RestoreIcon />
              </MenuItem>
              <MenuItem value="search">
                <SearchIcon />
              </MenuItem>
              <MenuItem value="stars">
                <StarsIcon />
              </MenuItem>
            </Select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 48 }}>
            <p className="input-label">Popup Accent Color</p>
            <input
              type="color"
              value={state.popupColor ? state.popupColor : '#FFFFFF'}
              onChange={e => handleInputChange('popupColor', e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isInvalid}>
          Add
        </Button>
      </DialogActions>
    </div>
  );
};

export default withFirebase(PopupDialog);
