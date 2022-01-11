import { useLocation } from "react-router-dom";
import "./index.scss";

export default function EditMovie() {
  const location = useLocation();
  const movie = location.movie;
  
  return (
    <div className="movie">
      <h1 className="movie__title">Update movie</h1>

      <div className="movie__container">
        <div className="movie__container_info">
          <table>
            <tbody>
              <tr className="item">
                <td className="item-title">Title:</td>
                <td className="item-value">{movie.title}</td>
              </tr>
              <tr className="item">
                <td className="item-title">Description:</td>
                <td className="item-value">{movie.desc}</td>
              </tr>
              <tr className="item">
                <td className="item-title">Genre:</td>
                <td className="item-value">{movie.genre}</td>
              </tr>
              <tr className="item">
                <td className="item-title">Year:</td>
                <td className="item-value">{movie.year}</td>
              </tr>
              <tr className="item">
                <td className="item-title">Limit:</td>
                <td className="item-value">{movie.limit}</td>
              </tr>
              <tr className="item">
                <td className="item-title">Image:</td>
                <td className="item-value">
                  <img src={movie.img} alt="" className="img" />
                </td>
              </tr>
              <tr className="item">
                <td className="item-title">Thumbnail:</td>
                <td className="item-value">
                  <img src={movie.imgSm} alt="" className="img" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <form htmlFor="" className="movie__container_form">
          <div className="movie__container_form-info">
            <label>Title</label>
            <input type="text" placeholder={movie.title} />
            <label>Description</label>
            <input type="text" placeholder={movie.desc} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} />
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} />
            <label>Image</label>
            <input type="file" placeholder={movie.img} />
            <label>Image small</label>
            <input type="file" placeholder={movie.imgSm} />
            <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="file" placeholder={movie.video} />
          </div>
          <div className="movie__container_form-btn">
            <button className="btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
