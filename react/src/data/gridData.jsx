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
        <TrashIcon onClick={()=>{handleDeleteClick({id:props.id,name:props.name})}} className="text-red-600 hover:text-red-800 cursor-pointer w-6 h-6" />
      </TooltipComponent>
      
    </div>
  );
} 
export const productsGrid = [
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
    width: '80',
    template: modifyButtonTemplate,
    textAlign: 'Center',
  },
];