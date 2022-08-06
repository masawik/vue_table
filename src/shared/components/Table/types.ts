export interface ITableCellData {
  view: string | number;
  dataKey: string;
}

export interface ITableColumn extends ITableCellData {
  sortable: boolean;
}

//todo добавить дженерики, чтобы были подсказки dataKey

export interface ITableRowData {
  rowId: string | number;
  data: {
    [key: ITableCellData['dataKey']]: ITableCellData['view']
  };
}
