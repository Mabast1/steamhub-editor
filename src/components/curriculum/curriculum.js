import React from 'react';
import { Link } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
      <Breadcrumbs
        className={props.classes.breadcrumbs}
        maxItems={4}
        itemsAfterCollapse={2}
        separator={<NavigateNextIcon />}
        aria-label='breadcrumb'
      >
        {props.params.map((value, index) => {
          const to = `/${props.params.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={index}>
              {index === props.params.length - 1 ? (
                <Typography>{index === 0 ? 'Curriculum' : value}</Typography>
              ) : (
                <Button component={Link} to={to}>{index === 0 ? 'Curriculum' : value}</Button>
              )}
            </React.Fragment>
          );
        })}
      </Breadcrumbs>

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
