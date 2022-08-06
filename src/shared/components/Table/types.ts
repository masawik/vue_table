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

export enum SortStates {
  ASC = 'ASC',
  DESC = 'DESC'
}
