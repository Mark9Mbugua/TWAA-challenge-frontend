import React, {useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

import ImageUploader from '../image-uploader/image-uploader.component';
import TitleEditor from '../title-editor/title-editor.component';
import BodyEditor from '../body-editor/body-editor.component';

import formStyles from './form-section.module.scss';

const FormSection = () => {
    const [title, setTitle] = useState(() => EditorState.createEmpty());
    
    const [body, setBody] = useState(() => EditorState.createEmpty());

    const [currentImg, setCurrentImg] = useState('https://wallpaperaccess.com/full/1216247.jpg');

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setCurrentImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onTitleChange = (title) => {
        setTitle(title);
        console.log(convertToRaw(title.getCurrentContent()));
    };

    const onBodyChange = (body) => {
        setBody(body);
        console.log(convertToRaw(body.getCurrentContent()));
    };

    // const rawTitle = convertToRaw(title.getCurrentContent());
    // const rawBody = convertToRaw(body.getCurrentContent());

    // const article  = {
    //     title: rawTitle, 
    //     body: rawBody
    // }

    const titleText = title.getCurrentContent().getPlainText();
    const bodyText = body.getCurrentContent().getPlainText();

    const article  = {
        title: titleText, 
        body: bodyText
    }

    const handleSubmit = e => {
        e.preventDefault();

        // use axios to create a new article
        axios.post('http://localhost:4600/articles/create', article)
            .then(res => console.log(res.data));

        //clear editors
        setTitle(() => EditorState.createEmpty());
        setBody(() => EditorState.createEmpty());
    
    };

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('article'));
        if(data){
            setTitle(() => EditorState.createWithContent(ContentState.createFromText(data.title)));
            setBody(() => EditorState.createWithContent(ContentState.createFromText(data.body)));
         } else {
            setTitle(() => EditorState.createEmpty());
            setBody(() => EditorState.createEmpty());
         }
    },[]);

    useEffect(()=>{
        localStorage.setItem('article', JSON.stringify(article))
    });

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <ImageUploader
                    imageHandler={imageHandler} 
                    currentImg={currentImg}
                />
                <TitleEditor 
                    title={title}
                    onTitleChange={onTitleChange}
                />
                <BodyEditor
                    body={body}
                    onBodyChange={onBodyChange}
                />
            </div>
            <button type='submit' value='submit'>Publish Article</button>
        </form>
    );
}

export default FormSection
