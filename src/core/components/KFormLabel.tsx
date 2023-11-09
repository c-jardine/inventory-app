import { Circle, FormLabel, type FormLabelProps } from '@chakra-ui/react';

export default function KFormLabel(props: FormLabelProps) {
  return (
    <FormLabel
      display='flex'
      gap={2}
      alignItems='center'
      letterSpacing='wide'
      requiredIndicator={<Circle size={1} bg='red.500' />}
      {...props}
    />
  );
}
