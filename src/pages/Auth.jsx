import { Button } from "@/components/ui/button";

export default function Auth() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Auth
      </h1>
      <div className="flex flex-col items-center justify-between gap-10">
        <div className="flex flex-col items-center justify-between">
          <Button>
            Login
          </Button>
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <p>Didn't registrate yet?</p>
          <Button>
            Registrate
          </Button>
        </div>
      </div>
    </div>
  )
}
