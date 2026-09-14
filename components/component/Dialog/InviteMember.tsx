"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface FormDataInvite {
    email: string;
}

const schema = yup
    .object({
        email: yup.string().email("Invalid email address").required(),
    })
    .required();

function InviteMember() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const isOpen = searchParams.get("invite-member") === "true";

    const handleClose = () => {
        router.push("?", { scroll: false });
    };

    const handleInviteMember = async (data: FormDataInvite) => {
        const session = await authClient.useActiveOrganization(); //Get the organization ID

        // Send the invitation
        const { error } = await authClient.organization.inviteMember({
            email: data.email,
            organizationId: session.data?.id,
            role: "member",
        });

        //Throw error if exist
        if (error) {
            toast.error(error.message as string);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary-text">
                        Invite Member
                    </DialogTitle>
                    <DialogDescription className="text-secondary-text">
                        Input an email and send the invitation
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="space-y-3 text-primary-text"
                    onSubmit={handleSubmit(handleInviteMember)}
                >
                    <div className="space-y-2">
                        <input
                            type="email"
                            {...register("email")}
                            className="input-field"
                            placeholder="Type email.."
                        />
                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-2 py-1 bg-button-clr rounded-md text-white flex items-center gap-2"
                        >
                            <UserPlus size={14} />
                            <span> Invite</span>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default InviteMember;
