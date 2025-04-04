# 🌳 Hierarchical Tree Based Indexing

A full-stack implementation of a hierarchical tree-based indexing system, combining a machine learning classification pipeline with a structured backend and frontend. This project is built to demonstrate efficient data retrieval and category mapping using hierarchical logic.

---

## 🚀 Features

- ✅ Tree-based hierarchical data indexing
- ⚡ Fast query search and lookup operations
- 📁 Dataset cleaning and classification pipeline
- 🧠 Modular backend with CORS support
- 💻 Frontend integrated with backend services
- 🧪 Unit-tested classification and index logic

---

## 📁 Folder Structure

```
.
├── backend/           # Backend logic (API, routing, etc.)
│   └── app/           # Core backend application
├── classification/    # ML classification pipeline
├── data/              # Cleaned and finalized dataset
├── frontend/          # Frontend application (UI layer)
├── .gitignore         # Git ignore file
├── LICENSE            # License info
├── README.md          # Project documentation
├── requirements.txt   # Python dependencies
```

---

## 🛠️ Getting Started

### Prerequisites
- Python 3.8+
- Node.js (for frontend)
- `pip` package manager

### Backend Setup
```bash
git clone https://github.com/yourusername/hierarchical_tree_based_indexing.git
cd hierarchical_tree_based_indexing/backend/app
python -m venv venv
source venv/bin/activate
pip install -r ../../requirements.txt
python main.py  # or your backend start script
```

### Frontend Setup
```bash
cd ../../frontend
npm install
npm run dev  # or npm start, based on setup
```

---

## 📌 Usage

You can test the hierarchical tree indexing by running the backend and making API requests (or using the frontend UI).

```python
from tree.index import TreeIndex

index = TreeIndex()
index.insert("Category > Subcategory > Item")
result = index.search("Item")

print(result)
```

---

## 🧪 Running Tests

```bash
cd classification
pytest
```

---

## 💡 Future Improvements

- [ ] Add visual representation of the tree
- [ ] Support deletion and update operations
- [ ] Build a CLI/GUI interface for interaction
- [ ] Integrate live classification prediction API

---


## 🙌 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/yourusername/hierarchical_tree_based_indexing/issues) if you'd like to help.

---

## 👨‍💻 Authors

- Mohit Verma — [@mohit-verma](https://github.com/mohit-verma)
- Arion Das — [@ArionDas](https://github.com/ArionDas)
- Irfan Ansari — [@irfan-iiitr](https://github.com/irfan-iiitr)
- Keshav Agarwal — [@keshav-github02](https://github.com/keshav-github02)

---

