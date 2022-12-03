import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const org1 = await prisma.organisation.create({
        data: {
            name: "Org 1",
            owner: {
                connect: {
                    id: "claxacttc000bkjheafdv2vda",
                },
            },
        },
    });
    const org2 = await prisma.organisation.create({
        data: {
            name: "Org 2",
            location: {
                connect: undefined,
            },
            owner: {
                connect: {
                    id: "claxacttc000bkjheafdv2vda",
                },
            },
        },
    });
    const org3 = await prisma.organisation.create({
        data: {
            name: "Org 3",
            location: {
                connect: {
                    id: "clb65rlil0000kjo96rpgeuq6",
                },
            },
            owner: {
                connect: {
                    id: "claxacttc000bkjheafdv2vda",
                },
            },
        },
    });

    console.log(org1, org2, org3);
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
