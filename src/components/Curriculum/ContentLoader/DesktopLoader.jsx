import React from 'react';
import ContentLoader from 'react-content-loader';

export default () => (
  <ContentLoader height={138} width={850} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="0" y="0" rx="4" ry="4" width="246" height="138" />
    <rect x="270" y="4" rx="4" ry="4" width="320" height="16" />
    <rect x="270" y="28" rx="4" ry="4" width="140" height="12" />
    <rect x="270" y="60" rx="4" ry="4" width="580" height="10" />
    <rect x="270" y="80" rx="4" ry="4" width="450" height="10" />
  </ContentLoader>
);
