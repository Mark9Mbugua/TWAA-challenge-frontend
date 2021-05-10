import React, {useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import axios from 'axios';
import Editor  from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createUndoPlugin from '@draft-js-plugins/undo';

import HeadlinesButton from '../headlines-button/headlines-button.component';

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

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/undo/lib/plugin.css';

import editorStyles from './form-section.module.scss';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const linkifyPlugin = createLinkifyPlugin();

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [toolbarPlugin, emojiPlugin, linkifyPlugin, undoPlugin]


const FormSection = () => {
    const [title, setTitle] = useState(() => EditorState.createEmpty());
    
    const [body, setBody] = useState(() => EditorState.createEmpty());
    
    let titleEditor = useRef(null);
    let bodyEditor = useRef(null);

    const titleFocus = () => {
        titleEditor.focus();
    };

    const bodyFocus = () => {
        bodyEditor.focus();
    };

    const onTitleChange = (title) => {
        setTitle(title);
    };

    const onBodyChange = (body) => {
        setBody(body);
    };

    const titleText = title.getCurrentContent().getPlainText();
    const bodyText = body.getCurrentContent().getPlainText();

    const handleSubmit = e => {
        e.preventDefault();

        const article  = {
            title: titleText, 
            body: bodyText
        }

        console.log(article);

        // use axios to create a new article here
        axios.post('http://localhost:4600/articles/create', article)
            .then(res => console.log(res.data));

        //clear editors
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={editorStyles.titleEditor} onClick={titleFocus}>
                    <Editor
                        editorState={title}
                        onChange={onTitleChange}
                        ref={el => titleEditor = el}
                    />
                </div>
                <div className={editorStyles.bodyEditor} onClick={bodyFocus}>
                    <div className={editorStyles.allTools}>
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
            </div>
            <button type='submit' value='submit'>Publish Article</button>
        </form>
    );
}

export default FormSection
