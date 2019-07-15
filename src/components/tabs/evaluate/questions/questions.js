import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import QuestionForm from './questionForm';

export default () => {
  let components = [];
  const [count, setCount] = React.useState(1);

  function handleAddInput() {
    setCount(prev => prev + 1);
  }

  for (let i = 1; i <= count; i++) {
    components.push(
      <React.Fragment key={`question-${i}`}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '60px'
          }}
        >
          {i === count ? (
            <AddIcon onClick={handleAddInput} style={{ cursor: 'pointer' }} />
          ) : (
            <span style={{ width: '24px' }} />
          )}
          <h2 style={{ margin: '0', marginLeft: '8px' }}>Question #{i}</h2>
        </div>
        <QuestionForm id={i} />
      </React.Fragment>
    );
  }

  return components;
};
