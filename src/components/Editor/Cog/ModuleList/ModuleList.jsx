import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import HandleIcon from '@material-ui/icons/Menu';

import useStyles from './ModuleList-styles';

const ModuleList = ({ modules, handleStateChange }) => {
  const classes = useStyles();

  // #region Event handlers

  // Reorder module list state on drag-end
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (
      destination &&
      (destination.droppableId !== source.droppableId || destination.index !== source.index)
    ) {
      // Never mutate object or array
      // Read more at https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
      const newModules = modules.slice();
      const draggableContent = modules.find(module => module.id === draggableId);

      newModules.splice(source.index, 1);
      newModules.splice(destination.index, 0, draggableContent);

      handleStateChange('modules', newModules);
    }
  };
  // #endregion Event handlers

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="moduleList">
        {dropProvided => (
          <div
            className={classes.moduleList}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {modules &&
              modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index}>
                  {provided => (
                    <div className="card" ref={provided.innerRef} {...provided.draggableProps}>
                      <div className="move-handle" {...provided.dragHandleProps}>
                        <HandleIcon />
                      </div>
                      {module.name}
                    </div>
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

export default ModuleList;
