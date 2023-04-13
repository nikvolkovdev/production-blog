import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/getArticlesPageLimit';
import { getArticlesPageSort } from 'pages/ArticlesPage/model/selectors/getArticlesPageSort';
import { getArticlesPageOrder } from 'pages/ArticlesPage/model/selectors/getArticlesPageOrder';
import { getArticlesPageSearch } from 'pages/ArticlesPage/model/selectors/getArticlesPageSearch';
import { getArticlesPageNumber } from 'pages/ArticlesPage/model/selectors/getArticlesPageNumber';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getArticlesPageType } from 'pages/ArticlesPage/model/selectors/getArticlesPageType';
import { ArticleType } from 'entities/Article/model/types/article';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const limit = getArticlesPageLimit(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNumber(getState());
        const type = getArticlesPageType(getState());

        try {
            addQueryParams({
                sort, order, search, type,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    // аргумент q - поиск из документации json-сервера
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
