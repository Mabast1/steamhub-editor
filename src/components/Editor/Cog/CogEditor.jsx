import React from 'react';

// import useStyles from './CogEditor-styles';
import Layout from '../../Layout';

const CogEditor = ({ pathname }) => {
  // const classes = useStyles();

  return (
    <Layout pathname={pathname}>
      <p>Hello World!</p>
    </Layout>
  );
};

export default CogEditor;
