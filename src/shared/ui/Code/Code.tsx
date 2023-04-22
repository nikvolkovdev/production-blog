import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/code-20-20.svg';
import cls from './Code.module.scss';
import { AppButton, ButtonVariant } from '../AppButton/AppButton';

interface CodeProps {
    className?: string;
    codeText: string;
}

export const Code = memo((props: CodeProps) => {
    const {
        className,
        codeText,
    } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(codeText);
    }, [codeText]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <AppButton onClick={onCopy} className={cls.copyBtn} variant={ButtonVariant.CLEAR}>
                <CopyIcon className={cls.copyIcon} />
            </AppButton>
            <code>
                {codeText}
            </code>
        </pre>
    );
});
