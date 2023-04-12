import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails, getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { AppText } from 'shared/ui/AppText/AppText';
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
import { AppPage } from 'shared/ui/AppPage/AppPage';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const navigate = useNavigate();

    const onSendComment = useCallback((commentText: string) => {
        dispatch(addCommentForArticle(commentText));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(ROUTE_PATH.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
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
                <AppButton variant={ButtonVariant.OUTLINE} onClick={onBackToList}>
                    Назад к списку
                </AppButton>
                <ArticleDetails id={id || ''} />
                {!error && (
                    <>
                        <AppText className={cls.commentTitle} title="Комментарии" />
                        <AddNewCommentForm onSendComment={onSendComment} />
                        <CommentList
                            isLoading={isLoading}
                            comments={comments}
                        />
                    </>
                )}

            </AppPage>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
