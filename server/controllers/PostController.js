import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    try {
        const post = await PostModel.find().populate("user").exec();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: ("Статьи не найдены", err),
        });
    }
};

//вернуть новую версию mongoose и заменить колбэки на промисы
//no longer accepts a callback
export const getOnePosts = async (req, res) => {
    try {
        PostModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $inc: { viewCount: 1 },
            },
            {
                returnDocument: "after",
            },
            (err, doc) => {
                if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть статью",
                });
                }

                if (!doc) {
                return res.status(404).json({
                    message: "Статья не найдена",
                });
                }

                res.json(doc);
            }
        ).populate("user");
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: ("Не удалось получить  lllстатьи", err.message),
        });
    }
};

export const removeOnePosts = async (req, res) => {
    try {
        PostModel.findOneAndDelete(
            {
                _id: req.params.id,
            },
            (err, doc) => {
                if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось удалить статью",
                });
                }

                if (!doc) {
                return res.status(404).json({
                    message: "Статья не найдена",
                });
                }

                res.json({
                success: true,
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: ("Не удалось получить", err.message),
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        await PostModel.updateOne(
        {
            _id: req.params.id,
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        }
        );

        res.json({
        success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: ("Не удалось обновить", err.message),
        });
    }
};

// export const getOne = async (req,res) => {
//     //функция без изменения количества просмотров работает
//      //no longer accepts a callback
//     try {

//         const postId = req.params.id

//         const post = await PostModel.findById(postId)

//         if (!post) {
//             return res.status(404).json({
//                 message: 'Статья не найдена!!!'
//             })
//         }

//         res.json(post)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: ('Статьи не найдены ***', err.message)
//         })
//     }
// }

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: ("Статья не удалась", err),
        });
    }
};
