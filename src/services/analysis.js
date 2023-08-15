import http from "./http-common";

class AnalysisDataService {
  getAnalyses(userID, searchParam = "", page = 0) {
    if (searchParam) {
      return http.get(
        `/getAnalyses?userID=${userID}&searchParam=${searchParam}&page=${page}`
      );
    }
    return http.get(`/getAnalyses?userID=${userID}&page=${page}`);
  }

  getAnalysis(userID, analysisID) {
    return http.get(`/getAnalysis?userID=${userID}&id=${analysisID}`);
  }

  createAnalysis(data) {
    return http.post("/createAnalysis", data);
  }

  updateAnalysis(data) {
    return http.put("/updateAnalysis", data);
  }

  deleteAnalysis(userID, analysisID) {
    return http.delete(`/deleteAnalysis?userID=${userID}&id=${analysisID}`);
  }
}

export default new AnalysisDataService();
