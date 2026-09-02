import { Blocks, Bug, LucideIcon, WandSparkles } from "lucide-react";

interface CategoryType {
    [key: string]: {
        color: string;
        icon: LucideIcon;
        label: string;
    };
}

interface StatusType {
    [key: string]: {
        color: string;
        label: string;
    };
}

export interface SelectType {
    label: string;
    value: string;
}

export const CATEGORY_CONFIG: CategoryType = {
    feature_request: {
        color: "#ff6b1a",
        icon: WandSparkles,
        label: "Feature Request",
    },
    integration: { color: "#6A00FF", icon: Blocks, label: "Integration" },
    bug_report: { color: "#FB00FF", icon: Bug, label: "Bug Report" },
};

export const STATUS_CONFIG: StatusType = {
    backlog: { color: "#6A00FF", label: "Backlog" },
    accepted: { color: "#008CFF", label: "Accepted" },
    rejected: { color: "#FF0000", label: "Rejected" },
    in_progress: { color: "#FFAA00", label: "In Progress" },
    review: { color: "#FF6200", label: "Review" },
    completed: { color: "#00FF0D", label: "Completed" },
};

export const STATUS_LIST: SelectType[] = [
    { label: "Backlog", value: "Backlog" },
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "In Progress", value: "In_Progress" },
    { label: "Review", value: "Review" },
    { label: "Completed", value: "Completed" },
];
