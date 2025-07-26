import { useState, JSX, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAccounts } from "../api/use-get-accounts";
import { useCreateAccount } from "../api/use-create-account";
import { Select } from "@/components/select";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const accountsQuery = useGetAccounts();
  const accountsMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountsMutation.mutate({ name });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string | undefined>(undefined);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onChange={(value) => (selectValue.current = value)}
          onCreate={onCreateAccount}
          disabled={accountsQuery.isLoading || accountsMutation.isPending}
        />
        <DialogFooter>
          <Button variant={"outline"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm] as const;
};
