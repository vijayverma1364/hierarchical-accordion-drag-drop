const itemsDriveD = [];
const itemsDriveC = [
  {
    id: "1",
    name: "First Title",
    icon: "activefolder",
    isDirectory: true,
    expanded: true,
    items: [
      {
        id: "2",
        name: "Any node can be the parent or child of any other node",
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
    name: "Button(s) can be added to the node",
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
    name: "Show node children by setting `expanded`",
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
    name: "Advanced",
    icon: "file",
    isDirectory: false,
  },
  {
    id: "15",
    name: "Any another item in hierarchy",
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
