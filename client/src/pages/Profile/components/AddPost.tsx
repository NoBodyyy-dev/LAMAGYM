import React, { useState } from 'react';
import MainInput from '../../../lib/Inputs/MainInput';

type dataAddPost = {
    title?: string,
    description?: string,
}

const AddPost = () => {
    const [addData, setAddData] = useState<dataAddPost>({title: "", description: ""})

    return (
        <div className='profile__add'>
            <h1 className="title">Создать пост</h1>
            <div className="profile__add__form">
                <MainInput placeholder='Добавить заголовок' value={addData.title!} onChange={(e) => setAddData({title: e.target.value})} />
                <MainInput placeholder='Добавить описание' value={addData.description!} onChange={(e) => setAddData({description: e.target.value})} />
                {addData.title}
                {addData.description}
            </div>
        </div>
    );
};

export default AddPost;