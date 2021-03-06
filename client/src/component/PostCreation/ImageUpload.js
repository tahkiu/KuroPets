import React from "react";
import FittedImage from "react-fitted-image";
import { Carousel, Typography, Button, Form, Input, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { Title } = Typography;
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }
  onAddImage = value => {
    const { image } = value;
    const { onSubmitImage } = this.props;
    console.log();
    onSubmitImage(image);
    this.form.current.resetFields();
  };
  render() {
    const { images } = this.props;
    return (
      <div
        style={{
          minHeight: 400,
          padding: "0 22px 0px 22px",
          marginBottom: "50px",
          boxShadow:
            "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
          borderRadius: "8px"
        }}
      >
        <br />
        <Title style={{ marginBottom: "0px" }} level={4}>
          Image Upload
        </Title>
        You can choose to upload images to provide more information
        <div style={{ borderRadius: "8px", width: "100%", height: "550px" }}>
          <br />
          <Carousel>
            {images.length === 0 ? (
              <div>
                <FittedImage
                  fit="cover"
                  style={{
                    height: "500px",
                    borderRadius: "8px"
                  }}
                  src={"/placeholder-lg.png"}
                />
              </div>
            ) : (
              images.map((link, i) => (
                <div key={i}>
                  <FittedImage
                    fit="cover"
                    style={{
                      height: "500px",
                      borderRadius: "8px"
                    }}
                    src={link}
                  />
                </div>
              ))
            )}
          </Carousel>
        </div>
        <div>
          <Form
            ref={this.form}
            onFinish={this.onAddImage}
            size={"large"}
            layout={"vertical"}
          >
            <Form.Item name={"image"}>
              <Input placeholder="enter image URL..." />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }}>
              <div style={{ marginBottom: "15px" }}>
                <Button block type="primary" htmlType="submit">
                  <strong>Add Image</strong>{" "}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <List size="small" bordered={false}>
          {images.map((im, i) => {
            return (
              <List.Item>
                Image {i + 1}{" "}
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.onDeleteImage(i);
                  }}
                />{" "}
              </List.Item>
            );
          })}
        </List>{" "}
      </div>
    );
  }
}

export default ImageUpload;
