import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

/** Переиспользуемый хук для модальных компонентов drawer/modal
 *
 * @param props
 */

export function useModal(props: UseModalProps) {
    const { onClose, isOpen, animationDelay } = props;

    const timeRef = useRef<ReturnType<typeof setTimeout>>() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // const onContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    // const onContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

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

    return {
        isClosing,
        isMounted,
        close,
    };
}
