import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { useSelector } from 'react-redux';
import { AppPage } from 'widgets/AppPage/AppPage';
import { getArticlesPageNumber } from 'pages/ArticlesPage/model/selectors/getArticlesPageNumber';
import { getArticlePageHasMore } from 'pages/ArticlesPage/model/selectors/getArticlePageHasMore';
import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading';
import { articlePageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const page = useSelector(getArticlesPageNumber);
    const hasMore = useSelector(getArticlePageHasMore);
    const [searchParams, setSearchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <AppPage onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.list}
                />
            </AppPage>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
