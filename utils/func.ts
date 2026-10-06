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

export const EMPTY_STATE = {
    all: {
        header: "Nothing here yet",
        desc: "Ideas and requests will show up here once submitted.",
    },
    backlog: {
        header: "Backlog is empty",
        desc: "New posts land here until the team reviews them.",
    },
    accepted: {
        header: "No accepted ideas yet",
        desc: "Posts we've agreed to build will show up here.",
    },
    in_progress: {
        header: "Nothing in progress",
        desc: "Work the team has started will appear here.",
    },
    review: {
        header: "Nothing in review",
        desc: "Changes ready to check move here before release.",
    },
    completed: {
        header: "Nothing shipped yet",
        desc: "Completed items will be listed here.",
    },
};

export const tabsStatus = [
    { label: "All", value: "All", color: "#FFFFFF" },
    { label: "Backlog", value: "Backlog", color: "#8F8C88" },
    { label: "Accepted", value: "Accepted", color: "#4FB0FF" },
    { label: "Progress", value: "In_Progress", color: "#4FB0FF" },
    { label: "Review", value: "Review", color: "#B78CFF" },
    { label: "Completed", value: "Completed", color: "#4CC38A" },
];

export const tabCategory = [
    { label: "All", value: "All" },
    { label: "Feature request", value: "Feature_Request" },
    { label: "Bug report", value: "Bug_Report" },
    { label: "Integration", value: "Integration" },
];

export const tabSort = [
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "TItle", value: "Title" },
    { label: "Popular", value: "Popular" },
];

