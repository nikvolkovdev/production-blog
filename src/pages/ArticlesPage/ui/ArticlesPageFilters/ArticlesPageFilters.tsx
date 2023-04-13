import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { ArticleSortField, ArticleView, ArticleViewSelector } from 'entities/Article';
import { articlePageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { useSelector } from 'react-redux';
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/getArticlesPageView';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { Card } from 'shared/ui/Card/Card';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types';
import { getArticlesPageSort } from 'pages/ArticlesPage/model/selectors/getArticlesPageSort';
import { getArticlesPageOrder } from 'pages/ArticlesPage/model/selectors/getArticlesPageOrder';
import { getArticlesPageSearch } from 'pages/ArticlesPage/model/selectors/getArticlesPageSearch';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { getArticlesPageType } from 'pages/ArticlesPage/model/selectors/getArticlesPageType';
import { ArticleTypeTabs } from 'entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
        dispatch(articlePageActions.setPage(1));
    }, [dispatch]);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(sort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlePageActions.setOrder(order));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageActions.setType(value));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view || ArticleView.BIG} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <AppInput onChange={onChangeSearch} placeholder="Поиск" value={search} />
            </Card>
            <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
        </div>
    );
});
