import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';

import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../../ui/ArticlesPageFilters/ArticlesPageFilters';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlePage';
import { articlePageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { AppPage } from '@/widgets/AppPage';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <AppPage
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames('', {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={cls.list} />
                <ArticlePageGreeting />
            </AppPage>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
