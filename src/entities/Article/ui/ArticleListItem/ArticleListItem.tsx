import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppText } from '@/shared/ui/AppText';
import { AppIcon } from '@/shared/ui/AppIcon';
import { Card } from '@/shared/ui/Card';
import { useHover } from '@/shared/lib/hooks/useHover';
import { AppAvatar } from '@/shared/ui/AppAvatar';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton';
import { AppLink } from '@/shared/ui/AppLink';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    const [isHover, bindHover] = useHover();
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(getRouteArticleDetails(article.id));
    }, [article.id, navigate]);

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <Card>
                    <div className={cls.header}>
                        <AppAvatar
                            size={30}
                            src={article.user.avatar}
                        />
                        <AppText
                            description={article.user.username}
                            className={cls.user}
                        />
                        <AppText
                            description={article.createdAt}
                            className={cls.date}
                        />
                    </div>
                    <AppText
                        title={article.title}
                        className={cls.title}
                    />
                    <AppText
                        description={article.type.join(',')}
                        className={cls.types}
                    />
                    <AppImage
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                        fallback={
                            <Skeleton
                                width="100%"
                                height={250}
                            />
                        }
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={getRouteArticleDetails(article.id)}>
                            <AppButton variant={ButtonVariant.OUTLINE}>Читать далее...</AppButton>
                        </AppLink>
                    </div>
                    <AppText
                        description={String(article.views)}
                        className={cls.views}
                    />
                    <AppIcon Svg={EyeIcon} />
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            {...bindHover}
        >
            <Card>
                <div className={cls.imageWrapper}>
                    <AppImage
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                        fallback={
                            <Skeleton
                                width={200}
                                height={200}
                            />
                        }
                    />
                    <AppText
                        description={article.createdAt}
                        className={cls.date}
                    />
                </div>
                <div className={cls.infoWrapper}>
                    <AppText
                        description={article.type.join(',')}
                        className={cls.types}
                    />
                    <AppText
                        description={String(article.views)}
                        className={cls.views}
                    />
                    <AppIcon Svg={EyeIcon} />
                </div>
                <AppText
                    description={article.title}
                    className={cls.title}
                />
            </Card>
        </AppLink>
    );
});
