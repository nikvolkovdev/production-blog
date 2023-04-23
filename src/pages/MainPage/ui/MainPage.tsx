import React from 'react';
import { AppPage } from '@/widgets/AppPage/AppPage';
import { RatingCard } from '@/entities/Rating';

const MainPage = () => (
    <AppPage>
        <RatingCard title="Ваш фидбек" feedbackTitle="Оставьте отзыв о статье" />
    </AppPage>
);

export default MainPage;
