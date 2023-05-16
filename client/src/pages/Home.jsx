import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios.js'
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../redux/slices/posts.js';

export const Home = () => {
  const dispatch = useDispatch()

  const {posts, tags } = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)

  const isPostsLoading = posts.status === 'loading'

  React.useEffect(() => {
    // axios.get('/posts')
    dispatch(fetchPosts())
  }, [])

  console.log(posts)
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          isPostsLoading ? (
            <Post key={index} isLoading={true}/>
          ) : (
            <Post
              _id={obj._id}
              key={index}
              title={obj.title}
              // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        {/* <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={true}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
