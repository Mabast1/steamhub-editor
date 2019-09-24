import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import InputBase from '@material-ui/core/InputBase';
import HandleIcon from '@material-ui/icons/DragHandle';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './Sections-styles';
import SectionData from './SectionData';

const Tabs = ({ sections, handleTabChange, handleSectionChange }) => {
  const classes = useStyles();

  // #region Event handlers
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (
      destination &&
      (destination.droppableId !== source.droppableId || destination.index !== source.index)
    ) {
      const newSections = sections.slice();
      const draggableContent = sections.find(section => section.id === draggableId);

      newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, draggableContent);

      handleTabChange('sections', newSections);
    }
  };

  const handleDeleteSection = id => {
    if (window.confirm('Are you sure you want to remove this section?')) {
      const newSections = sections.filter(section => section.id !== id);
      handleTabChange('sections', newSections);
    }
  };
  // #endregion Event handlers

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sectionsList">
        {dropProvided => (
          <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {provided => (
                  // Section Container
                  <section
                    key={section.id}
                    className={classes.contentRoot}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {/* Toolbar */}
                    <>
                      <div className="move-handle" {...provided.dragHandleProps}>
                        <HandleIcon />
                      </div>

                      <DeleteIcon
                        className="delete-icon"
                        onClick={() => handleDeleteSection(section.id)}
                      />
                    </>

                    {/* Section Name */}
                    <div style={{ marginBottom: 20 }}>
                      <InputBase
                        className={classes.inputTitle}
                        value={section.sectionName ? section.sectionName : ''}
                        onChange={e => handleSectionChange(index, 'sectionName', e.target.value)}
                        placeholder="Section Name"
                        inputProps={{
                          'aria-label': 'Section Name',
                        }}
                      />
                    </div>

                    <SectionData
                      sectionIndex={index}
                      section={section}
                      handleSectionChange={handleSectionChange}
                    />
                  </section>
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
