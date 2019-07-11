import React from 'react';
import { withFirebase } from '../../firebase';

export default withFirebase(props => {
  function handleSubmit() {
    props.firebase.module('DBE1011').set(
      {
        name: 'Test',
        materials: [
          { name: 'Item 1', quantity: 2, note: '' },
          { name: 'Item 2', quantity: 1, note: '' }
        ]
      },
      { merge: true }
    );
  }
  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
});
