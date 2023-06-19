export const activeColumns = [
  {
    Header: ' ',
    columns: [
      {
        Header: 'Index',
        accessor: undefined,
      },
      {
        Header: 'Image',
        accessor: 'image',
      },
      {
        Header: 'GTIN',
        accessor: 'gtin',
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: '25%',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Created',
        accessor: (row) => new Date(row.dateAdded).toLocaleDateString(),
      },
      {
        Header: 'Modified',
        accessor: (row) => {
          if (row.dateModified) {
            return new Date(row.dateModified).toLocaleDateString();
          } else {
            return '';
          }
        },
      },
      {
        Header: 'Published',
        accessor: (row) => {
          if (row.datePublished) {
            return new Date(row.datePublished).toLocaleDateString();
          } else {
            return '';
          }
        },
      },
      {
        Header: 'Actions',
        accessor: undefined,
        width: '20%',
      },
    ],
  },
];

export const inactiveColumns = [
  {
    Header: ' ',
    columns: [
      {
        Header: 'Index',
        accessor: undefined,
      },
      {
        Header: 'GTIN',
        accessor: 'gtin',
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: '25%',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Created',
        accessor: (row) => new Date(row.dateAdded).toLocaleDateString(),
      },
      {
        Header: 'Date Inactive',
        accessor: (row) => {
          if (row.dateInactive) {
            return new Date(row.dateInactive).toLocaleDateString();
          } else {
            return '';
          }
        },
      },
      {
        Header: 'Actions',
        accessor: undefined,
        width: '20%',
      },
    ],
  },
];

export const categoryOptions = [
  { id: '', name: 'Select a Category' },
  { id: 0, name: 'Food' },
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Electronics' },
];
export const typeOptions = [
  { id: '', name: 'Select a Type' },
  { id: 0, name: 'Case' },
  { id: 1, name: 'Display' },
  { id: 2, name: 'Each' },
  { id: 3, name: 'Pallet' },
];
export const tempOptions = [
  { id: '', name: 'Select Temp. Unit' },
  { id: 0, name: 'Farenheit' },
  { id: 1, name: 'Celsius' },
];
export const packageOptions = [
  { id: '', name: 'Select Packaging Type' },
  { id: 0, name: 'Bag' },
  { id: 1, name: 'Bottle' },
  { id: 2, name: 'Box' },
  { id: 3, name: 'Carton' },
  { id: 4, name: 'Crate' },
  { id: 5, name: 'Envelope' },
  { id: 6, name: 'Multipack' },
  { id: 7, name: 'Not Packed' },
  { id: 8, name: 'Roll' },
  { id: 9, name: 'Wire' },
];
