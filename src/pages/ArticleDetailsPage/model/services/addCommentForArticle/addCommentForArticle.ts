import { AppComment } from 'entities/Comment';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { addNewCommentActions } from 'features/addNewComment/model/slice/addNewCommentSlice';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    AppComment,
    string,
    ThunkConfig<string>
    >(
        'addNewComment/addCommentForArticle',
        async (text, thunkAPI) => {
            const {
                dispatch, extra, rejectWithValue, getState,
            } = thunkAPI;

            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !text || !article) {
                return rejectWithValue('no data');
            }

            try {
            // @ts-ignore
                const response = await extra.api.post<AppComment>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                });

                if (!response.data) {
                    throw new Error();
                }

                dispatch(fetchCommentsByArticleId(article.id));

                return response.data;
            } catch (e) {
                return rejectWithValue('Вы ввели неверный логин или пароль');
            }
        },
    );