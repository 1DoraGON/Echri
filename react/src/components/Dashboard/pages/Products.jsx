import React, { useEffect, useState } from 'react';
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
} from '@syncfusion/ej2-react-grids';
import axiosClient from '../../../api/axios';
import { productsGrid } from '../../../data/gridData';
import { Header } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen, selectProductId, setModalIsOpen } from '../../../app/ThemeSlice';

const Products = () => {
  const productId = useSelector(selectProductId)
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const modalIsOpen = useSelector(selectModalIsOpen)

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
          ProductImage: 'http://127.0.0.1:8000/storage/' + product.main_image,
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

  const handleDelete = async (productId) =>{
    await axiosClient.delete('/api/products/'+productId).then((response)=>{
      toast.success(response.data.message)
      dispatch(setModalIsOpen(false))
      const filterdedData = productsData.filter((product)=> product.id !==productId)
      setProductsData(filterdedData)
      console.log(response);
    }).catch((err)=>{
      
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

  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
      <Header category='Page' title='Products' />
      <GridComponent id='gridcomp' dataSource={productsData} allowPaging allowSorting>
        <ColumnsDirective>
          {productsGridWithFormattedDate.map((item, i) => (

            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
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
        <h2 className="text-center">Are you sure you want to delete product <span className='font-semibold'>{productId? productId.name : ''}</span> </h2>
        <div className="absolute right-2 bottom-2">

        <button
          onClick={() => {handleDelete(productId.id)}}
          className=" mr-2 bg-red-500 text-white px-4 py-2 rounded w-24"
        >
          Delete
        </button>
        <button
          onClick={() => dispatch(setModalIsOpen(false))}
          className=" ml-2 bg-blue-500 text-white px-4 py-2 rounded w-24"
        >
          Cancel
        </button>
        </div>
      </Modal>

    </div>
  );
};

export default Products;
