import { contactTeamIcon, helpCenterIcon, kanBanBoardIcon, settingsIcons, taskCalanderIcon, toDoIcon } from "./media.js";

const themes = ["blue", "orange", "green", "pink"];
const softwarePaths = {
    primaryPaths: [
        {
            icon: toDoIcon,
            label: "Todo List"
        },
        {
            icon: kanBanBoardIcon,
            label: "Kanban Board"
        },
        {
            icon: taskCalanderIcon,
            label: "Task Calander"
        },
        {
            icon: contactTeamIcon,
            label: "Meet Up"
        }
        
    ],

    secondaryPath: [
        {
            icon: settingsIcons,
            label: "Settings"
        },
        {
            icon: helpCenterIcon,
            label: "Help Center"
        }
    ]
}




export { themes, softwarePaths }