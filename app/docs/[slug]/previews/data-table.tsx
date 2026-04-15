"use client";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

type Person = { id: number; name: string; email: string; role: string };

const PEOPLE: Person[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "Editor" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", role: "Admin" },
  { id: 4, name: "Linus Torvalds", email: "linus@example.com", role: "Viewer" },
  { id: 5, name: "Margaret Hamilton", email: "margaret@example.com", role: "Editor" },
];

const columns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { key: "email", header: "Email", accessor: (r) => r.email, sortable: true },
  { key: "role", header: "Role", accessor: (r) => r.role, sortable: true },
];

export default function DataTablePreview() {
  return <DataTable columns={columns} data={PEOPLE} filterKey="name" filterPlaceholder="Filter names..." pageSize={3} />;
}
