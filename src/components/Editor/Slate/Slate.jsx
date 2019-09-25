import React from 'react';
import { Editor } from 'slate-react';
import Html from 'slate-html-serializer';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import HandleIcon from '@material-ui/icons/DragHandle';
import VocabIcon from '@material-ui/icons/MenuBookOutlined';
import PopupIcon from '@material-ui/icons/RateReviewOutlined';

import useStyles from './Slate-styles';
import rules from './rules';

const SlateEditor = ({
  entry,
  index,
  length,
  handleDeleteData,
  handleAddData,
  dragHandleProps,
}) => {
  const classes = useStyles();
  const html = new Html({ rules });
  const initialValue = sessionStorage.getItem(entry.id) || entry.text;

  const [state, setState] = React.useState(html.deserialize(initialValue));
  const [editorRef, setEditorRef] = React.useState(null);
  const [isToolbarOpen, setToolbarOpen] = React.useState(false);

  // #region Event handlers
  const openToolbar = () => {
    setToolbarOpen(true);
  };

  const closeToolbar = () => {
    setToolbarOpen(false);
  };

  const wrapInline = (editor, type, field, value) => {
    editor.wrapInline({
      type,
      data: { [field]: value },
    });

    editor.moveToEnd();
  };

  const unwrapInline = (editor, type) => {
    editor.unwrapInline(type);
  };

  const hasType = type => {
    return state.inlines.some(inline => inline.type === type);
  };

  const onToolbarInlineClick = type => event => {
    event.preventDefault();

    const { value } = editorRef;
    const isFormatted = hasType(type);

    let string = '';
    let field = '';

    switch (type) {
      case 'link':
        string = 'Enter the URL of the link:';
        field = 'href';
        break;
      case 'vocab':
        string = 'Enter the definition of the word:';
        field = 'data-content';
        break;
      default:
        break;
    }

    if (isFormatted) {
      editorRef.command(unwrapInline, type);
    } else if (value.selection.isExpanded) {
      const inputValue = window.prompt(string);

      if (inputValue == null) {
        return;
      }

      editorRef.command(wrapInline, type, field, inputValue);
    } else {
      const inputValue = window.prompt(string);

      if (inputValue == null) {
        return;
      }

      const text = window.prompt('Enter the displayed text:');

      if (text == null) {
        return;
      }

      editorRef
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapInline, type, field, inputValue);
    }
  };

  const onChange = ({ value }) => {
    if (value.document !== state.document) {
      const string = html.serialize(value);
      sessionStorage.setItem(`${entry.id}`, string);
    }

    setState(value);
  };

  const setRef = editor => {
    setEditorRef(editor);
  };

  const renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        );
      default:
        return next();
    }
  };

  const renderInline = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      case 'vocab': {
        const { data } = node;
        const href = data.get('data-content');
        return (
          <span {...attributes} className="vocab-popup" data-content={href}>
            {children}
          </span>
        );
      }
      default: {
        return next();
      }
    }
  };
  // #endregion Event handlers

  return (
    <>
      <div className="move-handle" {...dragHandleProps}>
        <HandleIcon />
      </div>

      <ClickAwayListener onClickAway={closeToolbar}>
        <div className={classes.slateRoot}>
          <Editor
            className="slate-input"
            value={state}
            ref={setRef}
            onChange={onChange}
            onClick={openToolbar}
            renderBlock={renderNode}
            renderInline={renderInline}
          />

          {isToolbarOpen && (
            <div className="toolbar">
              {hasType('link') ? (
                <LinkOffIcon className="selected" onClick={onToolbarInlineClick('link')} />
              ) : (
                <LinkIcon onClick={onToolbarInlineClick('link')} />
              )}
              <VocabIcon
                className={hasType('vocab') ? 'selected' : ''}
                onClick={onToolbarInlineClick('vocab')}
              />
              {/* TODO: Add popup */}
              <PopupIcon />
            </div>
          )}
        </div>
      </ClickAwayListener>

      {index === length - 1 ? (
        <AddIcon className="add-icon" onClick={handleAddData} />
      ) : (
        <DeleteIcon className="delete-icon" onClick={() => handleDeleteData(entry.id)} />
      )}
    </>
  );
};

export default SlateEditor;
