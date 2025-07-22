import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({
        json,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categories deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // TODO: Also invalidate summary
    },
    onError: (err) => {
      toast.error("Failed to delete categories");
      console.error("Error deleting categories:", err);
    },
  });

  return mutation;
};
