import React from 'react';

import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './ModuleEditor-styles';
import Layout from '../../Layout';
import Tabs from './Tabs';

const ModuleEditor = ({
  pathname,
  module,
  tabIndex,
  setTabIndex,
  handleStateChange,
  handleAddTab,
  handleInputTabName,
}) => {
  const IMAGE_PLACEHOLDER =
    'https://firebasestorage.googleapis.com/v0/b/steamhub-dev.appspot.com/o/placeholder.png?alt=media&token=f41c489a-a64a-43ec-b20d-3e3418750844';
  const classes = useStyles();
  const fileBrowser = React.useRef(null);

  console.log(module);

  return (
    <Layout pathname={pathname}>
      <div style={{ display: 'flex' }}>
        {/* Side Drawer / Tabs */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          <List>
            <Tabs
              tabs={module.tabs}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              handleStateChange={handleStateChange}
            />
            <ListItem button className={`${classes.tab} new-tab`} onClick={handleAddTab}>
              <div className="move-handle">
                <AddIcon style={{ fill: '#4285f4' }} />
              </div>
              Add new tab
            </ListItem>
          </List>
        </Drawer>

        <div style={{ margin: '0 auto' }}>
          {/* Tab Info */}
          <div className={classes.contentRoot}>
            {/* Tab Name */}
            <div className="grid-span">
              <p className="input-label">Tab Name</p>
              <TextField
                className={classes.input}
                value={
                  module.tabs && module.tabs[tabIndex].tabName ? module.tabs[tabIndex].tabName : ''
                }
                onChange={e => handleInputTabName(tabIndex, e.target.value)}
                placeholder="Tab Name"
                variant="outlined"
                inputProps={{
                  'aria-label': 'Tab Name',
                }}
              />
            </div>
          </div>

          {/* Basic Module Info */}
          {tabIndex === 0 && (
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
                      backgroundImage: `url(${module.cover ? module.cover : IMAGE_PLACEHOLDER})`,
                    }}
                  />
                  <span className="bg-backdrop">Upload</span>

                  <input
                    onChange={e => {
                      const file = e.target.files[0];

                      handleStateChange('cover', URL.createObjectURL(file));
                      handleStateChange('coverFile', file);
                    }}
                    accept="image/*"
                    type="file"
                    ref={fileBrowser}
                    style={{ display: 'none' }}
                  />
                </ButtonBase>
              </div>

              <div />

              {/* Title */}
              <div className="grid-span">
                <p className="input-label">Title</p>
                <TextField
                  className={classes.input}
                  value={module.name ? module.name : ''}
                  onChange={e => handleStateChange('name', e.target.value)}
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
                  value={module.descr ? module.descr : ''}
                  onChange={e => handleStateChange('descr', e.target.value)}
                  placeholder="Overview"
                  variant="outlined"
                  multiline
                  inputProps={{
                    'aria-label': 'Overview',
                  }}
                />
              </div>
            </div>
          )}

          {/* Sections */}
        </div>
      </div>
    </Layout>
  );
};

export default ModuleEditor;