import React, {useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

import ImageUploader from '../image-uploader/image-uploader.component';
import TitleEditor from '../title-editor/title-editor.component';
import BodyEditor from '../body-editor/body-editor.component';

import formStyles from './form-section.module.scss';

import defaultImg from '../../assets/grey-bg.jpg';

const FormSection = () => {
    const [title, setTitle] = useState(() => EditorState.createEmpty());
    
    const [body, setBody] = useState(() => EditorState.createEmpty());

    const [currentImg, setCurrentImg] = useState(defaultImg);

    const onChangeFile = (e) => {
        setCurrentImg(e.target.files[0]);
    };

    const onTitleChange = (title) => {
        setTitle(title);
        // console.log(convertToRaw(title.getCurrentContent()));
    };

    const onBodyChange = (body) => {
        setBody(body);
        // console.log(convertToRaw(body.getCurrentContent()));
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
        body: bodyText,
        image: currentImg,
    }

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', titleText);
        formData.append('body', bodyText);
        formData.append('image', currentImg);

        console.log(formData);

        // use axios to create a new article
        axios.post('http://localhost:4600/articles/create', formData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        //clear editors
        setTitle(() => EditorState.createEmpty());
        setBody(() => EditorState.createEmpty());
        setCurrentImg(defaultImg);
    
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
                <BodyEditor
                    body={body}
                    onBodyChange={onBodyChange}
                />
            </div>
            <button className={formStyles.button} type='submit' value='submit'>Publish Article</button>
        </form>
    );
}

export default FormSection
