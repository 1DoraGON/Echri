import React from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor'
import { EditorData } from '../../../data/dummy'
import { Header } from '../components'
const Editor = () => {
  return (
    <div className='m-10  mt-24 p-10 md:p-5 bg-white rounded-3xl'>
      <Header category='App' title='Text Editor' />
      <RichTextEditorComponent >
        <EditorData />
        <Inject services={[HtmlEditor,Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>
  )
}

export default Editor