import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    memo, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Overlay } from 'shared/Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);

    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const timeRef = useRef<ReturnType<typeof setTimeout>>() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const [isMounted, setIsMounted] = useState(false);

    // const onContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    const onCloseModal = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, 300);
        }
    }, [onClose]);

    const onEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCloseModal();
        }
    }, [onCloseModal]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onEscape);
        }

        return () => {
            window.removeEventListener('keydown', onEscape);
            clearTimeout(timeRef.current);
        };
    }, [isOpen, onEscape]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={onCloseModal} />
                {/* <div className={cls.content} onClick={onContentClick}> */}
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
