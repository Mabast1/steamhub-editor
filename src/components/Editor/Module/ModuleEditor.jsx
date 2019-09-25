import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from './ModuleEditor-styles';
import Layout from '../../Layout';
import Tabs from './Tabs';
import NewSectionDialog from './NewSectionDialog';
import Sections from './Sections';
import Snackbar from '../Cog/Snackbar';

const ModuleEditor = ({
  pathname,
  module,
  tabIndex,
  setTabIndex,
  isNewSectionDialogOpen,
  publishStatus,
  handleStateChange,
  handleAddTab,
  handleTabChange,
  setNewSectionDialog,
  handleAddNewSection,
  handleSectionChange,
  handlePublishModule,
  handleCloseSnackbar,
}) => {
  const IMAGE_PLACEHOLDER =
    'https://firebasestorage.googleapis.com/v0/b/steamhub-dev.appspot.com/o/placeholder.png?alt=media&token=f41c489a-a64a-43ec-b20d-3e3418750844';
  const classes = useStyles();
  const fileBrowser = React.useRef(null);

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
          <List style={{ marginTop: 16 }}>
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
          <Button
            className={classes.publishButton}
            onClick={handlePublishModule}
            disabled={publishStatus.isUploading}
            color="primary"
            variant="contained"
          >
            <div style={{ display: 'flex', marginRight: 10 }}>
              {!publishStatus.isUploading ? (
                <SaveIcon fontSize="small" />
              ) : (
                <CircularProgress size={20} thickness={4} />
              )}
            </div>
            Save Module
          </Button>
          <Snackbar status={publishStatus.snackbar} handleClose={handleCloseSnackbar} />
        </Drawer>

        {/* Main Content */}
        <div style={{ margin: '0 auto' }}>
          {/* Tab Info */}
          <section className={classes.contentRoot}>
            {/* Tab Name */}
            <div className="grid-span">
              <p className="input-label">Tab Name</p>
              <TextField
                className={classes.input}
                value={
                  module.tabs && module.tabs[tabIndex].tabName ? module.tabs[tabIndex].tabName : ''
                }
                onChange={e => handleTabChange('tabName', e.target.value)}
                placeholder="Tab Name"
                variant="outlined"
                inputProps={{
                  'aria-label': 'Tab Name',
                }}
              />
            </div>
          </section>

          {/* Basic Module Info */}
          {tabIndex === 0 && (
            <section className={classes.contentRoot}>
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
            </section>
          )}

          {/* Sections */}
          {module.tabs && (
            <Sections
              sections={module.tabs[tabIndex].sections}
              handleTabChange={handleTabChange}
              handleSectionChange={handleSectionChange}
            />
          )}

          {/* Add New Section Button */}
          <>
            <Button
              className={classes.newSectionButton}
              onClick={() => setNewSectionDialog(true)}
              component="span"
              disableRipple
            >
              Add new section
            </Button>

            <Dialog
              classes={{ paper: classes.newSectionDialog }}
              open={isNewSectionDialogOpen}
              onClose={() => setNewSectionDialog(false)}
            >
              <NewSectionDialog
                handleClose={() => setNewSectionDialog(false)}
                handleAddNewSection={handleAddNewSection}
              />
            </Dialog>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleEditor;
