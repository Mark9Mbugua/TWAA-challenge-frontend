import React, {useState} from 'react';

import EditIcon from  '../../assets/edit.svg';

import imageStyles from './image-uploader.module.scss';

const ImageUploader = ({ imageHandler, currentImg}) => {

    return (
        <div className={imageStyles.container}>
           <div className={imageStyles.imgHolder}>
                <img src={currentImg} alt='' id='img' className={imageStyles.img} />
            </div>
            <input 
                className={imageStyles.input} 
                type='file' 
                name='image-upload' 
                id='input' 
                accept='image/*'
                onChange={imageHandler}
            />
            <div className={imageStyles.label}>
                <label htmlFor='input' className={imageStyles.imgUpload}>
                    <img src={EditIcon} className={imageStyles.icon} />
                </label>
            </div>
        </div>
    )
}

export default ImageUploader
