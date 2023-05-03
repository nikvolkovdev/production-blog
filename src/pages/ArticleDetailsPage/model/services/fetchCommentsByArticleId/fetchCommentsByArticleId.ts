import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AppComment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    AppComment[],
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!articleId) {
        return rejectWithValue('no id');
    }

    try {
        const response = await extra.api.get<AppComment[]>('/comments', {
            params: {
                articleId,
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
});
