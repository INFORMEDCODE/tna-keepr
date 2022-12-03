import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const locationsRouter = router({
    listLocations: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.location.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
        });
    }),
    getLocation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.location.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    createLocation: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.location.create({
                data: {
                    name: input.name,
                    description: input.description,
                    owner: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
        }),
    updateLocation: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.location.update({
                where: {
                    id: input.id,
                },
                data: {
                    description: input.description,
                    name: input.name,
                },
            });
        }),
    deleteLocation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.location.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
