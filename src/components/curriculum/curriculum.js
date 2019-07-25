import React from 'react';

import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';

import Layout from '../layout';
import ModalContent from './modalContent';

export default props => {
  const CardContent = childProps => (
    <div className='cCardContent'>
      {props.params.length < 5 ? <FolderIcon /> : <DescriptionIcon />}
      <div className={props.classes.cText}>{childProps.children}</div>
    </div>
  );

  return (
    <Layout handleModalOpen={props.handleModalOpen}>
      {props.isFetching ? (
        // TODO: Add loading screen while fetching curriculum
        <div>FETCHING DATA</div>
      ) : (
        <div className={props.classes.cGrid}>
          {props.data.map(item => {
            return (
              <React.Fragment key={item.id}>
                {/* Single click on mobile, and double click on desktop to open folder */}
                <Hidden smUp implementation='js'>
                  <div
                    className={props.classes.cCard}
                    onClick={() =>
                      props.history.push(
                        `/${props.params.join('/')}/${item.name}`
                      )
                    }
                  >
                    <CardContent>
                      <p>{item.name}</p>
                    </CardContent>
                  </div>
                </Hidden>
                <Hidden xsDown implementation='js'>
                  <div
                    className={props.classes.cCard}
                    onDoubleClick={() =>
                      props.history.push(
                        `/${props.params.join('/')}/${item.name}`
                      )
                    }
                  >
                    <CardContent>
                      <p>{item.name}</p>
                    </CardContent>
                  </div>
                </Hidden>
              </React.Fragment>
            );
          })}
        </div>
      )}

      <Hidden smUp implementation='css'>
        <Fab
          onClick={props.handleModalOpen}
          aria-label='Add'
          className={props.classes.fab}
        >
          <AddIcon />
        </Fab>
      </Hidden>

      <Dialog
        classes={{ paper: props.classes.cModal }}
        open={props.modalOpen}
        onClose={props.handleModalClose}
        aria-labelledby='form-dialog-title'
      >
        <ModalContent
          handleModalClose={props.handleModalClose}
          params={props.params}
        />
      </Dialog>
    </Layout>
  );
};
