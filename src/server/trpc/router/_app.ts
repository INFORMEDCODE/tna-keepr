import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { secretsRouter } from "./secrets";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    secrets: secretsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
