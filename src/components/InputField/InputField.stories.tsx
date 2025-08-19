import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Password",
    placeholder: "Enter password",
    helperText: "At least 8 characters",
    variant: "outlined",
    size: "md",
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};
export const Invalid: Story = {
  args: { invalid: true, errorMessage: "This field is required" },
};
export const Disabled: Story = {
  args: { disabled: true },
};
