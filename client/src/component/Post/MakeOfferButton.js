import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Typography,
  message,
  InputNumber
} from "antd";
import { DollarCircleOutlined, MobileOutlined } from "@ant-design/icons";

const { Title } = Typography;
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Make an offer for the post"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      centered
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the price of your offer!"
            }
          ]}
        >
          <InputNumber
            defaultValue={10}
            size={"large"}
            autoFocus
            min={0}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => value.replace(/\$\s?|(,*)/g, "")}
            onChange={value => {
              console.log(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={"Payment Method"}
          name="payment"
          className="collection-create-form_last-form-item"
          rules={[
            {
              required: true,
              message: "Please input payment method!"
            }
          ]}
        >
          <Radio.Group defaultValue="paylah" buttonStyle="solid">
            <Radio.Button value="cash">
              <DollarCircleOutlined /> Cash
            </Radio.Button>
            <Radio.Button value="paylah">
              <MobileOutlined /> PayLah!
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const MakeOfferButton = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        style={{ float: "right", width: "220px" }}
        size="large"
        type="primary"
        onClick={() => {
          if (localStorage.getItem("user")) setVisible(true);
          else message.warning("Please Login first");
        }}
      >
        <strong>Make Offer</strong>
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MakeOfferButton;
