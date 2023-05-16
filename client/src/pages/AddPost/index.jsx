import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const inputFileRef = React.useRef(null)
  const [isLoading, setIsLoading] = React.useState('')
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('')

  const handleChangeFile = async (event) => {
    console.log(event.target.files)
    try {
      const formData = new FormData()
      formData.append('image', event.target.files[0])
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
      console.log(data)
    } catch (err) {
      console.log(err)
      alert('ошибка загрузки')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title, 
        
        text
      }

      const { data } = await axios.post('/posts', fields)

      const id = data._id

      navigate(`/posts/${id}`)
    } catch (error) {
      console.log(error)
      alert('статья не создана')
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
    }  

  // console.log({title, tags, text})

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>  
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:5555${imageUrl}`} alt="Uploaded" />
        </>
      )}
      {/* {imageUrl && (
       
      )} */}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth 
      />
      <SimpleMDE 
        className={styles.editor} 
        value={text} 
        onChange={onChange} 
        options={options} 
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
