import img1 from '../media/products/markus-winkler-afW1hht0NSs-unsplash-min.jpg';
import img2 from '../media/products/pexels-pixabay-163064-min.jpg';
import img3 from '../media/products/markus-winkler-7EwWeNyzSwQ-unsplash-min.jpg';
import img4 from '../media/products/absolutvision-82TpEld0_e4-unsplash-min.jpg';
import img5 from '../media/products/pexels-miguel-á-padriñán-2882553.jpg';

export const productsTabs = [
  {
    id: 1,
    tabTitle: 'Edit',
    content:
      'Update the attributes of your product item.  Name, Product Description, Global Product Category Code, and Image are required attributes.  Global Trade Identification Number (GTIN) & Product Type cannot be edited.  If you wish to change either of these, you must create a new product with an entirely new GTIN',
    contentHeading: '',
    imgUrl: img1,
  },
  {
    id: 2,
    tabTitle: 'Publish',
    content:
      'Select a customer/subscriber who wishes to start receiving product data.  Click on Publish at the confirmation window to complete the action.',
    contentHeading: '',
    imgUrl: img2,
  },
  {
    id: 3,
    tabTitle: 'Deactivate',
    content:
      'Choose this action to render the catalog item inactive.  You can reactivate the product if you wish to make it available to customers again in the future.',
    contentHeading: '',
    imgUrl: img3,
  },
  {
    id: 4,
    tabTitle: 'Reactivate',
    content:
      'Choose this action from the Inactive list to set a catalog item back to Active status. Doing so will make the item available for subscriptions again.',
    contentHeading: '',
    imgUrl: img4,
  },
  {
    id: 5,
    tabTitle: 'Delete',
    content:
      'Choose this action to permanently remove an item from your catalog.  Once an item is deleted, it cannot be restored and must be recreated via Add New Item',
    contentHeading: 'CAUTION---This Action is Irreversible',
    imgUrl: img5,
  },
];

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
        accessor: row => new Date(row.dateAdded).toLocaleDateString(),
      },
      {
        Header: 'Modified',
        accessor: row => {
          if (row.dateModified) {
            return new Date(row.dateModified).toLocaleDateString();
          } else {
            return '';
          }
        },
      },
      {
        Header: 'Published',
        accessor: row => {
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
        accessor: row => new Date(row.dateAdded).toLocaleDateString(),
      },
      {
        Header: 'Date Inactive',
        accessor: row => {
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
