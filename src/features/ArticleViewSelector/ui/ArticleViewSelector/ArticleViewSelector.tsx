import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton';
import { AppIcon } from '@/shared/ui/AppIcon';
import PlateIcon from '@/shared/assets/icons/plate.svg';
import FullPlateIcon from '@/shared/assets/icons/full-plate.svg';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: PlateIcon,
    },
    {
        view: ArticleView.BIG,
        icon: FullPlateIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick,
    } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <AppButton
                    variant={ButtonVariant.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <AppIcon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                    />
                </AppButton>
            ))}
        </div>
    );
});
