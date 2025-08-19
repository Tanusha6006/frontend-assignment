import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" }
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true }
];

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Demo</h1>
      <InputField
        label="Password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter password"
        helperText="At least 8 characters"
        variant="outlined"
        size="md"
      />

      <DataTable data={data} columns={columns} selectable />
    </div>
  );
}
