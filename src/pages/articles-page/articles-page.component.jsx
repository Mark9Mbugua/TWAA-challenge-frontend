import React, { useEffect, useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import axios from  'axios';
import { Link } from 'react-router-dom';

import editorStyles from './articles-page.module.scss';

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState(() => EditorState.createEmpty());  
    const [body, setBody] = useState(() => EditorState.createEmpty());
    const latestArticle = articles[articles.length-1]; 

    useEffect(()=>{
        axios.get('https://twaachallenge.herokuapp.com/articles/')
        .then(res => setArticles(res.data))
        .catch(error => console.log(error));
    }, []);

    useEffect(()=>{
        if (latestArticle){
            setTitle(() => EditorState.createWithContent(convertFromRaw(JSON.parse(latestArticle.title))));
            setBody(() => EditorState.createWithContent(convertFromRaw(JSON.parse(latestArticle.body))));
            
        } else {
            setTitle(() => EditorState.createEmpty());
            setBody(() => EditorState.createEmpty());
        }
    }, [articles]);
    
    
    return (
        <div className={editorStyles.pageContainer}>
            <h2>Latest Article</h2>
            <div className={editorStyles.editorContainer}>
                <div className={editorStyles.editor}>
                    <Editor editorState={title} readOnly={true}/>
                </div>
            </div>
            <div className={editorStyles.editorContainer}>
                <div className={editorStyles.editor}>
                    <Editor editorState={body} readOnly={true}/>
                </div>
            </div>
            <Link to='/'>Create another article</Link>
        </div>
    );
}

export default ArticlesPage
