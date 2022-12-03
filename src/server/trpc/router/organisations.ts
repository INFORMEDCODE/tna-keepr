import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const organisationsRouter = router({
    listOrganisations: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.organisation.findMany({
            where: {
                ownerId: ctx.session.user.id,
            },
        });
    }),
    getOrganisation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.organisation.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    createOrganisation: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                boxes: z.array(z.object({ id: z.string() })).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            console.log("createOrgMutate", input);

            return await ctx.prisma.organisation.create({
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
                    boxes: {
                        connect: input.boxes,
                    },
                },
            });
        }),
    // check what happens the box when the orgasination says it must be connected; a box should only be in 1 org at a time
    updateOrganisation: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),
                boxes: z.array(z.object({ id: z.string() })).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.organisation.update({
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
                    boxes: {
                        connect: input.boxes,
                    },
                    name: input.name,
                },
            });
        }),
    // check what happens when a delete for an organisation is called
    // does that remove all the connected boxes? locations? items?
    deleteOrganisation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.organisation.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
