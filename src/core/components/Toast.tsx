import {
  Box,
  Text,
  type ToastProviderProps,
  type UseToastOptions,
} from '@chakra-ui/react';

export const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: 'bottom-right',
    render: (props) => <Toast {...props} />,
  },
};

export default function Toast(props: UseToastOptions) {
  return (
    <Box p={4} rounded='sm' borderWidth={1} shadow='lg' bg='white'>
      <Text fontWeight='semibold'>{props.title}</Text>
      <Text fontSize='sm' color='gray.600'>
        {props.description}
      </Text>
    </Box>
  );
}
