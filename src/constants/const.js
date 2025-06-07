import { blueBackground, contactTeamIcon, greenBackground, helpCenterIcon, kanBanBoardIcon, orangeBackground, pinkBackground, settingsIcons, taskCalanderIcon, toDoIcon } from "./media.js";

export const themes = ["blue", "orange", "green", "pink", "black"];
export const dashboardThemes = ["white", "black"];
export const dashboardMosiacThemes = [
    {
        label: "blue",
        image: blueBackground
    },
    {
        label: "orange",
        image: orangeBackground
    },
    {
        label: "pink",
        image: pinkBackground
    },
    {
        label: "green",
        image: greenBackground
    }
]

export const SECTIONS = {
    TODO: 'TODO',
    KANBAN: 'KANBAN',
    CALENDAR: 'CALENDAR',
    MEETUP: 'MEETUP',
    SETTINGS: 'SETTINGS',
    HELP: 'HELP',
};

export const SUB_SECTIONS = {
    THEMES: 'THEMES',
};

export const softwarePaths = {
    primaryPaths: [
        { key: SECTIONS.TODO, label: 'Todo List', icon: toDoIcon },
        { key: SECTIONS.KANBAN, label: 'Kanban Board', icon: kanBanBoardIcon },
        { key: SECTIONS.CALENDAR, label: 'Task Calendar', icon: taskCalanderIcon },
        { key: SECTIONS.MEETUP, label: 'Meet Up', icon: contactTeamIcon },
    ],
    secondaryPath: [
        { key: SECTIONS.SETTINGS, label: 'Settings', icon: settingsIcons },
        { key: SECTIONS.HELP, label: 'Help Center', icon: helpCenterIcon },
    ],
};
