import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnalysisDataService from "../services/analysis";
import { UserContext } from "../contexts/userContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [analyses, setAnalyses] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [paginationArr, setPaginationArr] = useState([1]);
  const [searchParam, setSearchParam] = useState("");
  const [currDeletingId, setCurrDeletingId] = useState("");

  const retrieveAnalyses = (currPage = 0) => {
    AnalysisDataService.getAnalyses(user.id, searchParam, currPage)
      .then((response) => {
        setAnalyses(response.data.analyses);
        setCurrPage(parseInt(response.data.page));
        setPaginationArr(
          Array.from(
            {
              length: Math.ceil(parseInt(response.data.total_results) / 10),
            },
            (x, i) =>
              (i === 0 ||
                (i >= parseInt(response.data.page) - 2 &&
                  i <= parseInt(response.data.page) + 2) ||
                i ===
                  Math.ceil(parseInt(response.data.total_results) / 10 - 1)) &&
              i + 1
          )
        );
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    retrieveAnalyses();
  }, []);

  const onInputChange = (e) => {
    const searchParam = e.target.value;
    setSearchParam(searchParam);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      retrieveAnalyses();
    }
  };

  const deleteAnalysis = () => {
    AnalysisDataService.deleteAnalysis(user.id, currDeletingId)
      .then((response) => {
        retrieveAnalyses();
      })
      .catch((e) => {
        alert(e);
      });
  };

  const setCurrDeletingAnalysis = (e) => {
    let target = e.target;
    while (target.nodeName !== "BUTTON") {
      target = target.parentNode;
    }
    document.getElementById("currDeletingTag").innerHTML =
      target.getAttribute("tag");

    setCurrDeletingId(target.getAttribute("_id"));
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 d-flex flex-row">
          <button
            type="button"
            className="btn btn-primary btn-lg ms-auto"
            onClick={() => {
              navigate("/analysis", { state: { new: true } });
            }}
          >
            &#43; New Analysis
          </button>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="search by tag or remarks"
            aria-label="searchParam"
            aria-describedby="search"
            name="searchParam"
            value={searchParam}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="search"
            onClick={retrieveAnalyses}
          >
            &#128269;
          </button>
        </div>
        <table className="table table-striped table-hover caption-top">
          <caption>Your Analyses</caption>
          <thead>
            <tr>
              <th scope="col">Tag</th>
              <th scope="col">Remarks</th>
              <th scope="col">Date Created</th>
              <th scope="col">Last Updated</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {analyses.length === 0 ? (
              <tr>
                <td colSpan={"5"}>No analysis found...</td>
              </tr>
            ) : (
              analyses.map(
                ({ _id, tag, remarks, date_created, date_updated }) => {
                  return (
                    <tr key={_id}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/analysis?id=${_id}`);
                        }}
                      >
                        <p
                          className="text-wrap"
                          style={{ width: "10rem", overflowWrap: "break-word" }}
                        >
                          {tag}
                        </p>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/analysis?id=${_id}`);
                        }}
                      >
                        <p
                          className="text-wrap"
                          style={{ width: "20rem", overflowWrap: "anywhere" }}
                        >
                          {remarks.length > 90
                            ? remarks.substr(0, 90) + "..."
                            : remarks}
                        </p>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/analysis?id=${_id}`);
                        }}
                      >
                        {date_created.split(".")[0] + "Z"}
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/analysis?id=${_id}`);
                        }}
                      >
                        {date_updated.split(".")[0] + "Z"}
                      </td>
                      <td>
                        <button
                          style={{
                            borderWidth: "1px",
                            background: "transparent",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          tag={tag}
                          _id={_id}
                          onClick={setCurrDeletingAnalysis}
                        >
                          {/* https://css.gg/trash */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                              fill="currentColor"
                            />
                            <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                            <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                          </svg>
                        </button>
                        <div
                          className="modal fade"
                          id="deleteModal"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body text-dark">
                                <p>
                                  Are you sure you want to delete the analysis (
                                  <i id="currDeletingTag"></i>
                                  )? <br /> This action is{" "}
                                  <strong> irreversible</strong>!
                                </p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn custom-btn btn-outline-danger"
                                  data-bs-dismiss="modal"
                                  onClick={deleteAnalysis}
                                >
                                  confirm delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
        <div className=" d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className={`page-link ${!currPage && "disabled"}`}
                  aria-label="Previous"
                  onClick={() => {
                    retrieveAnalyses(currPage - 1);
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              {paginationArr.map((pageNum, index, arr) => {
                let isPrevEllipsis = index > 0 && !arr[index - 1];
                return pageNum ? (
                  <li
                    key={index}
                    className={`page-item ${
                      pageNum === currPage + 1 && "active"
                    }`}
                  >
                    <button
                      className="page-link"
                      page={pageNum - 1}
                      onClick={(e) => {
                        pageNum !== currPage + 1 &&
                          retrieveAnalyses(e.target.getAttribute("page"));
                      }}
                    >
                      {pageNum}
                    </button>
                  </li>
                ) : (
                  !isPrevEllipsis && (
                    <li key={index} className="page-item disabled">
                      <button className="page-link">...</button>
                    </li>
                  )
                );
              })}
              <li className="page-item">
                <button
                  className={`page-link ${
                    currPage + 1 === paginationArr.slice(-1)[0] && "disabled"
                  }`}
                  aria-label="Next"
                  onClick={() => {
                    retrieveAnalyses(currPage + 1);
                  }}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <br />
      </div>
    </>
  );
};

export default Home;
