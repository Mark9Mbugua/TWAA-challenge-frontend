import React, { useRef } from 'react';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createUndoPlugin from '@draft-js-plugins/undo';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/undo/lib/plugin.css';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons';

import HeadlinesButton from '../headlines-button/headlines-button.component';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import bodyEditorStyles from './body-editor.module.scss';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const linkifyPlugin = createLinkifyPlugin();

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [toolbarPlugin, emojiPlugin, linkifyPlugin, undoPlugin]

const BodyEditor = ({body, onBodyChange}) => {
    let bodyEditor = useRef(null);

    const bodyFocus = () => {
        bodyEditor.focus();
    };

    return (
        <div className={bodyEditorStyles.bodyEditor} onClick={bodyFocus}>
            <div className={bodyEditorStyles.allTools}>
                <Toolbar>
                    {
                        (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <CodeButton {...externalProps} />
                                <Separator {...externalProps} />
                                <HeadlinesButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                            </div>
                        )
                    }
                </Toolbar>
                <div>
                    <EmojiSuggestions />
                    <EmojiSelect />
                </div>
                <div>
                    <UndoButton />
                    <RedoButton />
                </div>
            </div>
            <Editor
                editorState={body}
                onChange={onBodyChange}
                plugins={plugins}
                ref={el => bodyEditor = el}
            />
        </div>
    );
}

export default BodyEditor
