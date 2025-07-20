"use client";
import { Plus } from "lucide-react";

import { columns, Payment } from "./columns";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts</CardTitle>
          <Button
            size={"sm"}
            className="w-full lg:w-fit"
            onClick={newAccount.onOpen}
          >
            <Plus className="size-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountsPage;
