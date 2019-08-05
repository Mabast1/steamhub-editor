import React from 'react';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Delete';

export default props => {
  const {
    classes,
    inputState: { material_teacher, material_student, material_group }
  } = props;

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className='input-title'>Teacher Materials</h2>
        <Divider />
      </div>
      {material_teacher &&
        material_teacher.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < material_teacher.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?'
                    )
                  ) {
                    props.handleRemoveInput('material_teacher', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('material_teacher', {
                    teacherItem: '',
                    teacherQuantity: '',
                    teacherNote: ''
                  })
                }
              />
            )}

            <TextField
              value={material_teacher[index].teacherItem}
              onChange={e =>
                props.handleMultiInputChange('material_teacher', {
                  index,
                  field: 'teacherItem',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter item'
              type='text'
            />

            <TextField
              value={material_teacher[index].teacherQuantity}
              onChange={e =>
                props.handleMultiInputChange('material_teacher', {
                  index,
                  field: 'teacherQuantity',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='#'
              type='number'
              InputProps={{ inputProps: { min: 1 } }}
            />

            <TextField
              value={material_teacher[index].teacherNote}
              onChange={e =>
                props.handleMultiInputChange('material_teacher', {
                  index,
                  field: 'teacherNote',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter notes'
              type='text'
              multiline
            />
          </div>
        ))}

      <div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className='input-title'>Individual Materials</h2>
        <Divider />
      </div>
      {material_student &&
        material_student.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < material_student.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?'
                    )
                  ) {
                    props.handleRemoveInput('material_student', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('material_student', {
                    studentItem: '',
                    studentQuantity: '',
                    studentNote: ''
                  })
                }
              />
            )}

            <TextField
              value={material_student[index].studentItem}
              onChange={e =>
                props.handleMultiInputChange('material_student', {
                  index,
                  field: 'studentItem',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter item'
              type='text'
            />

            <TextField
              value={material_student[index].studentQuantity}
              onChange={e =>
                props.handleMultiInputChange('material_student', {
                  index,
                  field: 'studentQuantity',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='#'
              type='number'
              InputProps={{ inputProps: { min: 1 } }}
            />

            <TextField
              value={material_student[index].studentNote}
              onChange={e =>
                props.handleMultiInputChange('material_student', {
                  index,
                  field: 'studentNote',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter notes'
              type='text'
              multiline
            />
          </div>
        ))}

<div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className='input-title'>Group Materials</h2>
        <Divider />
      </div>
      {material_group &&
        material_group.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < material_group.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?'
                    )
                  ) {
                    props.handleRemoveInput('material_group', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('material_group', {
                    groupItem: '',
                    groupQuantity: '',
                    groupNote: ''
                  })
                }
              />
            )}

            <TextField
              value={material_group[index].groupItem}
              onChange={e =>
                props.handleMultiInputChange('material_group', {
                  index,
                  field: 'groupItem',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter item'
              type='text'
            />

            <TextField
              value={material_group[index].groupQuantity}
              onChange={e =>
                props.handleMultiInputChange('material_group', {
                  index,
                  field: 'groupQuantity',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='#'
              type='number'
              InputProps={{ inputProps: { min: 1 } }}
            />

            <TextField
              value={material_group[index].groupNote}
              onChange={e =>
                props.handleMultiInputChange('material_group', {
                  index,
                  field: 'groupNote',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter notes'
              type='text'
              multiline
            />
          </div>
        ))}
    </React.Fragment>
  );
};
