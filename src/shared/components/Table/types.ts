//todo view может быть не только строкой но и компонентом (для добавления интерактивных элементов)
export interface ITableCellData {
  view: string;
  dataKey: string;
}

export interface ITableColumn extends ITableCellData {
  sortable: boolean;
}

//todo добавить дженерики, чтобы были подсказки dataKey

export interface ITableRowData {
  rowId: string;
  data: {
    [key: ITableCellData['dataKey']]: ITableCellData['view']
  };
}
