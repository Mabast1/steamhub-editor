import React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import DialogContent from '@material-ui/core/DialogContent';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './CreateModuleDialog-styles';
import IMAGE_PLACEHOLDER from '../../../../constants/mediaPlaceholder';

const CreateModuleDialog = ({
  handleCreateModule,
  handleDeleteTemplate,
  handleClose,
  templates,
}) => {
  const classes = useStyles();

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />

        <div className={classes.templateDivider} style={{ marginTop: 0 }}>
          <p>Public templates</p>
        </div>
        <div className={classes.templateGallery}>
          <div>
            <ButtonBase onClick={() => handleCreateModule(-1)} component="span" disableRipple>
              <img
                style={{ width: 210, height: 118 }}
                alt="Blank Template"
                src={IMAGE_PLACEHOLDER}
              />
              <p>Blank Template</p>
            </ButtonBase>
          </div>
        </div>

        {/* My Templates */}
        <div className={classes.templateDivider}>
          <p>My templates</p>
        </div>
        <div className={classes.templateGallery}>
          {(!templates ? Array.from(new Array(3)) : templates).map((template, index) => (
            <div key={template ? template.id : index}>
              {template ? (
                <>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDeleteTemplate(template.id)}
                  />
                  <ButtonBase
                    onClick={() => handleCreateModule(template.id)}
                    component="span"
                    disableRipple
                  >
                    <img
                      style={{ width: 210, height: 118 }}
                      alt={template.name}
                      src={template.cover ? template.cover : IMAGE_PLACEHOLDER}
                    />
                    <p>{template.name}</p>
                  </ButtonBase>
                </>
              ) : (
                <>
                  <Skeleton variant="rect" height={120} />
                  <Skeleton width="70%" height={16} style={{ margin: '10px 0px' }} />
                </>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </>
  );
};

export default CreateModuleDialog;
