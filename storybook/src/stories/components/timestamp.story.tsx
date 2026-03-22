import { Timestamp as Component } from '@elements/components/timestamp';
import type { StoryObj } from '@storybook/react-vite';

export default {
  title: 'Components/Timestamp',
  component: Component,
};

type Story = StoryObj<typeof Component>;

const recentTimestamp = Date.now() - 5 * 60 * 1000;
const lastWeekTimestamp = Date.now() - 7 * 24 * 60 * 60 * 1000;
const oldTimestamp = Date.now() - 60 * 24 * 60 * 60 * 1000;

export const Recent: Story = {
  args: {
    timestamp: recentTimestamp,
    className: 'text-sm text-gray-700',
  },
};

export const WithPrefix: Story = {
  args: {
    timestamp: recentTimestamp,
    className: 'text-sm text-gray-700',
    prefix: 'Updated',
  },
};

export const LastWeek: Story = {
  args: {
    timestamp: lastWeekTimestamp,
    className: 'text-sm text-gray-700',
  },
};

export const OldTimestamp: Story = {
  args: {
    timestamp: oldTimestamp,
    className: 'text-sm text-gray-700',
  },
};

export const RelativeMode: Story = {
  args: {
    timestamp: recentTimestamp,
    className: 'text-sm text-gray-700',
    relative: true,
  },
};

export const RelativeModeWithPrefix: Story = {
  args: {
    timestamp: lastWeekTimestamp,
    className: 'text-sm text-gray-700',
    relative: true,
    prefix: 'Last active',
  },
};
