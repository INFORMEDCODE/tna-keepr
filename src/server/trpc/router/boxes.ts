import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const boxesRouter = router({
    listBoxes: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.organisation.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
        });
    }),
    getBox: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.box.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    createBox: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                items: z.array(z.object({ id: z.string() })).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.box.create({
                data: {
                    name: input.name,
                    description: input.description,
                    owner: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                    location: {
                        connect: input.location
                            ? { id: input.location }
                            : undefined,
                    },
                    items: {
                        connect: input.items,
                    },
                },
            });
        }),
    updateBox: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                items: z.array(z.object({ id: z.string() })).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.box.update({
                where: {
                    id: input.id,
                },
                data: {
                    description: input.description,
                    location: {
                        connect: input.location
                            ? { id: input.location }
                            : undefined,
                    },
                    items: {
                        connect: input.items,
                    },
                    name: input.name,
                },
            });
        }),
    // check what happens when a delete for an box is called
    // does that remove all the connected locations? items?
    deleteBox: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.box.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
