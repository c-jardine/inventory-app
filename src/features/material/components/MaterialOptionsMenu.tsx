import { type AppRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { type inferRouterOutputs } from '@trpc/server';

export default function MaterialOptionsMenu(
  props: inferRouterOutputs<AppRouter>['material']['getAll'][0]
) {
  const deleteQuery = api.material.delete.useMutation();

  function onDelete() {
    if (confirm(`Are you sure you want to delete ${props.name}?`)) {
      deleteQuery.mutate({ id: props.id });
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} variant='outline' w='fit-content'>
        <Icon as={IconDots} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={onDelete}
          icon={<Icon as={IconTrash} w={4} h={4} />}
          color='red.500'
          fontSize='sm'
        >
          Delete material
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
