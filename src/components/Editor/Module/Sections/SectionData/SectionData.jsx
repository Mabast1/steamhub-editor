import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import useStyles from './SectionData-styles';
import Standard from './Standard';
import Glossary from './Glossary';
import Material from './Material';
import SlateEditor from '../../../Slate';

const SectionData = ({
  sectionIndex,
  section,
  onDragEnd,
  handleSectionChange,
  handleDataChange,
  handleDeleteData,
  handleAddData,
}) => {
  const classes = useStyles();
  let Component = () => <></>;
  switch (section.type) {
    case 0:
      Component = (entry, index, dragHandleProps) => (
        <Standard
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
          dragHandleProps={dragHandleProps}
        />
      );
      break;
    case 1:
      Component = (entry, index, dragHandleProps) => (
        <Glossary
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
          dragHandleProps={dragHandleProps}
        />
      );
      break;
    case 2:
      Component = (entry, index, dragHandleProps) => (
        <Material
          entry={entry}
          index={index}
          length={section.data.length}
          handleDataChange={handleDataChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
          dragHandleProps={dragHandleProps}
        />
      );
      break;
    case 3:
      Component = (entry, index, dragHandleProps) => (
        <SlateEditor
          sectionIndex={sectionIndex}
          data={section.data}
          entry={entry}
          index={index}
          length={section.data.length}
          handleSectionChange={handleSectionChange}
          handleDeleteData={handleDeleteData}
          handleAddData={handleAddData}
          dragHandleProps={dragHandleProps}
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
                    {Component(entry, index, { ...provided.dragHandleProps })}
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
