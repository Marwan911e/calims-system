import React, { useState, useEffect } from "react";
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
  const [editIndex, setEditIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [printDate, setPrintDate] = useState(new Date().toLocaleDateString('ar-EG'));
  const [printTime, setPrintTime] = useState(new Date().toLocaleTimeString('ar-EG'));
  
  // Form validation
  useEffect(() => {
    const { الاسم, الرقم, الشركه, التاريخ, القيمه } = newRow;
    setIsFormValid(الاسم && الرقم && الشركه && التاريخ && القيمه);
  }, [newRow]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedRows = localStorage.getItem("claimsData");
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  // Save data to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem("claimsData", JSON.stringify(rows));
  }, [rows]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const addRow = () => {
    if (!isFormValid) return;
    
    if (editIndex >= 0) {
      // Update existing row
      const updatedRows = [...rows];
      updatedRows[editIndex] = { ...newRow };
      setRows(updatedRows);
      setEditIndex(-1);
    } else {
      // Add new row
      setRows([...rows, { ...newRow, id: Date.now() }]);
    }
    
    // Reset form
    setNewRow({
      الاسم: "",
      الرقم: "",
      الشركه: "",
      التاريخ: "",
      الكشف: "",
      القيمه: "",
    });
  };

  const editRow = (index) => {
    setNewRow({ ...rows[index] });
    setEditIndex(index);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const cancelEdit = () => {
    setNewRow({
      الاسم: "",
      الرقم: "",
      الشركه: "",
      التاريخ: "",
      الكشف: "",
      القيمه: "",
    });
    setEditIndex(-1);
  };

  const calculateTotal = () => {
    return rows
      .reduce((total, row) => total + parseFloat(row.القيمه || 0), 0)
      .toFixed(2);
  };

  const printTable = () => {
    // Update print date and time before printing
    setPrintDate(new Date().toLocaleDateString('ar-EG'));
    setPrintTime(new Date().toLocaleTimeString('ar-EG'));
    
    // Give time for state to update before printing
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const filteredRows = rows.filter(row => 
    row.الاسم.includes(searchTerm) || 
    row.الرقم.includes(searchTerm) || 
    row.الشركه.includes(searchTerm)
  );

  return (
    <div className="claims-container">
      {/* Header section */}
      <div className="header">
        <img src={logo} alt="Four Seasons Clinics" className="logo" />
        <h1>مطالبه ماليه</h1>
      </div>

      {/* Form Section - only shown when not printing */}
      <div className="card form-card no-print">
        <h2>{editIndex >= 0 ? "تعديل البيانات" : "إضافة بيانات جديدة"}</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>اسم الشركة:</label>
            <input
              type="text"
              name="الشركه"
              value={newRow.الشركه}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>الاسم:</label>
            <input
              type="text"
              name="الاسم"
              value={newRow.الاسم}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>الرقم:</label>
            <input
              type="text"
              name="الرقم"
              value={newRow.الرقم}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>التاريخ:</label>
            <input
              type="date"
              name="التاريخ"
              value={newRow.التاريخ}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>الكشف:</label>
            <input
              type="text"
              name="الكشف"
              value={newRow.الكشف}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>القيمة:</label>
            <input
              type="number"
              name="القيمه"
              value={newRow.القيمه}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="button-group">
          <button 
            onClick={addRow} 
            className={`action-button primary-button ${!isFormValid ? 'disabled-button' : ''}`}
            disabled={!isFormValid}
          >
            {editIndex >= 0 ? "تحديث" : "إضافة"}
          </button>
          
          {editIndex >= 0 && (
            <button onClick={cancelEdit} className="action-button secondary-button">
              إلغاء
            </button>
          )}
        </div>
      </div>

      {/* Search and Actions - only shown when not printing */}
      <div className="actions-card no-print">
        <div className="search-container">
          <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="action-buttons">
          <button onClick={printTable} className="action-button primary-button">
            طباعة
          </button>
          <button 
            onClick={() => setRows([])} 
            className="action-button danger-button"
            disabled={rows.length === 0}
          >
            مسح الكل
          </button>
        </div>
      </div>
      

      {/* Table Section */}
      <div className="table-container">
        <table className="claims-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الرقم</th>
              <th>التاريخ</th>
              <th>الكشف</th>
              <th>القيمة</th>
              <th className="no-print">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{row.الاسم}</td>
                  <td>{row.الرقم}</td>
                  <td>{row.التاريخ}</td>
                  <td>{row.الكشف}</td>
                  <td>{row.القيمه}</td>
                  <td className="action-cell no-print">
                    <button onClick={() => editRow(rows.indexOf(row))} className="icon-button edit-button">
                      ✏️
                    </button>
                    <button onClick={() => deleteRow(rows.indexOf(row))} className="icon-button delete-button">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">لا توجد بيانات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="total-section">
        <h3>الإجمالي: {calculateTotal()}</h3>
      </div>

    
    </div>
  );
};

export default ClaimsSystem;