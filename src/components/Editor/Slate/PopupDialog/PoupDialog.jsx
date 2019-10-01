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
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BrushIcon from '@material-ui/icons/Brush';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import StarIcon from '@material-ui/icons/Star';
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
        '&.Mui-error': {
          '& > fieldset': {
            borderColor: '#f44336!important',
          },
        },
        '&.Mui-focused': {
          '& > fieldset': {
            border: '1px solid #4285f4!important',
          },
        },
        '&.Mui-disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            '& > fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.08)',
            },
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
  const [isUploading, setUploading] = React.useState(false);
  const isInvalid = Boolean(
    !state.popupColor ||
      !state.popupIcon ||
      (!state.popupText && !state.popupMedia) ||
      (state.popupMedia && !state.popupMediaType)
  );

  const handleInputChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleUploadMedia = file => {
    const storageRef = firebase.storageRef().child(`${storageUrl}/${shortid.generate()}`);
    setUploading(true);

    storageRef
      .put(file)
      .then(() => {
        storageRef.getDownloadURL().then(url => {
          handleInputChange('popupMedia', url);
          setUploading(false);
        });
      })
      .catch(err => {
        console.error(err);
        setUploading(false);
      });
  };

  const handleSubmit = () => {
    const newData = data.slice();
    newData[entryIndex] = { ...state };

    handleSectionChange(sectionIndex, 'data', newData);
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

  const isValidHexColor = s => {
    return /^#[0-9A-F]{6}$/i.test(s);
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
              disabled={isUploading}
            >
              Browse
              <input
                onChange={e => {
                  const file = e.target.files[0];

                  if (file) handleUploadMedia(file);
                }}
                accept="video/*, image/*"
                type="file"
                ref={fileBrowser}
                style={{ display: 'none' }}
              />
            </Button>
            <TextField
              className={classes.input}
              value={state.popupMedia ? state.popupMedia : ''}
              onChange={e => handleInputChange('popupMedia', e.target.value)}
              disabled={isUploading}
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
            inputProps={{ 'aria-label': 'Popup Text' }}
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
              <MenuItem value="emoji_objects">
                <EmojiObjectsIcon />
              </MenuItem>
              <MenuItem value="emoji_events">
                <EmojiEventsIcon />
              </MenuItem>
              <MenuItem value="sports_esports">
                <SportsEsportsIcon />
              </MenuItem>
              <MenuItem value="audiotrack">
                <AudiotrackIcon />
              </MenuItem>
              <MenuItem value="brush">
                <BrushIcon />
              </MenuItem>
              <MenuItem value="color_lens">
                <ColorLensIcon />
              </MenuItem>
              <MenuItem value="local_cafe">
                <LocalCafeIcon />
              </MenuItem>
              <MenuItem value="star">
                <StarIcon />
              </MenuItem>
            </Select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 48 }}>
            <p className="input-label">Popup Accent Color</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                value={state.popupColor ? state.popupColor : ''}
                onChange={e => handleInputChange('popupColor', e.target.value)}
                error={!isValidHexColor(state.popupColor) && Boolean(state.popupColor)}
                placeholder="#FFFFFF"
                variant="outlined"
                inputProps={{ 'aria-label': 'Popup accent color' }}
                style={{ width: 120 }}
              />

              <input
                type="color"
                value={state.popupColor ? state.popupColor : '#FFFFFF'}
                onChange={e => handleInputChange('popupColor', e.target.value)}
                style={{ marginLeft: 12 }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isInvalid || isUploading || !isValidHexColor(state.popupColor)}
        >
          Add
        </Button>
      </DialogActions>
    </div>
  );
};

export default withFirebase(PopupDialog);
