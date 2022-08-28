import "../movie/index.scss";
import { DataGrid } from "@material-ui/data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import { convertGenre, convertType } from "../../constants";

export default function List() {
  const { lists, dispatch } = useContext(ListContext);
  const [open, setOpen] = useState({ visible: false, _id: "" });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "genre",
      headerName: "Genre",
      width: 180,
      renderCell: (params) => {
        return <div>{convertGenre(params.row.genre)}</div>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 180,
      renderCell: (params) => {
        return <div>{convertType(params.row.type)}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="movies__action">
            <Link to={`/list/${params.row._id}`}>
              <button className="movies__action-edit">
                <EditOutlined />
              </button>
            </Link>
            <DeleteOutline
              className="movies__action-delete"
              onClick={() => setOpen({ visible: true, _id: params.row._id })}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="movies">
      <div className="movies__header">playlist management</div>

      <div className="movies__title">
        <Link to="/newList" className="movies__title-btn">
          <button className="movies__title-add">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(r) => r._id}
      />

      <Dialog
        open={open.visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Can't restore, are you sure to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ background: "red", fontWeight: "600", color: "white" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ background: "lightgreen", fontWeight: "600" }}
            onClick={() => {
              handleDelete(open._id);
              setOpen({ visible: false, _id: false });
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
