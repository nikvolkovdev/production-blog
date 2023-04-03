import React, { useState } from 'react';
import { AppInput } from 'shared/ui/AppInput/AppInput';

const MainPage = () => {
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            Main Page
            <AppInput onChange={onChange} value={value} placeholder="Введите текст: " />
        </div>
    );
};

export default MainPage;
