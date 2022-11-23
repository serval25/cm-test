import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// pbs
const { UpdateRequestRequest, DataRequest } = require("src/app/common/data/backend/backend_pb.js");
const { BackendClient } = require("src/app/common/data/backend/backend_grpc_web_pb.js");

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  public msg: string = "";
  public client = new BackendClient("http://mock.ciphermode.com:50051", null, null);
  
  constructor(
		public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
	) {}

  public sendMessage () {
    const req = new UpdateRequestRequest();
    req.setOriginalRequest(this.setData(this.data.request));
    req.setNewRequest(this.setData(this.data.request, this.msg.replaceAll(/(<([^>]+)>)/gi, "").substring(0, 2000)));
    req.setId(this.data.request.id);
    this.client.updateRequest(req, {}, (err: any, res: any) => {
      this.cancel();
    });
  }

  public changeText(event: any) {
    this.msg = event.target.value;
  }

  public setData (data: any, message?: string) {
    const dataset = new DataRequest();
    dataset.setInputsList(data.inputsList);
    dataset.setResults(data.results);
    dataset.setRequestorId(data.requestorId);
    dataset.setSubmittedTimestampUs(data.submittedTimestampUs);
    dataset.setCommentList(data.commentList);
    dataset.setStatus(data.newStatus);
    dataset.setName(data.name);
    dataset.addComment(message); 
    return dataset;
  }

  public cancel () {
    this.dialogRef.close();
  }
}
