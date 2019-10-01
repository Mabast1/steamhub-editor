import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from './CogEditor-styles';
import Layout from '../../Layout';
import ModuleList from './ModuleList';
import Snackbar from './Snackbar';
import CreateModuleDialog from './CreateModuleDialog';
import IMAGE_PLACEHOLDER from '../../../constants/mediaPlaceholder';

const CogEditor = ({
  pathname,
  cog,
  createModuleDialogOpen,
  publishStatus,
  handleStateChange,
  handleAddChip,
  handleDeleteChip,
  handleAddModule,
  handleDeleteModule,
  handleSaveCog,
  handleCloseSnackbar,
  handleOpenCreateModuleDialog,
  handleCloseCreateModuleDialog,
}) => {
  const classes = useStyles();
  const fileBrowser = React.useRef(null);

  return (
    <Layout pathname={pathname}>
      <div className={classes.contentRoot}>
        {/* Cover Picture */}
        <div>
          <p className="input-label">Cover Picture</p>
          <ButtonBase
            className={classes.coverPic}
            onClick={() => fileBrowser.current.click()}
            aria-label="Cover picture"
          >
            <span
              className="bg-image"
              style={{
                backgroundImage: `url(${cog.cover ? cog.cover : IMAGE_PLACEHOLDER})`,
              }}
            />
            <span className="bg-backdrop">Upload</span>

            <input
              onChange={e => {
                const file = e.target.files[0];

                if (file) {
                  handleStateChange('cover', URL.createObjectURL(file));
                  handleStateChange('coverFile', file);
                }
              }}
              accept="image/*"
              type="file"
              ref={fileBrowser}
              style={{ display: 'none' }}
            />
          </ButtonBase>
        </div>

        {/* Class Type */}
        <div>
          <p className="input-label">Class Type</p>
          <Select
            className={`${classes.input}${!cog.type ? ' select-empty' : ''}`}
            value={cog.type ? cog.type : ''}
            onChange={e => handleStateChange('type', e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem disabled value="">
              Select class type
            </MenuItem>
            <MenuItem value="onsite">On-site</MenuItem>
            <MenuItem value="diy">DIY</MenuItem>
            <MenuItem value="live">Live class</MenuItem>
          </Select>
        </div>

        {/* Title */}
        <div className="grid-span">
          <p className="input-label">Title</p>
          <TextField
            className={classes.input}
            value={cog.title ? cog.title : ''}
            onChange={e => handleStateChange('title', e.target.value)}
            placeholder="Title"
            variant="outlined"
            inputProps={{
              'aria-label': 'Title',
            }}
          />
        </div>

        {/* Overview */}
        <div className="grid-span">
          <p className="input-label">Overview</p>
          <TextField
            className={classes.input}
            value={cog.overview ? cog.overview : ''}
            onChange={e => handleStateChange('overview', e.target.value)}
            placeholder="Overview"
            variant="outlined"
            multiline
            inputProps={{
              'aria-label': 'Overview',
            }}
          />
        </div>

        {/* Grade Level */}
        <div>
          <p className="input-label">Grade Level</p>
          <Select
            className={`${classes.input}${!cog.grade ? ' select-empty' : ''}`}
            value={cog.grade ? cog.grade : ''}
            onChange={e => handleStateChange('grade', e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem disabled value="">
              Select grade level
            </MenuItem>
          </Select>
        </div>

        {/* Subject */}
        <div>
          <p className="input-label">Subject</p>
          <Select
            className={`${classes.input}${!cog.subject ? ' select-empty' : ''}`}
            value={cog.subject ? cog.subject : ''}
            onChange={e => handleStateChange('subject', e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem disabled value="">
              Select subject
            </MenuItem>
          </Select>
        </div>

        {/* Skills Gained */}
        <div className="grid-span">
          <p
            className="input-label"
            style={cog.skills && cog.skills.length > 0 ? { marginBottom: 8 } : null}
          >
            Skills Gained
          </p>
          <div>
            {cog.skills &&
              cog.skills.map(skill => {
                return (
                  <Chip
                    key={skill.id}
                    className={classes.chip}
                    label={skill.label}
                    onDelete={handleDeleteChip(skill)}
                    variant="outlined"
                  />
                );
              })}
          </div>
          <TextField
            className={classes.input}
            onKeyPress={e => handleAddChip(e)}
            placeholder="Skills gained"
            variant="outlined"
            inputProps={{
              'aria-label': 'Skills Gained',
            }}
            style={cog.skills && cog.skills.length > 0 ? { marginTop: 10 } : null}
          />
          <p className="helper-txt">Press &apos;Enter&apos; to add new skill</p>
        </div>

        {/* Real World Connections */}
        <div className="grid-span">
          <p className="input-label">Real World Connections</p>
          <TextField
            className={classes.input}
            value={cog.rwc ? cog.rwc : ''}
            onChange={e => handleStateChange('rwc', e.target.value)}
            placeholder="Real world connections"
            variant="outlined"
            multiline
            inputProps={{
              'aria-label': 'Real World Connections',
            }}
          />
        </div>

        {/* Module List */}
        <div className="grid-span">
          <p className="input-label">Modules</p>
          <ModuleList
            modules={cog.modules}
            handleStateChange={handleStateChange}
            handleDeleteModule={handleDeleteModule}
          />
          <Button
            className={classes.newModule}
            onClick={handleOpenCreateModuleDialog}
            disabled={publishStatus.isUploading}
            component="span"
            disableRipple
          >
            Add new module
          </Button>
        </div>

        <Dialog
          classes={{ paper: classes.popupDialog }}
          open={createModuleDialogOpen}
          onClose={handleCloseCreateModuleDialog}
          scroll="paper"
        >
          <CreateModuleDialog
            handleClose={handleCloseCreateModuleDialog}
            handleAddModule={handleAddModule}
          />
        </Dialog>

        <Button
          className={`${classes.saveButton} grid-span`}
          onClick={handleSaveCog}
          disabled={publishStatus.isUploading}
          variant="contained"
        >
          <div style={{ display: 'flex', marginRight: 10 }}>
            {!publishStatus.isUploading ? (
              <SaveIcon fontSize="small" />
            ) : (
              <CircularProgress size={20} thickness={4} />
            )}
          </div>
          Save
        </Button>
      </div>

      <Snackbar status={publishStatus.snackbar} handleClose={handleCloseSnackbar} />
    </Layout>
  );
};

export default CogEditor;
