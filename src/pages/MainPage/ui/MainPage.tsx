import React from 'react';

import { RatingCard } from '@/entities/Rating';
import { AppPage } from '@/widgets/AppPage';

const MainPage = () => (
    <AppPage data-testid="MainPage">
        <RatingCard
            title="Ваш фидбек"
            feedbackTitle="Оставьте отзыв о статье"
        />
    </AppPage>
);

export default MainPage;
