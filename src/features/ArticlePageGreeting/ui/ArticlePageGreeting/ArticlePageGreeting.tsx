import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { AppText } from '@/shared/ui/AppText';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlePageGreeting = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlePageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
        }
    }, [dispatch, isArticlePageWasOpened]);

    const onClose = () => {
        setIsOpen(false);
    };

    const text = (
        <AppText
            title="Добро пожаловать на страницу статей"
            description="Здесь вы можете искать и просматривать статьи"
        />
    );

    if (isMobile) {
        return (
            <Drawer
                lazy
                isOpen={isOpen}
                onClose={onClose}
            >
                {text}
            </Drawer>
        );
    }

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className=""
        >
            {text}
        </Modal>
    );
});
