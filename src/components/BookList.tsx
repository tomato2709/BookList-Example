import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Book, BookActionTypes } from '../store/actions';
import { Space, Table, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { collection, onSnapshot, query, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../App';

const BookList: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [visible, setVisible] = useState(false);
  const books = useSelector((state: RootState) => state.bookState.books);
  const dispatch = useDispatch();

  const handleAddBook = async () => {
    const id = Math.floor(Math.random() * 1000000);
    dispatch({
      type: BookActionTypes.ADD_BOOK,
      payload: {
        id,
        title: `Sách ${id}`,
        author: 'Nguyễn Văn A',
      },
    });
    await addDoc(collection(db, 'book'), {
      id,
      title: `Sách ${id}`,
      author: 'Nguyễn Văn A',
    });
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setVisible(true);
  };

  const handleDeleteBook = async (id: number) => {
    dispatch({
      type: BookActionTypes.DELETE_BOOK,
      payload: id,
    });
  };

  const handleSaveBook = async (values: { title: string; author: string }) => {
    if (selectedBook) {
      dispatch({
        type: BookActionTypes.EDIT_BOOK,
        payload: { ...selectedBook, ...values },
      });
      setSelectedBook(null);
    } else {
      const id = Math.floor(Math.random() * 1000000);
      dispatch({
        type: BookActionTypes.ADD_BOOK,
        payload: { id, ...values },
      });
    }
    setVisible(false);
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: string, record: Book) => (
        <Space wrap>
          <Button icon={<EditOutlined />} onClick={() => handleEditBook(record)}>
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteBook(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddBook}>
        Thêm sách
      </Button>
      <Table dataSource={books} columns={columns} rowKey="id" />
      <Modal
        title={selectedBook ? 'Edit Book' : 'Add Book'}
        visible={visible}
        onCancel={() => {
          setSelectedBook(null);
          setVisible(false);
        }}
        footer={null}
      >
        <Form
          initialValues={{
            title: selectedBook?.title,
            author: selectedBook?.author,
          }}
          onFinish={handleSaveBook}
        >
          <Form.Item
            label="Tên"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}
          >
              <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default BookList;