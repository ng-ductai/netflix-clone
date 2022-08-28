import "./index.scss";
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
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import { convertGenre, convertSerie } from "../../constants";

export default function Movie() {
  const { movies, dispatch } = useContext(MovieContext);
  const [open, setOpen] = useState({ visible: false, _id: "" });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "movie",
      headerName: "Movie",
      width: 250,

      renderCell: (params) => {
        return (
          <div className="movies__item">
            <img className="movies__item-img" src={params.row.img} alt="avt" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 250 },
    {
      field: "genre",
      headerName: "Genre",
      width: 120,
      renderCell: (params) => {
        return <div>{convertGenre(params.row.genre)}</div>;
      },
    },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    {
      field: "isSeries",
      headerName: "isSeries",
      width: 130,
      renderCell: (params) => {
        return <div>{convertSerie(params.row.isSeries)}</div>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="movies__action">
            <Link to={`/movie/${params.row._id}`}>
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
      <div className="movies__header">movie management</div>

      <div className="movies__title">
        <Link to="/newMovie" className="movies__title-btn">
          <button className="movies__title-add">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={movies}
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
