import React from 'react';

// import useStyles from './CogEditor-styles';
import Layout from '../../Layout';

const CogEditor = ({ params, pathname }) => {
  // const classes = useStyles();

  return (
    <Layout pathname={pathname}>
      <p>{params.id}</p>
    </Layout>
  );
};

export default CogEditor;
