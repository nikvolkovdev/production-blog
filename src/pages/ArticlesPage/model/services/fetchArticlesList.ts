import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AppComment } from 'entities/Comment';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlePage/fetchArticlesList',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Вы ввели неверный логин или пароль');
        }
    },
);
