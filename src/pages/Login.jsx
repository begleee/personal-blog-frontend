// src/pages/Login.jsx
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { KeyRound } from "lucide-react";

import { 
  Field, 
  FieldLabel, 
  FieldDescription, 
  FieldError, 
  FieldGroup, 
  FieldSet 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state.auth);

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center space-y-2 text-center mb-6">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
          <KeyRound className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Welcome back</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Enter your credentials to access your writer dashboard</p>
      </div>

      {authError && (
        <div className="p-3 mb-4 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900">
          {authError}
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          
          <FieldGroup>
            
            <Controller
              name="email"
              control={methods.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input 
                    id="email"
                    placeholder="name@example.com" 
                    type="email" 
                    {...field} 
                  />
                  {/* Pass the field error down directly */}
                  <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={methods.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input 
                    id="password"
                    placeholder="••••••••" 
                    type="password" 
                    {...field} 
                  />
                  <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                </Field>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
}