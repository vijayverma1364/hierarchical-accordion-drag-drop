export const treeViewList = [
  { ID: 1, Head_ID: -1, name: "First Title", subTitle: "subtitle" },
  {
    ID: 2,
    Head_ID: 1,
    name: "Any Node can be the parent or child of any other node",
    subTitle: "subtitle",
  },
  { ID: 3, Head_ID: 1, name: "Keychain", subTitle: "subtitle" },
  {
    ID: 4,
    Head_ID: 3,
    name: "Button(s) can be be added to the node",
    subTitle: "Node info is passed when generating so you onClick handler",
  },
  { ID: 5, Head_ID: 3, name: "Egg", subTitle: "subtitle" },
  {
    ID: 6,
    Head_ID: 0,
    name: "Show node children by setting expanded",
    subTitle: "expanded: false",
  },
  {
    ID: 7,
    Head_ID: 6,
    name: "Advanced",
    subTitle: "Settings, behavior, etc.",
  },
  { ID: 8, Head_ID: 1, name: "React JS", subTitle: "subtitle" },
  { ID: 9, Head_ID: 5, name: "Vue JS", subTitle: "subtitle" },
  { ID: 10, Head_ID: 6, name: "Angular", subTitle: "subtitle" },
  {
    ID: 11,
    Head_ID: 7,
    name: "Customization",
    subTitle: "Adapt node appearance and behavior",
  },
  { ID: 12, Head_ID: 7, name: "Localization", subTitle: "subtitle" },
  {
    ID: 13,
    Head_ID: 6,
    name: "Performance",
    subTitle: "Optimization techniques",
  },
  {
    ID: 14,
    Head_ID: 8,
    name: "Component Lifecycle",
    subTitle: "Understanding React component lifecycle methods",
  },
  {
    ID: 15,
    Head_ID: 1,
    name: "Hooks",
    subTitle: "Using React hooks for state and effects",
  },
  {
    ID: 16,
    Head_ID: 9,
    name: "Reactivity",
    subTitle: "Handling reactive data in Vue.js applications",
  },
  {
    ID: 17,
    Head_ID: 9,
    name: "Components",
    subTitle: "Building reusable Vue components",
  },
  {
    ID: 18,
    Head_ID: 9,
    name: "Directives",
    subTitle: "Working with Vue directives",
  },
  {
    ID: 19,
    Head_ID: 10,
    name: "Components Architecture",
    subTitle: "Structuring Angular applications with components",
  },
  {
    ID: 20,
    Head_ID: 10,
    name: "Dependency Injection",
    subTitle: "Managing dependencies in Angular",
  },
];

const itemsDriveD = [];
const itemsDriveC = [
  {
    id: "1",
    name: "Documents",
    icon: "activefolder",
    isDirectory: true,
    expanded: true,
    items: [
      {
        id: "2",
        name: "Projects",
        icon: "activefolder",
        isDirectory: true,
        expanded: true,
        items: [
          {
            id: "3",
            name: "About.rtf",
            icon: "file",
            isDirectory: false,
          },
          {
            id: "4",
            name: "Passwords.rtf",
            icon: "file",
            isDirectory: false,
          },
        ],
      },
      {
        id: "5",
        name: "About.xml",
        icon: "file",
        isDirectory: false,
      },
      {
        id: "6",
        name: "Managers.rtf",
        icon: "file",
        isDirectory: false,
      },
      {
        id: "7",
        name: "ToDo.txt",
        icon: "file",
        isDirectory: false,
      },
    ],
  },
  {
    id: "8",
    name: "Images",
    icon: "activefolder",
    isDirectory: true,
    expanded: true,
    items: [
      {
        id: "9",
        name: "logo.png",
        icon: "file",
        isDirectory: false,
      },
      {
        id: "10",
        name: "banner.gif",
        icon: "file",
        isDirectory: false,
      },
    ],
  },
  {
    id: "11",
    name: "System",
    icon: "activefolder",
    isDirectory: true,
    expanded: true,
    items: [
      {
        id: "12",
        name: "Employees.txt",
        icon: "file",
        isDirectory: false,
      },
      {
        id: "13",
        name: "PasswordList.txt",
        icon: "file",
        isDirectory: false,
      },
    ],
  },
  {
    id: "14",
    name: "Description.rtf",
    icon: "file",
    isDirectory: false,
  },
  {
    id: "15",
    name: "Description.txt",
    icon: "file",
    isDirectory: false,
  },
];
export default {
  getItemsDriveC() {
    return itemsDriveC;
  },
  getItemsDriveD() {
    return itemsDriveD;
  },
};
