import "dotenv/config";
import { createAuthClient } from "better-auth/react";
import {
    inferOrgAdditionalFields,
    organizationClient,
} from "better-auth/client/plugins";
import { Auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [organizationClient({ schema: inferOrgAdditionalFields<Auth>() })],
});
