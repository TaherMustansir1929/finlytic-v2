import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Invalidate summary
    },
    onError: (err) => {
      toast.error("Failed to create transaction");
      console.error("Error creating transaction:", err);
    },
  });

  return mutation;
};
