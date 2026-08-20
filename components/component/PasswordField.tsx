import {
    PasswordToggleField,
    PasswordToggleFieldIcon,
    PasswordToggleFieldInput,
    PasswordToggleFieldToggle,
} from "@radix-ui/react-password-toggle-field";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function PasswordField({
    name,
    placeholder,
}: {
    name: string;
    placeholder: string;
}) {
    const { control } = useFormContext();
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <PasswordToggleField>
                        <div className="space-y-1">
                            <div className="relative">
                                <PasswordToggleFieldInput
                                    {...field}
                                    value={field.value ?? ""}
                                    className="input-field"
                                    placeholder={placeholder}
                                />
                                <PasswordToggleFieldToggle className="absolute top-1/2 -translate-y-1/2 right-4">
                                    <PasswordToggleFieldIcon
                                        hidden={<EyeOff size={14} />}
                                        visible={<Eye size={14} />}
                                    />
                                </PasswordToggleFieldToggle>
                            </div>

                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                        </div>
                    </PasswordToggleField>
                )}
            />
        </>
    );
}

export default PasswordField;
