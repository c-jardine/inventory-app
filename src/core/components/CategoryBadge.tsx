import { api } from '@/utils/api';
import {
  Badge,
  Circle,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  useToken,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Category } from '@prisma/client';
import { IconCheck } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getTextColor } from '../helpers';
import KFormLabel from './KFormLabel';

const colors = [
  'gray.100',
  'gray.200',
  'gray.300',
  'gray.400',
  'gray.500',
  'gray.600',
  'gray.700',
  'gray.800',
  'gray.900',
  'red.100',
  'red.200',
  'red.300',
  'red.400',
  'red.500',
  'red.600',
  'red.700',
  'red.800',
  'red.900',
  'orange.100',
  'orange.200',
  'orange.300',
  'orange.400',
  'orange.500',
  'orange.600',
  'orange.700',
  'orange.800',
  'orange.900',
  'yellow.100',
  'yellow.200',
  'yellow.300',
  'yellow.400',
  'yellow.500',
  'yellow.600',
  'yellow.700',
  'yellow.800',
  'yellow.900',
  'green.100',
  'green.200',
  'green.300',
  'green.400',
  'green.500',
  'green.600',
  'green.700',
  'green.800',
  'green.900',
  'teal.100',
  'teal.200',
  'teal.300',
  'teal.400',
  'teal.500',
  'teal.600',
  'teal.700',
  'teal.800',
  'teal.900',
  'blue.100',
  'blue.200',
  'blue.300',
  'blue.400',
  'blue.500',
  'blue.600',
  'blue.700',
  'blue.800',
  'blue.900',
  'cyan.100',
  'cyan.200',
  'cyan.300',
  'cyan.400',
  'cyan.500',
  'cyan.600',
  'cyan.700',
  'cyan.800',
  'cyan.900',
  'purple.100',
  'purple.200',
  'purple.300',
  'purple.400',
  'purple.500',
  'purple.600',
  'purple.700',
  'purple.800',
  'purple.900',
  'pink.100',
  'pink.200',
  'pink.300',
  'pink.400',
  'pink.500',
  'pink.600',
  'pink.700',
  'pink.800',
  'pink.900',
];

const schema = z.object({
  name: z.string(),
});

export default function CategoryBadge(props: Category) {
  const [textColor] = useToken('colors', [props.color]);

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: props.name,
    },
    resolver: zodResolver(schema),
  });

  const utils = api.useUtils();
  const query = api.category.update.useMutation({
    onSuccess: async (data) => {
      await utils.material.getAll.invalidate();
      await utils.materialStockLog.getAllByMaterial.invalidate();
      await utils.category.getBySlug.invalidate();
      await utils.category.getAll.invalidate();
      form.reset({ name: data.name }, { keepDirty: false });
    },
  });

  function updateName(data: z.infer<typeof schema>) {
    query.mutate({ ...data, id: props.id, color: props.color });
  }

  function updateColor(color: string) {
    query.mutate({ ...props, color: color });
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          as='button'
          bg={props.color}
          color={getTextColor(textColor)}
          fontWeight='normal'
          px={2}
          py={1}
          fontSize='2xs'
          rounded='lg'
          cursor='pointer'
          transition='200ms ease'
          _hover={{
            filter: 'brightness(110%)',
          }}
        >
          {props.name}
        </Badge>
      </PopoverTrigger>
      <PopoverContent w={{ base: '100vw', sm: 'xs' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader py={4} fontSize='md'>
          Edit category
        </PopoverHeader>
        <PopoverBody>
          <form
            id='test'
            onSubmit={form.handleSubmit(updateName, (data) =>
              console.error(data)
            )}
          >
            <FormControl>
              <KFormLabel>Name</KFormLabel>
              <Flex alignItems='center' gap={2}>
                <Input {...form.register('name')} />
                <IconButton
                  icon={<Icon as={IconCheck} aria-label='Save category name' />}
                  aria-label='Save category name'
                  type='submit'
                  form='test'
                  px={0}
                  isDisabled={!form.formState.isDirty}
                  colorScheme={form.formState.isDirty ? 'green' : 'gray'}
                />
              </Flex>
            </FormControl>
          </form>
          <SimpleGrid mt={4} columns={9} justifyContent='center' gap={2}>
            {colors.map((color) => (
              <Circle
                as='button'
                aria-label={`Select color: ${color}`}
                key={color}
                size={6}
                bg={color}
                outline={color === props.color ? '2px solid black' : 'none'}
                outlineOffset='1px'
                cursor='pointer'
                transition='200ms ease'
                onClick={() => updateColor(color)}
                _hover={{
                  outlineColor: 'black',
                }}
                _focus={{
                  outlineColor: 'black',
                }}
              />
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
