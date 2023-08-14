import { useEffect, useRef, useState } from 'react';
import axiosClient from "../../../api/axios";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { MdOutlineCancel } from 'react-icons/md';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen, setModalIsOpen } from '../../../app/ThemeSlice';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFound } from '../../HomePage';
const ProductCreate = () => {
  const STORAGE_URL = 'http://127.0.0.1:8000/storage/'
  const navigate = useNavigate()
  const { productId } = useParams(); // Get the productId parameter from the URL
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null)
  //
  //
  //
  //
  // Const
  const ImageSVG = () => (
    <svg className="mx-auto h-12 w-12 text-black dark:text-gray-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  const inputStyle = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');


  const fileInputRef = useRef(null);
  const mainImageRef = useRef(null);

  const [options, setOptions] = useState([]);
  const modalIsOpen = useSelector(selectModalIsOpen)
  const dispatch = useDispatch()
  const [newOption, setNewOption] = useState('');
  const emptyForm = {
    name: '',
    description: '',
    price: '',
    stock: '',
    main_image: '',
    images: [],
    color_start: '#fff',
    color_end: '#fff',
    category_id: null
  }
  const [formData, setFormData] = useState(emptyForm);

  //
  //
  //
  //
  //
  //
  //
  //
  // Categories and Select Logic

  useEffect(() => {
    if (productId) {
      axiosClient.get('/api/products/' + productId).then(({ data }) => {
        setTags(data.data.tags.split('||'))
        delete data.data.tags
        setFormData(data.data)
        console.log(data.data);
        setLoading(false);
        //console.log(data);
        //console.log(formData);

      }).catch(err => {
        if (err.response?.status === 404) {
          console.log(err.response?.status === 404);
          navigate('/404')
        }
      })


    } else {
      setLoading(false);
      setFormData(emptyForm)
    }
    axiosClient.get('/api/categories').then(({ data }) => {
      console.log(data.data);
      if (data.data.length > 0 && !productId) {
        setFormData((prev) => ({ ...prev, category_id: data.data[0].id }))
        console.log('it must work ' + data.data[0].id);
      }
      setOptions(data.data)
      //console.log(options);
    }).catch((response) => {
      console.log(response);
    })
  }, [])


  const splideOptions = {
    perPage: 2.7,
    perMove: 1,
    //type: 'loop',
    rewind: true,
    keyboard: 'global',
    gap: '1rem',
    pagination: false,
    padding: '2rem',
    breakpoints: {
      1200: { perPage: 2.5 },
      991: { perPage: 2 },
      768: { perPage: 2 },
      500: { perPage: 1.3 },
      425: { perPage: 1 },
    },
  };


  //
  //
  //
  //
  //
  // Inputs Logic

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  //
  //
  //
  //
  //
  // Tags
  const handleTagInputChange = (event) => {
    setCurrentTag(event.target.value);

  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (currentTag.trim() !== '') {
        setTags([...tags, currentTag]);
        setCurrentTag('');
      }
    }
  };

  const removeTag = (index) => {
    if (event.key !== 'Enter') {

      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };


  //
  //
  //
  //
  //
  //
  // Handle Images

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleMainImageDivClick = () => {
    if (mainImageRef.current) {
      mainImageRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, images: [...prevData.images, imageFile] }));

  };

  const handleMainImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, main_image: imageFile }));
  };
  const handleRemoveMainImage = () => {
    setFormData((prevData) => ({ ...prevData, main_image: '' }));
  };
  const handleRemoveImage = (image) => {
    const images = formData.images.filter(item => item !== image);
    setFormData((prevData) => ({ ...prevData, images: images }));
  };




  //
  //
  //
  //
  //
  /* Add Category */
  const handleOptionAddition = (e) => {
    e.preventDefault();
    if (newOption.trim() !== '' && !options.includes(newOption)) {
      const payload = { name: newOption }
      try {
        axiosClient.post('/api/categories', payload).then((response) => {
          toast.success(`${newOption} ${response.data.message}`)
          setOptions((prevData) => [...prevData, response.data.resource])
          //console.log(response);
          setFormData((prevData) => ({ ...prevData, category_id: response.data.resource.id }))
        }).catch(({ response }) => {
          if (response.status === 422) {
            toast.error(response.data.errors.name[0])
          }
          console.log(response);
        })
      } catch ({ response }) {
        if (response.status === 422) {
          toast.error(response.response.data.errors.name[0])
        }
        console.log(response);
      }
      setNewOption('');
      dispatch(setModalIsOpen(false));
    }
  };

  //
  //
  //
  //
  //
  // This useEffect hook will log the updated formData whenever images change.
  useEffect(() => {
    try {
      formData.images.forEach((image, i) => {
        if (typeof image !== 'string') {
          const reader = new FileReader(); // Create a new FileReader object for each image

          reader.onload = (event) => {
            const imagePreview = event.target.result;
            document.getElementById('image-preview-' + i).src = imagePreview;
          };

          reader.readAsDataURL(image);
        }
      });
    } catch (error) {
      // Create a new array without the last image
      const updatedImages = formData.images.slice(0, formData.images.length - 1);

      // Update the state with the new array
      setFormData({ ...formData, images: updatedImages });
    }
  }, [formData.images]);


  useEffect(() => {
    try {
      if (typeof formData.main_image !== 'string') {
        const reader = new FileReader(); // Create a new FileReader object for each image

        reader.onload = (event) => {
          const imagePreview = event.target.result;
          document.getElementById('image-preview-main').src = imagePreview;
        };

        reader.readAsDataURL(formData.main_image);
      }
    } catch (error) {

      // Update the state with the new array
      setFormData({ ...formData, main_image: '' });
    }
  }, [formData.main_image]);



  //
  //
  //
  //
  //
  //
  //
  //
  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('color_start', formData.color_start);
    formDataToSend.append('color_end', formData.color_end);
    formDataToSend.append('main_image', formData.main_image);
    formData.images.forEach((image) => {
      if (typeof image === 'string') {
        formDataToSend.append('old_images[]', image);
      } else {
        formDataToSend.append('images[]', image);
      }
    });
    //formDataToSend.append('images', formData.images);
    //console.log(formData.images);
    formDataToSend.append('tags', tags.join('||'));
    formDataToSend.append('category_id', formData.category_id);
    console.log('form data ' + formDataToSend.get('description'));
    console.log(formData);
    //console.log(tags);
    if (productId) {
      formDataToSend.append('_method', 'put');
      console.log('put');
      axiosClient.post('/api/products/' + formData.id, formDataToSend, config)
        .then(({ data }) => {
          toast.success(`Product Updated Successfully`)
          console.log(data);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response?.status == 422) {
            setErrors(err.response?.data.errors)

          }
        });
    } else {

      axiosClient.post('/api/products', formDataToSend, config)
        .then(({ data }) => {
          toast.success(`Product Added Successfully`)
          delete emptyForm.category_id
          //setFormData((prev) => ({ ...emptyForm, category_id: prev.category_id }));
          setTags([])
          console.log(data);
        })
        .catch(err => {
          if (err.response?.status == 422) {
            setErrors(err.response?.data.errors)

          }
          console.log(err);
        });
    }
  };



  if (loading) {
    return null; // Render nothing while loading
  }



  return (
    <>
      <section className="mb-10 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-secondary-dark-bg mt-20">
        <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">{!productId ? 'Add A Product' : 'Modify Product ' + formData.name}</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="">

              {errors &&
                <ul className='alert'>
                  {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key][0]}</li>
                  ))}
                  <p key={errors}></p>
                </ul>}
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name='name'>Name</label>
              <input name='name' value={formData.name} onChange={handleInputChange} type="text" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name='stock'>Stock</label>
              <input name='stock' value={formData.stock} onChange={handleInputChange} type="number" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name='price'>Price</label>
              <input name='price' value={formData.price} onChange={handleInputChange} type="number" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name='description'>Description</label>
              <textarea name='description' value={formData.description} onChange={handleInputChange} type="text" className={`${inputStyle}`} />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-blue-200 dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600  p-1 m-1 rounded-lg flex items-center">
                    <span className="mr-1">{tag}</span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={(e) => { e.preventDefault(); removeTag(index) }}
                      onKeyDown={handleTagInputKeyDown}
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  className={`${inputStyle}`}
                  placeholder="Add tags and click enter (sizes, colors ...)"
                  value={currentTag}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Tags are used for search and for client in order to specify his desired product.
              </p>
            </div>

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="select">Select</label>
              <div className="flex items-center justify-between">


                <select name='category_id' value={formData.category_id} onChange={handleInputChange} className={`w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`} id="select">
                  {options.length == 0 && (

                    <option value={null}>Please Add A Category</option>
                  )}
                  {options.map((option, index) => (
                    <option className='flex items-center justify-between' value={option.id} key={index}>
                      {option.name}</option>
                  ))}
                </select>

                <button
                  className="w-[40%] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  onClick={(e) => { e.preventDefault(); dispatch(setModalIsOpen(true)) }}
                >
                  Add New Category
                </button>

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
                  <h2 className="text-center">Add New Option</h2>
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="block w-full p-2 my-2 border-1 border-gray-400 rounded"
                  />
                  <button
                    onClick={handleOptionAddition}
                    className="block mx-auto bg-blue-500 text-white px-4 py-2 rounded absolute right-2 bottom-2"
                  >
                    Add
                  </button>
                </Modal>
              </div>

            </div>
            {/*             <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Range</label>
              <input id="range" type="range" className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div> */}
            {/*             <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Date</label>
              <input id="date" type="date" className={`${inputStyle}`} />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-200">
                Images
              </label>

              <Splide className='mt-10' options={splideOptions}>
                {formData.main_image !== '' ? (

                  <SplideSlide className='mb-0.5 flex items-center justify-center h-64 relative'>
                    <div className="absolute top-2 right-2" onClick={handleRemoveMainImage}>
                      <MdOutlineCancel className='w-5 h-5 text-black dark:text-gray-200 hover:text-slate-400 cursor-pointer' />
                    </div>
                    <div className="w-full h-full overflow-hidden border-2 border-blue-400 rounded-md flex items-center ">
                      <img
                        id={`image-preview-main`}
                        className="object-center w-full h-auto"
                        src={`${productId ? STORAGE_URL + formData.main_image : ''}`}
                        alt=""
                      />
                    </div>
                  </SplideSlide>
                ) : (

                  <SplideSlide className='mb-0.5' >
                    <div className="flex items-center justify-center border-2 h-60 border-blue-400 rounded-md cursor-pointer" onClick={handleMainImageDivClick} >
                      <div
                        className="space-y-1 text-center"
                      // Handle div click event
                      >
                        <ImageSVG />
                        <label
                          name="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:text-gray-200"
                        >
                          <span className="dark:text-black p-2">Upload Main Image</span>
                          <input
                            id="file-upload"
                            name="mainImage"
                            type="file"
                            className="sr-only hidden"
                            onChange={handleMainImageChange}
                            ref={mainImageRef} // Attach the ref to the input element
                          />
                        </label>
                        <p className="pl-1 dark:text-gray-200 text-black">or drag and drop</p>
                        <p className="text-xs text-black dark:text-gray-200">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </SplideSlide>
                )}
                {formData.images.map((image, i) => (
                  <SplideSlide key={i} className='mb-0.5 flex items-center justify-center h-64 relative'>
                    <div className="absolute top-2 right-2" onClick={() => { handleRemoveImage(image) }}>
                      <MdOutlineCancel className='w-5 h-5 text-black dark:text-gray-200 hover:text-slate-400 cursor-pointer' />
                    </div>
                    <div className="w-full h-full overflow-hidden border-2 border-gray-300 border-dashed rounded-md flex items-center ">
                      <img
                        id={`image-preview-${i}`}
                        className="object-center w-full h-auto"
                        src={`${productId ? STORAGE_URL + image : ''}`}
                        alt=""
                      />
                    </div>
                  </SplideSlide>


                ))}
                {formData.main_image !== '' && (
                  <SplideSlide className='mb-0.5' >
                    <div className="flex items-center justify-center border-2 h-full border-gray-300 border-dashed rounded-md cursor-pointer" onClick={handleDivClick} >
                      <div
                        className="space-y-1 text-center"
                      // Handle div click event
                      >
                        <ImageSVG />
                        <label
                          name="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:text-gray-200"
                        >
                          <span className="dark:text-black p-2">Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only hidden"
                            onChange={handleImageChange}
                            ref={fileInputRef} // Attach the ref to the input element
                          />
                        </label>
                        <p className="pl-1 dark:text-gray-200 text-black">or drag and drop</p>
                        <p className="text-xs text-black dark:text-gray-200">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </SplideSlide>
                )}




              </Splide>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600">{!productId ? 'Create' : 'Save'}</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ProductCreate


