import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, useNavigate } from "react-router-dom";
import { setModalIsOpen, setSelectedProductId } from "../app/ThemeSlice";
import { useDispatch } from "react-redux";
export const gridOrderImage = (props) => (
  <div>
    <img onClick={() => { console.log('hello world'); }}
      className="rounded-xl h-20 md:ml-3 cursor-pointer"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => {
  const bg = props.status === 'pending' ? 'yellow' : props.status === 'confirmed' ? 'blue' : props.status === 'delivered' ? 'green' : props.status === 'canceled' ? 'red' : ''

  return (
    <button type="button" className="flex items-center justify-between text-center">
      <span
        style={{ backgroundColor: bg }}
        className="w-4 h-4 rounded-full inline-block mr-2 text-center"
      ></span>
      <span className="text-md text-center capitalize">{props.status}</span>
    </button>
  );
}
export const modifyButtonTemplate = (props) => {
  const dispatch = useDispatch()
  const handleDeleteClick = (productId) => {
    dispatch(setSelectedProductId(productId));
    dispatch(setModalIsOpen(true));
  };
  return (
    <div className="flex items-center justify-between">
      <TooltipComponent content="Modify"
        position="Top" >
        <Link to={`/dashboard/products/${props.id}/update`} >
          <PencilSquareIcon className="text-gray-800 hover:text-gray-600 cursor-pointer w-6 h-6" />
        </Link>
      </TooltipComponent>
      <TooltipComponent content="Delete"
        position="Top" >
        <TrashIcon onClick={() => { handleDeleteClick({ id: props.id, name: props.name }) }} className="text-red-600 hover:text-red-800 cursor-pointer w-6 h-6" />
      </TooltipComponent>

    </div>
  );
}
export const modifyClientOrderButtonTemplate = (props) => {
  const dispatch = useDispatch()
  const handleDeleteClick = (productId) => {
    dispatch(setSelectedProductId(productId));
    dispatch(setModalIsOpen(true));
  };
  return (
    <div className="flex items-center justify-between">
      <TooltipComponent content="Modify"
        position="Top" >
        <Link to={`/orders/${props.id}`} >
          <PencilSquareIcon className="text-gray-800 hover:text-gray-600 cursor-pointer w-6 h-6" />
        </Link>
      </TooltipComponent>
      <TooltipComponent content="Delete"
        position="Top" >
        {props.status === 'pending' && (
          <TrashIcon onClick={() => { handleDeleteClick({ id: props.id, name: props.name }) }} className="text-red-600 hover:text-red-800 cursor-pointer w-6 h-6" />
        )}
      </TooltipComponent>

    </div>
  );
}
export const productsGrid = [
  { type: 'checkbox', width: '50' },
  {
    headerText: 'Image',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'name',
    headerText: 'Name',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  {
    field: 'category_id',
    headerText: 'Category',
    editType: 'dropdownedit',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'price',
    headerText: 'Price',
    format: '0 DZD',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    field: 'stock',
    headerText: 'Stock',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    field: 'id',
    headerText: 'Product ID',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'created_at',
    headerText: 'Added At',
    width: '150',
    textAlign: 'Center',
  },
  {
    //field: 'created_at',
    headerText: '',
    width: '90',
    template: modifyButtonTemplate,
    textAlign: 'Center',
  },
];
export const clientOrdersGrid = [
  //{ type: 'checkbox', width: '50' },
  /*   {
      headerText: 'Image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    }, */
  {
    field: 'id',
    headerText: 'Order ID',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'total_quantity',
    headerText: 'Number of Products',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'total_price',
    headerText: 'Total Price',
    format: '0 DZD',
    textAlign: 'Center',
    width: '150',
  },
  {
    field: 'status',
    headerText: 'Status',
    template: gridOrderStatus,
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'products',
    headerText: 'Order Products',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'created_at',
    headerText: 'Ordered At',
    width: '150',
    textAlign: 'Center',
  },
  {
    //field: 'created_at',
    headerText: '',
    width: '80',
    template: modifyClientOrderButtonTemplate,
    textAlign: 'Center',
  },
];
export const adminOrdersGrid = [
  //{ type: 'checkbox', width: '50' },
  /*   {
      headerText: 'Image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    }, */
  {
    field: 'id',
    headerText: 'Order ID',
    width: '50',
    textAlign: 'Center',
  },
  {
    field: 'name',
    headerText: 'Client Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'total_quantity',
    headerText: 'Products Count',
    width: '100',
    textAlign: 'Center',
  },
  {
    field: 'total_price',
    headerText: 'Total Price',
    format: '0 DZD',
    textAlign: 'Center',
    width: '150',
  },
  {
    field: 'status',
    headerText: 'Status',
    template: gridOrderStatus,
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'products',
    headerText: 'Order Products',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'created_at',
    headerText: 'Ordered At',
    width: '150',
    textAlign: 'Center',
  },
  {
    //field: 'created_at',
    headerText: '',
    width: '80',
    template: modifyClientOrderButtonTemplate,
    textAlign: 'Center',
  },
];