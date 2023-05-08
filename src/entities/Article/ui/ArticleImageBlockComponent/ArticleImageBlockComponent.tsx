import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppText, TextAlign } from '@/shared/ui/AppText';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img
                src={block.src}
                className={cls.img}
                alt={block?.title}
            />
            {block.title && (
                <AppText
                    description={block.title}
                    align={TextAlign.CENTER}
                />
            )}
        </div>
    );
});
