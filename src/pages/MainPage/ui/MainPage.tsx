import React from 'react';
import { AppPage } from 'widgets/AppPage/AppPage';
import { HStack } from 'shared/ui/Stack';
import { ListBox } from 'shared/ui/ListBox/ListBox';

const MainPage = () => (
    <AppPage>
        <div>dasdas</div>
        <HStack>
            <div>sdasds</div>
            <ListBox
                defaultValue="choose value"
                onChange={(value: string) => {}}
                value={undefined}
                items={[
                    { value: '1', content: 123 },
                    { value: '2', content: 134, disabled: true },
                    { value: '3', content: 234 },
                ]}
            />
        </HStack>
        <div>dasdas</div>
        <div>dasdas</div>
        <div>dasdas</div>
        <div>dasdas</div>
        <div>dasdas</div>
    </AppPage>
);

export default MainPage;
