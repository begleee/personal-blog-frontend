import { useQuery } from "@tanstack/react-query";
import { blogServices } from "../services/api";

export default function Posts() {
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: blogServices.getPosts,
    })

    if (isLoading) return <div className="text-center p-8 text-zinc-500">Loading posts...</div>;
    if (isError) return <div className="text-center p-8 text-red-500 font-medium">{error.message || "Failed to load posts"}</div>;
    
    return (
        
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Posts
            </h1>
            
            {posts?.length === 0 ? (
                <p className="text-zinc-500">No posts found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                {posts?.map((post) => (
                    <article 
                    key={post.id} 
                    className="p-5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-sm transition-all hover:shadow-md"
                    >
                    <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                        {post.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                        {post.details}
                    </p>
                    <div className="text-xs text-zinc-400">
                        By Author ID: {post.authorId || "Unknown"} 
                    </div>
                    </article>
                ))}
                </div>
            )}
            </div>
    )
}
