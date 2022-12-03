import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { secretsRouter } from "./secrets";
import { organisationsRouter } from "./organisations";
import { boxesRouter } from "./boxes";
import { itemsRouter } from "./items";
import { locationsRouter } from "./locations";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    secrets: secretsRouter,
    organisations: organisationsRouter,
    boxes: boxesRouter,
    items: itemsRouter,
    locations: locationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
