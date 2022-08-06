import { ITableColumn } from '@/shared/components';

export const tableColumns: ITableColumn[] = [
  {
    view: 'Название',
    dataKey: 'name',
    sortable: true
  },
  {
    view: 'ФИО Директора',
    dataKey: 'principalName',
    sortable: true
  },
  {
    view: 'Номер телефона',
    dataKey: 'phoneNumber',
    sortable: false
  }
];
