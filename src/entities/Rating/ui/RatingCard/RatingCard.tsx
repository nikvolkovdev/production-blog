import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppText } from '@/shared/ui/AppText/AppText';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { AppInput } from '@/shared/ui/AppInput/AppInput';
import { AppButton, ButtonSize, ButtonVariant } from '@/shared/ui/AppButton/AppButton';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className, title, feedbackTitle, hasFeedback = true, onCancel, onAccept,
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <AppText title={feedbackTitle} />
            <AppInput placeholder="Ваш отзыв" value={feedback} onChange={setFeedback} />
        </>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap="8">
                <AppText title={title} />
                <StarRating size={40} onSelect={onSelectStars} />

                <BrowserView>
                    <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
                        <VStack max gap="32">
                            {modalContent}
                            <HStack max gap="16" justify="end">
                                <AppButton onClick={acceptHandler} variant={ButtonVariant.OUTLINE}>
                                    Отправить
                                </AppButton>
                                <AppButton onClick={cancelHandler} variant={ButtonVariant.OUTLINE_RED}>
                                    Закрыть
                                </AppButton>
                            </HStack>
                        </VStack>
                    </Modal>
                </BrowserView>

                <MobileView>
                    <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
                        <VStack gap="32">
                            {modalContent}
                            <AppButton onClick={acceptHandler} size={ButtonSize.L} fullWidth>
                                Отправить
                            </AppButton>
                        </VStack>

                    </Drawer>
                </MobileView>

            </VStack>
        </Card>
    );
});
