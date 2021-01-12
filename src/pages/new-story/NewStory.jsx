import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button } from "react-bootstrap";
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";
import { postArticle } from "../../apiFunctions/articleApi";

export default class NewStory extends Component {
  state = {
    html: "",
    article: { author: { name: "test", img: "gfdas" } },
  };
  editor = React.createRef();
  onChange = (html) => {
    this.setState({ html });
    let article = this.state.article;
    this.setState({ article: { ...article, content: html } });
    console.log(html);
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let article = this.state.article;
      this.setState({ article: { ...article, headLine: e.target.value } });
      this.editor && this.editor.current.focus();
    }
  };
  onCategoryChange = () => {};
  submit = async () => {
    let response = await postArticle(this.state.article);
    console.log(response);
    if (response.errors) {
      alert(response.message);
    } else {
      alert("success");
    }
  };
  render() {
    const { html } = this.state;
    return (
      <Container className="new-story-container" expand="md">
        <div className="category-container">
          <CategoryPicker
            onChange={(topic) => {
              console.log(topic);
              let article = this.state.article;
              this.setState({
                article: {
                  ...article,
                  category: { img: topic.img, name: topic.name },
                },
              });
            }}
          />
        </div>
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Title"
          className="article-title-input"
        />

        <ReactQuill
          modules={NewStory.modules}
          formats={NewStory.formats}
          ref={this.editor}
          theme="bubble"
          value={html}
          onChange={this.onChange}
          placeholder="Tell your story..."
        />
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Cover link e.g : https://picsum.photos/800"
          className="article-cover-input"
        />

        <Button
          variant="success"
          className="post-btn"
          onClick={() => this.submit()}
        >
          Post
        </Button>
      </Container>
    );
  }
}

NewStory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "blockquote"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    ["link", "image"],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NewStory.formats = [
  "header",
  "bold",
  "italic",
  "blockquote",
  "align",

  "link",
  "image",
];
