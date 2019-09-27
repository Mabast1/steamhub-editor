import React from 'react';
import shortid from 'shortid';

import SectionData from './SectionData';

const SectionDataContainer = ({ storageUrl, sectionIndex, section, handleSectionChange }) => {
  // #region Event handlers
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (
      destination &&
      (destination.droppableId !== source.droppableId || destination.index !== source.index)
    ) {
      const newData = section.data.slice();
      const draggableContent = section.data.find(tab => tab.id === draggableId);

      newData.splice(source.index, 1);
      newData.splice(destination.index, 0, draggableContent);

      handleSectionChange(sectionIndex, 'data', newData);
    }
  };

  const handleDeleteData = React.useCallback(
    dataId => {
      const newData = section.data.filter(entry => entry.id !== dataId);
      handleSectionChange(sectionIndex, 'data', newData);
    },
    [handleSectionChange, section.data, sectionIndex]
  );

  const handleAddData = React.useCallback(() => {
    let data;
    switch (section.type) {
      case 0:
        data = { id: shortid.generate(), stdCode: '', stdDesc: '' };
        break;
      case 1:
        data = { id: shortid.generate(), vocab: '', vocabDef: '' };
        break;
      case 2:
        data = { id: shortid.generate(), item: '', quantity: 0, note: '' };
        break;
      case 3:
        data = {
          id: shortid.generate(),
          popupColor: '',
          popupIcon: '',
          popupMedia: '',
          popupMediaType: '',
          popupText: '',
          text: '<p></p>',
        };
        break;
      case 4:
        data = { id: shortid.generate(), text: '' };
        break;
      default:
        break;
    }

    const newData = [...section.data, data];

    handleSectionChange(sectionIndex, 'data', newData);
  }, [handleSectionChange, section, sectionIndex]);

  const handleDataChange = React.useCallback(
    (index, field, value) => {
      const newData = section.data.slice();
      newData[index][field] = value;

      handleSectionChange(sectionIndex, 'data', newData);
    },
    [handleSectionChange, section.data, sectionIndex]
  );
  // #endregion Event handlers

  return (
    <SectionData
      storageUrl={storageUrl}
      sectionIndex={sectionIndex}
      section={section}
      onDragEnd={onDragEnd}
      handleSectionChange={handleSectionChange}
      handleDataChange={handleDataChange}
      handleDeleteData={handleDeleteData}
      handleAddData={handleAddData}
    />
  );
};

export default SectionDataContainer;
