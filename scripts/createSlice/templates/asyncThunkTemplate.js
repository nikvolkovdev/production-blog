module.exports = () => `// import { ThunkConfig } from 'app/providers/StoreProvider';
// import { createAsyncThunk } from '@reduxjs/toolkit';
//
//
// export const changeMyName = createAsyncThunk<
//         AppComment,
//     string,
//     ThunkConfig<string>
// >(
//     'addNewComment/addCommentForArticle',
//         async (text, thunkAPI) => {
//             const {
//                 dispatch, extra, rejectWithValue, getState,
//             } = thunkAPI;
//
//
//             if (!userData || !text || !article) {
//                 return rejectWithValue('no data');
//             }
//
//             try {
//                 // @ts-ignore
//                 const response = await extra.api.post<...>('/comments', {
//                     articleId: article.id,
//                     userId: userData.id,
//                     text,
//                 });
//
//                 if (!response.data) {
//                     throw new Error();
//                 }
//
//                 dispatch(fetchCommentsByArticleId(article.id));
//
//                 return response.data;
//             } catch (e) {
//                 return rejectWithValue('Вы ввели неверный логин или пароль');
//             }
//         },
// );
`;
