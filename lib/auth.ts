import "dotenv/config";
import { betterAuth, email } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { organization } from "better-auth/client";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [
        organization({
            schema: {
                organization: {
                    modelName: "Company",
                    fields: {
                        name: "name",
                        slug: "slug",
                        logo: "logo",
                        createdAt: "created_at",
                    },
                    additionalFields: {
                        email: { type: "string", required: true },
                        address: { type: "string", required: true },
                    },
                },
                member: {
                    modelName: "Membership",
                    fields: {
                        id: "id",
                        userId: "user_id",
                        organizationId: "company_id",
                        role: "user_role",
                    },
                },
            },
        }),
    ],
});
