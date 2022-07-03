export const initProp = {
  input: `{
  "menu": {
    "id": "file",
    "value": "Files",
    "popup": {
      "menuitem": [
        {
          "value": "New",
          "onclick": "CreateNewDoc()"
        },
        {
          "value": "Open",
          "onclick": "OpenDoc()"
        },
        {
          "value": "Close",
          "onclick": "CloseDoc()"
        }
      ]
    }
  }
}`,
  query: 'menu.popup.menuitem',
  result: `[
  {
    "value": "New",
    "onclick": "CreateNewDoc()"
  },
  {
    "value": "Open",
    "onclick": "OpenDoc()"
  },
  {
    "value": "Close",
    "onclick": "CloseDoc()"
  }
]`
}
