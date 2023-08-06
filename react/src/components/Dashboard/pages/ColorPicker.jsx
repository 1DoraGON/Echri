import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'
import { Header } from '../components'
const ColorPicker = () => {
  const change = (args) => {
    document.getElementById('preview').style.backgroundColor = args.currentValue.hex
  }
  return (
    <div className='m-10  mt-24 p-10 md:p-5 bg-white rounded-3xl'>
      <Header category='App' title='Color Picker' />
      <div className="text-center">
        <div id='preview'/>
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <div className="">
            <p className="text-2xl font-semibold mt-2 mb-4">
              Inline Palette
            </p>
            <ColorPickerComponent
              id='inline-pallete'
              mode='Palette'
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
          <div className="">
            <p className="text-2xl font-semibold mt-2 mb-4">
              Inline Picker
            </p>
            <ColorPickerComponent
              id='inline-pallete'
              mode='Picker'
              modeSwitcher={false}
              inline
              change={change}
              showButtons={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker