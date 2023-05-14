import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";

export const FullPost = () => {
  const [obj, setObj] = React.useState()
  const [isLoading, setLoading] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setObj(res.data) 
      setLoading(false)})
      .catch((err) => {console.warm(err)})
  }, [])

if (isLoading) {
  return <Post isLoading={true}/>
}
  
  return (
    <>
      <Post
        _id={obj._id}
        title={obj.title}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        
        user={obj.user}
        createdAt={obj.createdAt}
        viewsCount={obj.viewCount}
        commentsCount={obj.commentsCount}
        tags={obj.tags}
        isFullPost
      >
        <p>
          {obj.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          // {
          //   user: {
          //     fullName: "Вася Пупкин",
          //     avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
          //   },
          //   text: "Это тестовый комментарий 555555",
          // },
          // {
          //   user: {
          //     fullName: "Иван Иванов",
          //     avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
          //   },
          //   text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          // },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
