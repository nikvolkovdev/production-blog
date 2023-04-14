import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { AppText } from 'shared/ui/AppText/AppText';
import { AppIcon } from 'shared/ui/AppIcon/AppIcon';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props;

    const [isHover, bindHover] = useHover();
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(ROUTE_PATH.article_details + article.id);
    }, [article.id, navigate]);

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <AppAvatar size={30} src={article.user.avatar} />
                        <AppText description={article.user.username} className={cls.user} />
                        <AppText description={article.createdAt} className={cls.date} />
                    </div>
                    <AppText title={article.title} className={cls.title} />
                    <AppText description={article.type.join(',')} className={cls.types} />
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={ROUTE_PATH.article_details + article.id}>
                            <AppButton variant={ButtonVariant.OUTLINE}>
                                Читать далее...
                            </AppButton>
                        </AppLink>
                    </div>
                    <AppText description={String(article.views)} className={cls.views} />
                    <AppIcon Svg={EyeIcon} />
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={ROUTE_PATH.article_details + article.id}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            {...bindHover}
        >
            <Card>
                <div className={cls.imageWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />
                    <AppText description={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <AppText description={article.type.join(',')} className={cls.types} />
                    <AppText description={String(article.views)} className={cls.views} />
                    <AppIcon Svg={EyeIcon} />
                </div>
                <AppText description={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
