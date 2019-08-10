import * as React from 'react';
import { Editor as Tinymce } from '@tinymce/tinymce-react';

class Editor extends React.Component<any> {
  public state: {
    initialTinymce: string
  }
  constructor(props: any) {
    super(props)
    this.state = {
      initialTinymce: ''
    }
    this.changeTinymce = this.changeTinymce.bind(this)
    this.initialTinymce = this.initialTinymce.bind(this)
  }

  public componentDidMount() {
    const initialContent = this.initialTinymce()
    this.setState({
      initialTinymce: initialContent
    })
    console.log(initialContent)
  }

  public initialTinymce() {
    const imgSrc = 'http://120.55.40.62/api/getimg?img=fd1cbfc0-2b18-11e9-ad9d-69ad6a64b2b0.jpg'
    const GitHub = 'https://github.com/j3812549'
    const Blog = 'http://www.tiancai9.top'
    const content = `
      <h2 style='text-align: center'>Welcome to the TinyMCE demo!</h2>
      <img style='display: block;margin: 0 auto;width: 100px' src='${imgSrc}' />
      <p><b>GitHub:</b><a href='${GitHub}' target='_blank'>${GitHub}</a></p>
      <p><b>Blog:</b><a href='${Blog}' target='_blank'>${Blog}</a></p>
    `
    return content
  }

  public changeTinymce(e: any) {
    const content = e.target.getContent()
    this.setState({
      initialTinymce: content
    })
    console.log(content)
  }

  public render() {
    return (
      <div className="editor-box">
        {/* 
          @Editor: Tinymce
          @web: https://www.tiny.cloud
          @ChineseDoc: http://tinymce.ax-z.cn/
          @author： tiancai9
          @version： 0.1
        */}
        <Tinymce
          onChange={this.changeTinymce}
          initialValue={this.state.initialTinymce}
          apiKey="iwl078fao5v0lf7i0km86a4tnnoda758xf7deyzem0fc0lro"
          init={{
            language: 'zh_CN',
            language_url: 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/langs/zh_CN.js',
            imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
            plugins: [
              'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
            ],
            toolbar: [
              'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
              'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
            ],
            images_upload_url: 'http://tinymce.ax-z.cn/demo/upimg.php',
            images_upload_base_path: '/demo',
            height: 300,
            resize: false,
          }}
        >
          loding~
        </Tinymce>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.initialTinymce }}
        />
      </div>
    )
  }
}

export default Editor