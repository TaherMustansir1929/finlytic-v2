import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetOneCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["one-category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category with id: ${id}`);
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
