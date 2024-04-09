import request from "@/utils/request.js";
import API from "@/consts/api.js";

const clueService = {
  getClues(user) {
    return request.post(API.clues, user);
  },
  addClue(data) {
    return request.post(API.addClue,data);
  },
  getEditClue(clueId){
    return request.post(API.editClue,clueId);
  },
  editClue(clue){
    return request.put(API.editClue,clue);
  },
  getLogs(clueId) {
    return request.post(API.clue_logs,clueId);
  },
  addLog(data){
    return request.post(API.addLog,data);
  },
};


export default clueService;