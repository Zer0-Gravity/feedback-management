import { SelectType } from "@/utils/func";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { LucideIcon } from "lucide-react";

interface SelectProps {
    data: SelectType[];
    value: string;
    label: string;
    icon: LucideIcon;
    onChange: (val: string | null) => void;
}

function SelectButton({
    data,
    value,
    label,
    icon: Icon,
    onChange,
}: SelectProps) {
    return (
        <Select value={value} onValueChange={(val) => onChange(val)}>
            <SelectTrigger
                icon={Icon}
                className="flex gap-2 items-center bg-accent-clr text-white p-2 rounded-lg border-0"
            >
                <SelectValue placeholder={label} className="text-[12px]" />
            </SelectTrigger>

            <SelectContent align="end" className="bg-background ring-0">
                <SelectGroup>
                    <SelectLabel className="text-primary-text text-[12px]">
                        {label}
                    </SelectLabel>
                    {data.map((d, i) => (
                        <SelectItem
                            key={i}
                            value={d.value}
                            className="text-primary-text text-[14px] data-highlighted:bg-accent-clr data-highlighted:text-white"
                        >
                            {d.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectButton;
