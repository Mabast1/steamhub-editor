/* eslint-disable */
import React from 'react';

const rules = [
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p>{children}</p>;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'a') {
        return {
          object: 'inline',
          type: 'link',
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href'),
          },
        };
      } else if (el.tagName.toLowerCase() === 'span') {
        return {
          object: 'inline',
          type: 'vocab',
          nodes: next(el.childNodes),
          data: {
            'data-content': el.getAttribute('data-content'),
          },
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'inline') {
        switch (obj.type) {
          case 'link':
            return (
              <a href={obj.data.get('href')} target="_blank">
                {children}
              </a>
            );
          case 'vocab':
            return (
              <span
                className="todefine"
                data-container="body"
                data-toggle="popover"
                data-placement="top"
                data-trigger="hover"
                data-content={obj.data.get('data-content')}
              >
                {children}
              </span>
            );
        }
      }
    },
  },
];

export default rules;
