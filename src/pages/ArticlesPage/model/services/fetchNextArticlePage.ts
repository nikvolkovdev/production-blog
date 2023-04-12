import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/getArticlesPageLimit';
import { getArticlePageHasMore } from 'pages/ArticlesPage/model/selectors/getArticlePageHasMore';
import { getArticlesPageNumber } from 'pages/ArticlesPage/model/selectors/getArticlesPageNumber';
import { articlePageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { getArticlesPageIsLoading } from 'pages/ArticlesPage/model/selectors/getArticlesPageIsLoading';

interface FetchArticlesListProps {
    page?: number;
}

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlePage/fetchNextArticlesPage',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;
        const hasMore = getArticlePageHasMore(getState());
        const page = getArticlesPageNumber(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlePageActions.setPage(page + 1));
            dispatch(fetchArticlesList({
                page: page + 1,
            }));
        }
    },
);
