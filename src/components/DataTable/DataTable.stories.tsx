import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: {
    data,
    columns,
    selectable: true,
  },
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};
export const Loading: Story = {
  args: { loading: true },
};
export const Empty: Story = {
  args: { data: [] },
};
