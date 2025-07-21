import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetOneAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["one-account", { id }],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch account with id: ${id}`);
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
