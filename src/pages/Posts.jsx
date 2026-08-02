import { useAuthors, usePosts } from "@/hooks/useBlogData";

export default function Posts() {
    const { data: posts, postsLoading, isError, error } = usePosts();
    const { data: authors, isLoading: authorsLoading } = useAuthors();

    const isLoading = postsLoading || authorsLoading;

    if (isLoading) return <div className="text-center p-8 text-zinc-500">Loading posts...</div>;
    if (isError) return <div className="text-center p-8 text-red-500 font-medium">{error.message || "Failed to load posts"}</div>;
    
    const getAuthorName = (authorId) => {
        if (!authors) return "Unknown Author";
        const author = authors.find((a) => a.id === authorId);
        return author ? author.username : "Unknown Author";
    };

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
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        by <span className="text-blue-600 dark:text-blue-400">{getAuthorName(post.authorId)}</span>
                    </div>
                    </article>
                ))}
                </div>
            )}
            </div>
    )
}
