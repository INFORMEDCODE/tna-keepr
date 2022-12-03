import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const itemsRouter = router({
    listItems: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.organisation.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
        });
    }),
    getItem: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.item.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    createItem: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                box: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.item.create({
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
                    box: {
                        connect: {
                            id: input.box,
                        },
                    },
                },
            });
        }),
    updateItem: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                box: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.item.update({
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
                    box: {
                        connect: {
                            id: input.box,
                        },
                    },
                    name: input.name,
                },
            });
        }),
    // check what happens when a delete for an item is called
    // does that remove all the connected locations? items?
    // does it need have name and ownerId as well so you can only remove items that you own?
    deleteItem: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.item.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
