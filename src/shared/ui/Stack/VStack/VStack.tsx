import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
    const { align = 'start', children, ...otherProps } = props;

    return (
        // @ts-ignore
        <Flex direction="column" align={align} {...otherProps}>
            {children}
        </Flex>
    );
};
