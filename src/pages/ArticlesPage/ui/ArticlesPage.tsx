import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useSelector } from 'react-redux';
import { getArticlesPageError } from '../model/selectors/getArticlesPageError';
import { getArticlesPageView } from '../model/selectors/getArticlesPageView';
import { getArticlesPageIsLoading } from '../model/selectors/getArticlesPageIsLoading';
import { articlePageActions, articlePageReducer, getArticles } from '../model/slices/articlesPageSlice';

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

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlePageActions.initState());
    });

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames('', {}, [className])}>
                <ArticleViewSelector view={view || ArticleView.BIG} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
