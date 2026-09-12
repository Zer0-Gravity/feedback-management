"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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

    const isOpen = searchParams.get("invite") === "true";

    const handleClose = () => {
        router.push("?", { scroll: false });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite Member</DialogTitle>
                    <DialogDescription>
                        Input an email and send the invitation
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-3">
                    <div className="space-y-2">
                        <input
                            type="email"
                            {...register("email")}
                            className="input-field"
                        />
                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="px-2 py-1 bg-button-clr rounded-md text-white flex justify-end"
                    >
                        Send Invitation
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default InviteMember;
