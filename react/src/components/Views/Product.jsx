import { useState } from 'react';
import axiosClient from "../../api/axios";

const Product = () => {
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
    //console.log(formData)
/*     'name' => 'required|string',
    'description' => 'nullable|string',
    'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
    'color_start' => 'nullable|string',
    'color_end' => 'nullable|string',
    'stock' => 'nullable|integer', */
    axiosClient.post('/api/products', formData)
    .then(({ data }) => {
      console.log(data)
      axiosClient.delete(`/api/products/${data.data.id}`).then((res) => {
        console.log(res);
        
      });
    })
    .catch(err => {
      console.log(err)
      
    })
    // ... send formDataToSend to the backend using fetch or axios
  };

  return (

    <>
      <div className="container bg-gray-100 ">
        <div className="py-10 min-h-screen mx-auto max-w-[80vw] lg:max-w-[95vw] flex md:flex-col items-center justify-around sm:gap-y-5">
          <div className="flex flex-col items-center justify-around h-[39vh] w-[30vw] lg:h-[38vh] lg:w-[25vw] md:h-[30vh] md:w-[50vw] lg:max-w-[25vw]">
            <div className=" ">

              <img id="image-preview" src="" alt="" className="w-auto h-auto max-w-full max-h-full" />
            </div>
            <div className="w-auto h-auto max-w-full max-h-full">
              <h1 className="uppercase text-3xl lg:text-2xl md:text-xl font-bold">just do it</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="container  max-w-md flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              {/*                 {errors &&
                  <ul className='alert'>
                    {Object.keys(errors).map(key => (
                      <li key={key}>{errors[key][0]}</li>
                    ))}
                    <p key={errors}></p>
                  </ul>} */}
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4"
              />
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4" />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4" />
              <input type="text" name="stock" value={formData.stock} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4" />
              <input type="text" name="color_start" value={formData.color_start} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4" />
              <input type="text" name="color_end" value={formData.color_end} onChange={handleInputChange} className="block border border-slate-400 w-full p-3 rounded mb-4" />
              <input type="file" name="image" onChange={handleImageChange}
                className="block border border-slate-400 w-full p-3 rounded mb-4" />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 button-theme focus:outline-none my-1"
              >Create Account</button>

              <div className="text-center text-sm text-gray-800 mt-4">
                By signing up, you agree to the&nbsp;
                <a className="no-underline border-b border-blue-600 text-blue-600" href="#">
                  Terms of Service
                </a> and&nbsp;
                <a className="no-underline border-b border-blue-600 text-blue-600" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-gray-800 mt-6">
              Already have an account?&nbsp;
              {/* <Link className="no-underline border-b border-blue-600 text-blue-600" to='/login'>
                  Log in
                </Link>. */}
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Product


