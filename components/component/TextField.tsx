import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function TextField({
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
                    <div className="space-y-1">
                        <input
                            {...field}
                            value={field.value ?? ""}
                            type="text"
                            className="input-field"
                            placeholder={placeholder}
                            autoComplete="off"
                        />

                        {error && (
                            <p className="error-message">{error.message}</p>
                        )}
                    </div>
                )}
            />
        </>
    );
}

export default TextField;
