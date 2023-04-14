import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {
        className,
    } = props;

    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(ROUTE_PATH.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${ROUTE_PATH.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <AppButton variant={ButtonVariant.OUTLINE} onClick={onBackToList}>
                Назад к списку
            </AppButton>
            {canEdit && (
                <AppButton
                    className={cls.editBtn}
                    variant={ButtonVariant.OUTLINE}
                    onClick={onEditArticle}
                >
                    Редактировать
                </AppButton>
            )}
        </div>
    );
});
