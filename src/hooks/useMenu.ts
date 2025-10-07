import { getMenu } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useMenu = () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: getMenu
    })
}