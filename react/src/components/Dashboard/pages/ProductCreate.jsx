import { useState } from 'react';
import axiosClient from "../../../api/axios";

const Product = () => {
  const inputStyle = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-main-dark-bg dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    color_start: '#fff',
    color_end: '#fff'
    // ... other fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: imageFile }));

    // Display the selected image
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imagePreview = event.target.result;
        document.getElementById('image-preview').src = imagePreview;
      };
      reader.readAsDataURL(imageFile);
    }
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
    formDataToSend.append('image', formData.image); // Append the image file

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
        <h1 className="text-xl font-bold text-black capitalize dark:text-white">Account settings</h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black dark:text-gray-200" name="username">Username</label>
              <input id="username" type="text" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="password">Password</label>
              <input id="password" type="password" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Password Confirmation</label>
              <input id="passwordConfirmation" type="password" className={`${inputStyle}`}/>
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Color</label>
              <input id="color" type="color" className={`${inputStyle}`}/>
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
              <input id="range" type="range" className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Date</label>
              <input id="date" type="date" className={`${inputStyle}`}/>
            </div>
            <div>
              <label className="text-black dark:text-gray-200" name="passwordConfirmation">Text Area</label>
              <textarea id="textarea" type="textarea" className={`${inputStyle}`}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-200">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label name="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500  dark:text-gray-200">
                      <span className="dark:text-gray-200">Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                    </label>
                    <p className="pl-1 dark:text-gray-200 text-black">or drag and drop</p>
                  </div>
                  <p className="text-xs text-black dark:text-gray-200">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" name="username">Username</label>
              <input id="username" type="text" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="password">Password</label>
              <input id="password" type="password" className={`${inputStyle}`}/>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" name="passwordConfirmation">Password Confirmation</label>
              <input id="passwordConfirmation" type="password" className={`${inputStyle}`}/>
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


