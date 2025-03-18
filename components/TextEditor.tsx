// import { 
//    BtnBold, 
//    BtnItalic, 
//    createButton, 
//    Editor, 
//    EditorProvider, 
//    Toolbar
//  } from 'react-simple-wysiwyg';
 
//  const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
 
//  export default function CustomEditor() {
// //  export default function CustomEditor({ value, onChange }) {
//    return (
//      <EditorProvider>
//        <Editor value={'value'}>
//          <Toolbar>
//            <BtnBold />
//            <BtnItalic />
//            <BtnAlignCenter />
//          </Toolbar>
//        </Editor>
//      </EditorProvider>
//    );
//  }

import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export default function CustomEditor() {
  const [html, setHtml] = useState('my <b>HTML</b>');
  
  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <>
    <Editor value={html} onChange={onChange} />
    </>
  );
}