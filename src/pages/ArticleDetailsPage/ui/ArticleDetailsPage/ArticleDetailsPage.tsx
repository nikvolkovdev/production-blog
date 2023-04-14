import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails, getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { AppText, TextSize } from 'shared/ui/AppText/AppText';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';

import {
    addCommentForArticle,
} from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { AddNewCommentForm } from 'features/addNewComment';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { AppPage } from 'widgets/AppPage/AppPage';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slices/articleDetailsRecommendationSlice';
import {
    getArticleRecommendationsError,
    getArticleRecommendationsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/getRecommendationsState';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    fetchArticleRecommendations,
} from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import {
    ArticleDetailsPageHeader,
} from 'pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsIsLoading);
    const commentsError = useSelector(getArticleDetailsError);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const recommendationsError = useSelector(getArticleRecommendationsError);
    const navigate = useNavigate();

    const onSendComment = useCallback((commentText: string) => {
        dispatch(addCommentForArticle(commentText));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(ROUTE_PATH.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                Статья не найдена
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <AppPage className={classNames('', {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id || ''} />
                {!commentsError && (
                    <>
                        <AppText size={TextSize.L} className={cls.commentTitle} title="Рекомендуем" />
                        <ArticleList
                            articles={recommendations}
                            isLoading={recommendationsIsLoading}
                            className={cls.recommendations}
                            target="_blank"
                        />
                        <AppText size={TextSize.L} className={cls.commentTitle} title="Комментарии" />
                        <AddNewCommentForm onSendComment={onSendComment} />
                        <CommentList
                            isLoading={commentsIsLoading}
                            comments={comments}
                        />
                    </>
                )}

            </AppPage>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
