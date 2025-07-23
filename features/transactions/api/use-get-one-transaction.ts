import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetOneTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["one-transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transaction with id: ${id}`);
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
