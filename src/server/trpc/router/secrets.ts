import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const secretsRouter = router({
    // test endpoint for just getting secrets and populating table
    listFavouriteSecrets: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.secret.findMany({
            where: {
                favourite: false,
            },
        });
    }),
    listFavouriteSecretsProtected: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.secret.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
        });
    }),
    // lists all secrets but does not return the secret value
    listSecrets: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.secret.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
            select: {
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }),
    // gets the value of the specified secret
    getSecret: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.secret.findUnique({
                where: {
                    ownerId_name: {
                        ownerId: ctx.session.user.id,
                        name: input.name,
                    },
                },
            });
        }),
    // updates or creates a new secret
    upsertSecret: protectedProcedure
        .input(z.object({ name: z.string(), value: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.secret.upsert({
                where: {
                    ownerId_name: {
                        name: input.name,
                        ownerId: ctx.session.user.id,
                    },
                },
                update: {
                    value: input.value,
                },
                create: {
                    name: input.name,
                    value: input.value,
                    owner: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
        }),
    // deletes a secret
    deleteSecret: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.secret.delete({
                where: {
                    ownerId_name: {
                        name: input.name,
                        ownerId: ctx.session.user.id,
                    },
                },
            });
        }),
});
