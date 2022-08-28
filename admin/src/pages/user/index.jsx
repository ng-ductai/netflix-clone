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
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

export default function User() {
  const { users, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState({ visible: false, _id: "" });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "Username",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="movies__user">
            <img
              className="movies__user_img"
              src={params.row.profilePic}
              alt="avt"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div>
            {params.row.email === "admin@gmail.com" ? (
              <div className="movies__action1">
                <Link to={`/users/${params.row._id}`}>
                  <button className="movies__action-edit">
                    <EditOutlined />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="movies__action">
                <Link to={`/users/${params.row._id}`}>
                  <button className="movies__action-edit">
                    <EditOutlined />
                  </button>
                </Link>
                <DeleteOutline
                  className="movies__action-delete"
                  onClick={() =>
                    setOpen({ visible: true, _id: params.row._id })
                  }
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="movies">
      <div className="movies__header">user management</div>
      <div className="movies__title">
        <Link to="/newUser" className="movies__title-btn">
          <button className="movies__title-add">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={users}
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
