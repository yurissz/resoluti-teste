import { getClientsData } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useClients = (filters: { nome?: string; status?: string }) => {
    return useQuery({
        queryKey: ["clients", filters],
        queryFn: () => getClientsData(filters),
    });
};