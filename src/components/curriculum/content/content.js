import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div>
      <ul>
        {props.data.map(item => {
          return (
            <li key={item.id}>
              <Link to={`${props.match.url}/${item.name.toLowerCase()}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
