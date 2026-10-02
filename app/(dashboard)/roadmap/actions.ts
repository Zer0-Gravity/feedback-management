"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getTotalCounts() {
    const session = await auth.api.getOrganization({
        headers: await headers(),
    });

    const data = await prisma.post.groupBy({
        by: ["status"],
        where: { company_id: session?.id },
        _count: { _all: true },
    });

    //Set empty object
    const counts: Record<string, number> = {};
    let all = 0;

    //Group data by status count
    for (const d of data) {
        counts[d.status] = d._count._all;
        all += d._count._all; //Add all data to all variable
    }

    //Set status all to all counted data
    counts["All"] = all;

    return counts;
}
