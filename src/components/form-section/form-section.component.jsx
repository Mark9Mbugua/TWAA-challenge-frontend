import React, {useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';  
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

import ImageUploader from '../image-uploader/image-uploader.component';
import TitleEditor from '../title-editor/title-editor.component';
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

import formStyles from './form-section.module.scss';

import defaultImg from '../../assets/grey-bg.jpg';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const linkifyPlugin = createLinkifyPlugin();

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [toolbarPlugin, emojiPlugin, linkifyPlugin, undoPlugin]

const FormSection = () => {
    const [title, setTitle] = useState(() => EditorState.createEmpty());  
    const [body, setBody] = useState(() => EditorState.createEmpty());
    const [currentImg, setCurrentImg] = useState(defaultImg);

    let bodyEditor = useRef(null);

    const bodyFocus = () => {
        bodyEditor.focus();
    };

    const onChangeFile = (e) => {
        setCurrentImg(e.target.files[0]);
    };

    const onTitleChange = (title) => {
        setTitle(title);
    };

    const onBodyChange = (body) => {
        setBody(body);
    };

    const rawTitleJs = title.getCurrentContent();
    const rawBodyJs = body.getCurrentContent();

    const titleString = JSON.stringify(convertToRaw(rawTitleJs));
    const bodyString = JSON.stringify(convertToRaw(rawBodyJs));

    let history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', titleString);
        formData.append('body', bodyString);
        formData.append('image', currentImg);

        console.log(formData);

        // use axios to create a new article
        axios.post('https://twaachallenge.herokuapp.com/articles/create', formData)
            .then(res =>{
                console.log(res.data);
                if(res.data === 'Article created.') {
                    history.push('/articles/')
                }
            })
            .catch(err => console.log(err));

        //clear editors
        setTitle(() => EditorState.createEmpty());
        setBody(() => EditorState.createEmpty());
        setCurrentImg(defaultImg);
    
    };

    const saveToLocalStorage = (content1, content2) => {
        window.localStorage.setItem('content1', JSON.stringify(convertToRaw(content1)));
        window.localStorage.setItem('content2', JSON.stringify(convertToRaw(content2)));
    }

    useEffect(()=>{
        const content1 = localStorage.getItem('content1');
        const content2 = localStorage.getItem('content2');
        if(content1 && content2){
            setTitle(() => EditorState.createWithContent(convertFromRaw(JSON.parse(content1))));
            setBody(() => EditorState.createWithContent(convertFromRaw(JSON.parse(content2))));
            
         } else {
            setTitle(() => EditorState.createEmpty());
            setBody(() => EditorState.createEmpty());
         }
    },[]);

    useEffect(()=>{
        saveToLocalStorage(rawTitleJs, rawBodyJs);
    });

    return (
        <form className={formStyles.form} onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
                <ImageUploader
                    currentImg={currentImg}
                    onChangeFile={onChangeFile}
                />
                <TitleEditor 
                    title={title}
                    onTitleChange={onTitleChange}
                />
                <div className={formStyles.bodyEditor} onClick={bodyFocus}>
                    <div className={formStyles.allTools}>
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
            <button className={formStyles.button} type='submit' value='submit'>Publish Article</button>
        </form>
    );
}

export default FormSection
