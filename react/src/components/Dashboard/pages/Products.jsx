import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal'
import { toast } from 'react-hot-toast';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Search,
  Toolbar,
  Selection
} from '@syncfusion/ej2-react-grids';
import axiosClient from '../../../api/axios';
import { productsGrid } from '../../../data/gridData';
import { Header } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen, selectProductId, setModalIsOpen } from '../../../app/ThemeSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;
  const productId = useSelector(selectProductId)
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const modalIsOpen = useSelector(selectModalIsOpen)
  const gridInstance = useRef(null); // Create a ref to hold the Grid instance

  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      await axiosClient.get('/api/products').then((response) => {
        const data = response.data.data;

        const transformedData = data.map((product) => ({
          id: parseInt(product.id),
          name: product.name,
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
          category_id: product.category,
          created_at: product.created_at, // Keep the original value for sorting
          /*           formatted_created_at: new Date(product.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }), */
          ProductImage: STORAGE_URL + product.main_image,
        }));

        setProductsData(transformedData);
        setLoading(false);
      });
    }
    fetchData();
  }, []);


  
  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async (productId,multiple) => {
    await axiosClient.delete('/api/products/' + productId).then((response) => {
      if(!multiple){
        toast.success(response.data.message)
        dispatch(setModalIsOpen(false))
        const filterdedData = productsData.filter((product) => product.id !== productId)
        setProductsData(filterdedData)
      }
      console.log(response);

      return true;
    }).catch((err) => {
      console.log(err);

      toast.error('Oops! Somthing went wrong!')
    })

  }
  const productsGridWithFormattedDate = productsGrid.map((item) => {
    if (item.field === 'created_at') {
      return {
        ...item,
        format: 'yyyy-MM-dd', // Set the format for sorting
        template: ({ created_at }) => formatDate(created_at), // Use the formatted date for display
      };
    }
    return item;
  });

  function findDifferentKeyValuePairs(obj1, obj2) {
    const differentPairs = {};
  
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differentPairs[key] = obj2[key]
        }
      }
    }
  
    return differentPairs;
  }
  const handleActionBegin = (args) => {
    if (args.requestType === 'delete' || args.requestType === 'save') {
      //console.log(args);
      // Prevent the action from executing immediately
      args.cancel = true;
  
      // Perform the server-side action
      let success = false
      if (args.requestType === 'delete') {
        //let filterdedData = productsData
        args.data.map((product)=>{
          success = handleDelete(product.id,true)
          if(!success){
            toast.error('Something went wrong while deleting product '+ product.name)
          }
          //console.log(filterdedData);
          //setProductsData(filterdedData) // Pass the ID to your delete function
        })
        
      }
      if(success){
        
        toast.success('Products deleted successfully')
        args.cancel = false;
        
      }
      if (args.requestType === 'save') {
        const payload = findDifferentKeyValuePairs(args.previousData,args.data)
        //console.log('payload ',payload);
        success = handleUpdate(payload,args.data.id)
      }
      if(success){
        args.cancel = false
        
      }
      // Similar for 'save'
    }
  };
  const handleUpdate = async (payload,id) => {
    await axiosClient.put('/api/products/'+id,payload).then((response)=>{
      if(response.status==200){
        toast.success('Product Updated Successfully!')
        return true
      }
    }).catch((error)=>{
      toast.success('Oops! Somthing went wrong!')
      console.log(error)
    })
    return false
  }
  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
      <div className="flex items-center justify-between">
        <Header category='Page' title='Products' />
        <Link to='/dashboard/products/create'
          className=" ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-auto"
        >
          Add New Product
        </Link>
      </div>

      <GridComponent id='gridcomp' dataSource={productsData} allowPaging allowSorting toolbar={['Search', 'Delete']} editSettings={{ allowDeleting: true, allowEditing: true }} width='auto' actionBegin={handleActionBegin} ref={gridInstance} 
      >

        <ColumnsDirective>
          {productsGridWithFormattedDate.map((item, i) => (

            <ColumnDirective key={i} {...item}  allowEditing={item.field !== 'id' && item.field!== 'ProductImage'} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection,Search, Edit, Sort, Filter, ExcelExport, Toolbar, ContextMenu, PdfExport]} />
      </GridComponent>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => dispatch(setModalIsOpen(false))}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark overlay
            zIndex: 1000, // Set a higher z-index to overlay above other content
          },
          content: {
            width: '400px',
            height: '160px',
            margin: 'auto',
            background: '#f3f4f6',
            borderRadius: '8px',
            zIndex: 1001, // Set a z-index higher than the overlay
          },
        }}
      >
        <h2 className="text-center">{productId? 'Are you sure you want to delete product' : 'Are you sure you want to delete products?'} <span className='font-semibold'>{productId ? productId.name : ''}</span> </h2>
        <div className="absolute right-2 bottom-2">

          <button
            onClick={() => { handleDelete(productId.id,false) }}
            className=" mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-24"
          >
            Delete
          </button>
          <button
            onClick={() => dispatch(setModalIsOpen(false))}
            className=" ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-24"
          >
            Cancel
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default Products;
