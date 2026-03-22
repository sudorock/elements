import { HorizontalContextMenu as Component } from '@elements/components/horizontal-context-menu';
import { action } from 'storybook/actions';
import type { StoryObj } from '@storybook/react-vite';

export default {
  title: 'Components/HorizontalContextMenu',
  component: Component,
};

type Story = StoryObj<typeof Component>;

const items = [
  { label: 'Edit', onClick: action('Edit clicked') },
  { label: 'Delete', onClick: action('Delete clicked') },
  { label: 'Share', onClick: action('Share clicked') },
];

export const DotsOnly: Story = {
  args: {
    dotsOnly: true,
    items,
    size: 'md',
  },
};

export const Button: Story = {
  args: {
    dotsOnly: false,
    items,
    size: 'md',
  },
};

export const AllSizes: Story = {
  args: {
    dotsOnly: true,
    items,
  },
  render: (args) => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <Component {...args} size='md' />
        <span className='text-xs text-gray-500'>md</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Component {...args} size='s' />
        <span className='text-xs text-gray-500'>s</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Component {...args} size='xs' />
        <span className='text-xs text-gray-500'>xs</span>
      </div>
    </div>
  ),
};
