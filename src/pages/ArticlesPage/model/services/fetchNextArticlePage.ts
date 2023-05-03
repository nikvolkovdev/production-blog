import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlePageHasMore } from '../../model/selectors/getArticlePageHasMore';
import { getArticlesPageNumber } from '../../model/selectors/getArticlesPageNumber';
import { articlePageActions } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading';

interface FetchArticlesListProps {}

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (props, thunkAPI) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkAPI;
    const hasMore = getArticlePageHasMore(getState());
    const page = getArticlesPageNumber(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(articlePageActions.setPage(page + 1));
        dispatch(fetchArticlesList({}));
    }
});
