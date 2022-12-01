import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const secret1 = await prisma.secret.upsert({
        where: {
            ownerId_name: {
                name: "secret1",
                ownerId: "clb1s2d550000nccdavxc3dp3",
            },
        },
        update: {},
        create: {
            name: "secret1",
            value: "1234",
            owner: {
                connect: {
                    id: "clb1s2d550000nccdavxc3dp3",
                },
            },
        },
    });
    const secret2 = await prisma.secret.upsert({
        where: {
            ownerId_name: {
                name: "secret2",
                ownerId: "clb1s2d550000nccdavxc3dp3",
            },
        },
        update: {},
        create: {
            name: "secret2",
            value: "5678",
            owner: {
                connect: {
                    id: "clb1s2d550000nccdavxc3dp3",
                },
            },
        },
    });
    const secret3 = await prisma.secret.upsert({
        where: {
            ownerId_name: {
                name: "secret3",
                ownerId: "clb1s2d550000nccdavxc3dp3",
            },
        },
        update: {},
        create: {
            name: "secret3",
            value: "abcde",
            owner: {
                connect: {
                    id: "clb1s2d550000nccdavxc3dp3",
                },
            },
        },
    });
    const secret4 = await prisma.secret.upsert({
        where: {
            ownerId_name: {
                name: "secret4",
                ownerId: "clb1s2d550000nccdavxc3dp3",
            },
        },
        update: {},
        create: {
            name: "secret4",
            value: "fghij",
            owner: {
                connect: {
                    id: "clb1s2d550000nccdavxc3dp3",
                },
            },
        },
    });
    console.log({ secret1, secret2, secret3, secret4 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
