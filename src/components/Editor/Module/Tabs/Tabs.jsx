import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import HandleIcon from '@material-ui/icons/DragHandle';

import useStyles from '../ModuleEditor-styles';

const Tabs = ({ tabs, tabIndex, setTabIndex, handleStateChange }) => {
  const classes = useStyles();

  // #region Event handlers
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (
      destination &&
      (destination.droppableId !== source.droppableId || destination.index !== source.index)
    ) {
      const newTabs = tabs.slice();
      const draggableContent = tabs.find(tab => tab.id === draggableId);

      newTabs.splice(source.index, 1);
      newTabs.splice(destination.index, 0, draggableContent);

      handleStateChange('tabs', newTabs);
    }
  };

  const handleDeleteTab = id => e => {
    // event.stopPropagation vs event.preventDefault
    // https://stackoverflow.com/a/5963688
    e.stopPropagation();

    if (window.confirm('Are you sure you want to remove this tab?')) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      let newTabIndex = tabIndex;
      if (newTabIndex > newTabs.length - 1) newTabIndex = newTabs.length - 1;

      setTabIndex(newTabIndex);
      handleStateChange('tabs', newTabs);
    }
  };
  // #endregion Event handlers

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tabList">
        {dropProvided => (
          <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
            {tabs &&
              tabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {provided => (
                    <ListItem
                      button
                      className={classes.tab}
                      onClick={() => setTabIndex(index)}
                      selected={tabIndex === index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="move-handle" {...provided.dragHandleProps}>
                        <HandleIcon />
                      </div>
                      {tab.tabName}
                      {index > 0 && <DeleteIcon onClick={handleDeleteTab(tab.id)} />}
                    </ListItem>
                  )}
                </Draggable>
              ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Tabs;
