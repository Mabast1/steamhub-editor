import React from 'react';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './CogEditor-styles';
import Layout from '../../Layout';
import ModuleList from './ModuleList';

const CogEditor = ({ pathname, cog, handleStateChange }) => {
  const IMAGE_PLACEHOLDER =
    'https://firebasestorage.googleapis.com/v0/b/steamhub-dev.appspot.com/o/placeholder.png?alt=media&token=f41c489a-a64a-43ec-b20d-3e3418750844';
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
            <span className="bg-image" style={{ backgroundImage: `url(${IMAGE_PLACEHOLDER})` }} />
            <span className="bg-backdrop">Upload</span>

            <input accept="image/*" type="file" ref={fileBrowser} style={{ display: 'none' }} />
          </ButtonBase>
        </div>

        {/* Class Type */}
        <div>
          <p className="input-label">Class Type</p>
          <Select
            className={`${classes.input} select-empty`}
            value=""
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
            className={`${classes.input} select-empty`}
            value=""
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
            className={`${classes.input} select-empty`}
            value=""
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
          <p className="input-label">Skills Gained</p>
          <TextField
            className={classes.input}
            placeholder="Skills gained"
            variant="outlined"
            inputProps={{
              'aria-label': 'Skills Gained',
            }}
          />
        </div>

        {/* Real World Connections */}
        <div className="grid-span">
          <p className="input-label">Real World Connections</p>
          <TextField
            className={classes.input}
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
          <ModuleList modules={cog.modules} handleStateChange={handleStateChange} />
        </div>
      </div>
    </Layout>
  );
};

export default CogEditor;
