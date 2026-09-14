import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { organization } from "better-auth/plugins";

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
                        phone: { type: "number", required: true },
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
                        createdAt: "created_at",
                    },
                },
            },
            async sendInvitationEmail(data) {
                await prisma.notification.create({
                    data: {
                        userId: data.email,
                        type: "ORG-INVITE",
                        title: "Organization invitation",
                        message: `You've been invited to ${data.organization.name}`,
                        invitationId: data.invitation.id,
                    },
                });
            },
        }),
    ],
});

export type Auth = typeof auth;
