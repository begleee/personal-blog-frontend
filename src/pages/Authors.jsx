import { blogServices } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export default function Authors() {
    const { data: authors, isLoading, isError } = useQuery({
        queryKey: ["authors"],
        queryFn: blogServices.getAuthors,
    })

    if (isLoading) return <div className="text-center p-8 text-zinc-500">Loading creators...</div>;
    if (isError) return <div className="text-center p-8 text-red-500 font-medium">Failed to load authors.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Authors
            </h1>

            {authors?.length === 0 ? (
                <p className="text-zinc-500">No authors discovered yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                {authors?.map((author) => (
                    <div 
                    key={author.id} 
                    className="flex items-center gap-3 p-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                    >
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold uppercase">
                        {author.username?.charAt(0) || "A"}
                    </div>
                    <div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{author.username}</div>
                        <div className="text-xs text-zinc-500">{author.email || "@username"}</div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
    )
}
