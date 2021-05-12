import React from 'react';

import EditIcon from  '../../assets/edit.svg';

import imageStyles from './image-uploader.module.scss';

import defaultImg from '../../assets/grey-bg.jpg';

const ImageUploader = ({ currentImg, onChangeFile}) => {

    return (
        <div className={imageStyles.container}>
            <div className={imageStyles.imgHolder}>
                {
                    currentImg === defaultImg ?
                        <img src={currentImg} alt='' id='img' className={imageStyles.img} />
                    :
                        <img src={URL.createObjectURL(currentImg)} alt='' id='img' className={imageStyles.img} />
                }
            </div>
            <input 
                className={imageStyles.input} 
                type='file' 
                filename='image' 
                id='input' 
                accept='image/*'
                onChange={onChangeFile}
            />
            <div className={imageStyles.label}>
                <label htmlFor='input' className={imageStyles.imgUpload}>
                    <img src={EditIcon} className={imageStyles.icon} />
                </label>
            </div>
        </div>
    );
}

export default ImageUploader
