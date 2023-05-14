import { body } from 'express-validator'

//утилита express-validator сверяет данные по заданным параметрам
//данные и сообщение об ошибке

export const registerValidation = [
    body('fullName', 'Имя короче трёх символов').isLength({ min: 3 }), 
    body('email', 'Это не email').isEmail(), 
    body('password', 'Пароль должен быть длиннее').isLength({ min: 5 }), 
    body('avatarUrl', 'Нет ссылки на аватар').optional().isURL()
]

export const LoginValidation = [
    body('email', 'Это не email').isEmail(), 
    body('password', 'Пароль должен быть длиннее').isLength({ min: 5 }), 
]

export const postValidation = [
    body('title', 'Введите заголовок').isLength({ min: 3 }).isString(), 
    body('text', 'Введите текст').isLength({ min: 10 }).isString(), 
    body('tags', 'Неверный формат тегов').optional().isArray(), 
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]
