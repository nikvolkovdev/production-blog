import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import cls from './AppPage.module.scss';

interface AppPageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void
}

export const AppPage = memo((props: AppPageProps) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.AppPage, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
