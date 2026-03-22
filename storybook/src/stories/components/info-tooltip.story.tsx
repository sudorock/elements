import { WithInfoTooltip as Component } from '@elements/components/info-tooltip';
import type { StoryObj } from '@storybook/react-vite';

export default {
  title: 'Components/WithInfoTooltip',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const WithText: Story = {
  args: {
    text: 'This is helpful information that appears when you hover over the content.',
    children: <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover over me</button>,
  },
};

export const WithoutText: Story = {
  args: {
    text: undefined,
    children: <button className="px-4 py-2 bg-gray-500 text-white rounded">No tooltip</button>,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a longer tooltip text that provides more detailed information about the feature or action. It can span multiple lines and help users understand complex functionality.',
    children: <button className="px-4 py-2 bg-green-500 text-white rounded">Hover for details</button>,
  },
};

export const WithTextElement: Story = {
  args: {
    text: 'Additional context about this text',
    children: <span className="text-gray-700 font-medium">Some text with tooltip</span>,
  },
};

export const WithIcon: Story = {
  args: {
    text: 'This icon has a tooltip',
    children: (
      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};
