"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { Building2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
    .object({
        name: yup.string().required("Company name is required"),
        address: yup.string().required("Company address is required"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: yup
            .number()
            .required("Company contact is required"),
    })
    .required();

function NewCompany() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    //Check if the parameter for the new company dialog exist
    const isOpen = searchParams.get("new-organization") === "true";

    //Delete the parameter to close the dialog
    const handleClose = () => {
        router.push("?", { scroll: false });
    };

    const handleNewOrganization = (data: any) => {
        try {
            console.log(data);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-background">
                <DialogHeader>
                    <DialogTitle className="text-primary-text">
                        New Organization
                    </DialogTitle>
                    <DialogDescription className="text-secondary-text">
                        Create your new organization and start manage your group
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="text-primary-text space-y-4"
                    onSubmit={handleSubmit(handleNewOrganization)}
                >
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <Building2 size={14} /> <p>Company Name</p>
                        </div>
                        <input
                            {...register("name")}
                            type="text"
                            className="input-field"
                            placeholder="e.g Acme Group"
                        />
                        {errors.name && (
                            <p className="error-message">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <MapPin size={14} /> <p>Address</p>
                        </div>
                        <input
                            {...register("address")}
                            type="text"
                            className="input-field"
                            placeholder="e.g St. Avenue 21"
                        />
                        {errors.address && (
                            <p className="error-message">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <Mail size={14} /> <p>Email</p>
                        </div>
                        <input
                            {...register("email")}
                            type="text"
                            className="input-field"
                            placeholder="acme@company.com"
                        />
                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <Phone size={14} /> <p>Phone</p>
                        </div>
                        <input
                            {...register("phone")}
                            type="number"
                            className="input-field"
                            placeholder="1-1234-233"
                        />
                        {errors.phone && (
                            <p className="error-message">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 items-center justify-end">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-secondary-text"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="text-button-clr">
                            Create
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default NewCompany;
