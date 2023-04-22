import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticleList } from '@/entities/Article';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView';
import { getArticlesPageNumber } from '../../model/selectors/getArticlesPageNumber';
import { getArticlePageHasMore } from '../../model/selectors/getArticlePageHasMore';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
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

    if (error) {
        return <div>Нет статей</div>;
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    );
});
