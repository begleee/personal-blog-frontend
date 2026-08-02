import { useQuery } from "@tanstack/react-query";
import { blogServices } from "@/services/api";

export function usePosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: blogServices.getPosts,
    })
}

export function useAuthors() {
    return useQuery({
        queryKey: ["authors"],
        queryFn: blogServices.getAuthors,
    })
}
