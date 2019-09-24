import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import HandleIcon from '@material-ui/icons/DragHandle';

import useStyles from './SectionData-styles';
import Standard from './Standard';
import Glossary from './Glossary';
import Material from './Material';

const SectionData = ({ section, onDragEnd, handleDataChange, handleDeleteData, handleAddData }) => {
  const classes = useStyles();
  let Component = () => <></>;
  switch (section.type) {
    case 0:
      Component = (entry, index) => (
        <Standard
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
        />
      );
      break;
    case 1:
      Component = (entry, index) => (
        <Glossary
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
        />
      );
      break;
    case 2:
      Component = (entry, index) => (
        <Material
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
        />
      );
      break;
    default:
      break;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={section.id}>
        {dropProvided => (
          <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
            {section.data.map((entry, index) => (
              <Draggable key={entry.id} draggableId={entry.id} index={index}>
                {provided => (
                  <div
                    className={classes.entryRoot}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <>
                      <div className="move-handle" {...provided.dragHandleProps}>
                        <HandleIcon />
                      </div>
                      {Component(entry, index)}
                    </>
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

export default SectionData;
