import { useEffect, useRef, useState } from 'react';
import axiosClient from "../../../api/axios";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { MdOutlineCancel } from 'react-icons/md';

const Product = () => {
  const ImageSVG = () => (
    <svg className="mx-auto h-12 w-12 text-black dark:text-gray-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
  const fileInputRef = useRef(null);
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
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const inputStyle = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: [],
    color_start: '#fff',
    color_end: '#fff'
    // ... other fields
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, images: [...prevData.images, imageFile] }));

  };

  // This useEffect hook will log the updated formData whenever images change.
  useEffect(() => {
    try {

      console.log(formData);
      formData.images.forEach((image, i) => {
        const reader = new FileReader(); // Create a new FileReader object for each image

        reader.onload = (event) => {
          const imagePreview = event.target.result;
          document.getElementById('image-preview-' + i).src = imagePreview;
        };

        reader.readAsDataURL(image);
      });
    } catch (error) {
      console.log(error);
      // Create a new array without the last image
      const updatedImages = formData.images.slice(0, formData.images.length - 1);

      // Update the state with the new array
      setFormData({ ...formData, images: updatedImages });
    }
  }, [formData.images]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('color_start', formData.color_start);
    formDataToSend.append('color_end', formData.color_end);
    formDataToSend.append('image', formData.images); // Append the image file

    axiosClient.post('/api/products', formDataToSend)
      .then(({ data }) => {
        console.log(data);
        axiosClient.delete(`/api/products/${data.data.id}`).then((res) => {
          console.log(res);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-secondary-dark-bg mt-20">
        <h1 className="text-xl font-bold text-black capitalize dark:text-gray-200">Account settings</h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black dark:text-gray-200" name="username">Username</label>
              <input id="username" type="text" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="password">Password</label>
              <input id="password" type="password" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Password Confirmation</label>
              <input id="passwordConfirmation" type="password" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Color</label>
              <input id="color" type="color" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Select</label>
              <select className={`${inputStyle}`}>
                <option>Surabaya</option>
                <option>Jakarta</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Range</label>
              <input id="range" type="range" className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Date</label>
              <input id="date" type="date" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Text Area</label>
              <textarea id="textarea" type="textarea" className={`${inputStyle}`}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-200">
                Image
              </label>

              <Splide className='mt-10' options={splideOptions}>
                {formData.images.map((image, i) => (
                  <SplideSlide key={i} className='mb-0.5 flex items-center justify-center h-64 relative'>
                    <div className="absolute top-2 right-2">
                      <MdOutlineCancel className='w-5 h-5 text-black' />
                    </div>
                    <div className="w-full h-full overflow-hidden border-2 border-gray-300 border-dashed rounded-md flex items-center ">
                      <img
                        id={`image-preview-${i}`}
                        className="object-center w-full h-auto"
                        src=""
                        alt=""
                      />
                    </div>
                  </SplideSlide>


                ))}
                <SplideSlide className='mb-0.5' >
                  <div className="flex items-center justify-center border-2 h-48 border-gray-300 border-dashed rounded-md cursor-pointer" onClick={handleDivClick} >
                    <div
                      className="space-y-1 text-center"
                    // Handle div click event
                    >
                      <ImageSVG />
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:text-gray-200"
                      >
                        <span className="dark:text-black p-2">Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
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




              </Splide>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-gray-200">Account settings</h2>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" name="username">Username</label>
              <input id="username" type="text" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="password">Password</label>
              <input id="password" type="password" className={`${inputStyle}`} />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="passwordConfirmation">Password Confirmation</label>
              <input id="passwordConfirmation" type="password" className={`${inputStyle}`} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Product


