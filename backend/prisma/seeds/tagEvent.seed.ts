import { Prisma } from "@prisma/client";


const tagEvents = [
    { tag_event_name: "Birthday" },
    { tag_event_name: "Anniversary" },
    { tag_event_name: "Congratulations" },
    { tag_event_name: "Thank You" },
    { tag_event_name: "Sympathy" },
    { tag_event_name: "Graduation" },
    { tag_event_name: "Holiday" },
    { tag_event_name: "Wedding" },
    { tag_event_name: "New Year" },
    { tag_event_name: "Valentine's Day" },
];


export const seedTagEvents = async (prisma: Prisma.TransactionClient) => {
    await prisma.tagEvent.createMany({
        data: tagEvents,
        skipDuplicates: true,
    });
}