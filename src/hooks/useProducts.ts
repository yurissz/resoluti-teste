import { getProductData } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useProducts = (filters?: { produto?: string }) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => getProductData(filters)
    })
}