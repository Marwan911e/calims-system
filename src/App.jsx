import React, { useState } from "react";
import "./index.css"; // Import global styles
import logo from "./assets/logo.png"; // Adjust the path as needed

const ClaimsSystem = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    الاسم: "",
    الرقم: "",
    الشركه: "",
    التاريخ: "",
    الكشف: "",
    القيمه: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const addRow = () => {
    setRows([...rows, { ...newRow }]);
    setNewRow({
      الاسم: "",
      الرقم: "",
      الشركه: "",
      التاريخ: "",
      الكشف: "",
      القيمه: "",
    });
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => total + parseFloat(row.القيمه || 0), 0);
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div className="header">
        <img src={logo} alt="Four Seasons Clinics" className="logo" />
        <h1>مطالبه ماليه</h1>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <label>اسم الشركة:</label>
        <input
          type="text"
          name="الشركه"
          value={newRow.الشركه}
          onChange={handleChange}
          style={{ margin: "10px" }}
        />
      </div>

      <div className="form-section">
        <input
          type="text"
          name="الاسم"
          placeholder="الاسم"
          value={newRow.الاسم}
          onChange={handleChange}
        />
        <input
          type="text"
          name="الرقم"
          placeholder="الرقم"
          value={newRow.الرقم}
          onChange={handleChange}
        />
        <input
          type="date"
          name="التاريخ"
          placeholder="التاريخ"
          value={newRow.التاريخ}
          onChange={handleChange}
        />
        <input
          type="text"
          name="الكشف"
          placeholder="الكشف"
          value={newRow.الكشف}
          onChange={handleChange}
        />
        <input
          type="number"
          name="القيمه"
          placeholder="القيمة"
          value={newRow.القيمه}
          onChange={handleChange}
        />
      </div>

      {/* Add Button */}
      <button onClick={addRow} className="add-button">
        إضافة صف
      </button>

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الرقم</th>
            <th>الشركة</th>
            <th>التاريخ</th>
            <th>الكشف</th>
            <th>القيمة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.الاسم}</td>
              <td>{row.الرقم}</td>
              <td>{row.الشركه}</td>
              <td>{row.التاريخ}</td>
              <td>{row.الكشف}</td>
              <td>{row.القيمه}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div>
        <strong>الإجمالي: {calculateTotal()}</strong>
      </div>

      {/* Print Button */}
      <button onClick={printTable} className="print-button">
        طباعة
      </button>
    </div>
  );
};

export default ClaimsSystem;
