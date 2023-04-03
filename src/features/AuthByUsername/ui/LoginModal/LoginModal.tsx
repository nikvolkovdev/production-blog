import { memo } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const {
        onClose,
        isOpen,
    } = props;

    return (
        <Modal onClose={onClose} isOpen={isOpen} lazy>
            <LoginForm />
        </Modal>

    );
});
